import { useCasinos } from "@/hooks/useCasinos";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";
import { Link } from "react-router-dom";
import { ExternalLink, Star, RotateCw, Clock, Landmark } from "lucide-react";
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

const RANK_COLORS = [
  { bg: "bg-amber-500", shadow: "shadow-amber-500/30", ring: "ring-amber-400/40" },
  { bg: "bg-slate-400", shadow: "shadow-slate-400/20", ring: "ring-slate-300/30" },
  { bg: "bg-orange-700", shadow: "shadow-orange-700/20", ring: "ring-orange-600/30" },
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
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${score.toFixed(1)} ud af 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= full
              ? "text-amber-400 fill-amber-400"
              : i === full + 1 && half
                ? "text-amber-400 fill-amber-400/50"
                : "text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-muted/40 border border-border/50 px-3 py-3">
      <Icon className="h-4 w-4 text-primary/70" strokeWidth={1.8} />
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium leading-none">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground leading-none">{value}</span>
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
    <section className="mb-10" aria-label={title}>
      <h3 className="text-xl font-bold text-foreground mb-5 tracking-tight">
        {title}
      </h3>

      <div className="flex flex-col gap-5">
        {display.map((casino, i) => {
          const score =
            CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating);
          const rank = RANK_COLORS[i] ?? {
            bg: "bg-muted",
            shadow: "shadow-none",
            ring: "ring-border",
          };

          return (
            <article
              key={casino.id}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div className="p-5 sm:p-6">
                {/* ── Header: Rank + Logo + Name/Rating + Bonus ── */}
                <div className="flex items-start gap-4">
                  {/* Rank badge */}
                  <div
                    className={`shrink-0 flex items-center justify-center h-9 w-9 rounded-full text-sm font-black text-white shadow-lg ring-2 ${rank.bg} ${rank.shadow} ${rank.ring}`}
                  >
                    {i + 1}
                  </div>

                  {/* Logo */}
                  {casino.logo_url && (
                    <div className="shrink-0 rounded-xl bg-background border border-border/60 p-1.5 shadow-sm">
                      <img
                        src={optimizeStorageImage(casino.logo_url, 88)}
                        alt={`${casino.name} logo`}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-lg object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Name + Stars */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <Link
                      to={`/casino-anmeldelser/${casino.slug}`}
                      className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {casino.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1.5">
                      <RatingStars score={score} />
                      <span className="text-base font-bold text-primary tabular-nums">
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Bonus — desktop */}
                  <div className="shrink-0 text-right hidden sm:flex flex-col items-end gap-0.5">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                      Bonus
                    </span>
                    <span className="text-xl font-black text-primary leading-tight tracking-tight">
                      {casino.bonus_amount}
                    </span>
                  </div>
                </div>

                {/* Bonus — mobile */}
                <div className="mt-4 sm:hidden">
                  <div className="flex items-center justify-between rounded-xl bg-primary/[0.06] border border-primary/10 px-4 py-2.5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Bonus
                    </span>
                    <span className="text-lg font-black text-primary tracking-tight">
                      {casino.bonus_amount}
                    </span>
                  </div>
                </div>

                {/* ── Stats row ── */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <StatPill
                    icon={RotateCw}
                    label="Omsætning"
                    value={casino.wagering_requirements}
                  />
                  <StatPill
                    icon={Clock}
                    label="Udbetaling"
                    value={casino.payout_time}
                  />
                  <StatPill
                    icon={Landmark}
                    label="Min. indbet."
                    value={casino.min_deposit}
                  />
                </div>

                {/* ── CTA ── */}
                <div className="mt-5">
                  <Button
                    variant="cta"
                    className="w-full h-12 text-base font-black tracking-wide gap-2 rounded-xl"
                    onClick={() =>
                      getAffiliateRedirect(casino.slug, user?.id)
                    }
                  >
                    {ctaText}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                {/* ── Disclaimer ── */}
                <div className="mt-4">
                  <CasinoCardDisclaimer />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
