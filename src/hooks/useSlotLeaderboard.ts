import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export interface LeaderboardEntry {
  user_id: string;
  total_winnings: number;
  biggest_win: number;
  biggest_multiplier: number;
  total_spins: number;
  total_bonuses: number;
  daily_winnings: number;
  weekly_winnings: number;
  display_name?: string;
  avatar_url?: string;
}

export interface CurrentUserLeaderboard {
  entry: LeaderboardEntry;
  rank: number;
}

export function useSlotLeaderboard(period: "daily" | "weekly" | "alltime" = "alltime") {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user ID
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setCurrentUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return useQuery({
    queryKey: ["slot-leaderboard", period, currentUserId],
    enabled: !!currentUserId,
    queryFn: async (): Promise<{
      entries: LeaderboardEntry[];
      currentUser: CurrentUserLeaderboard | null;
    }> => {
      // Determine sort key before query
      const sortKey = period === "daily" ? "daily_winnings" 
                    : period === "weekly" ? "weekly_winnings" 
                    : "total_winnings";

      const { data, error } = await supabase
        .from("slot_leaderboard")
        .select(`
          user_id,
          total_winnings,
          biggest_win,
          biggest_multiplier,
          total_spins,
          total_bonuses,
          daily_winnings,
          weekly_winnings
        `)
        .order(sortKey, { ascending: false, nullsFirst: false })
        .limit(100);

      if (error) throw error;

      // Fetch profiles for display names
      const userIds = (data || []).map(d => d.user_id).filter(Boolean) as string[];
      
      let profileMap = new Map<string, { display_name: string | null; avatar_url: string | null }>();
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles_leaderboard")
          .select("user_id, display_name, avatar_url")
          .in("user_id", userIds)
          .limit(100);

        profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);
      }

      const allEntries: LeaderboardEntry[] = (data || []).map(row => {
        const profile = row.user_id ? profileMap.get(row.user_id) : null;
        return {
          user_id: row.user_id || "",
          total_winnings: row.total_winnings || 0,
          biggest_win: row.biggest_win || 0,
          biggest_multiplier: row.biggest_multiplier || 0,
          total_spins: row.total_spins || 0,
          total_bonuses: row.total_bonuses || 0,
          daily_winnings: row.daily_winnings || 0,
          weekly_winnings: row.weekly_winnings || 0,
          display_name: profile?.display_name || "Anonym",
          avatar_url: profile?.avatar_url || undefined,
        };
      });

      // Filter out entries with 0 winnings for period-specific views
      const filteredEntries = period !== "alltime"
        ? allEntries.filter(e => (e[sortKey] as number) > 0)
        : allEntries;

      // Already sorted by database, but ensure consistent order
      filteredEntries.sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number));

      // Find current user's rank in the full sorted list
      let currentUser: CurrentUserLeaderboard | null = null;
      if (currentUserId) {
        const userIndex = filteredEntries.findIndex(e => e.user_id === currentUserId);
        if (userIndex !== -1) {
          currentUser = {
            entry: filteredEntries[userIndex],
            rank: userIndex + 1,
          };
        } else {
          // User not in top 100 — fetch their data separately
          const { data: userData } = await supabase
            .from("slot_leaderboard")
            .select("user_id, total_winnings, biggest_win, biggest_multiplier, total_spins, total_bonuses, daily_winnings, weekly_winnings")
            .eq("user_id", currentUserId)
            .maybeSingle();

          if (userData) {
            const { data: userProfile } = await supabase
              .from("profiles_leaderboard")
              .select("user_id, display_name, avatar_url")
              .eq("user_id", currentUserId)
              .maybeSingle();

            const userScore = userData[sortKey] || 0;

            // Count how many users have a higher score to determine rank
            const { count } = await supabase
              .from("slot_leaderboard")
              .select("user_id", { count: "exact", head: true })
              .gt(sortKey, userScore);

            const entry: LeaderboardEntry = {
              user_id: userData.user_id || "",
              total_winnings: userData.total_winnings || 0,
              biggest_win: userData.biggest_win || 0,
              biggest_multiplier: userData.biggest_multiplier || 0,
              total_spins: userData.total_spins || 0,
              total_bonuses: userData.total_bonuses || 0,
              daily_winnings: userData.daily_winnings || 0,
              weekly_winnings: userData.weekly_winnings || 0,
              display_name: userProfile?.display_name || "Anonym",
              avatar_url: userProfile?.avatar_url || undefined,
            };

            currentUser = {
              entry,
              rank: (count ?? 100) + 1,
            };
          }
        }
      }

      return {
        entries: filteredEntries,
        currentUser,
      };
    },
    staleTime: 10000,
    refetchInterval: 30000,
  });
}
