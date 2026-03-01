import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Lock, Ticket, Flame, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "@/styles/slot-coupon.css";

const MARKETS = [
  { q: "Betaler 10 bonusser over 100x?", oddsYes: 1.85, oddsNo: 1.95, aggressive: true },
  { q: "Betaler 5 bonusser over 300x?", oddsYes: 2.10, oddsNo: 1.70, aggressive: true },
  { q: "Betaler 2 bonusser over 500x?", oddsYes: 2.45, oddsNo: 1.55, aggressive: true },
  { q: "Kommer der mindst 1 gevinst over 1000x?", oddsYes: 3.20, oddsNo: 1.30, aggressive: true },
  { q: "Kommer der mindst 1 gevinst over 1500x?", oddsYes: 4.50, oddsNo: 1.15, aggressive: true },
  { q: "Bliver største gevinst over 1.000kr?", oddsYes: 1.60, oddsNo: 2.25, aggressive: true },
  { q: "Bliver største gevinst over 2000kr?", oddsYes: 2.30, oddsNo: 1.60, aggressive: true },
  { q: "Bliver største gevinst over 3000kr?", oddsYes: 3.50, oddsNo: 1.25, aggressive: true },
  { q: "Kommer der back-to-back bonus?", oddsYes: 2.00, oddsNo: 1.80, aggressive: false },
  { q: "Betaler 5 bonusser under 10x?", oddsYes: 1.40, oddsNo: 2.80, aggressive: false },
] as const;

interface Props {
  huntNumber: number;
  sessionId?: string;
  isLive?: boolean;
}

