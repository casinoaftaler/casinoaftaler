import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  buildTrustHubSummary,
  getCasinoSlugFromPath,
  isCasinoTrustHubPath,
  type CasinoComplianceHistoryItem,
  type CasinoComplianceRecord,
  type CasinoTrustHubSummary,
} from "@/lib/casinoTrust";

const COMPLIANCE_SELECT =
  "id, casino_name, casino_slug, license_holder_name, license_number, license_status, license_source_url, license_verified_at, bonus_compliant, bonus_max_amount, bonus_wager_requirement, bonus_source_url, bonus_verified_at, compliance_score, last_checked, notes, updated_at, created_at";

export function useCasinoTrust(pagePath: string) {
  const casinoSlug = getCasinoSlugFromPath(pagePath);
  const isHubPath = isCasinoTrustHubPath(pagePath);

  const complianceQuery = useQuery({
    queryKey: ["casino-trust", casinoSlug],
    enabled: Boolean(casinoSlug),
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CasinoComplianceRecord | null> => {
      const { data, error } = await supabase
        .from("casino_compliance")
        .select(COMPLIANCE_SELECT)
        .eq("casino_slug", casinoSlug!)
        .maybeSingle();

      if (error) {
        console.warn("Failed to fetch casino compliance:", error.message);
        return null;
      }

      return data as CasinoComplianceRecord | null;
    },
  });

  const summaryQuery = useQuery({
    queryKey: ["casino-trust-hub", pagePath],
    enabled: isHubPath && !casinoSlug,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CasinoTrustHubSummary | null> => {
      let request = supabase.from("casino_compliance").select(COMPLIANCE_SELECT);

      if (pagePath === "/nye-casinoer") {
        request = request.order("created_at", { ascending: false }).limit(12);
      } else {
        request = request.order("last_checked", { ascending: false }).limit(25);
      }

      const { data, error } = await request;

      if (error) {
        console.warn("Failed to fetch casino trust hub summary:", error.message);
        return null;
      }

      return buildTrustHubSummary((data ?? []) as CasinoComplianceRecord[]);
    },
  });

  const historyQuery = useQuery({
    queryKey: ["casino-trust-history", casinoSlug ?? pagePath],
    enabled: Boolean(casinoSlug) || isHubPath,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CasinoComplianceHistoryItem[]> => {
      let request = supabase
        .from("casino_compliance_history")
        .select("id, casino_slug, field_changed, old_value, new_value, change_type, source_url, changed_at, created_at")
        .order("changed_at", { ascending: false })
        .limit(3);

      if (casinoSlug) {
        request = request.eq("casino_slug", casinoSlug);
      } else if (pagePath === "/casino-bonus") {
        request = request.in("change_type", ["bonus_change", "wager_change"]);
      }

      const { data, error } = await request;

      if (error) {
        console.warn("Failed to fetch casino compliance history:", error.message);
        return [];
      }

      return (data ?? []) as CasinoComplianceHistoryItem[];
    },
  });

  return {
    casinoSlug,
    isHubPath,
    compliance: complianceQuery.data ?? null,
    summary: summaryQuery.data ?? null,
    history: historyQuery.data ?? [],
    isLoading: casinoSlug
      ? complianceQuery.isLoading || historyQuery.isLoading
      : isHubPath
        ? summaryQuery.isLoading || historyQuery.isLoading
        : false,
  };
}
