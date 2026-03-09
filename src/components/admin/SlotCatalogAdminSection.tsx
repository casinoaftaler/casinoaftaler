import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, Pencil, Search, Loader2, Check, ChevronsUpDown, Database } from "lucide-react";
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
  "Pragmatic Play", "NetEnt", "Microgaming", "Playtech", "Play'n GO",
  "Evolution", "Betsoft", "Blueprint Gaming", "Relax Gaming", "Push Gaming",
  "ELK Studios", "Big Time Gaming", "Quickspin", "Yggdrasil Gaming", "Nolimit City",
  "Hacksaw Gaming", "BGaming", "Red Tiger Gaming", "Thunderkick", "Endorphina",
  "Kalamba Games", "Reel Kingdom", "Fantasma Games", "PearFiction Studios",
  "Gameburger Studios", "Spadegaming", "Booming Games", "AvatarUX", "Print Studios",
];

export function SlotCatalogAdminSection() {
  return (
    <div className="space-y-8">
      <SeedDatabaseSection />
      <ProviderOverridesSection />
      <SlotCatalogSection />
    </div>
  );
}

// ── Seed Database ──
function SeedDatabaseSection() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);
  const [completedProviders, setCompletedProviders] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, { slots_processed: number; errors: string[] }>>({});

  const handleSeed = useCallback(async () => {
    setIsSeeding(true);
    setCompletedProviders([]);
    setResults({});
    let totalNew = 0;

    for (const provider of SEED_PROVIDERS) {
      setCurrentProvider(provider);
      try {
        const { data, error } = await supabase.functions.invoke("slot-catalog-seed", {
          body: { provider },
        });

        if (error) {
          setResults(prev => ({ ...prev, [provider]: { slots_processed: 0, errors: [error.message] } }));
        } else {
          const providerResult = data?.providers?.[provider] || { slots_processed: 0, errors: [] };
          totalNew += providerResult.slots_processed;
          setResults(prev => ({ ...prev, [provider]: providerResult }));
        }
      } catch (e: any) {
        setResults(prev => ({ ...prev, [provider]: { slots_processed: 0, errors: [e.message] } }));
      }
      setCompletedProviders(prev => [...prev, provider]);
    }

    setCurrentProvider(null);
    setIsSeeding(false);
    toast.success(`Seeding færdig! ${totalNew} slots behandlet.`);
  }, []);

  const progress = (completedProviders.length / SEED_PROVIDERS.length) * 100;

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
        <Button onClick={handleSeed} disabled={isSeeding} size="lg">
          {isSeeding ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Seeder {currentProvider}...
            </>
          ) : (
            <>
              <Database className="h-4 w-4 mr-2" />
              Start Seeding (15 providers)
            </>
          )}
        </Button>

        {isSeeding && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentProvider}</span>
              <span>{completedProviders.length}/{SEED_PROVIDERS.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {Object.keys(results).length > 0 && (
          <div className="border border-border rounded-lg divide-y divide-border text-sm max-h-60 overflow-auto">
            {Object.entries(results).map(([provider, r]) => (
              <div key={provider} className="flex items-center justify-between px-3 py-2">
                <span className="font-medium">{provider}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{r.slots_processed} slots</span>
                  {r.errors.length > 0 && (
                    <span className="text-destructive">{r.errors.length} fejl</span>
                  )}
                </div>
              </div>
            ))}
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
                    <td className="px-3 py-2 font-medium">{slot.slot_name}</td>
                    <td className="px-3 py-2">{slot.provider || '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.rtp ? `${slot.rtp}%` : '—'}</td>
                    <td className="px-3 py-2">{slot.volatility || '—'}</td>
                    <td className="px-3 py-2">{slot.max_potential || '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.highest_win ? `${slot.highest_win} (${slot.bonus_count})` : '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.highest_x ? `${slot.highest_x}x (${slot.bonus_count})` : '—'}</td>
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
