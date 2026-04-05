import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2, Sparkles, Zap, Percent } from "lucide-react";
import { toast } from "sonner";
import { MULTIPLIER_SYMBOLS } from "@/lib/gatesMultiplierSymbols";

const GATES_SETTINGS_KEYS = [
  "gates_multiplier_chance_base",
  "gates_multiplier_chance_bonus",
  "gates_min_match",
  "gates_scatter_trigger",
  "gates_scatter_retrigger",
  "gates_free_spins_initial",
  "gates_free_spins_retrigger",
  "gates_multiplier_values",
  "gates_multiplier_weights",
];

interface GatesSettings {
  multiplierChanceBase: number;
  multiplierChanceBonus: number;
  minMatch: number;
  scatterTrigger: number;
  scatterRetrigger: number;
  freeSpinsInitial: number;
  freeSpinsRetrigger: number;
  multiplierValues: string;
  multiplierWeights: string;
}

const DEFAULTS: GatesSettings = {
  multiplierChanceBase: 0.04,
  multiplierChanceBonus: 0.056,
  minMatch: 8,
  scatterTrigger: 4,
  scatterRetrigger: 3,
  freeSpinsInitial: 15,
  freeSpinsRetrigger: 5,
  multiplierValues: "2,3,5,10,15,25,50,100",
  multiplierWeights: "30,25,20,12,6,3,2,1",
};

// Color tiers for orb values
function getOrbColor(value: number): string {
  if (value <= 8) return "bg-emerald-500"; // Green tier
  if (value <= 25) return "bg-blue-500"; // Blue tier
  if (value <= 50) return "bg-pink-500"; // Pink tier
  return "bg-red-500"; // Red tier
}

function getOrbTierLabel(value: number): string {
  if (value <= 8) return "Grøn";
  if (value <= 25) return "Blå";
  if (value <= 50) return "Pink";
  return "Rød";
}

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
        multiplierValues: map.gates_multiplier_values || DEFAULTS.multiplierValues,
        multiplierWeights: map.gates_multiplier_weights || DEFAULTS.multiplierWeights,
      } as GatesSettings;
    },
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  // Parse values and weights into arrays for probability display
  const orbData = useMemo(() => {
    const values = form.multiplierValues.split(",").map(v => parseInt(v.trim(), 10)).filter(v => !isNaN(v));
    const weights = form.multiplierWeights.split(",").map(v => parseInt(v.trim(), 10)).filter(v => !isNaN(v));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    
    // Match with multiplier symbol images
    const symbolMap = new Map(MULTIPLIER_SYMBOLS.map(s => [s.value, s]));
    
    return values.map((value, i) => ({
      value,
      weight: weights[i] || 0,
      percentage: totalWeight > 0 ? ((weights[i] || 0) / totalWeight) * 100 : 0,
      symbol: symbolMap.get(value),
    }));
  }, [form.multiplierValues, form.multiplierWeights]);

  const totalOrbWeight = useMemo(() => {
    return orbData.reduce((sum, o) => sum + o.weight, 0);
  }, [orbData]);

  // Update a single orb weight
  const updateOrbWeight = (index: number, newWeight: number) => {
    const weights = form.multiplierWeights.split(",").map(v => parseInt(v.trim(), 10));
    weights[index] = newWeight;
    setForm({ ...form, multiplierWeights: weights.join(",") });
  };

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
        { key: "gates_multiplier_values", value: s.multiplierValues },
        { key: "gates_multiplier_weights", value: s.multiplierWeights },
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

  // Calculate tier summaries
  const tiers = [
    { label: "Grøn (2x-8x)", color: "text-emerald-500", values: orbData.filter(o => o.value <= 8) },
    { label: "Blå (10x-25x)", color: "text-blue-500", values: orbData.filter(o => o.value > 8 && o.value <= 25) },
    { label: "Pink (50x)", color: "text-pink-500", values: orbData.filter(o => o.value > 25 && o.value <= 50) },
    { label: "Rød (100x+)", color: "text-red-500", values: orbData.filter(o => o.value > 50) },
  ];

  return (
    <>
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

      {/* Orb Probability Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Percent className="h-5 w-5 text-primary" />
            Sandsynlighedsoversigt — Multiplier Orbs
          </CardTitle>
          <CardDescription>
            Juster vægten for hver orb direkte. Højere vægt = oftere den orb vælges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Visual bar chart with inline weight editing */}
            <div className="space-y-3">
              {orbData.map((orb, index) => {
                const barColor = getOrbColor(orb.value);
                const tierLabel = getOrbTierLabel(orb.value);
                const maxPercentage = Math.max(...orbData.map(o => o.percentage), 1);
                const barWidth = (orb.percentage / maxPercentage) * 100;

                return (
                  <div key={`${orb.value}-${index}`} className="flex items-center gap-3">
                    {/* Orb image or placeholder */}
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                      {orb.symbol?.imageUrl ? (
                        <img src={orb.symbol.imageUrl} alt={`${orb.value}x`} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-sm font-bold">{orb.value}x</span>
                      )}
                    </div>
                    {/* Value label */}
                    <div className="w-14 text-sm font-semibold">{orb.value}x</div>
                    {/* Bar */}
                    <div className="flex-1 h-7 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} transition-all duration-300 rounded-full flex items-center justify-end pr-2`}
                        style={{ width: `${Math.max(barWidth, 3)}%` }}
                      >
                        {barWidth > 15 && (
                          <span className="text-xs font-medium text-white">{orb.percentage.toFixed(2)}%</span>
                        )}
                      </div>
                    </div>
                    {/* Percentage (shown outside bar if bar too small) */}
                    {(orbData.length > 0 && orb.percentage > 0 && (orb.percentage / maxPercentage) * 100 <= 15) && (
                      <span className="text-xs font-medium w-14 text-right">{orb.percentage.toFixed(2)}%</span>
                    )}
                    {/* Editable weight */}
                    <Input
                      type="number"
                      min={0}
                      value={orb.weight}
                      onChange={(e) => updateOrbWeight(index, parseInt(e.target.value) || 0)}
                      className="w-20 h-8 text-sm text-center"
                    />
                  </div>
                );
              })}
            </div>

            {/* Tier summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{totalOrbWeight}</p>
                <p className="text-xs text-muted-foreground">Total Vægt</p>
              </div>
              {tiers.map((tier) => {
                const tierPct = tier.values.reduce((sum, o) => sum + o.percentage, 0);
                return (
                  <div key={tier.label} className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className={`text-2xl font-bold ${tier.color}`}>
                      {tierPct.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">{tier.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Save button for weights */}
            <Button
              onClick={() => saveMutation.mutate(form)}
              disabled={saveMutation.isPending}
              className="w-full"
            >
              {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Gem Orb Vægte
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
