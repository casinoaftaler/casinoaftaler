import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

const GATES_SETTINGS_KEYS = [
  "gates_multiplier_chance_base",
  "gates_multiplier_chance_bonus",
  "gates_min_match",
  "gates_scatter_trigger",
  "gates_scatter_retrigger",
  "gates_free_spins_initial",
  "gates_free_spins_retrigger",
];

interface GatesSettings {
  multiplierChanceBase: number;
  multiplierChanceBonus: number;
  minMatch: number;
  scatterTrigger: number;
  scatterRetrigger: number;
  freeSpinsInitial: number;
  freeSpinsRetrigger: number;
}

const DEFAULTS: GatesSettings = {
  multiplierChanceBase: 0.04,
  multiplierChanceBonus: 0.14,
  minMatch: 8,
  scatterTrigger: 4,
  scatterRetrigger: 3,
  freeSpinsInitial: 15,
  freeSpinsRetrigger: 5,
};

export function GatesGameSettingsAdmin() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<GatesSettings>(DEFAULTS);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["gates-game-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", GATES_SETTINGS_KEYS);
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((s) => { map[s.key] = s.value || ""; });
      return {
        multiplierChanceBase: parseFloat(map.gates_multiplier_chance_base || String(DEFAULTS.multiplierChanceBase)),
        multiplierChanceBonus: parseFloat(map.gates_multiplier_chance_bonus || String(DEFAULTS.multiplierChanceBonus)),
        minMatch: parseInt(map.gates_min_match || String(DEFAULTS.minMatch), 10),
        scatterTrigger: parseInt(map.gates_scatter_trigger || String(DEFAULTS.scatterTrigger), 10),
        scatterRetrigger: parseInt(map.gates_scatter_retrigger || String(DEFAULTS.scatterRetrigger), 10),
        freeSpinsInitial: parseInt(map.gates_free_spins_initial || String(DEFAULTS.freeSpinsInitial), 10),
        freeSpinsRetrigger: parseInt(map.gates_free_spins_retrigger || String(DEFAULTS.freeSpinsRetrigger), 10),
      } as GatesSettings;
    },
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (s: GatesSettings) => {
      const updates = [
        { key: "gates_multiplier_chance_base", value: String(s.multiplierChanceBase) },
        { key: "gates_multiplier_chance_bonus", value: String(s.multiplierChanceBonus) },
        { key: "gates_min_match", value: String(s.minMatch) },
        { key: "gates_scatter_trigger", value: String(s.scatterTrigger) },
        { key: "gates_scatter_retrigger", value: String(s.scatterRetrigger) },
        { key: "gates_free_spins_initial", value: String(s.freeSpinsInitial) },
        { key: "gates_free_spins_retrigger", value: String(s.freeSpinsRetrigger) },
      ];
      for (const u of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert({ key: u.key, value: u.value }, { onConflict: "key" });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gates-game-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Gates indstillinger gemt");
    },
    onError: (err: Error) => {
      toast.error("Fejl: " + err.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Gates of Fedesvin — Spilmekanik
        </CardTitle>
        <CardDescription>
          Juster multiplier-chancerne, scatter-krav og free spins for Gates of Fedesvin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Multiplier Chances */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Multiplier Orb Chancerne
          </h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Base Game Chance</Label>
              <span className="text-sm text-muted-foreground font-mono">
                {(form.multiplierChanceBase * 100).toFixed(1)}%
              </span>
            </div>
            <Slider
              min={0}
              max={0.20}
              step={0.005}
              value={[form.multiplierChanceBase]}
              onValueChange={(v) => setForm({ ...form, multiplierChanceBase: v[0] })}
            />
            <p className="text-xs text-muted-foreground">
              Sandsynlighed pr. celle for en multiplier orb i base game.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bonus Game Chance</Label>
              <span className="text-sm text-muted-foreground font-mono">
                {(form.multiplierChanceBonus * 100).toFixed(1)}%
              </span>
            </div>
            <Slider
              min={0}
              max={0.30}
              step={0.005}
              value={[form.multiplierChanceBonus]}
              onValueChange={(v) => setForm({ ...form, multiplierChanceBonus: v[0] })}
            />
            <p className="text-xs text-muted-foreground">
              Sandsynlighed pr. celle for en multiplier orb i free spins.
            </p>
          </div>
        </div>

        {/* Match & Scatter Settings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Min Match (symboler)</Label>
            <Input
              type="number"
              min={4}
              max={15}
              value={form.minMatch}
              onChange={(e) => setForm({ ...form, minMatch: parseInt(e.target.value) || 8 })}
            />
            <p className="text-xs text-muted-foreground">Minimum for gevinst</p>
          </div>
          <div className="space-y-2">
            <Label>Scatter Trigger</Label>
            <Input
              type="number"
              min={2}
              max={6}
              value={form.scatterTrigger}
              onChange={(e) => setForm({ ...form, scatterTrigger: parseInt(e.target.value) || 4 })}
            />
            <p className="text-xs text-muted-foreground">Scatters for bonus</p>
          </div>
          <div className="space-y-2">
            <Label>Scatter Retrigger</Label>
            <Input
              type="number"
              min={2}
              max={6}
              value={form.scatterRetrigger}
              onChange={(e) => setForm({ ...form, scatterRetrigger: parseInt(e.target.value) || 3 })}
            />
            <p className="text-xs text-muted-foreground">Scatters for retrigger</p>
          </div>
        </div>

        {/* Free Spins */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Initial Free Spins</Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={form.freeSpinsInitial}
              onChange={(e) => setForm({ ...form, freeSpinsInitial: parseInt(e.target.value) || 15 })}
            />
            <p className="text-xs text-muted-foreground">Antal free spins ved bonus trigger</p>
          </div>
          <div className="space-y-2">
            <Label>Retrigger Free Spins</Label>
            <Input
              type="number"
              min={1}
              max={30}
              value={form.freeSpinsRetrigger}
              onChange={(e) => setForm({ ...form, freeSpinsRetrigger: parseInt(e.target.value) || 5 })}
            />
            <p className="text-xs text-muted-foreground">Ekstra free spins ved retrigger</p>
          </div>
        </div>

        <Button
          onClick={() => saveMutation.mutate(form)}
          disabled={saveMutation.isPending}
          className="w-full"
        >
          {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Gem Gates Indstillinger
        </Button>
      </CardContent>
    </Card>
  );
}
