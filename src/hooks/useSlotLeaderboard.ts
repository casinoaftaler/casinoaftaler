import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LeaderboardEntry {
  user_id: string;
  total_winnings: number;
  biggest_win: number;
  biggest_multiplier: number;
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
      // Fetch from slot_leaderboard view (pre-aggregated)
      const { data, error } = await supabase
        .from("slot_leaderboard")
        .select(`
          user_id,
          total_winnings,
          biggest_win,
          biggest_multiplier,
          total_spins,
          daily_winnings,
          weekly_winnings
        `);

      if (error) throw error;

      // Fetch profiles for display names using the public leaderboard view (limited fields for security)
      const userIds = (data || []).map(d => d.user_id).filter(Boolean) as string[];
      
      let profileMap = new Map<string, { display_name: string | null; avatar_url: string | null }>();
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles_leaderboard")
          .select("user_id, display_name, avatar_url")
          .in("user_id", userIds);

        profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      }

      const entries: LeaderboardEntry[] = (data || []).map(row => {
        const profile = row.user_id ? profileMap.get(row.user_id) : null;
        return {
          user_id: row.user_id || "",
          total_winnings: row.total_winnings || 0,
          biggest_win: row.biggest_win || 0,
          biggest_multiplier: row.biggest_multiplier || 0,
          total_spins: row.total_spins || 0,
          daily_winnings: row.daily_winnings || 0,
          weekly_winnings: row.weekly_winnings || 0,
          display_name: profile?.display_name || "Anonym",
          avatar_url: profile?.avatar_url || undefined,
        };
      });

      // Sort by period
      const sortKey = period === "daily" ? "daily_winnings" 
                    : period === "weekly" ? "weekly_winnings" 
                    : "total_winnings";
      entries.sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number));

      return entries.slice(0, 10);
    },
    staleTime: 10000, // 10 seconds for fresher data
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}
