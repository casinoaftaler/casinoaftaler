import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BonusHuntSlotPopoverContent } from "./BonusHuntSlotInfoDialog";
import { useProviderOverrides, useSlotCatalogMap } from "@/hooks/useSlotCatalog";
import type { BonusHuntSlot } from "@/hooks/useBonusHuntData";

interface Props {
  slots: BonusHuntSlot[];
  huntNumber: number;
  huntDate: string;
  latestHuntNumber: number;
  maxHuntNumber: number;
  onNavigate?: (direction: 'first' | 'prev' | 'next' | 'last') => void;
  onJumpToHunt?: (huntNumber: number) => void;
}

type SortKey = 'index' | 'slot' | 'bet' | 'multiplier' | 'win';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 10;

export function BonusHuntSlotTable({ slots, huntNumber, huntDate, latestHuntNumber, maxHuntNumber, onNavigate, onJumpToHunt }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('index');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  

  const { data: overrides } = useProviderOverrides();
  const { data: catalogData } = useSlotCatalogMap();
  const catalogProviderMap = catalogData?.providerMap;
  const catalogNameMap = catalogData?.nameMap;

  // Build override lookup map
  const overrideMap = useMemo(() => {
    const map = new Map<string, string>();
    overrides?.forEach(o => map.set(o.slot_name.toLowerCase(), o.provider_override));
    return map;
  }, [overrides]);

  // Apply provider overrides + slot_catalog fallback to slots, and override slot name from catalog
  const slotsWithOverrides = useMemo(() => {
    return slots.map(s => {
      const key = s.slot.toLowerCase();
      let provider = s.provider;
      let slotName = s.slot;

      // Override slot name from catalog if available
      if (catalogNameMap?.has(key)) {
        slotName = catalogNameMap.get(key)!;
      }

      if (provider === 'Custom Slot') {
        // 1. Check manual provider overrides first
        if (overrideMap.has(key)) {
          provider = overrideMap.get(key)!;
        }
        // 2. Fall back to slot_catalog provider
        else if (catalogProviderMap?.has(key)) {
          provider = catalogProviderMap.get(key)!;
        }
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
  const pageSlots = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toFixed(2);

  return (
    <div className="flex flex-col gap-3">
      {/* Hunt navigation */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('first')}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('prev')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Select
          value={String(huntNumber)}
          onValueChange={(val) => {
            const num = parseInt(val, 10);
            onJumpToHunt?.(num);
          }}
        >
          <SelectTrigger className="w-auto min-w-[200px] h-8 text-sm font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {Array.from({ length: maxHuntNumber }, (_, i) => maxHuntNumber - i).map(num => (
              <SelectItem key={num} value={String(num)}>
                BONUS HUNT #{num} {num === huntNumber ? huntDate : ''} {num > latestHuntNumber ? '🔴 LIVE' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('next')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onNavigate?.('last')}>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Find Slot eller Provider"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {(['index', 'slot', 'bet', 'multiplier', 'win'] as SortKey[]).map(key => (
                <th
                  key={key}
                  className="px-3 py-2 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => toggleSort(key)}
                >
                  <span className="flex items-center gap-1">
                    {key === 'index' ? '#' : key === 'multiplier' ? 'X' : key.charAt(0).toUpperCase() + key.slice(1)}
                    <ArrowUpDown className="h-3 w-3" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pageSlots.map(slot => (
              <tr key={slot.index} className={`hover:bg-muted/30 ${slot.opened ? '' : 'opacity-60'}`}>
                <td className="px-3 py-2 font-mono text-xs">{slot.index}</td>
                <td className="px-3 py-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-left hover:underline cursor-pointer">
                        <div className="font-medium">{slot.slot}</div>
                        <div className="text-xs text-muted-foreground">{slot.provider}</div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-auto p-0 border-0 bg-transparent shadow-none">
                      <BonusHuntSlotPopoverContent slotName={slot.slot} />
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="px-3 py-2 font-mono">{slot.bet.toFixed(2)} kr</td>
                <td className="px-3 py-2 font-mono">
                  {slot.opened ? (
                    <span className={slot.multiplier >= 100 ? 'text-green-500' : slot.multiplier <= 20 ? 'text-red-500' : 'text-foreground'}>
                      {slot.multiplier.toFixed(2)}x
                    </span>
                  ) : '—'}
                </td>
                <td className="px-3 py-2 font-mono">
                  {slot.opened ? `${formatNum(slot.win)} kr` : '—'}
                </td>
              </tr>
            ))}
            {pageSlots.length === 0 && (
              <tr><td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">Ingen slots fundet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{filtered.length} slots</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <span>{page + 1} / {totalPages}</span>
          <Button variant="ghost" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
