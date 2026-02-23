import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Trash2, Pencil, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
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

export function SlotCatalogAdminSection() {
  return (
    <div className="space-y-8">
      <ProviderOverridesSection />
      <SlotCatalogSection />
    </div>
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
                    <td className="px-3 py-2 font-mono">{slot.highest_win || '—'}</td>
                    <td className="px-3 py-2 font-mono">{slot.highest_x ? `${slot.highest_x}x` : '—'}</td>
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
                  <tr><td colSpan={8} className="px-3 py-8 text-center text-muted-foreground">Ingen slots fundet</td></tr>
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
}

function SlotFormDialog({ open, onClose, onSave, initialData, isPending }: {
  open: boolean;
  onClose: () => void;
  onSave: (data: SlotFormData) => Promise<void>;
  initialData?: SlotFormData;
  isPending: boolean;
}) {
  const [form, setForm] = useState<SlotFormData>(initialData || {
    slot_name: '', provider: '', rtp: null, volatility: null, max_potential: null, highest_win: 0, highest_x: 0,
  });

  // Reset form when dialog opens with new data
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
    else setForm(initialData || { slot_name: '', provider: '', rtp: null, volatility: null, max_potential: null, highest_win: 0, highest_x: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Rediger Slot' : 'Tilføj Slot'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Slot Navn *</Label>
            <Input value={form.slot_name} onChange={e => setForm({ ...form, slot_name: e.target.value })} disabled={!!initialData} />
          </div>
          <div className="space-y-1">
            <Label>Provider</Label>
            <Input value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} />
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
