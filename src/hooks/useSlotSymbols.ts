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
      
      // Cast rarity to proper type and ensure all numeric fields are numbers with defaults
      return (data || []).map(symbol => ({
        ...symbol,
        rarity: symbol.rarity as SymbolRarity,
        weight: Number(symbol.weight) || 10,
        multiplier_2: Number(symbol.multiplier_2) || 0,
        multiplier_3: Number(symbol.multiplier_3) || 0,
        multiplier_4: Number(symbol.multiplier_4) || 0,
        multiplier_5: Number(symbol.multiplier_5) || 0,
      }));
    },
  });
}
