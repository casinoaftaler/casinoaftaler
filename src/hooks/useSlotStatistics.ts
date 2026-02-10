import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getTodayDanish } from "@/lib/danishDate";

interface TopWinner {
  user_id: string;
  total_winnings: number;
  display_name: string | null;
  avatar_url: string | null;
}

interface SlotStatistics {
  totalSpinsToday: number;
  totalWinningsToday: number;
  avgWinPerSpin: number;
  topWinnersToday: TopWinner[];
}

export function useSlotStatistics() {
  return useQuery({
    queryKey: ["slot-statistics"],
    queryFn: async (): Promise<SlotStatistics> => {
      const today = getTodayDanish();

      // Get today's game results
      const { data: results, error: resultsError } = await supabase
        .from("slot_game_results")
        .select("user_id, bet_amount, win_amount")
        .gte("created_at", `${today}T00:00:00`)
        .lt("created_at", `${today}T23:59:59.999`);

      if (resultsError) throw resultsError;

      const totalSpinsToday = results?.length || 0;
      const totalWinningsToday = results?.reduce((sum, r) => sum + r.win_amount, 0) || 0;
      const avgWinPerSpin = totalSpinsToday > 0 ? totalWinningsToday / totalSpinsToday : 0;

      // Aggregate winnings by user
      const userWinnings: Record<string, number> = {};
      results?.forEach((r) => {
        userWinnings[r.user_id] = (userWinnings[r.user_id] || 0) + r.win_amount;
      });

      // Get top 10 user IDs
      const sortedUsers = Object.entries(userWinnings)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

      // Fetch profile info for top winners using public leaderboard view (limited fields for security)
      const topWinnerIds = sortedUsers.map(([id]) => id);
      let profilesMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {};

      if (topWinnerIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles_leaderboard")
          .select("user_id, display_name, avatar_url")
          .in("user_id", topWinnerIds);

        profiles?.forEach((p) => {
          profilesMap[p.user_id] = { 
            display_name: p.display_name, 
            avatar_url: p.avatar_url 
          };
        });
      }

      const topWinnersToday: TopWinner[] = sortedUsers.map(([userId, winnings]) => ({
        user_id: userId,
        total_winnings: winnings,
        display_name: profilesMap[userId]?.display_name || "Anonym",
        avatar_url: profilesMap[userId]?.avatar_url || null,
      }));

      return {
        totalSpinsToday,
        totalWinningsToday,
        avgWinPerSpin,
        topWinnersToday,
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
