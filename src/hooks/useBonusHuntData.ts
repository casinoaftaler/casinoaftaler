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

  const multipliersOpen = openedSlots.filter(s => s.multiplier > 0);
  const avgX = multipliersOpen.length > 0
    ? multipliersOpen.reduce((sum, s) => sum + s.multiplier, 0) / multipliersOpen.length
    : null;

  const startBalance = huntData.start || totalBets;
  const breakEvenX = totalBets > 0 ? startBalance / totalBets : 0;
  const endVal = huntData.end || null;

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

async function fetchBonusHuntData(huntId?: number, latestHuntNumber?: number): Promise<BonusHuntData> {
  const resolvedHuntId = huntId && BLOCKED_HUNTS.has(huntId)
    ? (latestHuntNumber ? getLatestAllowedHunt(latestHuntNumber) : undefined)
    : huntId;

  try {
    const directData = await proxyFetch(
      buildProxyUrl(resolvedHuntId, Boolean(resolvedHuntId && latestHuntNumber))
    );

    if (resolvedHuntId || !latestHuntNumber) {
      // If a specific hunt resolves but has no slots, fall back to latest archived hunt
      if (latestHuntNumber && directData.stats.totalBonuses === 0) {
        const archivedFallback = await fetchLatestArchivedHunt(latestHuntNumber);
        if (archivedFallback) return archivedFallback;
      }
      return directData;
    }

    // If live endpoint has no slot data, show the latest archived hunt instead
    if (directData.stats.totalBonuses === 0) {
      const archivedFallback = await fetchLatestArchivedHunt(latestHuntNumber);
      if (archivedFallback) return archivedFallback;
    }

    if (!BLOCKED_HUNTS.has(directData.visibleId)) {
      return directData;
    }

    const archivedFallback = await fetchLatestArchivedHunt(latestHuntNumber);
    return archivedFallback ?? directData;
  } catch (error) {
    // On any proxy failure, fall back to latest archived hunt
    const archivedFallback = await fetchLatestArchivedHunt(latestHuntNumber);
    if (archivedFallback) return archivedFallback;
    throw error;
  }
}

async function fetchLatestHuntNumber(): Promise<number> {
  const { data: archiveLatest } = await supabase
    .from('bonus_hunt_archives')
    .select('hunt_number')
    .order('hunt_number', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (archiveLatest?.hunt_number) return archiveLatest.hunt_number;

  const { data: sessionLatest } = await supabase
    .from('bonus_hunt_sessions')
    .select('hunt_number')
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
