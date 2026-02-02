import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LeaderboardEntry {
  user_id: string;
  total_winnings: number;
  biggest_win: number;
  total_spins: number;
  daily_winnings: number;
  weekly_winnings: number;
  display_name?: string;
  avatar_url?: string;
}

export function useSlotLeaderboard(period: "daily" | "weekly" | "alltime" = "alltime") {
  return useQuery({
    queryKey: ["slot-leaderboard", period],
    queryFn: async (): Promise<LeaderboardEntry[]> => {
      // Query game results with profile info
      const { data: results, error } = await supabase
        .from("slot_game_results")
        .select(`
          user_id,
          win_amount,
          created_at
        `);

      if (error) throw error;

      // Aggregate by user
      const userStats = new Map<string, {
        total_winnings: number;
        biggest_win: number;
        total_spins: number;
        daily_winnings: number;
        weekly_winnings: number;
      }>();

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekStart = new Date(today);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      for (const result of results || []) {
        const stats = userStats.get(result.user_id) || {
          total_winnings: 0,
          biggest_win: 0,
          total_spins: 0,
          daily_winnings: 0,
          weekly_winnings: 0,
        };

        stats.total_winnings += result.win_amount;
        stats.biggest_win = Math.max(stats.biggest_win, result.win_amount);
        stats.total_spins++;

        const createdAt = new Date(result.created_at);
        if (createdAt >= today) {
          stats.daily_winnings += result.win_amount;
        }
        if (createdAt >= weekStart) {
          stats.weekly_winnings += result.win_amount;
        }

        userStats.set(result.user_id, stats);
      }

      // Get profiles for display
      const userIds = Array.from(userStats.keys());
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, twitch_username")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      // Build leaderboard entries
      const entries: LeaderboardEntry[] = Array.from(userStats.entries()).map(([user_id, stats]) => {
        const profile = profileMap.get(user_id);
        return {
          user_id,
          ...stats,
          display_name: profile?.display_name || profile?.twitch_username || "Anonym",
          avatar_url: profile?.avatar_url || undefined,
        };
      });

      // Sort by period
      const sortKey = period === "daily" ? "daily_winnings" : period === "weekly" ? "weekly_winnings" : "total_winnings";
      entries.sort((a, b) => b[sortKey] - a[sortKey]);

      return entries.slice(0, 10); // Top 10
    },
    staleTime: 30000, // 30 seconds
  });
}
