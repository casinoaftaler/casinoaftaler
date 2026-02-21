import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MULTIPLIER_SYMBOLS, type MultiplierSymbolInfo } from "@/lib/gatesMultiplierSymbols";

/**
 * Fetches multiplier symbols from DB, falling back to hardcoded defaults.
 * Returns the same MultiplierSymbolInfo shape used throughout the app.
 */
export function useMultiplierSymbols() {
  return useQuery({
    queryKey: ["slot-multiplier-symbols"],
    queryFn: async (): Promise<MultiplierSymbolInfo[]> => {
      const { data, error } = await supabase
        .from("slot_multiplier_symbols" as any)
        .select("id, value, label, image_url, position")
        .order("position");

      if (error || !data || data.length === 0) {
        return MULTIPLIER_SYMBOLS;
      }

      // Merge DB rows with hardcoded fallback images
      const hardcodedMap = new Map(MULTIPLIER_SYMBOLS.map(s => [s.id, s]));

      return (data as any[]).map((row) => ({
        id: row.id,
        value: row.value,
        label: row.label,
        imageUrl: row.image_url || hardcodedMap.get(row.id)?.imageUrl || "",
      }));
    },
    staleTime: 60_000,
  });
}
