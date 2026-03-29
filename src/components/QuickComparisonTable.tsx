import { useCasinos } from "@/hooks/useCasinos";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";
import { Link } from "react-router-dom";
import { ExternalLink, Star, Clock, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CasinoCardDisclaimer } from "@/components/CasinoCardDisclaimer";

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

const RANK_STYLES = [
  "bg-amber-500 text-white shadow-amber-500/40",
  "bg-slate-400 text-white shadow-slate-400/30",
  "bg-orange-700 text-white shadow-orange-700/30",
] as const;

interface QuickComparisonTableProps {
  count?: number;
  title?: string;
  prioritySlugs?: string[];
}

function RatingStars({ score }: { score: number }) {
  const full = Math.floor(score);
  const half = score - full >= 0.25;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= full
              ? "text-amber-400 fill-amber-400"
              : i === full + 1 && half
                ? "text-amber-400 fill-amber-400/50"
                : "text-muted-foreground/25"
          }`}
        />
      ))}
    </div>
  );
}

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
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="flex flex-col gap-4">
        {display.map((casino, i) => {
          const score = CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating);
          const rankStyle = RANK_STYLES[i] ?? "bg-muted text-muted-foreground";

          return (
            <div
              key={casino.id}
              className="relative rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Rank badge */}
              <div
                className={`absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-md ${rankStyle}`}
              >
                {i + 1}
              </div>

              <div className="p-4 pt-5 sm:p-5">
                {/* Top row: Logo + Name/Rating + Bonus */}
                <div className="flex items-start gap-4 ml-8 sm:ml-10">
                  {/* Logo */}
                  {casino.logo_url && (
                    <div className="shrink-0 rounded-lg bg-background border border-border p-1.5">
                      <img
                        src={optimizeStorageImage(casino.logo_url, 80)}
                        alt={`${casino.name} logo`}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-md object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Name + Rating */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/casino-anmeldelser/${casino.slug}`}
                      className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {casino.name}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-1">
                      <RatingStars score={score} />
                      <span className="text-sm font-semibold text-primary tabular-nums">
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Bonus highlight */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <span className="block text-xs text-muted-foreground">Bonus</span>
                    <span className="block text-lg font-bold text-primary leading-tight">
                      {casino.bonus_amount}
                    </span>
                  </div>
                </div>

                {/* Mobile bonus (shown only on small screens) */}
                <div className="mt-3 ml-8 sm:hidden rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-center">
                  <span className="text-xs text-muted-foreground">Bonus: </span>
                  <span className="font-bold text-primary">{casino.bonus_amount}</span>
                </div>

                {/* Stats row */}
                <div className="mt-4 grid grid-cols-3 gap-2 ml-8 sm:ml-10">
                  <div className="flex flex-col items-center rounded-lg bg-muted/50 px-2 py-2.5">
                    <RefreshCw className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground leading-tight">Omsætning</span>
                    <span className="text-xs font-semibold text-foreground mt-0.5">
                      {casino.wagering_requirements}
                    </span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-muted/50 px-2 py-2.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground leading-tight">Udbetaling</span>
                    <span className="text-xs font-semibold text-foreground mt-0.5">
                      {casino.payout_time}
                    </span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-muted/50 px-2 py-2.5">
                    <Wallet className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground leading-tight">Min. indbet.</span>
                    <span className="text-xs font-semibold text-foreground mt-0.5">
                      {casino.min_deposit}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 ml-8 sm:ml-10">
                  <Button
                    variant="cta"
                    className="w-full h-11 text-sm gap-1.5"
                    onClick={() => getAffiliateRedirect(casino.slug, user?.id)}
                  >
                    {ctaText}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Disclaimer */}
                <div className="mt-3 ml-8 sm:ml-10">
                  <CasinoCardDisclaimer />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
