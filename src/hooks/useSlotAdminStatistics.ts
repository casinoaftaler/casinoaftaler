import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type StatPeriod = "today" | "week" | "month" | "alltime";

interface DailyStats {
  date: string;
  spins: number;
  winnings: number;
  players: number;
}

interface TopWinner {
  user_id: string;
  total_winnings: number;
  display_name: string | null;
  avatar_url: string | null;
}

interface SlotAdminStats {
  totalSpins: number;
  totalWinnings: number;
  biggestWin: number;
  uniquePlayers: number;
  totalBets: number;
  avgWinPerSpin: number;
  dailyStats: DailyStats[];
  topWinners: TopWinner[];
}

function getPeriodStart(period: StatPeriod): Date | null {
  const now = new Date();
  switch (period) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "week": {
      const dayOfWeek = now.getDay();
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Monday as start
      const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
      return monday;
    }
    case "month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "alltime":
      return null;
  }
}

export function useSlotAdminStatistics(period: StatPeriod) {
  return useQuery({
    queryKey: ["slot-admin-statistics", period],
    queryFn: async (): Promise<SlotAdminStats> => {
      const periodStart = getPeriodStart(period);

      // Build query
      let query = supabase
        .from("slot_game_results")
        .select("user_id, bet_amount, win_amount, created_at");

      if (periodStart) {
        query = query.gte("created_at", periodStart.toISOString());
      }

      const { data: results, error: resultsError } = await query;

      if (resultsError) throw resultsError;

      const records = results || [];

      // Calculate aggregate stats
      const totalSpins = records.length;
      const totalWinnings = records.reduce((sum, r) => sum + r.win_amount, 0);
      const totalBets = records.reduce((sum, r) => sum + r.bet_amount, 0);
      const biggestWin = records.reduce((max, r) => Math.max(max, r.win_amount), 0);
      const uniquePlayerIds = new Set(records.map((r) => r.user_id));
      const uniquePlayers = uniquePlayerIds.size;
      const avgWinPerSpin = totalSpins > 0 ? totalWinnings / totalSpins : 0;

      // Aggregate by date for dailyStats
      const byDate: Record<string, { spins: number; winnings: number; players: Set<string> }> = {};
      records.forEach((r) => {
        const date = r.created_at.split("T")[0];
        if (!byDate[date]) {
          byDate[date] = { spins: 0, winnings: 0, players: new Set() };
        }
        byDate[date].spins++;
        byDate[date].winnings += r.win_amount;
        byDate[date].players.add(r.user_id);
      });

      const dailyStats: DailyStats[] = Object.entries(byDate)
        .map(([date, data]) => ({
          date,
          spins: data.spins,
          winnings: data.winnings,
          players: data.players.size,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Aggregate winnings by user for top winners
      const userWinnings: Record<string, number> = {};
      records.forEach((r) => {
        userWinnings[r.user_id] = (userWinnings[r.user_id] || 0) + r.win_amount;
      });

      const sortedUsers = Object.entries(userWinnings)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

      const topWinnerIds = sortedUsers.map(([id]) => id);
      let profilesMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {};

      if (topWinnerIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, display_name, avatar_url, twitch_username")
          .in("user_id", topWinnerIds);

        profiles?.forEach((p) => {
          profilesMap[p.user_id] = {
            display_name: p.display_name || p.twitch_username,
            avatar_url: p.avatar_url,
          };
        });
      }

      const topWinners: TopWinner[] = sortedUsers.map(([userId, winnings]) => ({
        user_id: userId,
        total_winnings: winnings,
        display_name: profilesMap[userId]?.display_name || "Anonym",
        avatar_url: profilesMap[userId]?.avatar_url || null,
      }));

      return {
        totalSpins,
        totalWinnings,
        biggestWin,
        uniquePlayers,
        totalBets,
        avgWinPerSpin,
        dailyStats,
        topWinners,
      };
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
}