export function BonusHuntSlotCoupon({ huntNumber, sessionId, isLive }: Props) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, boolean | null>>(
    () => Object.fromEntries(MARKETS.map((_, i) => [i, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastChanged, setLastChanged] = useState<number | null>(null);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers]
  );
  const isComplete = answeredCount === MARKETS.length;

  const combinedMultiplier = useMemo(() => {
    let product = 1;
    let count = 0;
    Object.entries(answers).forEach(([idx, val]) => {
      if (val === null) return;
      const m = MARKETS[Number(idx)];
      product *= val ? m.oddsYes : m.oddsNo;
      count++;
    });
    return count > 0 ? product : null;
  }, [answers]);

  const riskProfile = useMemo(() => {
    const yesAggressive = Object.entries(answers).filter(
      ([idx, v]) => v === true && MARKETS[Number(idx)].aggressive
    ).length;
    const answered = Object.values(answers).filter((v) => v !== null).length;
    if (answered < 3) return null;
    if (yesAggressive >= 6) return { label: "High Roller", icon: Flame, type: "aggressive" as const };
    if (yesAggressive <= 2) return { label: "Sikker", icon: Shield, type: "defensive" as const };
    return { label: "Balanceret", icon: Zap, type: "balanced" as const };
  }, [answers]);

  const handleSelect = (index: number, value: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: value }));
    setLastChanged(index);
    setTimeout(() => setLastChanged(null), 400);
  };

  const handleSubmit = async () => {
    if (!user || !isComplete || submitted) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("bonus_hunt_slot_coupons")
        .upsert(
          { user_id: user.id, hunt_number: huntNumber, session_id: sessionId || null, answers: answers as Record<string, boolean | null> },
          { onConflict: "user_id,hunt_number" }
        );
      if (error) throw error;
      setSubmitted(true);
      toast.success("Din Slot Kupon er registreret! 🎰");
    } catch {
      toast.error("Kunne ikke gemme kuponen. Prøv igen.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = (answeredCount / MARKETS.length) * 100;

  return (
    <div className="relative rounded-xl border border-border/60 slot-coupon-bg overflow-hidden shadow-lg flex flex-col">
      {/* Radial glow */}
      <div className="slot-coupon-glow" />

      {/* Floating particles */}
      <div className="slot-coupon-particles" aria-hidden="true">
        <div className="slot-coupon-particle" />
        <div className="slot-coupon-particle" />
        <div className="slot-coupon-particle" />
        <div className="slot-coupon-particle" />
        <div className="slot-coupon-particle" />
      </div>

      {/* Header */}
      <div className="relative z-10 overflow-hidden px-4 py-3 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm text-foreground tracking-wide">Slot Kupon</span>
          </div>
          <div className={cn(
            "flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full",
            isLive ? "bg-green-500/15 text-green-400" : "bg-muted text-muted-foreground"
          )}>
            {isLive ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="slot-coupon-live-dot absolute inset-0 rounded-full" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                Hunt #{huntNumber} – Live
              </>
            ) : (
              <>Hunt #{huntNumber}</>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 px-4 pt-2">
        <div className="slot-coupon-progress-track bg-muted/30">
          <div
            className="slot-coupon-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Markets – scrollable */}
      <div className="relative z-10 divide-y divide-border/30 overflow-y-auto max-h-[420px] scrollbar-thin">
        {MARKETS.map((market, i) => {
          const selected = answers[i];
          const justChanged = lastChanged === i;
          return (
            <div
              key={i}
              className={cn(
                "px-4 py-3 transition-all duration-200",
                selected !== null && "bg-primary/[0.02]",
                justChanged && "animate-in fade-in duration-300"
              )}
            >
              <p className="text-[11px] font-medium text-foreground/80 mb-2 leading-snug">{market.q}</p>
              <div className="grid grid-cols-2 gap-2">
                {/* JA */}
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(i, true)}
                  className={cn(
                    "slot-coupon-select-pop relative flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200",
                    selected === true
                      ? "border-green-500/50 bg-green-500/10 text-green-400 scale-[1.02] slot-coupon-odds-yes-active"
                      : "border-border/50 bg-muted/40 text-muted-foreground hover:border-green-500/30 hover:bg-green-500/5 hover:text-foreground",
                    selected === false && "opacity-50",
                    submitted && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {selected === true && <Check className="h-3 w-3" />}
                    JA
                  </span>
                  <span className="text-[10px] font-mono tabular-nums opacity-70">{market.oddsYes.toFixed(2)}</span>
                </button>
                {/* NEJ */}
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(i, false)}
                  className={cn(
                    "slot-coupon-select-pop relative flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200",
                    selected === false
                      ? "border-red-500/50 bg-red-500/10 text-red-400 scale-[1.02] slot-coupon-odds-no-active"
                      : "border-border/50 bg-muted/40 text-muted-foreground hover:border-red-500/30 hover:bg-red-500/5 hover:text-foreground",
                    selected === true && "opacity-50",
                    submitted && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {selected === false && <Check className="h-3 w-3" />}
                    NEJ
                  </span>
                  <span className="text-[10px] font-mono tabular-nums opacity-70">{market.oddsNo.toFixed(2)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky slip footer */}
      <div className="relative z-10 border-t-2 border-primary/20 bg-gradient-to-t from-muted/40 to-transparent px-4 py-4 space-y-3 sticky bottom-0">
        {/* Combined multiplier */}
        {combinedMultiplier !== null && (
          <div className="flex items-center justify-between rounded-lg bg-primary/[0.07] border border-primary/20 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Samlet multiplikator
            </div>
            <span className={cn(
              "text-base font-bold tabular-nums font-mono transition-all",
              combinedMultiplier > 100 ? "text-orange-400" : combinedMultiplier > 20 ? "text-amber-400" : "text-primary"
            )}>
              {combinedMultiplier.toFixed(1)}x
            </span>
          </div>
        )}

        {/* Risk + count row */}
        <div className="flex items-center justify-between">
          {riskProfile ? (
            <span className={cn(
              "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full",
              riskProfile.type === "aggressive" && "bg-orange-500/15 text-orange-400",
              riskProfile.type === "defensive" && "bg-blue-500/15 text-blue-400",
              riskProfile.type === "balanced" && "bg-primary/15 text-primary",
            )}>
              <riskProfile.icon className="h-3 w-3" />
              {riskProfile.label}
            </span>
          ) : <span />}
          <span className={cn(
            "text-xs font-bold tabular-nums",
            isComplete ? "text-primary" : "text-foreground"
          )}>
            {answeredCount}/{MARKETS.length} markeder
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium">
          <span className={cn(
            "h-2 w-2 rounded-full transition-colors",
            submitted ? "bg-green-400" : isComplete ? "bg-primary animate-pulse" : "bg-amber-400"
          )} />
          <span className={cn(
            submitted ? "text-green-400" : isComplete ? "text-primary" : "text-amber-400"
          )}>
            {submitted ? "Kupon registreret ✓" : isComplete ? "Kupon klar – Deltag nu!" : "Afventer valg"}
          </span>
        </div>

        {/* CTA */}
        {submitted ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 py-2.5 text-xs font-semibold text-green-400">
            <Check className="h-3.5 w-3.5" />
            Din kupon er registreret
          </div>
        ) : user ? (
          <Button
            onClick={handleSubmit}
            disabled={!isComplete || submitting}
            className={cn(
              "w-full text-sm font-bold transition-all duration-300",
              isComplete && "shadow-[0_0_24px_hsl(var(--primary)/0.4)] animate-pulse"
            )}
            size="default"
          >
            {submitting ? "Gemmer..." : isComplete ? "🎰 Deltag i Slot Kupon" : "Vælg alle 10 markeder"}
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 py-2.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Log ind for at deltage
          </div>
        )}
      </div>
    </div>
  );
}
