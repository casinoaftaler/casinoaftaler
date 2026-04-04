import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, Shield } from "lucide-react";

interface ReviewAlternativeCTAProps {
  /** The affiliate partner slug to recommend */
  partnerSlug: string;
  /** Contextual headline, e.g. "Søger du et alternativ med dansk licens?" */
  headline: string;
  /** Short reason why this partner is recommended in this context */
  reason: string;
  /** Custom CTA button text */
  ctaText?: string;
}

/**
 * Mid-content CTA block for non-partner casino reviews.
 * Shows a relevant affiliate partner as a recommended alternative
 * with contextual reasoning for WHY this partner is relevant.
 */
export function ReviewAlternativeCTA({
  partnerSlug,
  headline,
  reason,
  ctaText,
}: ReviewAlternativeCTAProps) {
  const { data: casino } = useCasinoBySlug(partnerSlug);
  const { user } = useAuth();

  if (!casino) return null;

  const handleClick = () => {
    getAffiliateRedirect(casino.slug, user?.id);
  };

  const buttonText = ctaText || `Besøg ${casino.name}`;

  return (
    <div className="my-10 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/[0.02] to-transparent p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{headline}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{reason}</p>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{casino.rating}/5</span>
            </div>
            {casino.bonus_amount && (
              <span className="text-sm text-muted-foreground">
                Bonus: {casino.bonus_amount}
              </span>
            )}
            {casino.free_spins && (
              <span className="text-sm text-muted-foreground">
                + {casino.free_spins}
              </span>
            )}
          </div>
        </div>
        <Button
          onClick={handleClick}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 whitespace-nowrap"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
