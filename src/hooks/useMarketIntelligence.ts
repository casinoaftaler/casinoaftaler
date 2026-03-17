import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  buildTrustHubSummary,
  type CasinoComplianceRecord,
  type CasinoTrustHubSummary,
} from "@/lib/casinoTrust";
import { type MarketIntelligenceEvent } from "@/lib/marketIntelligence";

const EVENT_SELECT =
  "id, casino_slug, event_type, category, headline, summary, impact_level, source_url, source_label, published_at, effective_date, is_featured, is_public, created_at, updated_at";

const COMPLIANCE_SELECT =
  "id, casino_name, casino_slug, license_holder_name, license_number, license_status, license_source_url, license_verified_at, bonus_compliant, bonus_max_amount, bonus_wager_requirement, bonus_source_url, bonus_verified_at, compliance_score, last_checked, notes, updated_at, created_at";

interface MarketIntelligenceData {
  events: MarketIntelligenceEvent[];
  featuredEvents: MarketIntelligenceEvent[];
  operators: CasinoComplianceRecord[];
  snapshot: CasinoTrustHubSummary | null;
  lastUpdated: string | null;
}

export function useMarketIntelligence(limit = 8) {
  return useQuery({
    queryKey: ["market-intelligence", limit],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<MarketIntelligenceData> => {
      const db = supabase as any;

      const [eventsResult, featuredResult, summaryResult, operatorsResult] = await Promise.all([
        db
          .from("market_intelligence_events")
          .select(EVENT_SELECT)
          .eq("is_public", true)
          .order("published_at", { ascending: false })
          .limit(limit),
        db
          .from("market_intelligence_events")
          .select(EVENT_SELECT)
          .eq("is_public", true)
          .eq("is_featured", true)
          .order("published_at", { ascending: false })
          .limit(3),
        supabase
          .from("casino_compliance")
          .select(COMPLIANCE_SELECT)
          .order("last_checked", { ascending: false }),
        supabase
          .from("casino_compliance")
          .select(COMPLIANCE_SELECT)
          .order("compliance_score", { ascending: false })
          .order("last_checked", { ascending: false })
          .limit(18),
      ]);

      if (eventsResult.error) {
        console.warn("Failed to fetch market intelligence events:", eventsResult.error.message);
      }

      if (featuredResult.error) {
        console.warn("Failed to fetch featured market intelligence events:", featuredResult.error.message);
      }

      if (summaryResult.error) {
        console.warn("Failed to fetch compliance snapshot:", summaryResult.error.message);
      }

      if (operatorsResult.error) {
        console.warn("Failed to fetch compliance operator overview:", operatorsResult.error.message);
      }

      const events = (eventsResult.data ?? []) as MarketIntelligenceEvent[];
      const featuredEvents = (featuredResult.data ?? []) as MarketIntelligenceEvent[];
      const summaryRecords = (summaryResult.data ?? []) as CasinoComplianceRecord[];
      const operators = (operatorsResult.data ?? []) as CasinoComplianceRecord[];
      const snapshot = buildTrustHubSummary(summaryRecords);

      const lastUpdatedCandidates = [
        ...events.map((event) => event.published_at),
        snapshot?.lastChecked,
        snapshot?.lastVerified,
      ].filter((value): value is string => Boolean(value));

      const lastUpdated =
        lastUpdatedCandidates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? null;

      return {
        events,
        featuredEvents,
        operators,
        snapshot,
        lastUpdated,
      };
    },
  });
}
