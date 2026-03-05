import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export type LeaderboardCategory = "total_points" | "highest_x" | "highest_win";

export interface LeaderboardEntry {
  user_id: string;
  total_winnings: number;
  biggest_win: number;
  biggest_multiplier: number;
  total_spins: number;
  total_bonuses: number;
  daily_winnings: number;
  weekly_winnings: number;
  monthly_winnings: number;
  monthly_biggest_win: number;
  monthly_biggest_multiplier: number;
  display_name?: string;
  avatar_url?: string;
  twitch_badges?: Record<string, unknown> | null;
}

export interface CurrentUserLeaderboard {
  entry: LeaderboardEntry;
  rank: number;
}

function getCategorySortKey(category: LeaderboardCategory): string {
  switch (category) {
    case "highest_x": return "monthly_biggest_multiplier";
    case "highest_win": return "monthly_biggest_win";
    case "total_points":
    default: return "monthly_winnings";
  }
}

export function getCategoryDisplayValue(entry: LeaderboardEntry, category: LeaderboardCategory): number {
  switch (category) {
    case "highest_x": return entry.monthly_biggest_multiplier ?? 0;
    case "highest_win": return entry.monthly_biggest_win ?? 0;
    case "total_points":
    default: return entry.monthly_winnings ?? 0;
  }
}

export function formatCategoryValue(value: number, category: LeaderboardCategory): string {
  switch (category) {
    case "highest_x": return value > 0 ? `${Number(value.toFixed(1))}x` : "-";
    case "highest_win": return Math.round(value).toLocaleString("da-DK");
    case "total_points":
    default: return Math.round(value).toLocaleString("da-DK");
  }
}

export function getCategoryLabel(category: LeaderboardCategory): string {
  switch (category) {
    case "highest_x": return "Højeste X";
    case "highest_win": return "Største Gevinst";
    case "total_points":
    default: return "Flest Point";
  }
}

export function getCategoryUnit(category: LeaderboardCategory): string {
  switch (category) {
    case "highest_x": return "multiplier";
    case "highest_win": return "point";
    case "total_points":
    default: return "point";
  }
}

export function useSlotLeaderboard(category: LeaderboardCategory = "total_points", gameId?: string) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setCurrentUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sortKey = getCategorySortKey(category);

  return useQuery({
    queryKey: ["slot-leaderboard", category, gameId, currentUserId],
    enabled: !!currentUserId,
    queryFn: async (): Promise<{
      entries: LeaderboardEntry[];
      currentUser: CurrentUserLeaderboard | null;
    }> => {
      // Use per-game view when gameId is provided
      if (gameId) {
        return fetchPerGameLeaderboard(category, sortKey, gameId, currentUserId);
      }

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
          weekly_winnings,
          monthly_winnings,
          monthly_biggest_win,
          monthly_biggest_multiplier
        `)
        .order(sortKey, { ascending: false, nullsFirst: false })
        .limit(100);

      if (error) throw error;

      // Fetch profiles for display names
      const userIds = (data || []).map(d => d.user_id).filter(Boolean) as string[];
      
      let profileMap = new Map<string, { display_name: string | null; avatar_url: string | null; twitch_badges?: unknown }>();
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles_leaderboard")
          .select("user_id, display_name, avatar_url, twitch_badges")
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
          monthly_winnings: row.monthly_winnings || 0,
          monthly_biggest_win: (row as any).monthly_biggest_win || 0,
          monthly_biggest_multiplier: (row as any).monthly_biggest_multiplier || 0,
          display_name: profile?.display_name || "Anonym",
          avatar_url: profile?.avatar_url || undefined,
          twitch_badges: profile?.twitch_badges as Record<string, unknown> | null,
        };
      });

      // Filter out entries with 0 value for the active category
      const filteredEntries = allEntries.filter(e => getCategoryDisplayValue(e, category) > 0);

      // Sort by category value
      filteredEntries.sort((a, b) => getCategoryDisplayValue(b, category) - getCategoryDisplayValue(a, category));

      // Find current user's rank
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
            .select("user_id, total_winnings, biggest_win, biggest_multiplier, total_spins, total_bonuses, daily_winnings, weekly_winnings, monthly_winnings, monthly_biggest_win, monthly_biggest_multiplier")
            .eq("user_id", currentUserId)
            .maybeSingle();

          if (userData) {
            const { data: userProfile } = await supabase
              .from("profiles_leaderboard")
              .select("user_id, display_name, avatar_url, twitch_badges")
              .eq("user_id", currentUserId)
              .maybeSingle();

            const entry: LeaderboardEntry = {
              user_id: userData.user_id || "",
              total_winnings: userData.total_winnings || 0,
              biggest_win: userData.biggest_win || 0,
              biggest_multiplier: userData.biggest_multiplier || 0,
              total_spins: userData.total_spins || 0,
              total_bonuses: userData.total_bonuses || 0,
              daily_winnings: userData.daily_winnings || 0,
              weekly_winnings: userData.weekly_winnings || 0,
              monthly_winnings: userData.monthly_winnings || 0,
              monthly_biggest_win: (userData as any).monthly_biggest_win || 0,
              monthly_biggest_multiplier: (userData as any).monthly_biggest_multiplier || 0,
              display_name: userProfile?.display_name || "Anonym",
              avatar_url: userProfile?.avatar_url || undefined,
              twitch_badges: (userProfile as any)?.twitch_badges as Record<string, unknown> | null,
            };

            const userScore = getCategoryDisplayValue(entry, category);

            // Count how many users have a higher score
            const { count } = await supabase
              .from("slot_leaderboard")
              .select("user_id", { count: "exact", head: true })
              .gt(sortKey, userScore);

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
