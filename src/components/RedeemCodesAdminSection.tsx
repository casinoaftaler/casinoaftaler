import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface RedeemCode {
  id: string;
  code: string;
  credits_amount: number;
  usage_type: string;
  max_uses: number | null;
  times_used: number;
  expires_at: string | null;
  is_active: boolean;
  created_by: string;
  created_at: string;
}

export function RedeemCodesAdminSection() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [newCode, setNewCode] = useState({
    code: "",
    credits_amount: "100",
    usage_type: "one_per_user",
    max_uses: "",
    expires_at: "",
  });

  const { data: codes, isLoading } = useQuery({
    queryKey: ["admin-redeem-codes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("redeem_codes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as RedeemCode[];
    },
  });

  const createCode = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("Not authenticated");
      const { error } = await supabase.from("redeem_codes").insert({
        code: newCode.code.trim().toUpperCase(),
        credits_amount: parseInt(newCode.credits_amount),
        usage_type: newCode.usage_type,
        max_uses: newCode.max_uses ? parseInt(newCode.max_uses) : null,
        expires_at: newCode.expires_at || null,
        created_by: user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-redeem-codes"] });
      toast.success("Kode oprettet");
      setNewCode({ code: "", credits_amount: "100", usage_type: "one_per_user", max_uses: "", expires_at: "" });
      setShowForm(false);
    },
    onError: (err: any) => {
      if (err.message?.includes("duplicate")) {
        toast.error("Denne kode findes allerede");
      } else {
        toast.error("Fejl ved oprettelse af kode");
      }
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("redeem_codes").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-redeem-codes"] }),
  });

  const deleteCode = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("redeem_codes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-redeem-codes"] });
      toast.success("Kode slettet");
    },
  });

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Indløsningskoder</h2>
          <p className="text-muted-foreground">Opret og administrer koder der giver credits.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" /> Ny Kode
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Opret ny kode</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => { e.preventDefault(); createCode.mutate(); }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Kode</Label>
                  <Input
                    value={newCode.code}
                    onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                    placeholder="BONUS50"
                    className="uppercase"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Credits</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newCode.credits_amount}
                    onChange={(e) => setNewCode({ ...newCode, credits_amount: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={newCode.usage_type} onValueChange={(v) => setNewCode({ ...newCode, usage_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one_per_user">Alle kan bruge én gang</SelectItem>
                      <SelectItem value="single_user">Kun én bruger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Max brug (valgfrit)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newCode.max_uses}
                    onChange={(e) => setNewCode({ ...newCode, max_uses: e.target.value })}
                    placeholder="Ubegrænset"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Udløber (valgfrit)</Label>
                  <Input
                    type="datetime-local"
                    value={newCode.expires_at}
                    onChange={(e) => setNewCode({ ...newCode, expires_at: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" disabled={createCode.isPending || !newCode.code.trim()}>
                {createCode.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Opret Kode
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-3">
          {codes?.map((c) => (
            <Card key={c.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lg">{c.code}</span>
                    {!c.is_active && <Badge variant="secondary">Inaktiv</Badge>}
                    {isExpired(c.expires_at) && <Badge variant="destructive">Udløbet</Badge>}
                    {c.usage_type === "single_user" && <Badge variant="outline">Enkelt bruger</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {c.credits_amount} credits · Brugt {c.times_used}{c.max_uses ? `/${c.max_uses}` : ""} gange
                    {c.expires_at && ` · Udløber ${new Date(c.expires_at).toLocaleDateString("da-DK")}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={c.is_active}
                    onCheckedChange={(checked) => toggleActive.mutate({ id: c.id, is_active: checked })}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Slet kode</AlertDialogTitle>
                        <AlertDialogDescription>
                          Er du sikker på at du vil slette koden "{c.code}"?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuller</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteCode.mutate(c.id)} className="bg-destructive text-destructive-foreground">
                          Slet
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
          {codes?.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Ingen koder oprettet endnu.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
