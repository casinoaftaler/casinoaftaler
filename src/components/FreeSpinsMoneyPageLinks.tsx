import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Link, Star } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { CASINO_SCORES } from "@/lib/reviewScoring";

interface CampaignOffer {
  casino_slug: string;
  casino_name: string;
}

/**
 * Renders 3+ dofollow links to casino reviews based on which casinos
 * have active free spins campaigns. Visible in content, not hidden.
 */
export function FreeSpinsMoneyPageLinks({ campaigns }: { campaigns: CampaignOffer[] }) {
  const links = useMemo(() => {
    if (!campaigns?.length) return [];

    // Get unique casino slugs that have review pages
    const seen = new Set<string>();
    const result: { slug: string; name: string; score: number }[] = [];

    for (const c of campaigns) {
      if (seen.has(c.casino_slug)) continue;
      if (!CASINO_SCORES[c.casino_slug]) continue;
      seen.add(c.casino_slug);
      result.push({
        slug: c.casino_slug,
        name: c.casino_name,
        score: CASINO_SCORES[c.casino_slug].total,
      });
    }

    // Sort by score descending, take top 5
    return result.sort((a, b) => b.score - a.score).slice(0, 5);
  }, [campaigns]);

  if (links.length < 3) return null;

  return (
    <section className="mb-8 rounded-xl border border-border/40 bg-card/50 p-5 md:p-6">
      <h3 className="flex items-center gap-2 text-base font-semibold text-foreground mb-4">
        <MenuIcon iconName="book-open" className="h-5 w-5 text-primary" />
        Læs vores anmeldelser af disse casinoer
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        Få det fulde overblik over vilkår, spiludvalg og udbetalingstider for de casinoer med dagens bedste free spins tilbud:
      </p>
      <ul className="space-y-2">
        {links.map((casino) => (
          <li key={casino.slug} className="flex items-center gap-2">
            <MenuIcon iconName="star" className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <Link
              to={`/casino-anmeldelser/${casino.slug}`}
              className="text-sm text-primary hover:underline font-medium"
            >
              Læs vores {casino.name} anmeldelse
            </Link>
            <span className="text-xs text-muted-foreground">({casino.score.toFixed(1)}/5)</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
