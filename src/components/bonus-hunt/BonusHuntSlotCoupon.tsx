import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Lock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MARKETS = [
  "Betaler 10 bonusser over 100x?",
  "Betaler 5 bonusser over 300x?",
  "Betaler 2 bonusser over 500x?",
  "Kommer der mindst 1 gevinst over 1000x?",
  "Kommer der mindst 1 gevinst over 1500x?",
  "Bliver største gevinst over 1.000kr?",
  "Bliver største gevinst over 2000kr?",
  "Bliver største gevinst over 3000kr?",
  "Kommer der back-to-back bonus?",
  "Betaler 5 bonusser under 10x?",
] as const;

interface Props {
  huntNumber: number;
  sessionId?: string;
}

export function BonusHuntSlotCoupon({ huntNumber, sessionId }: Props) {
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

  const handleSelect = (index: number, value: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async () => {
    if (!user || !isComplete || submitted) return;
    setSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        hunt_number: huntNumber,
        session_id: sessionId || null,
        answers: answers as Record<string, boolean | null>,
      };
      const { error } = await supabase
        .from("bonus_hunt_slot_coupons")
        .upsert(payload, { onConflict: "user_id,hunt_number" });
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
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm text-foreground tracking-wide">
            Casinoaftaler – Slot Kupon
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Hunt #{huntNumber} · Forudsig 10 udfald
        </p>
      </div>

      {/* Markets */}
      <div className="divide-y divide-border/40">
        {MARKETS.map((question, i) => {
          const selected = answers[i];
          return (
            <div
              key={i}
              className={cn(
                "px-4 py-3 transition-colors duration-150",
                selected !== null && "bg-primary/[0.03]"
              )}
            >
              <p className="text-xs font-medium text-foreground mb-2 leading-snug">
                {question}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(i, true)}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                    selected === true
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
                      : "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    submitted && "opacity-70 cursor-not-allowed"
                  )}
                >
                  Ja
                </button>
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleSelect(i, false)}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                    selected === false
                      ? "border-destructive bg-destructive/15 text-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.2)]"
                      : "border-border/60 bg-muted/30 text-muted-foreground hover:border-destructive/40 hover:text-foreground",
                    submitted && "opacity-70 cursor-not-allowed"
                  )}
                >
                  Nej
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon footer */}
      <div className="border-t border-border bg-muted/30 px-4 py-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Valgte udfald</span>
          <span className={cn("font-bold", isComplete ? "text-primary" : "text-foreground")}>
            {answeredCount} / {MARKETS.length}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Status</span>
          <span className={cn("font-medium", isComplete ? "text-primary" : "text-amber-500")}>
            {submitted ? "Registreret ✓" : isComplete ? "Klar til at deltage" : "Kupon ikke fuldført"}
          </span>
        </div>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-2.5 text-xs font-semibold text-primary">
            <Check className="h-3.5 w-3.5" />
            Din kupon er registreret
          </div>
        ) : user ? (
          <Button
            onClick={handleSubmit}
            disabled={!isComplete || submitting}
            className="w-full text-xs"
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
