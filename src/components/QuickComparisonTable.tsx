import { useCasinos } from "@/hooks/useCasinos";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";
import { Link } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA_VARIANTS = [
  "FÅ BONUS",
  "SE TILBUD",
  "SPIL NU",
  "PRØV HER",
  "HENT BONUS",
] as const;
const PARTNER_SLUGS = [
  "spildansknu",
  "spilleautomaten",
  "betinia",
  "campobet",
  "swift-casino",
  "luna-casino",
  "playkasino",
];

interface QuickComparisonTableProps {
  /** Number of casinos to show (default 3) */
  count?: number;
  /** Optional heading */
  title?: string;
  /** Casino slugs to prioritize (shown first in this order) */
  prioritySlugs?: string[];
}

/**
 * Dense comparison table with key metrics + direct CTA.
 * Designed for above-the-fold placement on money pages.
 */
export function QuickComparisonTable({
  count = 3,
  title = "Hurtig sammenligning",
  prioritySlugs,
}: QuickComparisonTableProps) {
  const { data: casinos } = useCasinos();
  const { user } = useAuth();
  const { pick } = useAntiFootprint();
  const ctaText = pick(CTA_VARIANTS);

  if (!casinos?.length) return null;

  let eligible = casinos.filter(
    (c) => c.is_active && PARTNER_SLUGS.includes(c.slug)
  );

  if (prioritySlugs?.length) {
    eligible.sort((a, b) => {
      const aIdx = prioritySlugs.indexOf(a.slug);
      const bIdx = prioritySlugs.indexOf(b.slug);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.position - b.position;
    });
  }

  const display = eligible.slice(0, count);
  if (display.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="py-2.5 px-3 text-left font-semibold">#</th>
              <th className="py-2.5 px-3 text-left font-semibold">Casino</th>
              <th className="py-2.5 px-3 text-left font-semibold hidden sm:table-cell">Bonus</th>
              <th className="py-2.5 px-3 text-left font-semibold hidden md:table-cell">Omsætning</th>
              <th className="py-2.5 px-3 text-left font-semibold hidden md:table-cell">Udbetaling</th>
              <th className="py-2.5 px-3 text-center font-semibold">Score</th>
              <th className="py-2.5 px-3 text-right font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {display.map((casino, i) => {
              const score = CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating);
              return (
                <tr
                  key={casino.id}
                  className={`border-b border-border last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}
                >
                  <td className="py-3 px-3 font-bold text-primary">{i + 1}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {casino.logo_url && (
                        <img
                          src={optimizeStorageImage(casino.logo_url, 32)}
                          alt={`${casino.name} logo`}
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded object-contain bg-background"
                          loading="lazy"
                        />
                      )}
                      <Link
                        to={`/casino-anmeldelser/${casino.slug}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {casino.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground hidden sm:table-cell">
                    {casino.bonus_amount}
                  </td>
                  <td className="py-3 px-3 text-muted-foreground hidden md:table-cell">
                    {casino.wagering_requirements}
                  </td>
                  <td className="py-3 px-3 text-muted-foreground hidden md:table-cell">
                    {casino.payout_time}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 font-bold text-primary">
                      <Star className="h-3.5 w-3.5 fill-primary" />
                      {score.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      size="sm"
                      className="h-8 text-xs gap-1"
                      onClick={() => getAffiliateRedirect(casino.slug, user?.id)}
                    >
                      FÅ BONUS
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        18+ | Spil ansvarligt | Regler og vilkår gælder
      </p>
    </div>
  );
}
