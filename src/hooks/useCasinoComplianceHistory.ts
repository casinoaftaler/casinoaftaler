import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ComplianceHistoryRow {
  id: string;
  casino_slug: string;
  field_changed: string;
  old_value: string;
  new_value: string;
  change_type: string;
  changed_at: string;
  source_url: string;
}

export function useCasinoComplianceHistory(limit = 10) {
  return useQuery({
    queryKey: ["casino-compliance-history", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_compliance_history")
        .select("*")
        .order("changed_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data || []) as ComplianceHistoryRow[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
