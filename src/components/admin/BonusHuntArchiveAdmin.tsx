import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useBonusHuntArchives } from "@/hooks/useSlotCatalog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2, Archive, Eye } from "lucide-react";

interface ArchiveRow {
  id: string;
  hunt_number: number;
  hunt_name: string | null;
  hunt_status: string | null;
  total_slots: number | null;
  opened_slots: number | null;
  average_x: number | null;
  start_balance: number | null;
  end_balance: number | null;
  created_at: string;
  api_data: any;
}

export function BonusHuntArchiveAdmin() {
  const { data: archives, isLoading } = useBonusHuntArchives();
  const queryClient = useQueryClient();
  const [editingArchive, setEditingArchive] = useState<ArchiveRow | null>(null);
  const [viewingArchive, setViewingArchive] = useState<ArchiveRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    hunt_name: "",
    hunt_status: "",
    start_balance: "",
    end_balance: "",
    average_x: "",
  });

  const openEdit = (archive: ArchiveRow) => {
    setEditingArchive(archive);
    setEditForm({
      hunt_name: archive.hunt_name || "",
      hunt_status: archive.hunt_status || "",
      start_balance: archive.start_balance?.toString() || "",
      end_balance: archive.end_balance?.toString() || "",
      average_x: archive.average_x?.toString() || "",
    });
  };

  const handleSave = async () => {
    if (!editingArchive) return;
    setSaving(true);
    try {
      const { error } = await (supabase.from("bonus_hunt_archives" as any) as any)
        .update({
          hunt_name: editForm.hunt_name || null,
          hunt_status: editForm.hunt_status || null,
          start_balance: editForm.start_balance ? parseFloat(editForm.start_balance) : null,
          end_balance: editForm.end_balance ? parseFloat(editForm.end_balance) : null,
          average_x: editForm.average_x ? parseFloat(editForm.average_x) : null,
        })
        .eq("id", editingArchive.id);
      if (error) throw error;
      toast.success(`Hunt #${editingArchive.hunt_number} opdateret`);
      queryClient.invalidateQueries({ queryKey: ["bonus-hunt-archives"] });
      setEditingArchive(null);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (archive: ArchiveRow) => {
    setDeletingId(archive.id);
    try {
      const { error } = await (supabase.from("bonus_hunt_archives" as any) as any)
        .delete()
        .eq("id", archive.id);
      if (error) throw error;
      toast.success(`Hunt #${archive.hunt_number} slettet fra arkivet`);
      queryClient.invalidateQueries({ queryKey: ["bonus-hunt-archives"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Extract slots from api_data for viewing
  const getSlots = (apiData: any): { name: string; provider: string; bet: number; win: number; played: boolean }[] => {
    if (!apiData) return [];
    const data = apiData.data || apiData;
    const slots = data.slots || [];
    return slots.map((s: any) => ({
      name: s.slot?.name || "Unknown",
      provider: s.slot?.provider || "Unknown",
      bet: s.bet || 0,
      win: s.win || 0,
      played: s.played ?? false,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Archive className="h-5 w-5 text-primary" />
            Arkiverede Hunts ({archives?.length || 0})
          </h3>
          <p className="text-sm text-muted-foreground">Se, rediger og slet arkiverede bonus hunts.</p>
        </div>
      </div>

      {!archives?.length ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Ingen arkiverede hunts endnu.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Navn</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Slots</TableHead>
                  <TableHead className="text-right">Åbnet</TableHead>
                  <TableHead className="text-right">Gns. X</TableHead>
                  <TableHead className="text-right">Start</TableHead>
                  <TableHead className="text-right">Slut</TableHead>
                  <TableHead className="text-right">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archives.map((a: ArchiveRow) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.hunt_number}</TableCell>
                    <TableCell>{a.hunt_name || "–"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {a.hunt_status || "–"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{a.total_slots ?? 0}</TableCell>
                    <TableCell className="text-right">{a.opened_slots ?? 0}</TableCell>
                    <TableCell className="text-right font-medium">
                      {a.average_x ? `${Number(a.average_x).toFixed(2)}x` : "–"}
                    </TableCell>
                    <TableCell className="text-right">
                      {a.start_balance ? Number(a.start_balance).toLocaleString("da-DK") : "–"}
                    </TableCell>
                    <TableCell className="text-right">
                      {a.end_balance ? Number(a.end_balance).toLocaleString("da-DK") : "–"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setViewingArchive(a)} title="Se slots">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(a)} title="Rediger">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Slet">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Slet Hunt #{a.hunt_number}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Dette vil permanent slette hunt #{a.hunt_number} fra arkivet. Handlingen kan ikke fortrydes.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuller</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(a)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {deletingId === a.id ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                                Slet
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingArchive} onOpenChange={(open) => !open && setEditingArchive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rediger Hunt #{editingArchive?.hunt_number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hunt Navn</Label>
              <Input value={editForm.hunt_name} onChange={(e) => setEditForm({ ...editForm, hunt_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={editForm.hunt_status} onChange={(e) => setEditForm({ ...editForm, hunt_status: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Balance</Label>
                <Input type="number" value={editForm.start_balance} onChange={(e) => setEditForm({ ...editForm, start_balance: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>End Balance</Label>
                <Input type="number" value={editForm.end_balance} onChange={(e) => setEditForm({ ...editForm, end_balance: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gennemsnitlig X</Label>
              <Input type="number" step="0.01" value={editForm.average_x} onChange={(e) => setEditForm({ ...editForm, average_x: e.target.value })} />
            </div>
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Gem Ændringer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Slots Dialog */}
      <Dialog open={!!viewingArchive} onOpenChange={(open) => !open && setViewingArchive(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Hunt #{viewingArchive?.hunt_number} – Slots</DialogTitle>
          </DialogHeader>
          {viewingArchive && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slot</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead className="text-right">Bet</TableHead>
                  <TableHead className="text-right">Win</TableHead>
                  <TableHead className="text-right">X</TableHead>
                  <TableHead>Åbnet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getSlots(viewingArchive.api_data).map((slot, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{slot.name}</TableCell>
                    <TableCell className="text-muted-foreground">{slot.provider}</TableCell>
                    <TableCell className="text-right">{slot.bet}</TableCell>
                    <TableCell className="text-right">{slot.win}</TableCell>
                    <TableCell className="text-right font-medium">
                      {slot.bet > 0 && slot.played ? `${(slot.win / slot.bet).toFixed(2)}x` : "–"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={slot.played ? "default" : "outline"} className="text-xs">
                        {slot.played ? "Ja" : "Nej"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
