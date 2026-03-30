import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Maps all known casino_name variants to their canonical slug */
const CASINO_NAME_MAP: Record<string, string> = {
  campobet: "campobet",
  "campo bet": "campobet",
  spilleautomaten: "spilleautomaten",
  spilautomat: "spilleautomaten",
  spildansknu: "spildansknu",
  "spildansknu!": "spildansknu",
  spildansk: "spildansknu",
  "casinoaftaler.dk": "spildansknu",
  casino999: "casino999",
  "999": "casino999",
  comeon: "comeon",
  videoslots: "videoslots",
  spilleboden: "spilleboden",
  betit: "betit",
};

function resolveSlug(casinoName: string): string {
  return CASINO_NAME_MAP[casinoName.toLowerCase()] ?? casinoName.toLowerCase();
}

export interface SlotPerformance {
  name: string;
  bestX: number;
  provider?: string;
}

export interface CasinoHuntStats {
  totalHunts: number;
  avgX: number;
  bestHuntX: number;
  bestSlotX: number;
  bestSlotName: string;
  totalStartBalance: number;
  totalEndBalance: number;
  profitLossPercent: number;
  topSlots: SlotPerformance[];
}

export function useCasinoHuntStats(casinoSlug: string | undefined) {
  return useQuery({
    queryKey: ["casino-hunt-stats", casinoSlug],
    enabled: !!casinoSlug,
    staleTime: 1000 * 60 * 30, // 30 min cache
    queryFn: async (): Promise<CasinoHuntStats | null> => {
      if (!casinoSlug) return null;

      const { data: archives, error } = await supabase
        .from("bonus_hunt_archives")
        .select("casino_name, average_x, start_balance, end_balance, api_data")
        .not("casino_name", "is", null);

      if (error || !archives) return null;

      // Filter archives matching this casino slug
      const matching = archives.filter(
        (a) => a.casino_name && resolveSlug(a.casino_name) === casinoSlug
      );

      if (matching.length === 0) return null;

      const totalHunts = matching.length;
      const avgX = matching.reduce((sum, a) => sum + (Number(a.average_x) || 0), 0) / totalHunts;
      const bestHuntX = Math.max(...matching.map((a) => Number(a.average_x) || 0));
      const totalStartBalance = matching.reduce((sum, a) => sum + (Number(a.start_balance) || 0), 0);
      const totalEndBalance = matching.reduce((sum, a) => sum + (Number(a.end_balance) || 0), 0);
      const profitLossPercent = totalStartBalance > 0
        ? ((totalEndBalance - totalStartBalance) / totalStartBalance) * 100
        : 0;

      // Extract top slots from api_data with provider info
      const slotMap = new Map<string, { bestX: number; provider?: string }>();

      for (const archive of matching) {
        const apiData = archive.api_data as any;
        const slots = apiData?.slots;
        if (!Array.isArray(slots)) continue;

        for (const s of slots) {
          if (!s.played || !s.win || !s.bet) continue;
          const win = Number(s.win);
          const bet = Number(s.bet);
          if (bet <= 0 || win <= 0) continue;
          const x = win / bet;
          const name = s.slot?.name || s.name;
          if (!name) continue;
          const provider = s.slot?.provider || s.provider || undefined;
          const existing = slotMap.get(name);
          if (!existing || x > existing.bestX) {
            slotMap.set(name, { bestX: x, provider: provider || existing?.provider });
          }
        }
      }

      const topSlots = [...slotMap.entries()]
        .sort((a, b) => b[1].bestX - a[1].bestX)
        .slice(0, 5)
        .map(([name, data]) => ({
          name,
          bestX: Math.round(data.bestX * 10) / 10,
          provider: data.provider,
        }));

      // Best single slot hit
      const bestSlotEntry = topSlots[0];
      const bestSlotX = bestSlotEntry?.bestX ?? 0;
      const bestSlotName = bestSlotEntry?.name ?? "";

      return {
        totalHunts,
        avgX: Math.round(avgX * 100) / 100,
        bestHuntX: Math.round(bestHuntX * 100) / 100,
        bestSlotX,
        bestSlotName,
        totalStartBalance: Math.round(totalStartBalance),
        totalEndBalance: Math.round(totalEndBalance),
        profitLossPercent: Math.round(profitLossPercent * 10) / 10,
        topSlots,
      };
    },
  });
}
