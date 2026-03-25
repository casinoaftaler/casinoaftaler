import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";

/**
 * Contextual inline CTA for casino reviews.
 * Placed after high-intent sections (bonus analysis, EV analysis, payment section)
 * to capture users at peak decision moments.
 *
 * Design: Subtle but clear – not a full card, just a focused action row.
 */
interface InlineReviewCTAProps {
  casinoName: string;
  bonusText?: string;
  onClick: () => void;
  /** Variant controls the messaging context */
  variant?: "bonus" | "ev" | "payment" | "general";
}

const VARIANT_COPY: Record<string, { label: string; subtext: string }> = {
  bonus: {
    label: "Aktivér bonussen nu",
    subtext: "Opret konto og hent din velkomstbonus",
  },
  ev: {
    label: "Udnyt den positive EV",
    subtext: "Start med matematikken på din side",
  },
  payment: {
    label: "Prøv det selv",
    subtext: "MobilePay-indbetaling på under 30 sekunder",
  },
  general: {
    label: "Kom i gang",
    subtext: "Opret konto og se casinoet indefra",
  },
};

export function InlineReviewCTA({
  casinoName,
  bonusText,
  onClick,
  variant = "general",
}: InlineReviewCTAProps) {
  const copy = VARIANT_COPY[variant] ?? VARIANT_COPY.general;

  return (
    <div className="my-8 flex flex-col items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
      <Button
        onClick={onClick}
        size="lg"
        className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
      >
        <Gift className="mr-2 h-5 w-5" />
        {copy.label} hos {casinoName}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      {bonusText && (
        <p className="text-sm font-medium text-foreground">{bonusText}</p>
      )}
      <p className="text-xs text-muted-foreground">{copy.subtext}</p>
    </div>
  );
}
