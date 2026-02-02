import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { SlotSymbol } from "@/lib/slotGameLogic";

export function useSlotSymbols() {
  return useQuery({
    queryKey: ["slot-symbols"],
    queryFn: async (): Promise<SlotSymbol[]> => {
      const { data, error } = await supabase
        .from("slot_symbols")
        .select("*")
        .order("position", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}
