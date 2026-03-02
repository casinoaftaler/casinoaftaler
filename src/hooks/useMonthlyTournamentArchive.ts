import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ArchiveEntry {
  id: string;
  month: string;
  category: string;
  winner_user_id: string;
  winner_display_name: string;
  winner_avatar_url: string | null;
  winning_value: number;
  top_entries: {
    rank: number;
    user_id: string;
    display_name: string;
    avatar_url: string | null;
    value: number;
    total_spins: number;
    total_bonuses: number;
  }[];
}

export function useMonthlyTournamentArchive(limit = 3) {
  return useQuery({
    queryKey: ["monthly-tournament-archive", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("monthly_tournament_archives")
        .select("*")
        .order("month", { ascending: false })
        .limit(limit * 3); // 3 categories per month

      if (error) throw error;

      // Group by month
      const grouped = new Map<string, ArchiveEntry[]>();
      for (const row of (data || []) as unknown as ArchiveEntry[]) {
        const existing = grouped.get(row.month) || [];
        existing.push(row);
        grouped.set(row.month, existing);
      }

      return Array.from(grouped.entries()).map(([month, entries]) => ({
        month,
        entries,
      }));
    },
    staleTime: 60000,
  });
}
