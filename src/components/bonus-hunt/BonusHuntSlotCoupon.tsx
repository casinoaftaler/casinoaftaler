import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "@/styles/slot-coupon.css";

const MARKETS = [
  { q: "Betaler 10 bonusser over 100x?", oddsYes: 1.85, oddsNo: 1.95 },
  { q: "Betaler 5 bonusser over 300x?", oddsYes: 2.10, oddsNo: 1.70 },
  { q: "Betaler 2 bonusser over 500x?", oddsYes: 2.45, oddsNo: 1.55 },
  { q: "Kommer der mindst 1 gevinst over 1000x?", oddsYes: 3.20, oddsNo: 1.30 },
  { q: "Kommer der mindst 1 gevinst over 1500x?", oddsYes: 4.50, oddsNo: 1.15 },
  { q: "Bliver største gevinst over 1.000kr?", oddsYes: 1.60, oddsNo: 2.25 },
  { q: "Bliver største gevinst over 2000kr?", oddsYes: 2.30, oddsNo: 1.60 },
  { q: "Bliver største gevinst over 3000kr?", oddsYes: 3.50, oddsNo: 1.25 },
  { q: "Kommer der back-to-back bonus?", oddsYes: 2.00, oddsNo: 1.80 },
  { q: "Betaler 5 bonusser under 10x?", oddsYes: 1.40, oddsNo: 2.80 },
] as const;

interface Props {
  huntNumber: number;
  sessionId?: string;
  isLive?: boolean;
}

function getRiskLabel(multiplier: number | null) {
  if (multiplier === null) return null;
  if (multiplier < 5) return "Lav risiko";
  if (multiplier < 15) return "Balanceret";
  return "Høj risiko";
}

export function BonusHuntSlotCoupon({ huntNumber, sessionId, isLive }: Props) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<number, boolean | null>>(
    () => Object.fromEntries(MARKETS.map((_, i) => [i, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSelect = (index: number, value: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: value }));
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
      toast.success("Din kupon er registreret.");
    } catch {
      toast.error("Kunne ikke gemme kuponen. Prøv igen.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = (answeredCount / MARKETS.length) * 100;
  const riskLabel = getRiskLabel(combinedMultiplier);

  return (
    <div className="relative slot-coupon-nordic rounded-lg overflow-hidden flex flex-col slot-coupon-vignette">
      <div className="slot-coupon-glass rounded-lg flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
          <span className="text-xs font-semibold tracking-wide text-foreground/90">
            Slot Kupon
          </span>
          {isLive ? (
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-red-400/90">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 slot-coupon-live-pulse" />
              LIVE
            </span>
          ) : (
            <span className="text-[10px] text-muted-foreground">
              Hunt #{huntNumber}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="px-4 pt-2.5 pb-1">
          <div className="slot-coupon-progress bg-border/20">
            <div
              className="slot-coupon-progress-bar"
              data-complete={isComplete}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Markets */}
        <div className="overflow-y-auto max-h-[420px] scrollbar-thin">
          {MARKETS.map((market, i) => {
            const selected = answers[i];
            return (
              <div
                key={i}
                className="slot-coupon-market px-4 py-2.5 border-b border-border/15 last:border-b-0"
              >
                <p className="text-[11px] font-medium text-foreground/70 mb-1.5 leading-snug">
                  {market.q}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* JA */}
                  <button
                    type="button"
                    disabled={submitted}
                    onClick={() => handleSelect(i, true)}
                    className={cn(
                      "slot-coupon-odds-btn flex items-center justify-between rounded-md border px-3 py-1.5 text-xs font-semibold",
                      selected === true
                        ? "border-[hsl(150_35%_35%)] bg-[hsl(150_40%_20%/0.08)] text-[hsl(150_45%_55%)]"
                        : "border-border/40 bg-transparent text-muted-foreground hover:border-border/60 hover:text-foreground/80",
                      selected === false && "opacity-40",
                      submitted && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {selected === true && <Check className="h-3 w-3" />}
                      Ja
                    </span>
                    <span className="font-mono tabular-nums text-[10px] opacity-60">{market.oddsYes.toFixed(2)}</span>
                  </button>
                  {/* NEJ */}
                  <button
                    type="button"
                    disabled={submitted}
                    onClick={() => handleSelect(i, false)}
                    className={cn(
                      "slot-coupon-odds-btn flex items-center justify-between rounded-md border px-3 py-1.5 text-xs font-semibold",
                      selected === false
                        ? "border-[hsl(0_35%_40%)] bg-[hsl(0_40%_25%/0.08)] text-[hsl(0_45%_60%)]"
                        : "border-border/40 bg-transparent text-muted-foreground hover:border-border/60 hover:text-foreground/80",
                      selected === true && "opacity-40",
                      submitted && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {selected === false && <Check className="h-3 w-3" />}
                      Nej
                    </span>
                    <span className="font-mono tabular-nums text-[10px] opacity-60">{market.oddsNo.toFixed(2)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer – betting slip style */}
        <div className="border-t border-border/30 bg-[hsl(240_10%_8%/0.6)] px-4 py-3.5 space-y-2.5 sticky bottom-0">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Slot Kupon – Hunt #{huntNumber}</span>
            <span className="tabular-nums">{answeredCount}/{MARKETS.length} markeder</span>
          </div>

          {combinedMultiplier !== null && (
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">Samlet multiplikator</span>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-sm font-bold tabular-nums font-mono",
                  isComplete ? "text-foreground" : "text-foreground/70"
                )}>
                  {combinedMultiplier.toFixed(1)}x
                </span>
                {riskLabel && (
                  <span className="text-[9px] text-muted-foreground/70 border border-border/30 rounded px-1.5 py-0.5">
                    {riskLabel}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="text-[10px] font-medium text-center">
            {submitted ? (
              <span className="text-[hsl(150_40%_50%)]">Kupon registreret</span>
            ) : isComplete ? (
              <span className="text-[hsl(150_40%_50%)]">Klar til indsendelse</span>
            ) : (
              <span className="text-muted-foreground/60">Afventer valg</span>
            )}
          </div>

          {/* CTA */}
          {submitted ? (
            <div className="flex items-center justify-center gap-2 rounded-md border border-[hsl(150_30%_30%)] bg-[hsl(150_30%_15%/0.1)] py-2 text-xs font-medium text-[hsl(150_40%_50%)]">
              <Check className="h-3.5 w-3.5" />
              Registreret
            </div>
          ) : user ? (
            <Button
              onClick={handleSubmit}
              disabled={!isComplete || submitting}
              className={cn(
                "w-full text-xs font-semibold transition-all duration-200",
                isComplete && "shadow-[0_0_16px_hsl(150_40%_40%/0.15)]"
              )}
              size="sm"
            >
              {submitting ? "Gemmer..." : isComplete ? "Deltag i Prediction" : `Vælg ${MARKETS.length - answeredCount} markeder mere`}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-1.5 rounded-md border border-border/30 py-2 text-[11px] text-muted-foreground/60">
              <Lock className="h-3 w-3" />
              Log ind for at deltage
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
