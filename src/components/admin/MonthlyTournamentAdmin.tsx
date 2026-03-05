import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trophy, Save, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TournamentConfigRow {
  id: string;
  category: string;
  game_id: string;
  game_name: string;
  prize_1: number;
  prize_2: number;
  prize_3: number;
  is_active: boolean;
}

export function MonthlyTournamentAdmin() {
  const queryClient = useQueryClient();

  const { data: configs, isLoading } = useQuery({
    queryKey: ["admin-tournament-config"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("monthly_tournament_config")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as unknown as TournamentConfigRow[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (row: TournamentConfigRow) => {
      const { error } = await supabase
        .from("monthly_tournament_config")
        .update({
          game_id: row.game_id,
          game_name: row.game_name,
          prize_1: row.prize_1,
          prize_2: row.prize_2,
          prize_3: row.prize_3,
          is_active: row.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tournament-config"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-tournament-config"] });
      toast.success("Turnering opdateret");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("monthly_tournament_config")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tournament-config"] });
      queryClient.invalidateQueries({ queryKey: ["monthly-tournament-config"] });
      toast.success("Turnering slettet");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("monthly_tournament_config")
        .insert({
          category: `custom_${Date.now()}`,
          game_id: "fedesvin-bonanza",
          game_name: "Ny Turnering",
          prize_1: 500,
          prize_2: 300,
          prize_3: 200,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tournament-config"] });
      toast.success("Ny turnering tilføjet");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          Månedsturnering Konfiguration
        </h3>
        <Button size="sm" variant="outline" onClick={() => addMutation.mutate()} disabled={addMutation.isPending}>
          <Plus className="h-4 w-4 mr-1" />
          Tilføj
        </Button>
      </div>

      {(configs || []).map((config) => (
        <TournamentConfigCard
          key={config.id}
          config={config}
          onSave={(updated) => updateMutation.mutate(updated)}
          onDelete={() => deleteMutation.mutate(config.id)}
          isSaving={updateMutation.isPending}
        />
      ))}
    </div>
  );
}

function TournamentConfigCard({
  config,
  onSave,
  onDelete,
  isSaving,
}: {
  config: TournamentConfigRow;
  onSave: (row: TournamentConfigRow) => void;
  onDelete: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState(config);

  const hasChanges =
    form.game_id !== config.game_id ||
    form.game_name !== config.game_name ||
    form.prize_1 !== config.prize_1 ||
    form.prize_2 !== config.prize_2 ||
    form.prize_3 !== config.prize_3 ||
    form.is_active !== config.is_active;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">{config.category}</Badge>
            <span className="text-muted-foreground">→</span>
            <span>{form.game_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Aktiv</span>
            <Switch
              checked={form.is_active}
              onCheckedChange={(checked) => setForm(f => ({ ...f, is_active: checked }))}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Game ID</label>
            <Input
              value={form.game_id}
              onChange={(e) => setForm(f => ({ ...f, game_id: e.target.value }))}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Spilnavn</label>
            <Input
              value={form.game_name}
              onChange={(e) => setForm(f => ({ ...f, game_name: e.target.value }))}
              className="h-8 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">1. præmie (kr)</label>
            <Input
              type="number"
              value={form.prize_1}
              onChange={(e) => setForm(f => ({ ...f, prize_1: Number(e.target.value) }))}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">2. præmie (kr)</label>
            <Input
              type="number"
              value={form.prize_2}
              onChange={(e) => setForm(f => ({ ...f, prize_2: Number(e.target.value) }))}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">3. præmie (kr)</label>
            <Input
              type="number"
              value={form.prize_3}
              onChange={(e) => setForm(f => ({ ...f, prize_3: Number(e.target.value) }))}
              className="h-8 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <Button
            variant="destructive"
            size="sm"
            className="text-xs"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Slet
          </Button>
          <Button
            size="sm"
            disabled={!hasChanges || isSaving}
            onClick={() => onSave(form)}
          >
            <Save className="h-3 w-3 mr-1" />
            Gem ændringer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
