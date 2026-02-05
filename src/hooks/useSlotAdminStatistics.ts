import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type StatPeriod = "today" | "week" | "month" | "alltime";

interface DailyStats {
  date: string;
  spins: number;
  winnings: number;
  bets: number;
  rtp: number;
  players: number;
}

interface TopWinner {
  user_id: string;
  total_winnings: number;
  display_name: string | null;
  avatar_url: string | null;
}

interface ArchivedStats {
  total_spins: number;
  total_winnings: number;
  total_bets: number;
  biggest_win: number;
  total_bonuses: number;
  unique_players: number;
  reset_count: number;
  last_reset_at: string | null;
}

interface SlotAdminStats {
  // Current period stats
  totalSpins: number;
  totalWinnings: number;
  biggestWin: number;
  uniquePlayers: number;
  totalBets: number;
  avgWinPerSpin: number;
  dailyStats: DailyStats[];
  topWinners: TopWinner[];
  // Archived/historical stats (preserved through resets)
  archived: ArchivedStats;
  // Combined totals (current + archived)
  allTimeSpins: number;
  allTimeWinnings: number;
  allTimeBets: number;
  allTimeBiggestWin: number;
  allTimeBonuses: number;
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

      // Fetch archived stats (always)
      const { data: archiveData, error: archiveError } = await supabase
        .from("slot_statistics_archive")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000001")
        .single();

      if (archiveError && archiveError.code !== "PGRST116") {
        console.error("Error fetching archive:", archiveError);
      }

      const archived: ArchivedStats = {
        total_spins: archiveData?.total_spins || 0,
        total_winnings: Number(archiveData?.total_winnings || 0),
        total_bets: Number(archiveData?.total_bets || 0),
        biggest_win: Number(archiveData?.biggest_win || 0),
        total_bonuses: archiveData?.total_bonuses || 0,
        unique_players: archiveData?.unique_players || 0,
        reset_count: archiveData?.reset_count || 0,
        last_reset_at: archiveData?.last_reset_at || null,
      };

      // First get total count to handle pagination
      let countQuery = supabase
        .from("slot_game_results")
        .select("*", { count: "exact", head: true });

      if (periodStart) {
        countQuery = countQuery.gte("created_at", periodStart.toISOString());
      }

      const { count: totalCount, error: countError } = await countQuery;
      if (countError) throw countError;

      // Fetch all records using pagination to bypass 1000 limit
      const allRecords: { user_id: string; bet_amount: number; win_amount: number; bonus_win_amount: number; is_bonus_triggered: boolean; created_at: string }[] = [];
      const pageSize = 1000;
      const totalPages = Math.ceil((totalCount || 0) / pageSize);

      for (let page = 0; page < totalPages; page++) {
        let query = supabase
          .from("slot_game_results")
          .select("user_id, bet_amount, win_amount, bonus_win_amount, is_bonus_triggered, created_at")
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (periodStart) {
          query = query.gte("created_at", periodStart.toISOString());
        }

        const { data, error } = await query;
        if (error) throw error;
        if (data) allRecords.push(...data);
      }

      const records = allRecords;

      // Calculate aggregate stats for current period
      const totalSpins = records.length;
      const totalWinnings = records.reduce((sum, r) => sum + Number(r.win_amount) + Number(r.bonus_win_amount), 0);
      const totalBets = records.reduce((sum, r) => sum + Number(r.bet_amount), 0);
      const biggestWin = records.reduce((max, r) => Math.max(max, Number(r.win_amount) + Number(r.bonus_win_amount)), 0);
      const totalBonuses = records.filter(r => r.is_bonus_triggered).length;
      const uniquePlayerIds = new Set(records.map((r) => r.user_id));
      const uniquePlayers = uniquePlayerIds.size;
      const avgWinPerSpin = totalSpins > 0 ? totalWinnings / totalSpins : 0;

      // Aggregate by date for dailyStats
      const byDate: Record<string, { spins: number; winnings: number; bets: number; players: Set<string> }> = {};
      records.forEach((r) => {
        const date = r.created_at.split("T")[0];
        if (!byDate[date]) {
          byDate[date] = { spins: 0, winnings: 0, bets: 0, players: new Set() };
        }
        byDate[date].spins++;
        byDate[date].winnings += Number(r.win_amount) + Number(r.bonus_win_amount);
        byDate[date].bets += Number(r.bet_amount);
        byDate[date].players.add(r.user_id);
      });

      const dailyStats: DailyStats[] = Object.entries(byDate)
        .map(([date, data]) => ({
          date,
          spins: data.spins,
          winnings: data.winnings,
          bets: data.bets,
          rtp: data.bets > 0 ? (data.winnings / data.bets) * 100 : 0,
          players: data.players.size,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Aggregate winnings by user for top winners
      const userWinnings: Record<string, number> = {};
      records.forEach((r) => {
        userWinnings[r.user_id] = (userWinnings[r.user_id] || 0) + Number(r.win_amount) + Number(r.bonus_win_amount);
      });

      const sortedUsers = Object.entries(userWinnings)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

      const topWinnerIds = sortedUsers.map(([id]) => id);
      let profilesMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {};

      if (topWinnerIds.length > 0) {
        // Admin stats can still use profiles table due to admin RLS policy
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

      // Calculate combined all-time totals (archived + current)
      const allTimeSpins = archived.total_spins + totalSpins;
      const allTimeWinnings = archived.total_winnings + totalWinnings;
      const allTimeBets = archived.total_bets + totalBets;
      const allTimeBiggestWin = Math.max(archived.biggest_win, biggestWin);
      const allTimeBonuses = archived.total_bonuses + totalBonuses;

      return {
        totalSpins,
        totalWinnings,
        biggestWin,
        uniquePlayers,
        totalBets,
        avgWinPerSpin,
        dailyStats,
        topWinners,
        archived,
        allTimeSpins,
        allTimeWinnings,
        allTimeBets,
        allTimeBiggestWin,
        allTimeBonuses,
      };
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
}
