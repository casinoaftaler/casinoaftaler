import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { SlotSymbol, SymbolRarity } from "@/lib/slotGameLogic";

export function useSlotSymbols() {
  return useQuery({
    queryKey: ["slot-symbols"],
    queryFn: async (): Promise<SlotSymbol[]> => {
      const { data, error } = await supabase
        .from("slot_symbols")
        .select("*")
        .order("position", { ascending: true });

      if (error) throw error;
      
      // Cast rarity to proper type since DB returns string and ensure weight is a number
      return (data || []).map(symbol => ({
        ...symbol,
        rarity: symbol.rarity as SymbolRarity,
        weight: Number(symbol.weight) || 10
      }));
    },
  });
}
