import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, ChevronDown, Trophy, Rocket } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BonusHuntSlotPopoverContent } from "./BonusHuntSlotInfoDialog";
import { useProviderOverrides, useSlotCatalogMap } from "@/hooks/useSlotCatalog";
import { useBonusHuntSlotRequesters } from "@/hooks/useSlotRequests";
import type { BonusHuntSlot } from "@/hooks/useBonusHuntData";

const PROVIDER_SLUG_MAP: Record<string, string> = {
  'netent': 'netent',
  'pragmatic play': 'pragmatic-play',
  'relax gaming': 'relax-gaming',
  "play'n go": 'play-n-go',
  'play n go': 'play-n-go',
  'hacksaw gaming': 'hacksaw-gaming',
  'nolimit city': 'nolimit-city',
  'yggdrasil': 'yggdrasil',
  'yggdrasil gaming': 'yggdrasil',
  'microgaming': 'microgaming',
  'red tiger': 'red-tiger',
  'red tiger gaming': 'red-tiger',
  'big time gaming': 'big-time-gaming',
  'elk studios': 'elk-studios',
  'evolution gaming': 'evolution-gaming',
  'evolution': 'evolution-gaming',
};

function getProviderSlug(provider: string): string | null {
  return PROVIDER_SLUG_MAP[provider.toLowerCase()] ?? null;
}

function getSlotSlug(slotName: string): string {
  return slotName
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9æøå]+/g, '-')
    .replace(/^-|-$/g, '');
}

interface Props {
  slots: BonusHuntSlot[];
  huntNumber?: number;
}

type SortKey = 'index' | 'slot' | 'bet' | 'multiplier' | 'win';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 6;

function MultiplierBadge({ value }: { value: number }) {
  let colorClass = "text-foreground";
  let glowClass = "";
  if (value >= 100) {
    colorClass = "text-green-500";
    glowClass = "drop-shadow-[0_0_4px_rgb(34,197,94,0.4)]";
  } else if (value <= 20 && value > 0) {
    colorClass = "text-red-400";
  } else if (value === 0) {
    colorClass = "text-muted-foreground";
  }
  return (
    <span className={`font-semibold ${colorClass} ${glowClass}`}>
      {value.toFixed(2)}x
    </span>
  );
}

function WinBadge({ win, multiplier }: { win: number; multiplier: number }) {
  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toFixed(2);
  const showTrophy = win >= 500;
  const showRocket = multiplier >= 200;

  return (
    <span className={`inline-flex items-center gap-1 ${win >= 100 ? 'font-semibold text-green-500' : ''}`}>
      {formatNum(win)} kr
      {showTrophy && <Trophy className="h-3 w-3 text-amber-400" />}
      {showRocket && <Rocket className="h-3 w-3 text-primary" />}
    </span>
  );
}

export function BonusHuntSlotTable({ slots, huntNumber }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('index');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const expanded = false; // no longer used for expand/collapse

  const { data: overrides } = useProviderOverrides();
  const { data: catalogData } = useSlotCatalogMap();
  const { data: requesterMap } = useBonusHuntSlotRequesters(huntNumber);
  const catalogProviderMap = catalogData?.providerMap;
  const catalogNameMap = catalogData?.nameMap;

  const overrideMap = useMemo(() => {
    const map = new Map<string, string>();
    overrides?.forEach(o => map.set(o.slot_name.toLowerCase(), o.provider_override));
    return map;
  }, [overrides]);

  const slotsWithOverrides = useMemo(() => {
    return slots.map(s => {
      const key = s.slot.toLowerCase();
      let provider = s.provider;
      let slotName = s.slot;
      if (catalogNameMap?.has(key)) slotName = catalogNameMap.get(key)!;
      if (provider === 'Custom Slot') {
        if (overrideMap.has(key)) provider = overrideMap.get(key)!;
        else if (catalogProviderMap?.has(key)) provider = catalogProviderMap.get(key)!;
      }
      return { ...s, slot: slotName, provider };
    });
  }, [slots, overrideMap, catalogProviderMap, catalogNameMap]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return slotsWithOverrides
      .map((s, i) => ({ ...s, index: i + 1 }))
      .filter(s => !q || s.slot.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
  }, [slotsWithOverrides, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'index': cmp = a.index - b.index; break;
        case 'slot': cmp = a.slot.localeCompare(b.slot); break;
        case 'bet': cmp = a.bet - b.bet; break;
        case 'multiplier': cmp = a.multiplier - b.multiplier; break;
        case 'win': cmp = a.win - b.win; break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageSlots = sorted; // show all, scroll handles overflow

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Find Slot eller Provider"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          className="pl-9 rounded-xl"
        />
      </div>

      {/* Table */}
      <div className="border border-border rounded-2xl overflow-hidden">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 sticky top-0 z-10">
              <tr>
                {(['index', 'slot', 'bet', 'multiplier', 'win'] as SortKey[]).map(key => (
                  <th
                    key={key}
                    className="px-3 py-2.5 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors text-xs"
                    onClick={() => toggleSort(key)}
                  >
                    <span className="flex items-center gap-1">
                      {key === 'index' ? '#' : key === 'multiplier' ? 'X' : key.charAt(0).toUpperCase() + key.slice(1)}
                      <ArrowUpDown className="h-3 w-3" />
                    </span>
                  </th>
                ))}
                <th className="px-3 py-2.5 text-left font-medium text-muted-foreground text-xs hidden sm:table-cell">
                  Requested By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pageSlots.map(slot => (
                <tr key={slot.index} className={`hover:bg-muted/30 transition-colors ${slot.opened ? '' : 'opacity-60'}`}>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{slot.index}</td>
                  <td className="px-3 py-2">
                    <div>
                      <div className="font-medium text-sm flex items-center gap-1.5">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="text-left hover:underline cursor-pointer">
                              {slot.slot}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent side="right" align="start" className="w-auto p-0 border-0 bg-transparent shadow-none">
                            <BonusHuntSlotPopoverContent slotName={slot.slot} />
                          </PopoverContent>
                        </Popover>
                        {slot.multiplier >= 100 && slot.opened && <Trophy className="h-3 w-3 text-amber-400" />}
                      </div>
                      <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                        {(() => {
                          const provSlug = getProviderSlug(slot.provider);
                          return provSlug ? (
                            <Link
                              to={`/spiludviklere/${provSlug}`}
                              className="inline-block rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium hover:text-primary transition-colors"
                            >
                              {slot.provider}
                            </Link>
                          ) : (
                            <span className="inline-block rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium">{slot.provider}</span>
                          );
                        })()}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">{slot.bet.toFixed(2)} kr</td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {slot.opened ? <MultiplierBadge value={slot.multiplier} /> : <MultiplierBadge value={0} />}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {slot.opened ? <WinBadge win={slot.win} multiplier={slot.multiplier} /> : <WinBadge win={0} multiplier={0} />}
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground hidden sm:table-cell">
                    {requesterMap?.get(slot.slot.toLowerCase()) || ''}
                  </td>
                </tr>
              ))}
              {pageSlots.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-8 text-center text-muted-foreground">Ingen slots fundet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slot count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{filtered.length} slots</span>
      </div>
    </div>
  );
}
