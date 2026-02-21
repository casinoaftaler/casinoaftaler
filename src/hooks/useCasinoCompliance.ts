import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CasinoComplianceRow {
  id: string;
  casino_slug: string;
  casino_name: string;
  license_number: string;
  license_status: "valid" | "suspended" | "revoked";
  license_holder_name: string | null;
  license_source_url: string;
  license_verified_at: string | null;
  bonus_source_url: string;
  bonus_verified_at: string | null;
  bonus_max_amount: number;
  bonus_wager_requirement: number;
  bonus_compliant: boolean;
  compliance_score: number;
  last_checked: string;
  source_url: string;
  notes: string | null;
  license_last_scraped_at: string | null;
  scrape_status: "success" | "failed" | "partial" | "pending";
}

export function useCasinoCompliance() {
  return useQuery({
    queryKey: ["casino-compliance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_compliance")
        .select("*")
        .order("compliance_score", { ascending: false });

      if (error) throw error;
      return (data || []) as CasinoComplianceRow[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
