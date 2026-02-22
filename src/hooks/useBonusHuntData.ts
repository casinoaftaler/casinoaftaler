import { useQuery } from "@tanstack/react-query";

export interface BonusHuntSlot {
  slot: string;
  provider: string;
  bet: number;
  multiplier: number;
  win: number;
  opened: boolean;
}

export interface BonusHuntData {
  id: string;
  visibleId: number;
  date: string;
  status: string;
  slots: BonusHuntSlot[];
  stats: {
    totalBonuses: number;
    openedBonuses: number;
    startBalance: number;
    endBalance: number | null;
    targetBalance: number;
    averageBet: number;
    averageX: number | null;
    breakEvenX: number;
    highestWin: number;
    highestMultiplier: number;
    huntStart: string | null;
    huntDuration: number | null;
    openingStart: string | null;
    openingDuration: number | null;
    bonusHuntEnd: string | null;
    totalDuration: number | null;
  };
}

async function fetchBonusHuntData(huntId?: number): Promise<BonusHuntData> {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const url = new URL(`https://${projectId}.supabase.co/functions/v1/bonus-hunt-proxy`);
  if (huntId) url.searchParams.set('huntId', String(huntId));

  const response = await fetch(url.toString(), {
    headers: { 'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
  });

  if (!response.ok) throw new Error('Failed to fetch bonus hunt data');
  const raw = await response.json();

  // The API returns { data: { slots: [...], id, visibleId, ... } }
  const huntData = raw.data || raw;
  const rawSlots = huntData.slots || [];

  const slots: BonusHuntSlot[] = rawSlots.map((s: any) => {
    const bet = s.bet || 0;
    const win = s.win || 0;
    const multiplier = bet > 0 && s.played ? win / bet : 0;
    return {
      slot: s.slot?.name || 'Unknown',
      provider: s.slot?.provider || 'Custom Slot',
      bet,
      multiplier: Math.round(multiplier * 100) / 100,
      win,
      opened: s.played ?? false,
    };
  });

  const openedSlots = slots.filter(s => s.opened);
  const totalBets = slots.reduce((sum, s) => sum + s.bet, 0);
  const avgBet = slots.length > 0 ? totalBets / slots.length : 0;
  const totalWins = openedSlots.reduce((sum, s) => sum + s.win, 0);

  const multipliersOpen = openedSlots.filter(s => s.multiplier > 0);
  const avgX = multipliersOpen.length > 0
    ? multipliersOpen.reduce((sum, s) => sum + s.multiplier, 0) / multipliersOpen.length
    : null;

  const startBalance = huntData.start || totalBets;
  const breakEvenX = totalBets > 0 ? startBalance / totalBets : 0;

  const endVal = huntData.end || null;

  // Parse visibleId from name field (e.g. "Bonus Hunt #1367" -> 1367)
  const parsedVisibleId = huntData.visibleId
    || (huntData.name ? parseInt(huntData.name.replace(/\D/g, ''), 10) || 0 : 0);

  return {
    id: huntData.id || '',
    visibleId: parsedVisibleId,
    date: huntData.createdAt ? new Date(huntData.createdAt * 1000).toISOString() : '',
    status: huntData.played ? 'completed' : 'active',
    slots,
    stats: {
      totalBonuses: slots.length,
      openedBonuses: openedSlots.length,
      startBalance: startBalance,
      endBalance: endVal,
      targetBalance: huntData.targetBalance || 0,
      averageBet: Math.round(avgBet * 100) / 100,
      averageX: avgX ? Math.round(avgX * 100) / 100 : null,
      breakEvenX: Math.round(breakEvenX * 100) / 100,
      highestWin: openedSlots.length > 0 ? Math.max(...openedSlots.map(s => s.win)) : 0,
      highestMultiplier: openedSlots.length > 0 ? Math.max(...openedSlots.map(s => s.multiplier)) : 0,
      huntStart: huntData.huntStart || null,
      huntDuration: huntData.huntDuration || null,
      openingStart: huntData.openingStart || null,
      openingDuration: huntData.openingDuration || null,
      bonusHuntEnd: huntData.bonusHuntEnd || null,
      totalDuration: huntData.totalDuration || null,
    },
  };
}

export function useBonusHuntData(huntId?: number) {
  return useQuery({
    queryKey: ['bonus-hunt-data', huntId],
    queryFn: () => fetchBonusHuntData(huntId),
    refetchInterval: 30000,
    staleTime: 15000,
  });
}
