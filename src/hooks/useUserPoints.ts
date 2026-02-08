import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface UserPointsData {
  total_winnings: number;
  total_spins: number;
  biggest_win: number;
  biggest_multiplier: number;
}

/**
 * Hook to fetch user points from the slot_leaderboard view
 * Works for both authenticated user (own profile) and public profiles
 */
export function useUserPoints(userId: string | undefined | null) {
  return useQuery({
    queryKey: ["user-points", userId],
    queryFn: async (): Promise<UserPointsData | null> => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("slot_leaderboard")
        .select("total_winnings, total_spins, biggest_win, biggest_multiplier")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user points:", error);
        return null;
      }

      return data ? {
        total_winnings: Number(data.total_winnings) || 0,
        total_spins: Number(data.total_spins) || 0,
        biggest_win: Number(data.biggest_win) || 0,
        biggest_multiplier: Number(data.biggest_multiplier) || 0,
      } : null;
    },
    enabled: !!userId,
    staleTime: 30000, // 30 seconds
  });
}
