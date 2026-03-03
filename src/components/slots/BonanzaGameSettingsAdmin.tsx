import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2, Candy, Bomb } from "lucide-react";
import { toast } from "sonner";

const BONANZA_SETTINGS_KEYS = [
  "bonanza_min_match",
  "bonanza_scatter_trigger",
  "bonanza_scatter_retrigger",
  "bonanza_free_spins_4",
  "bonanza_free_spins_5",
  "bonanza_free_spins_6",
  "bonanza_free_spins_retrigger",
  "bonanza_multiplier_chance_bonus",
  "bonanza_multiplier_values",
  "bonanza_multiplier_weights",
  "bonanza_reel_dup_2_chance",
  "bonanza_reel_dup_3_chance",
  "bonanza_symbol_width",
  "bonanza_symbol_height",
  "bonanza_symbol_scale",
  "bonanza_max_bet",
];

interface BonanzaSettings {
  minMatch: number;
  scatterTrigger: number;
  scatterRetrigger: number;
  freeSpins4: number;
  freeSpins5: number;
  freeSpins6: number;
  freeSpinsRetrigger: number;
  multiplierChanceBonus: number;
  multiplierValues: string;
  multiplierWeights: string;
  reelDup2Chance: number;
  reelDup3Chance: number;
  symbolWidth: number;
  symbolHeight: number;
  symbolScale: number;
  maxBet: number;
}

const DEFAULTS: BonanzaSettings = {
  minMatch: 8,
  scatterTrigger: 4,
  scatterRetrigger: 3,
  freeSpins4: 10,
  freeSpins5: 12,
  freeSpins6: 15,
  freeSpinsRetrigger: 5,
  multiplierChanceBonus: 0.10,
  multiplierValues: "2,3,5,10,15,25,50,100",
  multiplierWeights: "30,25,20,12,6,3,2,1",
  reelDup2Chance: 0.35,
  reelDup3Chance: 0.10,
  symbolWidth: 180,
  symbolHeight: 140,
  symbolScale: 100,
  maxBet: 10,
};

