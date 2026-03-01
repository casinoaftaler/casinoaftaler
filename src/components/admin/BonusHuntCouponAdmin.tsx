import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Ticket, Save, Plus, Trash2 } from "lucide-react";
import { DEFAULT_MARKETS, type CouponMarket, type CouponCondition, type CouponConditionType } from "@/components/bonus-hunt/slotCouponMarkets";

interface CouponMarketEditable extends CouponMarket {
  enabled: boolean;
}

interface Props {
  session: any;
}

const CONDITION_LABELS: Record<CouponConditionType, string> = {
  bonuses_over_x: "Antal bonusser over X multiplier",
  bonuses_under_x: "Antal bonusser under X multiplier",
  max_win_over: "Største gevinst over beløb (kr)",
  max_x_over: "Største multiplier over X",
  back_to_back: "Back-to-back (konsekutive hits)",
};

export function BonusHuntCouponAdmin({ session }: Props) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<string | null>(null);

  // Parse session markets or fall back to defaults
  const sessionMarkets: CouponMarketEditable[] = (() => {
    const stored = session.coupon_markets;
    if (Array.isArray(stored) && stored.length > 0) return stored;
    return DEFAULT_MARKETS.map((m) => ({ ...m, enabled: true }));
  })();

  const [markets, setMarkets] = useState<CouponMarketEditable[]>(sessionMarkets);
  const [newMarket, setNewMarket] = useState({
    q: "",
    oddsYes: "1.80",
    oddsNo: "1.80",
    aggressive: true,
    conditionType: "bonuses_over_x" as CouponConditionType,
    conditionCount: "1",
    conditionMultiplier: "100",
    conditionAmount: "1000",
  });

  const toggleCoupon = async (value: boolean) => {
    setLoading("toggle");
    try {
      const update: any = { coupon_betting_open: value };
      if (value && (!Array.isArray(session.coupon_markets) || session.coupon_markets.length === 0)) {
        update.coupon_markets = markets;
      }
      const { error } = await (supabase.from("bonus_hunt_sessions" as any) as any)
        .update(update)
        .eq("id", session.id);
      if (error) throw error;
      toast.success(`Slot Kupon ${value ? "åbnet" : "lukket"}`);
      queryClient.invalidateQueries({ queryKey: ["admin-bonus-hunt-session-for-hunt"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  };

  const toggleMarket = (index: number) => {
    setMarkets((prev) =>
      prev.map((m, i) => (i === index ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const updateMarketField = (index: number, field: keyof CouponMarketEditable, value: any) => {
    setMarkets((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const updateCondition = (index: number, field: keyof CouponCondition, value: any) => {
    setMarkets((prev) =>
      prev.map((m, i) => {
        if (i !== index) return m;
        return { ...m, condition: { ...m.condition, [field]: value } as CouponCondition };
      })
    );
  };

  const updateConditionType = (index: number, type: CouponConditionType) => {
    setMarkets((prev) =>
      prev.map((m, i) => {
        if (i !== index) return m;
        const base: CouponCondition = { type };
        if (type === "bonuses_over_x" || type === "bonuses_under_x") {
          base.count = m.condition?.count ?? 1;
          base.multiplier = m.condition?.multiplier ?? 100;
        } else if (type === "max_win_over") {
          base.amount = m.condition?.amount ?? 1000;
        } else if (type === "max_x_over") {
          base.multiplier = m.condition?.multiplier ?? 1000;
        } else if (type === "back_to_back") {
          base.multiplier = m.condition?.multiplier ?? 50;
        }
        return { ...m, condition: base };
      })
    );
  };

  const removeMarket = (index: number) => {
    setMarkets((prev) => prev.filter((_, i) => i !== index));
  };

  const buildCondition = (): CouponCondition => {
    const type = newMarket.conditionType;
    const base: CouponCondition = { type };
    if (type === "bonuses_over_x" || type === "bonuses_under_x") {
      base.count = parseInt(newMarket.conditionCount) || 1;
      base.multiplier = parseFloat(newMarket.conditionMultiplier) || 100;
    } else if (type === "max_win_over") {
      base.amount = parseFloat(newMarket.conditionAmount) || 1000;
    } else if (type === "max_x_over") {
      base.multiplier = parseFloat(newMarket.conditionMultiplier) || 1000;
    } else if (type === "back_to_back") {
      base.multiplier = parseFloat(newMarket.conditionMultiplier) || 50;
    }
    return base;
  };

  const addMarket = () => {
    if (!newMarket.q.trim()) return;
    setMarkets((prev) => [
      ...prev,
      {
        q: newMarket.q.trim(),
        oddsYes: parseFloat(newMarket.oddsYes) || 1.80,
        oddsNo: parseFloat(newMarket.oddsNo) || 1.80,
        aggressive: newMarket.aggressive,
        enabled: true,
        condition: buildCondition(),
      },
    ]);
    setNewMarket({
      q: "", oddsYes: "1.80", oddsNo: "1.80", aggressive: true,
      conditionType: "bonuses_over_x", conditionCount: "1", conditionMultiplier: "100", conditionAmount: "1000",
    });
  };

  const saveMarkets = async () => {
    setLoading("save");
    try {
      const { error } = await (supabase.from("bonus_hunt_sessions" as any) as any)
        .update({ coupon_markets: markets })
        .eq("id", session.id);
      if (error) throw error;
      toast.success("Kupon-markeder gemt!");
      queryClient.invalidateQueries({ queryKey: ["admin-bonus-hunt-session-for-hunt"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  };

  const enabledCount = markets.filter((m) => m.enabled).length;

  const renderConditionFields = (condition: CouponCondition | undefined, index: number) => {
    if (!condition) return null;
    const type = condition.type;

    return (
      <div className="flex items-center gap-2 mt-1 flex-wrap">
        <Select
          value={type}
          onValueChange={(v) => updateConditionType(index, v as CouponConditionType)}
        >
          <SelectTrigger className="h-6 text-[10px] w-auto min-w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CONDITION_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(type === "bonuses_over_x" || type === "bonuses_under_x") && (
          <>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Antal:</span>
              <Input
                type="number" min="1"
                value={condition.count ?? 1}
                onChange={(e) => updateCondition(index, "count", parseInt(e.target.value) || 1)}
                className="h-6 w-12 text-[10px]"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">X:</span>
              <Input
                type="number" min="1"
                value={condition.multiplier ?? 100}
                onChange={(e) => updateCondition(index, "multiplier", parseFloat(e.target.value) || 100)}
                className="h-6 w-16 text-[10px]"
              />
            </div>
          </>
        )}

        {type === "max_win_over" && (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground">Kr:</span>
            <Input
              type="number" min="1"
              value={condition.amount ?? 1000}
              onChange={(e) => updateCondition(index, "amount", parseFloat(e.target.value) || 1000)}
              className="h-6 w-20 text-[10px]"
            />
          </div>
        )}

        {type === "max_x_over" && (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground">X:</span>
            <Input
              type="number" min="1"
              value={condition.multiplier ?? 1000}
              onChange={(e) => updateCondition(index, "multiplier", parseFloat(e.target.value) || 1000)}
              className="h-6 w-16 text-[10px]"
            />
          </div>
        )}

        {type === "back_to_back" && (
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground">Min X:</span>
            <Input
              type="number" min="1"
              value={condition.multiplier ?? 50}
              onChange={(e) => updateCondition(index, "multiplier", parseFloat(e.target.value) || 50)}
              className="h-6 w-16 text-[10px]"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Ticket className="h-5 w-5 text-primary" />
            Slot Kupon
          </CardTitle>
          <Badge
            className={
              session.coupon_betting_open
                ? "bg-green-500/20 text-green-400"
                : "bg-muted text-muted-foreground"
            }
          >
            {session.coupon_betting_open ? "Åben" : "Lukket"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm">Kupon åben for submissions</Label>
          <Switch
            checked={session.coupon_betting_open}
            onCheckedChange={toggleCoupon}
            disabled={loading === "toggle"}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {enabledCount} ud af {markets.length} markeder aktive · Resultater beregnes automatisk fra hunt-data
        </p>

        <Separator />

        {/* Markets list */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Markeder</h4>
          <div className="space-y-1.5 max-h-[450px] overflow-y-auto">
            {markets.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg border border-border/50 p-2 text-xs"
              >
                <Checkbox
                  checked={m.enabled}
                  onCheckedChange={() => toggleMarket(i)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <Input
                    value={m.q}
                    onChange={(e) => updateMarketField(i, "q", e.target.value)}
                    className="h-7 text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Ja:</span>
                      <Input
                        type="number"
                        step="0.05"
                        value={m.oddsYes}
                        onChange={(e) =>
                          updateMarketField(i, "oddsYes", parseFloat(e.target.value) || 1)
                        }
                        className="h-6 w-16 text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Nej:</span>
                      <Input
                        type="number"
                        step="0.05"
                        value={m.oddsNo}
                        onChange={(e) =>
                          updateMarketField(i, "oddsNo", parseFloat(e.target.value) || 1)
                        }
                        className="h-6 w-16 text-xs"
                      />
                    </div>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <Checkbox
                        checked={m.aggressive}
                        onCheckedChange={(v) => updateMarketField(i, "aggressive", !!v)}
                        className="h-3 w-3"
                      />
                      <span className="text-muted-foreground">Aggressiv</span>
                    </label>
                  </div>
                  {/* Condition config */}
                  {renderConditionFields(m.condition, i)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => removeMarket(i)}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Add new market */}
        <div className="space-y-2 rounded-lg border border-dashed border-border/50 p-3">
          <h4 className="font-semibold text-xs text-muted-foreground">Tilføj nyt marked</h4>
          <Input
            placeholder='F.eks. "Bliver største gevinst over 5000kr?"'
            value={newMarket.q}
            onChange={(e) => setNewMarket({ ...newMarket, q: e.target.value })}
            className="h-7 text-xs"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Ja:</span>
              <Input
                type="number"
                step="0.05"
                value={newMarket.oddsYes}
                onChange={(e) => setNewMarket({ ...newMarket, oddsYes: e.target.value })}
                className="h-6 w-16 text-xs"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Nej:</span>
              <Input
                type="number"
                step="0.05"
                value={newMarket.oddsNo}
                onChange={(e) => setNewMarket({ ...newMarket, oddsNo: e.target.value })}
                className="h-6 w-16 text-xs"
              />
            </div>
          </div>

          {/* Condition for new market */}
          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={newMarket.conditionType}
              onValueChange={(v) => setNewMarket({ ...newMarket, conditionType: v as CouponConditionType })}
            >
              <SelectTrigger className="h-6 text-[10px] w-auto min-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CONDITION_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(newMarket.conditionType === "bonuses_over_x" || newMarket.conditionType === "bonuses_under_x") && (
              <>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">Antal:</span>
                  <Input
                    type="number" min="1"
                    value={newMarket.conditionCount}
                    onChange={(e) => setNewMarket({ ...newMarket, conditionCount: e.target.value })}
                    className="h-6 w-12 text-[10px]"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">X:</span>
                  <Input
                    type="number" min="1"
                    value={newMarket.conditionMultiplier}
                    onChange={(e) => setNewMarket({ ...newMarket, conditionMultiplier: e.target.value })}
                    className="h-6 w-16 text-[10px]"
                  />
                </div>
              </>
            )}

            {newMarket.conditionType === "max_win_over" && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground">Kr:</span>
                <Input
                  type="number" min="1"
                  value={newMarket.conditionAmount}
                  onChange={(e) => setNewMarket({ ...newMarket, conditionAmount: e.target.value })}
                  className="h-6 w-20 text-[10px]"
                />
              </div>
            )}

            {newMarket.conditionType === "max_x_over" && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground">X:</span>
                <Input
                  type="number" min="1"
                  value={newMarket.conditionMultiplier}
                  onChange={(e) => setNewMarket({ ...newMarket, conditionMultiplier: e.target.value })}
                  className="h-6 w-16 text-[10px]"
                />
              </div>
            )}

            {newMarket.conditionType === "back_to_back" && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground">Min X:</span>
                <Input
                  type="number" min="1"
                  value={newMarket.conditionMultiplier}
                  onChange={(e) => setNewMarket({ ...newMarket, conditionMultiplier: e.target.value })}
                  className="h-6 w-16 text-[10px]"
                />
              </div>
            )}
          </div>

          <Button variant="outline" size="sm" onClick={addMarket} className="h-6 text-xs">
            <Plus className="h-3 w-3 mr-1" /> Tilføj
          </Button>
        </div>

        <Button onClick={saveMarkets} disabled={loading === "save"} className="w-full">
          {loading === "save" ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Gem markeder
        </Button>
      </CardContent>
    </Card>
  );
}
