import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BonusHuntSlotPopoverContent } from "./BonusHuntSlotInfoDialog";
import { useProviderOverrides, useSlotCatalogMap } from "@/hooks/useSlotCatalog";
import type { BonusHuntSlot } from "@/hooks/useBonusHuntData";

interface Props {
  slots: BonusHuntSlot[];
}

type SortKey = 'index' | 'slot' | 'bet' | 'multiplier' | 'win';
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 10;

export function BonusHuntSlotTable({ slots }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('index');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [expanded, setExpanded] = useState(false);

  const { data: overrides } = useProviderOverrides();
  const { data: catalogData } = useSlotCatalogMap();
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
  const pageSlots = expanded ? sorted : sorted.slice(0, PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toFixed(2);

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
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {pageSlots.map(slot => (
              <tr key={slot.index} className={`hover:bg-muted/30 transition-colors ${slot.opened ? '' : 'opacity-60'}`}>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{slot.index}</td>
                <td className="px-3 py-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-left hover:underline cursor-pointer">
                        <div className="font-medium text-sm">{slot.slot}</div>
                        <div className="text-xs text-muted-foreground">{slot.provider}</div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-auto p-0 border-0 bg-transparent shadow-none">
                      <BonusHuntSlotPopoverContent slotName={slot.slot} />
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="px-3 py-2 font-mono text-xs">{slot.bet.toFixed(2)} kr</td>
                <td className="px-3 py-2 font-mono text-xs">
                  {slot.opened ? (
                    <span className={`font-semibold ${slot.multiplier >= 100 ? 'text-green-500' : slot.multiplier <= 20 ? 'text-red-500' : 'text-foreground'}`}>
                      {slot.multiplier.toFixed(2)}x
                    </span>
                  ) : '—'}
                </td>
                <td className="px-3 py-2 font-mono text-xs">
                  {slot.opened ? (
                    <span className={slot.win >= 100 ? 'font-semibold text-green-500' : ''}>
                      {formatNum(slot.win)} kr
                    </span>
                  ) : '—'}
                </td>
              </tr>
            ))}
            {pageSlots.length === 0 && (
              <tr><td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">Ingen slots fundet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Expand / Pagination */}
      {!search && sorted.length > PAGE_SIZE && !expanded && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setExpanded(true)}
            className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 hover:scale-[1.03] transition-all duration-200 gap-1.5"
          >
            Se alle {sorted.length} slots
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {(expanded || !!search) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length} slots</span>
          {!expanded && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span>{page + 1} / {totalPages}</span>
              <Button variant="ghost" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