export function BonanzaGameSettingsAdmin() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<BonanzaSettings>(DEFAULTS);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["bonanza-game-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", BONANZA_SETTINGS_KEYS);
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((s) => { map[s.key] = s.value || ""; });
      return {
        minMatch: parseInt(map.bonanza_min_match || String(DEFAULTS.minMatch), 10),
        scatterTrigger: parseInt(map.bonanza_scatter_trigger || String(DEFAULTS.scatterTrigger), 10),
        scatterRetrigger: parseInt(map.bonanza_scatter_retrigger || String(DEFAULTS.scatterRetrigger), 10),
        freeSpins4: parseInt(map.bonanza_free_spins_4 || String(DEFAULTS.freeSpins4), 10),
        freeSpins5: parseInt(map.bonanza_free_spins_5 || String(DEFAULTS.freeSpins5), 10),
        freeSpins6: parseInt(map.bonanza_free_spins_6 || String(DEFAULTS.freeSpins6), 10),
        freeSpinsRetrigger: parseInt(map.bonanza_free_spins_retrigger || String(DEFAULTS.freeSpinsRetrigger), 10),
        multiplierChanceBonus: parseFloat(map.bonanza_multiplier_chance_bonus || String(DEFAULTS.multiplierChanceBonus)),
        multiplierValues: map.bonanza_multiplier_values || DEFAULTS.multiplierValues,
        multiplierWeights: map.bonanza_multiplier_weights || DEFAULTS.multiplierWeights,
        reelDup2Chance: parseFloat(map.bonanza_reel_dup_2_chance || String(DEFAULTS.reelDup2Chance)),
        reelDup3Chance: parseFloat(map.bonanza_reel_dup_3_chance || String(DEFAULTS.reelDup3Chance)),
        symbolWidth: parseInt(map.bonanza_symbol_width || String(DEFAULTS.symbolWidth), 10),
        symbolHeight: parseInt(map.bonanza_symbol_height || String(DEFAULTS.symbolHeight), 10),
        symbolScale: parseInt(map.bonanza_symbol_scale || String(DEFAULTS.symbolScale), 10),
        maxBet: parseInt(map.bonanza_max_bet || String(DEFAULTS.maxBet), 10),
      } as BonanzaSettings;
    },
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (s: BonanzaSettings) => {
      const updates = [
        { key: "bonanza_min_match", value: String(s.minMatch) },
        { key: "bonanza_scatter_trigger", value: String(s.scatterTrigger) },
        { key: "bonanza_scatter_retrigger", value: String(s.scatterRetrigger) },
        { key: "bonanza_free_spins_4", value: String(s.freeSpins4) },
        { key: "bonanza_free_spins_5", value: String(s.freeSpins5) },
        { key: "bonanza_free_spins_6", value: String(s.freeSpins6) },
        { key: "bonanza_free_spins_retrigger", value: String(s.freeSpinsRetrigger) },
        { key: "bonanza_multiplier_chance_bonus", value: String(s.multiplierChanceBonus) },
        { key: "bonanza_multiplier_values", value: s.multiplierValues },
        { key: "bonanza_multiplier_weights", value: s.multiplierWeights },
        { key: "bonanza_reel_dup_2_chance", value: String(s.reelDup2Chance) },
        { key: "bonanza_reel_dup_3_chance", value: String(s.reelDup3Chance) },
        { key: "bonanza_symbol_width", value: String(s.symbolWidth) },
        { key: "bonanza_symbol_height", value: String(s.symbolHeight) },
        { key: "bonanza_symbol_scale", value: String(s.symbolScale) },
        { key: "bonanza_max_bet", value: String(s.maxBet) },
      ];
      for (const u of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert({ key: u.key, value: u.value }, { onConflict: "key" });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonanza-game-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Bonanza indstillinger gemt");
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
          <Candy className="h-5 w-5 text-pink-500" />
          Fedesvin Bonanza — Spilmekanik
        </CardTitle>
        <CardDescription>
          Juster match-krav, scatter, free spins og multiplier-bomber for Fedesvin Bonanza.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bet Settings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Max Bet (credits)</Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={form.maxBet}
              onChange={(e) => setForm({ ...form, maxBet: parseInt(e.target.value) || 10 })}
            />
            <p className="text-xs text-muted-foreground">Maks indsats pr. spin</p>
          </div>
        </div>

        {/* Match & Scatter Settings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Min Match (symboler)</Label>
            <Input
              type="number"
              min={4}
              max={20}
              value={form.minMatch}
              onChange={(e) => setForm({ ...form, minMatch: parseInt(e.target.value) || 8 })}
            />
            <p className="text-xs text-muted-foreground">Minimum for gevinst (Pay Anywhere)</p>
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

        {/* Free Spins by Scatter Count */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Free Spins pr. Scatter Antal</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>4 Scatters</Label>
              <Input
                type="number"
                min={1}
                max={50}
                value={form.freeSpins4}
                onChange={(e) => setForm({ ...form, freeSpins4: parseInt(e.target.value) || 10 })}
              />
            </div>
            <div className="space-y-2">
              <Label>5 Scatters</Label>
              <Input
                type="number"
                min={1}
                max={50}
                value={form.freeSpins5}
                onChange={(e) => setForm({ ...form, freeSpins5: parseInt(e.target.value) || 12 })}
              />
            </div>
            <div className="space-y-2">
              <Label>6 Scatters</Label>
              <Input
                type="number"
                min={1}
                max={50}
                value={form.freeSpins6}
                onChange={(e) => setForm({ ...form, freeSpins6: parseInt(e.target.value) || 15 })}
              />
            </div>
            <div className="space-y-2">
              <Label>Retrigger Spins</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={form.freeSpinsRetrigger}
                onChange={(e) => setForm({ ...form, freeSpinsRetrigger: parseInt(e.target.value) || 5 })}
              />
            </div>
          </div>
        </div>

        {/* Multiplier Bomb Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Bomb className="h-4 w-4 text-orange-500" />
            Multiplier Bomber (Bonus)
          </h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Bomb Chance i Bonus</Label>
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
              Sandsynlighed pr. celle for en multiplier-bombe i free spins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Multiplier Værdier</Label>
              <Input
                value={form.multiplierValues}
                onChange={(e) => setForm({ ...form, multiplierValues: e.target.value })}
                placeholder="2,3,5,10,15,25,50,100"
              />
              <p className="text-xs text-muted-foreground">Kommasepareret liste af bomb-værdier</p>
            </div>
            <div className="space-y-2">
              <Label>Multiplier Vægte</Label>
              <Input
                value={form.multiplierWeights}
                onChange={(e) => setForm({ ...form, multiplierWeights: e.target.value })}
                placeholder="30,25,20,12,6,3,2,1"
              />
              <p className="text-xs text-muted-foreground">Vægte svarende til hver værdi (højere = hyppigere)</p>
            </div>
          </div>
        </div>

        {/* Reel Duplicate Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Reel Symbol Duplikering</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>2 ens pr. reel</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {(form.reelDup2Chance * 100).toFixed(1)}%
                </span>
              </div>
              <Slider
                min={0}
                max={0.80}
                step={0.01}
                value={[form.reelDup2Chance]}
                onValueChange={(v) => setForm({ ...form, reelDup2Chance: v[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Chance for at 2 symboler på en reel bliver ens.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>3 ens pr. reel</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {(form.reelDup3Chance * 100).toFixed(1)}%
                </span>
              </div>
              <Slider
                min={0}
                max={0.50}
                step={0.01}
                value={[form.reelDup3Chance]}
                onValueChange={(v) => setForm({ ...form, reelDup3Chance: v[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Chance for at 3 symboler på en reel bliver ens.
              </p>
            </div>
          </div>
        </div>

        {/* Symbol Size Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Symbol Størrelse</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Symbol Bredde (px)</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {form.symbolWidth}px
                </span>
              </div>
              <Slider
                min={100}
                max={280}
                step={5}
                value={[form.symbolWidth]}
                onValueChange={(v) => setForm({ ...form, symbolWidth: v[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Standard: 180px. Grid-bredden skalerer automatisk.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Symbol Højde (px)</Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {form.symbolHeight}px
                </span>
              </div>
              <Slider
                min={80}
                max={220}
                step={5}
                value={[form.symbolHeight]}
                onValueChange={(v) => setForm({ ...form, symbolHeight: v[0] })}
              />
              <p className="text-xs text-muted-foreground">
                Standard: 140px. Grid-højden skalerer automatisk.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Symbol Skalering</Label>
              <span className="text-sm text-muted-foreground font-mono">
                {form.symbolScale}%
              </span>
            </div>
            <Slider
              min={80}
              max={160}
              step={5}
              value={[form.symbolScale]}
              onValueChange={(v) => setForm({ ...form, symbolScale: v[0] })}
            />
            <p className="text-xs text-muted-foreground">
              Skalerer billederne uden at ændre grid-størrelsen. Over 100% overlapper naboceller.
            </p>
          </div>
        </div>

        <Button
          onClick={() => saveMutation.mutate(form)}
          disabled={saveMutation.isPending}
          className="w-full"
        >
          {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Gem Bonanza Indstillinger
        </Button>
      </CardContent>
    </Card>
  );
}
