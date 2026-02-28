import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Lock, Ticket, Flame, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MARKETS = [
  { q: "Betaler 10 bonusser over 100x?", oddsYes: "1.85", oddsNo: "1.95", aggressive: true },
  { q: "Betaler 5 bonusser over 300x?", oddsYes: "2.10", oddsNo: "1.70", aggressive: true },
  { q: "Betaler 2 bonusser over 500x?", oddsYes: "2.45", oddsNo: "1.55", aggressive: true },
  { q: "Kommer der mindst 1 gevinst over 1000x?", oddsYes: "3.20", oddsNo: "1.30", aggressive: true },
  { q: "Kommer der mindst 1 gevinst over 1500x?", oddsYes: "4.50", oddsNo: "1.15", aggressive: true },
  { q: "Bliver største gevinst over 1.000kr?", oddsYes: "1.60", oddsNo: "2.25", aggressive: true },
  { q: "Bliver største gevinst over 2000kr?", oddsYes: "2.30", oddsNo: "1.60", aggressive: true },
  { q: "Bliver største gevinst over 3000kr?", oddsYes: "3.50", oddsNo: "1.25", aggressive: true },
  { q: "Kommer der back-to-back bonus?", oddsYes: "2.00", oddsNo: "1.80", aggressive: false },
  { q: "Betaler 5 bonusser under 10x?", oddsYes: "1.40", oddsNo: "2.80", aggressive: false },
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

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers]
  );
  const isComplete = answeredCount === MARKETS.length;

  const riskProfile = useMemo(() => {
    const yesCount = Object.entries(answers).filter(
      ([idx, v]) => v === true && MARKETS[Number(idx)].aggressive
    ).length;
    const answered = Object.values(answers).filter((v) => v !== null).length;
    if (answered < 4) return null;
    if (yesCount >= 6) return { label: "Høj risiko 🔥", type: "aggressive" as const };
    if (yesCount <= 2) return { label: "Defensiv kupon 🛡️", type: "defensive" as const };
    return { label: "Balanceret kupon ⚖️", type: "balanced" as const };
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
      toast.success("Din Slot Kupon er registreret! 🎰");
    } catch {
      toast.error("Kunne ikke gemme kuponen. Prøv igen.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-lg">
      {/* Header – betting slip style */}
      <div className="relative overflow-hidden px-4 py-3 border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm text-foreground tracking-wide">
              Slot Kupon
            </span>
          </div>
          <div className={cn(
            "flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full",
            isLive
              ? "bg-green-500/15 text-green-400"
              : "bg-muted text-muted-foreground"
          )}>
            {isLive ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-green-400" />
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

      {/* Markets */}
      <div className="divide-y divide-border/30">
        {MARKETS.map((market, i) => {
          const selected = answers[i];
          return (
            <div
              key={i}
              className={cn(
                "px-4 py-3 transition-all duration-200",
                selected !== null && "bg-primary/[0.02]"
              )}
            >
              <p className="text-[11px] font-medium text-foreground/80 mb-2 leading-snug">
                {market.q}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {/* JA button */}
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(i, true)}
                  className={cn(
                    "relative flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200 group",
                    selected === true
                      ? "border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_0_12px_hsl(142_70%_45%/0.15)]"
                      : "border-border/50 bg-muted/40 text-muted-foreground hover:border-green-500/30 hover:bg-green-500/5 hover:text-foreground",
                    submitted && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {selected === true && <Check className="h-3 w-3 text-green-400" />}
                    JA
                  </span>
                  <span className={cn(
                    "text-[10px] font-mono tabular-nums",
                    selected === true ? "text-green-400/80" : "text-muted-foreground/60"
                  )}>
                    {market.oddsYes}
                  </span>
                </button>

                {/* NEJ button */}
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(i, false)}
                  className={cn(
                    "relative flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200 group",
                    selected === false
                      ? "border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_12px_hsl(0_70%_45%/0.15)]"
                      : "border-border/50 bg-muted/40 text-muted-foreground hover:border-red-500/30 hover:bg-red-500/5 hover:text-foreground",
                    submitted && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {selected === false && <Check className="h-3 w-3 text-red-400" />}
                    NEJ
                  </span>
                  <span className={cn(
                    "text-[10px] font-mono tabular-nums",
                    selected === false ? "text-red-400/80" : "text-muted-foreground/60"
                  )}>
                    {market.oddsNo}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slip footer */}
      <div className="border-t border-border/50 bg-muted/20 px-4 py-3 space-y-2.5">
        {/* Risk profile */}
        {riskProfile && (
          <div className={cn(
            "flex items-center justify-center gap-1.5 text-[10px] font-medium py-1 rounded-md",
            riskProfile.type === "aggressive" && "bg-orange-500/10 text-orange-400",
            riskProfile.type === "defensive" && "bg-blue-500/10 text-blue-400",
            riskProfile.type === "balanced" && "bg-primary/10 text-primary",
          )}>
            {riskProfile.type === "aggressive" && <Flame className="h-3 w-3" />}
            {riskProfile.type === "defensive" && <Shield className="h-3 w-3" />}
            {riskProfile.type === "balanced" && <Zap className="h-3 w-3" />}
            {riskProfile.label}
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Valgte markeder</span>
          <span className={cn(
            "font-bold tabular-nums transition-colors",
            isComplete ? "text-primary" : "text-foreground"
          )}>
            {answeredCount} / {MARKETS.length}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Status</span>
          <span className={cn("font-medium flex items-center gap-1.5", 
            submitted ? "text-green-400" : isComplete ? "text-primary" : "text-amber-400"
          )}>
            <span className={cn(
              "h-1.5 w-1.5 rounded-full",
              submitted ? "bg-green-400" : isComplete ? "bg-primary" : "bg-amber-400"
            )} />
            {submitted ? "Registreret" : isComplete ? "Kupon klar" : "Afventer valg"}
          </span>
        </div>

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
              "w-full text-xs transition-all",
              isComplete && "shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            )}
            size="sm"
          >
            {submitting ? "Gemmer..." : "Deltag i Slot Kupon"}
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
