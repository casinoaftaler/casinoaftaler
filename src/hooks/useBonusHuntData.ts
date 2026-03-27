import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    totalWinnings: number;
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

const BLOCKED_HUNTS = new Set<number>();

function parseHuntResponse(raw: any): BonusHuntData {
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
  const totalWinnings = openedSlots.reduce((sum, s) => sum + s.win, 0);

  const multipliersOpen = openedSlots.filter(s => s.multiplier > 0);
  const avgX = multipliersOpen.length > 0
    ? multipliersOpen.reduce((sum, s) => sum + s.multiplier, 0) / multipliersOpen.length
    : null;

  const startBalance = huntData.start || totalBets;
  const breakEvenX = totalBets > 0 ? startBalance / totalBets : 0;
  // End Balance = sum of all winnings (not the API's "end" field which is balance when bonuses are opened)
  const endVal = totalWinnings > 0 ? totalWinnings : null;

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
      startBalance,
      endBalance: endVal,
      totalWinnings,
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

function buildProxyUrl(huntId?: number, archived?: boolean) {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const url = new URL(`https://${projectId}.supabase.co/functions/v1/bonus-hunt-proxy`);

  if (huntId) {
    url.searchParams.set('huntId', String(huntId));
  }

  if (archived) {
    url.searchParams.set('archive', 'true');
  }

  return url;
}

async function proxyFetch(url: URL): Promise<BonusHuntData> {
  const response = await fetch(url.toString(), {
    headers: { 'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
  });

  if (!response.ok) throw new Error('Failed to fetch bonus hunt data');
  const raw = await response.json();
  return parseHuntResponse(raw);
}

function getLatestAllowedHunt(latestHuntNumber: number) {
  let candidate = latestHuntNumber;
  while (candidate > 1 && BLOCKED_HUNTS.has(candidate)) {
    candidate -= 1;
  }
  return candidate;
}

async function fetchLatestArchivedHunt(latestHuntNumber?: number): Promise<BonusHuntData | null> {
  if (!latestHuntNumber) return null;

  const fallbackHuntId = getLatestAllowedHunt(latestHuntNumber);
  if (fallbackHuntId <= 1) return null;

  try {
    return await proxyFetch(buildProxyUrl(fallbackHuntId, true));
  } catch {
    return null;
  }
}

function createPendingLiveHuntData(huntNumber: number): BonusHuntData {
  const now = new Date().toISOString();
  return {
    id: '',
    visibleId: huntNumber,
    date: now,
    status: 'active',
    slots: [],
    stats: {
      totalBonuses: 0,
      openedBonuses: 0,
      startBalance: 0,
      endBalance: null,
      targetBalance: 0,
      averageBet: 0,
      averageX: null,
      breakEvenX: 0,
      highestWin: 0,
      highestMultiplier: 0,
      huntStart: null,
      huntDuration: null,
      openingStart: null,
      openingDuration: null,
      bonusHuntEnd: null,
      totalDuration: null,
    },
  };
}

async function fetchBonusHuntData(huntId?: number, latestHuntNumber?: number): Promise<BonusHuntData> {
  const resolvedHuntId = huntId && BLOCKED_HUNTS.has(huntId)
    ? (latestHuntNumber ? getLatestAllowedHunt(latestHuntNumber) : undefined)
    : huntId;

  try {
    const isArchivedRequest = Boolean(
      resolvedHuntId && latestHuntNumber && resolvedHuntId <= latestHuntNumber
    );

    const directData = await proxyFetch(
      buildProxyUrl(resolvedHuntId, isArchivedRequest)
    );

    // If we got data with slots, return it
    if (directData.stats.totalBonuses > 0) {
      return directData;
    }

    // If this is a live/active hunt (above latest archived), show empty state – don't fall back
    if (directData.status === 'active' || (resolvedHuntId && latestHuntNumber && resolvedHuntId > latestHuntNumber)) {
      return directData;
    }

    // If a specific past hunt was requested but has no slots, try latest archived
    if (latestHuntNumber) {
      const archivedFallback = await fetchLatestArchivedHunt(latestHuntNumber);
      if (archivedFallback) return archivedFallback;
    }

    return directData;
  } catch (error) {
    // On any proxy failure, fall back to latest archived hunt
    const archivedFallback = await fetchLatestArchivedHunt(latestHuntNumber);
    if (archivedFallback) return archivedFallback;
    throw error;
  }
}

async function fetchLatestHuntNumber(): Promise<number> {
  // Return the latest COMPLETED archived hunt number.
  // Active hunts in archives should not count as "latest archived" –
  // otherwise the live hunt gets treated as a past hunt.
  const { data: archiveLatest } = await supabase
    .from('bonus_hunt_archives')
    .select('hunt_number')
    .neq('hunt_status', 'active')
    .order('hunt_number', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (archiveLatest?.hunt_number) return archiveLatest.hunt_number;

  const { data: sessionLatest } = await supabase
    .from('bonus_hunt_sessions')
    .select('hunt_number')
    .eq('status', 'completed')
    .order('hunt_number', { ascending: false })
    .limit(1)
    .maybeSingle();

  return sessionLatest?.hunt_number || 1;
}

async function fetchDocumentedHuntCount(): Promise<number> {
  const { count: archiveCount } = await supabase
    .from('bonus_hunt_archives')
    .select('*', { count: 'exact', head: true })
    .gt('total_slots', 0)
    .not('hunt_number', 'in', `(${[...BLOCKED_HUNTS].join(',')})`);

  if ((archiveCount || 0) > 0) return archiveCount || 0;

  const { count: sessionCount } = await supabase
    .from('bonus_hunt_sessions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')
    .gte('hunt_number', 2);

  return sessionCount || 0;
}

export function useBonusHuntData(huntId?: number) {
  const { data: latestHuntNumber } = useQuery({
    queryKey: ['bonus-hunt-latest-number'],
    queryFn: fetchLatestHuntNumber,
    staleTime: 60000,
  });

  // Any explicitly set huntId that exists in archives is a past hunt
  const isPastHunt = !!(huntId && latestHuntNumber && huntId <= latestHuntNumber);

  return useQuery({
    queryKey: ['bonus-hunt-data', huntId, isPastHunt ? 'archived' : 'live'],
    queryFn: () => fetchBonusHuntData(huntId, latestHuntNumber),
    enabled: latestHuntNumber !== undefined,
    refetchInterval: isPastHunt ? false : 30000,
    staleTime: isPastHunt ? 300000 : 15000,
    placeholderData: (prev) => prev,
  });
}

export function useLatestHuntNumber() {
  return useQuery({
    queryKey: ['bonus-hunt-latest-number'],
    queryFn: fetchLatestHuntNumber,
    staleTime: 60000,
  });
}

export function useDocumentedHuntCount() {
  return useQuery({
    queryKey: ['bonus-hunt-documented-count'],
    queryFn: fetchDocumentedHuntCount,
    staleTime: 60000,
  });
}

export function useArchivedHuntNumbers() {
  return useQuery({
    queryKey: ['bonus-hunt-archived-numbers'],
    queryFn: async () => {
      const { data } = await supabase
        .from('bonus_hunt_archives')
        .select('hunt_number')
        .gt('total_slots', 0)
        .order('hunt_number', { ascending: false });
      return (data || []).map(r => r.hunt_number);
    },
    staleTime: 60000,
  });
}
