import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getTodayDanish } from "@/lib/danishDate";
import { useCallback } from "react";

export interface StreakData {
  current_streak: number;
  longest_streak: number;
  last_completed_date: string | null;
  streak_3_claimed: boolean;
  streak_7_claimed: boolean;
  streak_30_claimed: boolean;
}

const STREAK_MILESTONES = [
  { days: 3, credits: 2000, label: "3-dags streak" },
  { days: 7, credits: 5000, label: "7-dags streak" },
  { days: 30, credits: 10000, label: "30-dags streak" },
] as const;

export { STREAK_MILESTONES };

export function useMissionStreak() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: streak, isLoading } = useQuery({
    queryKey: ["mission-streak", user?.id],
    queryFn: async (): Promise<StreakData | null> => {
      if (!user) return null;
      const { data } = await supabase
        .from("mission_streaks")
        .select("current_streak, longest_streak, last_completed_date, streak_3_claimed, streak_7_claimed, streak_30_claimed")
        .eq("user_id", user.id)
        .maybeSingle();
      return data as StreakData | null;
    },
    enabled: !!user,
    staleTime: 30_000,
  });

  const checkAndUpdateStreak = useCallback(async () => {
    if (!user) return null;
    const today = getTodayDanish();
    const { data } = await supabase.rpc("update_mission_streak", {
      p_user_id: user.id,
      p_today: today,
    });
    
    if (data && (data as any).streak_updated) {
      queryClient.invalidateQueries({ queryKey: ["mission-streak"] });
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
      queryClient.invalidateQueries({ queryKey: ["header-credits"] });
    }
    
    return data;
  }, [user, queryClient]);

  // Determine next milestone
  const currentStreak = streak?.current_streak ?? 0;
  const nextMilestone = STREAK_MILESTONES.find((m) => currentStreak < m.days);

  return {
    streak,
    currentStreak,
    longestStreak: streak?.longest_streak ?? 0,
    nextMilestone,
    isLoading,
    checkAndUpdateStreak,
  };
}
