import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, Pencil, Search, Loader2, Check, ChevronsUpDown, Database, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  useSlotCatalog,
  useCreateSlotCatalogEntry,
  useUpdateSlotCatalogEntry,
  useDeleteSlotCatalogEntry,
  useProviderOverrides,
  useCreateProviderOverride,
  useDeleteProviderOverride,
  type SlotCatalogEntry,
} from "@/hooks/useSlotCatalog";

const SEED_PROVIDERS = [
  "Pragmatic Play", "NetEnt", "Microgaming", "Playtech", "Thunderkick",
  "Play'n GO", "Red Tiger Gaming", "Big Time Gaming", "Betsoft",
  "Blueprint Gaming", "Relax Gaming", "Push Gaming", "ELK Studios",
  "Quickspin", "Yggdrasil Gaming", "Nolimit City", "Hacksaw Gaming",
];

export function SlotCatalogAdminSection() {
  return (
    <div className="space-y-8">
      <ArchetypeClassificationSection />
      <SeedDatabaseSection />
      <ProviderOverridesSection />
      <SlotCatalogSection />
    </div>
  );
}

// ── Archetype Classification ──
const ARCHETYPE_COLORS: Record<string, string> = {
  "stats-heavy": "bg-green-500/20 text-green-400 border-green-500/30",
  "community-driven": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "comparison": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "minimal": "bg-muted text-muted-foreground border-border",
};

