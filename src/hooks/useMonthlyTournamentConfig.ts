import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { LeaderboardCategory } from "@/hooks/useSlotLeaderboard";

export interface TournamentConfig {
  id: string;
  category: LeaderboardCategory;
  game_id: string;
  game_name: string;
  prize_1: number;
  prize_2: number;
  prize_3: number;
  is_active: boolean;
}

export function useMonthlyTournamentConfig() {
  return useQuery({
    queryKey: ["monthly-tournament-config"],
    queryFn: async (): Promise<TournamentConfig[]> => {
      const { data, error } = await supabase
        .from("monthly_tournament_config")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data || []) as unknown as TournamentConfig[];
    },
    staleTime: 60000,
  });
}
