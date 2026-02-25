import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Renders a contextual "Læs vores fulde anmeldelse" text-link for a casino.
 * Used on the Top 10 page to send body-equity to review pages.
 */
interface TopCasinoReviewLinkProps {
  slug: string;
  name: string;
}

export function TopCasinoReviewLink({ slug, name }: TopCasinoReviewLinkProps) {
  return (
    <Link
      to={`/casino-anmeldelser/${slug}`}
      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium mt-2"
    >
      Læs vores fulde {name} anmeldelse
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}