function ArchetypeClassificationSection() {
  const [running, setRunning] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [enrichResult, setEnrichResult] = useState<{ enriched: number; total: number; results?: any[] } | null>(null);
  const [distribution, setDistribution] = useState<Record<string, number> | null>(null);
  const { data: slots } = useSlotCatalog();

  // Compute current distribution from loaded data
  useEffect(() => {
    if (!slots) return;
    const counts: Record<string, number> = {};
    let enrichedCount = 0;
    slots.forEach((s) => {
      const arch = (s as any).content_archetype || "uklassificeret";
      counts[arch] = (counts[arch] || 0) + 1;
      if ((s as any).enriched_analysis) enrichedCount++;
    });
    counts["_enriched"] = enrichedCount;
    setDistribution(counts);
  }, [slots]);

  const runClassification = async () => {
    setRunning(true);
    try {
      const { error } = await supabase.rpc("classify_slot_archetypes" as any);
      if (error) throw error;
      // Refresh slot data to recompute distribution
      window.location.reload();
    } catch (err: any) {
      toast.error("Fejl: " + (err.message || "Ukendt fejl"));
      setRunning(false);
    }
  };

  const runEnrichment = async () => {
    setEnriching(true);
    setEnrichResult(null);
    let totalEnriched = 0;
    let allResults: any[] = [];
    let remaining = 999;
    let batchNum = 0;

    try {
      while (remaining > 0) {
        batchNum++;
        toast.info(`Batch ${batchNum} kører... (${totalEnriched} færdige)`);
        
        const res = await supabase.functions.invoke("slot-enrich-analysis", {
          body: { limit: 30 },
        });
        if (res.error) throw res.error;
        
        const result = res.data as { enriched: number; total: number; remaining: number; results?: any[] };
        totalEnriched += result.enriched;
        remaining = result.remaining ?? 0;
        if (result.results) allResults = [...allResults, ...result.results];
        
        setEnrichResult({ enriched: totalEnriched, total: totalEnriched + remaining, results: allResults });

        // Stop if nothing was enriched (all rate-limited or errors)
        if (result.enriched === 0) {
          toast.warning("Ingen slots beriget i denne batch – stopper.");
          break;
        }

        // Pause between batches to avoid rate limits
        if (remaining > 0) {
          await new Promise(r => setTimeout(r, 2000));
        }
      }
      
      toast.success(`Færdig! ${totalEnriched} slots beriget i alt.`);
    } catch (err: any) {
      toast.error("Fejl: " + (err.message || "Ukendt fejl"));
    } finally {
      setEnriching(false);
    }
  };

  const total = distribution ? Object.values(distribution).filter((_, i) => true).reduce((a, b) => a + b, 0) - (distribution["_enriched"] || 0) : 0;
  const enrichedCount = distribution?.["_enriched"] || 0;
  const statsHeavyCount = distribution?.["stats-heavy"] || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Arketype-klassificering & AI-berigelse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Klassificer slots i 4 arketyper, og berig stats-heavy slots med unik AI-genereret analyse.
        </p>

        {distribution && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {["stats-heavy", "community-driven", "comparison", "minimal", "uklassificeret"].map((arch) => {
              const count = distribution[arch] || 0;
              const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0";
              return (
                <div key={arch} className="rounded-lg border p-3 text-center space-y-1">
                  <Badge variant="outline" className={ARCHETYPE_COLORS[arch] || ""}>
                    {arch}
                  </Badge>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-xs text-muted-foreground">{pct}%</div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={runClassification} disabled={running || enriching}>
            {running ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            {running ? "Klassificerer..." : "Kør klassificering"}
          </Button>

          <Button onClick={runEnrichment} disabled={enriching || running} variant="secondary">
            {enriching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Database className="h-4 w-4 mr-2" />}
            {enriching ? "Beriger..." : `Berig testgruppe (top 25 stats-heavy)`}
          </Button>
        </div>

        {enrichedCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {enrichedCount} slots har allerede AI-beriget analyse ({statsHeavyCount > 0 ? `${statsHeavyCount - enrichedCount} stats-heavy mangler` : "alle færdige"})
          </p>
        )}

        {enrichResult && (
          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-sm font-medium">{enrichResult.enriched} af {enrichResult.total} beriget</p>
            {enrichResult.results && (
              <div className="max-h-40 overflow-y-auto text-xs space-y-1">
                {enrichResult.results.map((r: any, i: number) => (
                  <div key={i} className={cn("flex justify-between", r.status === "ok" ? "text-green-400" : "text-red-400")}>
                    <span>{r.name}</span>
                    <span>{r.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Seed Database ──
interface PreviewSlot {
  name: string;
  provider: string;
  rtp: number | null;
  volatility: string | null;
  max_potential: string | null;
  selected: boolean;
}

function SeedDatabaseSection() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);
  const [completedProviders, setCompletedProviders] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, { found: number; new: number; skipped: number; errors: string[] }>>({});
  const [selectedProviders, setSelectedProviders] = useState<string[]>([...SEED_PROVIDERS]);
  const [previewSlots, setPreviewSlots] = useState<PreviewSlot[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const toggleProvider = (provider: string) => {
    setSelectedProviders(prev =>
      prev.includes(provider) ? prev.filter(p => p !== provider) : [...prev, provider]
    );
  };

  const toggleAll = () => {
    setSelectedProviders(prev => prev.length === SEED_PROVIDERS.length ? [] : [...SEED_PROVIDERS]);
  };

  const handleSeed = useCallback(async () => {
    if (selectedProviders.length === 0) {
      toast.error("Vælg mindst én provider");
      return;
    }
    setIsSeeding(true);
    setCompletedProviders([]);
    setResults({});
    setPreviewSlots([]);
    setShowPreview(false);
    const allSlots: PreviewSlot[] = [];

    for (const provider of selectedProviders) {
      setCurrentProvider(provider);
      try {
        const { data, error } = await supabase.functions.invoke("slot-catalog-seed", {
          body: { provider, mode: "preview" },
        });

        if (error) {
          setResults(prev => ({ ...prev, [provider]: { found: 0, new: 0, skipped: 0, errors: [error.message] } }));
        } else {
          const providerResult = data?.providers?.[provider] || { found: 0, new: 0, skipped: 0, errors: [] };
          setResults(prev => ({ ...prev, [provider]: providerResult }));
          const newSlots = (data?.slots || [])
            .filter((s: any) => s.provider === provider)
            .map((s: any) => ({ ...s, selected: true }));
          allSlots.push(...newSlots);
        }
      } catch (e: any) {
        setResults(prev => ({ ...prev, [provider]: { found: 0, new: 0, skipped: 0, errors: [e.message] } }));
      }
      setCompletedProviders(prev => [...prev, provider]);
    }

    setCurrentProvider(null);
    setIsSeeding(false);
    setPreviewSlots(allSlots);
    if (allSlots.length > 0) {
      setShowPreview(true);
      toast.info(`${allSlots.length} nye slots fundet. Gennemgå og godkend nedenfor.`);
    } else {
      toast.success("Ingen nye slots fundet — alt er allerede i databasen.");
    }
  }, [selectedProviders]);

  const toggleSlot = (index: number) => {
    setPreviewSlots(prev => prev.map((s, i) => i === index ? { ...s, selected: !s.selected } : s));
  };

  const toggleAllSlots = () => {
    const allSelected = previewSlots.every(s => s.selected);
    setPreviewSlots(prev => prev.map(s => ({ ...s, selected: !allSelected })));
  };

  const handleConfirm = useCallback(async () => {
    const slotsToInsert = previewSlots.filter(s => s.selected);
    if (slotsToInsert.length === 0) {
      toast.error("Vælg mindst én slot at tilføje");
      return;
    }
    setIsConfirming(true);
    try {
      const { data, error } = await supabase.functions.invoke("slot-catalog-seed", {
        body: {
          mode: "confirm",
          slots: slotsToInsert.map(({ selected, ...rest }) => rest),
        },
      });

      if (error) {
        toast.error(`Fejl: ${error.message}`);
      } else {
        toast.success(`${data?.inserted || 0} slots tilføjet til databasen!`);
        setShowPreview(false);
        setPreviewSlots([]);
      }
    } catch (e: any) {
      toast.error(`Fejl: ${e.message}`);
    }
    setIsConfirming(false);
  }, [previewSlots]);

  const selectedCount = previewSlots.filter(s => s.selected).length;
  const progress = selectedProviders.length > 0 ? (completedProviders.length / selectedProviders.length) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Seed Slot Database
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Udvid slot-kataloget med populære slots fra 15 top-providers via AI. Eksisterende data (gevinster, bonus count) røres ikke.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider checkboxes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Vælg providers</Label>
            <Button variant="ghost" size="sm" onClick={toggleAll}>
              {selectedProviders.length === SEED_PROVIDERS.length ? "Fravælg alle" : "Vælg alle"}
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SEED_PROVIDERS.map(provider => (
              <label key={provider} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={selectedProviders.includes(provider)}
                  onCheckedChange={() => toggleProvider(provider)}
                  disabled={isSeeding || showPreview}
                />
                {provider}
              </label>
            ))}
          </div>
        </div>

        {!showPreview && (
          <Button onClick={handleSeed} disabled={isSeeding || selectedProviders.length === 0} size="lg">
            {isSeeding ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Finder slots fra {currentProvider}...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Find nye slots ({selectedProviders.length} providers)
              </>
            )}
          </Button>
        )}

        {isSeeding && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentProvider}</span>
              <span>{completedProviders.length}/{selectedProviders.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Provider results summary */}
        {Object.keys(results).length > 0 && !showPreview && (
          <div className="border border-border rounded-lg divide-y divide-border text-sm max-h-60 overflow-auto">
            {Object.entries(results).map(([provider, r]) => (
              <div key={provider} className="flex items-center justify-between px-3 py-2">
                <span className="font-medium">{provider}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{r.new} nye</span>
                  {r.skipped > 0 && (
                    <span className="text-muted-foreground/60">{r.skipped} sprunget over</span>
                  )}
                  {r.errors.length > 0 && (
                    <span className="text-destructive">{r.errors.length} fejl</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview / approval list */}
        {showPreview && previewSlots.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                {previewSlots.length} nye slots fundet — vælg hvilke der skal tilføjes:
              </h3>
              <Button variant="ghost" size="sm" onClick={toggleAllSlots}>
                {previewSlots.every(s => s.selected) ? "Fravælg alle" : "Vælg alle"}
              </Button>
            </div>
            <div className="border border-border rounded-lg divide-y divide-border text-sm max-h-96 overflow-auto">
              {previewSlots.map((slot, i) => (
                <label key={`${slot.provider}-${slot.name}-${i}`} className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-muted/50">
                  <Checkbox
                    checked={slot.selected}
                    onCheckedChange={() => toggleSlot(i)}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">{slot.name}</span>
                    <span className="text-muted-foreground ml-2">({slot.provider})</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                    {slot.rtp && <span>RTP: {slot.rtp}%</span>}
                    {slot.volatility && <span>{slot.volatility}</span>}
                    {slot.max_potential && <span>{slot.max_potential}</span>}
                  </div>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleConfirm} disabled={isConfirming || selectedCount === 0} size="lg">
                {isConfirming ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Tilføjer...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Godkend og tilføj {selectedCount} slots
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={() => { setShowPreview(false); setPreviewSlots([]); }}>
                Annuller
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Provider Overrides ──
function ProviderOverridesSection() {
  const { data: overrides, isLoading } = useProviderOverrides();
  const createOverride = useCreateProviderOverride();
  const deleteOverride = useDeleteProviderOverride();
  const [slotName, setSlotName] = useState("");
  const [provider, setProvider] = useState("");

  const handleAdd = async () => {
    if (!slotName.trim() || !provider.trim()) return;
    try {
      await createOverride.mutateAsync({ slot_name: slotName.trim(), provider_override: provider.trim() });
      toast.success("Provider override tilføjet");
      setSlotName("");
      setProvider("");
    } catch (e: any) {
      toast.error(e.message?.includes("duplicate") ? "Denne slot har allerede et override" : "Fejl ved tilføjelse");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Overrides</CardTitle>
        <p className="text-sm text-muted-foreground">Overskriv "Custom Slot" provider-navne fra API'et.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Input placeholder="Slot navn (præcis match)" value={slotName} onChange={e => setSlotName(e.target.value)} className="flex-1 min-w-[200px]" />
          <Input placeholder="Korrekt provider" value={provider} onChange={e => setProvider(e.target.value)} className="flex-1 min-w-[150px]" />
          <Button onClick={handleAdd} disabled={createOverride.isPending}>
            <Plus className="h-4 w-4 mr-1" /> Tilføj
          </Button>
        </div>

        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mx-auto" />
        ) : (
          <div className="divide-y divide-border">
            {overrides?.map(o => (
              <div key={o.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <span className="font-medium">{o.slot_name}</span>
                  <span className="text-muted-foreground"> → {o.provider_override}</span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3 w-3" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Slet override?</AlertDialogTitle>
                      <AlertDialogDescription>Sletter override for "{o.slot_name}".</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuller</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteOverride.mutate(o.id)}>Slet</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {overrides?.length === 0 && <p className="text-sm text-muted-foreground py-2">Ingen overrides endnu.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Slot Catalog ──
function SlotCatalogSection() {
  const { data: slots, isLoading } = useSlotCatalog();
  const createSlot = useCreateSlotCatalogEntry();
  const updateSlot = useUpdateSlotCatalogEntry();
  const deleteSlot = useDeleteSlotCatalogEntry();
  const [search, setSearch] = useState("");
  const [editingSlot, setEditingSlot] = useState<SlotCatalogEntry | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = slots?.filter(s =>
    s.slot_name.toLowerCase().includes(search.toLowerCase()) ||
    s.provider.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Slot Katalog</CardTitle>
            <p className="text-sm text-muted-foreground">Database med slot-info brugere kan se.</p>
          </div>
          <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" /> Tilføj Slot</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Søg slot eller provider..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mx-auto" />
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">Slot</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">Provider</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">RTP</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">Vol.</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">Max</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">Højeste Win</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground">Højeste X</th>
                   <th className="px-3 py-2 text-left font-medium text-muted-foreground"># Hunts</th>
                   <th className="px-3 py-2 text-right font-medium text-muted-foreground">Handlinger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(slot => (
                  <tr key={slot.id} className="hover:bg-muted/30">
                    <td className="px-3 py-2 font-medium">
                      <span>{slot.slot_name}</span>
                      {(slot as any).content_archetype && (
                        <Badge variant="outline" className={cn("ml-2 text-[10px] px-1.5 py-0", ARCHETYPE_COLORS[(slot as any).content_archetype] || "")}>
                          {(slot as any).content_archetype}
                        </Badge>
                      )}
                    </td>
                    <td className="px-3 py-2">{slot.provider || '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.rtp ? `${slot.rtp}%` : '—'}</td>
                    <td className="px-3 py-2">{slot.volatility || '—'}</td>
                    <td className="px-3 py-2">{slot.max_potential || '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.highest_win ? `${Number(slot.highest_win.toFixed(1))} (${slot.bonus_count})` : '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.highest_x ? `${Number(slot.highest_x.toFixed(1))}x (${slot.bonus_count})` : '—'}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{slot.bonus_count}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingSlot(slot)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3 w-3" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Slet "{slot.slot_name}"?</AlertDialogTitle>
                              <AlertDialogDescription>Denne handling kan ikke fortrydes.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuller</AlertDialogCancel>
                              <AlertDialogAction onClick={() => { deleteSlot.mutate(slot.id); toast.success("Slot slettet"); }}>Slet</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="px-3 py-8 text-center text-muted-foreground">Ingen slots fundet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Dialog */}
        <SlotFormDialog
          open={showAdd}
          onClose={() => setShowAdd(false)}
          onSave={async (data) => {
            await createSlot.mutateAsync(data);
            toast.success("Slot tilføjet til katalog");
            setShowAdd(false);
          }}
          isPending={createSlot.isPending}
        />

        {/* Edit Dialog */}
        <SlotFormDialog
          open={!!editingSlot}
          onClose={() => setEditingSlot(null)}
          initialData={editingSlot || undefined}
          onSave={async (data) => {
            if (!editingSlot) return;
            await updateSlot.mutateAsync({ id: editingSlot.id, ...data });
            toast.success("Slot opdateret");
            setEditingSlot(null);
          }}
          isPending={updateSlot.isPending}
        />
      </CardContent>
    </Card>
  );
}

// ── Form Dialog ──
interface SlotFormData {
  slot_name: string;
  provider: string;
  rtp: number | null;
  volatility: string | null;
  max_potential: string | null;
  highest_win: number;
  highest_x: number;
  bonus_count: number;
}

const PROVIDER_PRESETS = [
  "Big Time Gaming",
  "Blueprint Gaming",
  "ELK Studios",
  "Evolution Gaming",
  "Hacksaw Gaming",
  "NetEnt",
  "Nolimit City",
  "Play'n GO",
  "Pragmatic Play",
  "Push Gaming",
  "Quickspin",
  "Red Tiger",
  "Relax Gaming",
  "Thunderkick",
  "Yggdrasil",
];

const SLOT_NAME_PRESETS = [
  "Big Bass Bonanza",
  "Big Bass Splash",
  "Bigger Bass Splash",
  "Bonanza",
  "Book of Dead",
  "Buffalo King Megaways",
  "Chaos Crew",
  "Chaos Crew 2",
  "Crazy Time",
  "Danger High Voltage",
  "Dead Or Alive 2",
  "Divine Fortune Megaways",
  "Dog House Multihold",
  "Drop 'Em",
  "Extra Chilli",
  "Fire In The Hole",
  "Floating Dragon",
  "Fruit Party",
  "Fruit Party 2",
  "Gates Of Olympus",
  "Gates Of Olympus 1000",
  "Gems Bonanza",
  "Gonzo's Quest Megaways",
  "Hand Of Anubis",
  "Immortal Romance",
  "Jammin Jars",
  "Jammin Jars 2",
  "Karen Maneater",
  "Le Bandit",
  "Mental",
  "Misery Mining",
  "Money Train 2",
  "Money Train 3",
  "Money Train 4",
  "Punk Rocker",
  "Razor Shark",
  "Reactoonz",
  "Reactoonz 2",
  "San Quentin Xways",
  "Sky Bounty",
  "Starlight Princess",
  "Starlight Princess 1000",
  "Stick Em",
  "Sugar Rush",
  "Sugar Rush 1000",
  "Sweet Bonanza",
  "Sweet Bonanza 1000",
  "The Dog House",
  "The Dog House Megaways",
  "Tombstone Rip",
  "Wanted Dead Or A Wild",
  "Wild West Gold",
  "Wild West Gold Megaways",
];

function SlotFormDialog({ open, onClose, onSave, initialData, isPending }: {
  open: boolean;
  onClose: () => void;
  onSave: (data: SlotFormData) => Promise<void>;
  initialData?: SlotFormData;
  isPending: boolean;
}) {
  const emptyForm: SlotFormData = { slot_name: '', provider: '', rtp: null, volatility: null, max_potential: null, highest_win: 0, highest_x: 0, bonus_count: 0 };
  const [form, setForm] = useState<SlotFormData>(initialData || emptyForm);
  const [providerOpen, setProviderOpen] = useState(false);
  const [customProvider, setCustomProvider] = useState(false);
  const [slotNameOpen, setSlotNameOpen] = useState(false);
  const [customSlotName, setCustomSlotName] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialData || emptyForm);
      setCustomProvider(false);
      setCustomSlotName(false);
    }
  }, [open, initialData]);

  const isCustomValue = form.provider && !PROVIDER_PRESETS.includes(form.provider);
  const isCustomSlotValue = form.slot_name && !SLOT_NAME_PRESETS.includes(form.slot_name);
  const isEditing = !!initialData;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Rediger Slot' : 'Tilføj Slot'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Slot Navn *</Label>
            {isEditing ? (
              <Input value={form.slot_name} disabled />
            ) : customSlotName || isCustomSlotValue ? (
              <div className="flex gap-2">
                <Input
                  value={form.slot_name}
                  onChange={e => setForm({ ...form, slot_name: e.target.value })}
                  placeholder="Skriv slot navn..."
                  autoFocus
                />
                <Button type="button" variant="outline" size="sm" onClick={() => { setCustomSlotName(false); setSlotNameOpen(true); if (isCustomSlotValue && !form.slot_name.trim()) setForm({ ...form, slot_name: '' }); }}>
                  Liste
                </Button>
              </div>
            ) : (
              <Popover open={slotNameOpen} onOpenChange={setSlotNameOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={slotNameOpen} className="w-full justify-between font-normal">
                    {form.slot_name || "Vælg slot..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Søg slot..." />
                    <CommandList>
                      <CommandEmpty>Ingen fundet</CommandEmpty>
                      <CommandGroup>
                        {SLOT_NAME_PRESETS.map(s => (
                          <CommandItem key={s} value={s} onSelect={() => { setForm({ ...form, slot_name: s }); setSlotNameOpen(false); }}>
                            <Check className={cn("mr-2 h-4 w-4", form.slot_name === s ? "opacity-100" : "opacity-0")} />
                            {s}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandGroup>
                        <CommandItem onSelect={() => { setCustomSlotName(true); setSlotNameOpen(false); }}>
                          <Plus className="mr-2 h-4 w-4" />
                          Tilføj custom slot...
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="space-y-1">
            <Label>Provider</Label>
            {customProvider || isCustomValue ? (
              <div className="flex gap-2">
                <Input
                  value={form.provider}
                  onChange={e => setForm({ ...form, provider: e.target.value })}
                  placeholder="Skriv provider navn..."
                  autoFocus
                />
                <Button type="button" variant="outline" size="sm" onClick={() => { setCustomProvider(false); setProviderOpen(true); if (isCustomValue && !form.provider.trim()) setForm({ ...form, provider: '' }); }}>
                  Liste
                </Button>
              </div>
            ) : (
              <Popover open={providerOpen} onOpenChange={setProviderOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={providerOpen} className="w-full justify-between font-normal">
                    {form.provider || "Vælg provider..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Søg provider..." />
                    <CommandList>
                      <CommandEmpty>Ingen fundet</CommandEmpty>
                      <CommandGroup>
                        {PROVIDER_PRESETS.map(p => (
                          <CommandItem key={p} value={p} onSelect={() => { setForm({ ...form, provider: p }); setProviderOpen(false); }}>
                            <Check className={cn("mr-2 h-4 w-4", form.provider === p ? "opacity-100" : "opacity-0")} />
                            {p}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandGroup>
                        <CommandItem onSelect={() => { setCustomProvider(true); setProviderOpen(false); }}>
                          <Plus className="mr-2 h-4 w-4" />
                          Tilføj custom provider...
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>RTP (%)</Label>
              <Input type="number" step="0.01" value={form.rtp ?? ''} onChange={e => setForm({ ...form, rtp: e.target.value ? Number(e.target.value) : null })} />
            </div>
            <div className="space-y-1">
              <Label>Volatilitet</Label>
              <Select value={form.volatility || ''} onValueChange={v => setForm({ ...form, volatility: v || null })}>
                <SelectTrigger><SelectValue placeholder="Vælg..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Max Potentiale</Label>
            <Input value={form.max_potential || ''} onChange={e => setForm({ ...form, max_potential: e.target.value || null })} placeholder="f.eks. 50,000x" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Højeste Gevinst (kr)</Label>
              <Input type="number" value={form.highest_win || ''} onChange={e => setForm({ ...form, highest_win: Number(e.target.value) || 0 })} />
            </div>
            <div className="space-y-1">
              <Label>Højeste X</Label>
              <Input type="number" step="0.01" value={form.highest_x || ''} onChange={e => setForm({ ...form, highest_x: Number(e.target.value) || 0 })} />
            </div>
          </div>
          <Button className="w-full" disabled={isPending || !form.slot_name.trim()} onClick={() => onSave(form)}>
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {initialData ? 'Gem Ændringer' : 'Tilføj Slot'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
