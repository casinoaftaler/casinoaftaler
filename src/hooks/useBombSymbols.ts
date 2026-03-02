import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BombSymbol {
  id: string;
  game_id: string;
  value: number;
  label: string;
  image_url: string | null;
  position: number;
}

export function useBombSymbols(gameId: string = "fedesvin-bonanza") {
  return useQuery({
    queryKey: ["bomb-symbols", gameId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slot_bomb_symbols")
        .select("*")
        .eq("game_id", gameId)
        .order("position");
      if (error) throw error;
      return (data || []) as BombSymbol[];
    },
    staleTime: 60_000,
  });
}
