import { Link } from "react-router-dom";
import { Trophy, Gift, Smartphone } from "lucide-react";

/**
 * Compact inline money-page links for casino reviews.
 * Replaces the old bulky "Bedste online casinoer" Card.
 * Renders as discrete pills – minimal visual weight, maximum link equity.
 */
interface ReviewMoneyLinksProps {
  showMobilePay?: boolean;
}

export function ReviewMoneyLinks({ showMobilePay = false }: ReviewMoneyLinksProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted-foreground font-medium mr-1">Udforsk også:</span>
      <Link
        to="/top-10-casino-online"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-medium text-primary transition-colors hover:bg-accent/50 hover:border-primary/40"
      >
        <Trophy className="h-3.5 w-3.5" />
        Top 10 Casinoer
      </Link>
      <Link
        to="/casino-bonus"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-medium text-primary transition-colors hover:bg-accent/50 hover:border-primary/40"
      >
        <Gift className="h-3.5 w-3.5" />
        Casino Bonusser
      </Link>
      {showMobilePay && (
        <Link
          to="/casino-med-mobilepay"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-medium text-primary transition-colors hover:bg-accent/50 hover:border-primary/40"
        >
          <Smartphone className="h-3.5 w-3.5" />
          MobilePay Casinoer
        </Link>
      )}
    </div>
  );
}
