import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CasinoComplianceRow {
  id: string;
  casino_slug: string;
  casino_name: string;
  license_number: string;
  license_status: "valid" | "suspended" | "revoked";
  bonus_max_amount: number;
  bonus_wager_requirement: number;
  bonus_compliant: boolean;
  compliance_score: number;
  last_checked: string;
  source_url: string;
  notes: string | null;
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
