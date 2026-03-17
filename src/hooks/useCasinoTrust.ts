import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  getCasinoSlugFromPath,
  type CasinoComplianceHistoryItem,
  type CasinoComplianceRecord,
} from "@/lib/casinoTrust";

export function useCasinoTrust(pagePath: string) {
  const casinoSlug = getCasinoSlugFromPath(pagePath);

  const complianceQuery = useQuery({
    queryKey: ["casino-trust", casinoSlug],
    enabled: Boolean(casinoSlug),
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CasinoComplianceRecord | null> => {
      const { data, error } = await supabase
        .from("casino_compliance")
        .select(
          "id, casino_name, casino_slug, license_holder_name, license_number, license_status, license_source_url, license_verified_at, bonus_compliant, bonus_max_amount, bonus_wager_requirement, bonus_source_url, bonus_verified_at, compliance_score, last_checked, notes, updated_at"
        )
        .eq("casino_slug", casinoSlug!)
        .maybeSingle();

      if (error) {
        console.warn("Failed to fetch casino compliance:", error.message);
        return null;
      }

      return data as CasinoComplianceRecord | null;
    },
  });

  const historyQuery = useQuery({
    queryKey: ["casino-trust-history", casinoSlug],
    enabled: Boolean(casinoSlug),
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CasinoComplianceHistoryItem[]> => {
      const { data, error } = await supabase
        .from("casino_compliance_history")
        .select("id, casino_slug, field_changed, old_value, new_value, change_type, source_url, changed_at, created_at")
        .eq("casino_slug", casinoSlug!)
        .order("changed_at", { ascending: false })
        .limit(3);

      if (error) {
        console.warn("Failed to fetch casino compliance history:", error.message);
        return [];
      }

      return (data ?? []) as CasinoComplianceHistoryItem[];
    },
  });

  return {
    casinoSlug,
    compliance: complianceQuery.data ?? null,
    history: historyQuery.data ?? [],
    isLoading: Boolean(casinoSlug) && (complianceQuery.isLoading || historyQuery.isLoading),
  };
}
