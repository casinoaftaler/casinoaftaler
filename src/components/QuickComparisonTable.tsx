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

const RANK_CONFIG = [
  {
    gradient: "from-amber-400 to-amber-600",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    border: "border-amber-400/30",
  },
  {
    gradient: "from-slate-300 to-slate-500",
    glow: "shadow-[0_0_10px_rgba(148,163,184,0.4)]",
    border: "border-slate-300/30",
  },
  {
    gradient: "from-orange-500 to-orange-800",
    glow: "shadow-[0_0_10px_rgba(194,65,12,0.4)]",
    border: "border-orange-500/30",
  },
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
    <div className="flex items-center gap-px" aria-label={`Rating: ${score.toFixed(1)} ud af 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= full
              ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.4)]"
              : i === full + 1 && half
                ? "text-amber-400 fill-amber-400/50"
                : "text-muted-foreground/20"
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
    <section className="mb-10" aria-label={title}>
      <h3 className="text-lg font-bold text-foreground mb-4 tracking-tight">
        {title}
      </h3>

      <div className="flex flex-col gap-3">
        {display.map((casino, i) => {
          const score =
            CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating);
          const rank = RANK_CONFIG[i] ?? RANK_CONFIG[2];

          return (
            <article
              key={casino.id}
              className="relative rounded-2xl bg-card border border-border overflow-hidden group transition-all duration-200 hover:border-primary/25"
              style={{
                boxShadow: "0 1px 3px hsl(250 30% 10% / 0.04), 0 4px 14px hsl(250 30% 10% / 0.03)",
              }}
            >
              {/* Subtle left accent stripe */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${rank.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div className="pl-5 pr-4 py-4 sm:pl-6 sm:pr-5 sm:py-5">
                {/* ── Row 1: Logo block + Casino info + Bonus ── */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Rank + Logo stacked */}
                  <div className="relative shrink-0">
                    {/* Rank pip */}
                    <div
                      className={`absolute -top-1.5 -left-1.5 z-10 h-6 w-6 rounded-full bg-gradient-to-br ${rank.gradient} ${rank.glow} flex items-center justify-center`}
                    >
                      <span className="text-[11px] font-black text-white leading-none">
                        {i + 1}
                      </span>
                    </div>
                    <div className="rounded-xl bg-background border border-border/70 p-1 shadow-sm">
                      <img
                        src={optimizeStorageImage(casino.logo_url!, 80)}
                        alt={`${casino.name} logo`}
                        width={52}
                        height={52}
                        className="h-[52px] w-[52px] rounded-lg object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Name + Rating */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/casino-anmeldelser/${casino.slug}`}
                      className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1 leading-tight"
                    >
                      {casino.name}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-1">
                      <RatingStars score={score} />
                      <span className="text-sm font-bold text-primary tabular-nums leading-none">
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Bonus — always visible, responsive size */}
                  <div className="shrink-0 text-right">
                    <span className="block text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-none">
                      Bonus
                    </span>
                    <span className="block text-base sm:text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight mt-0.5 tracking-tight">
                      {casino.bonus_amount}
                    </span>
                  </div>
                </div>

                {/* ── Row 2: Stats ── */}
                <div className="mt-3.5 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { icon: RotateCw, label: "Omsætning", value: casino.wagering_requirements },
                    { icon: Clock, label: "Udbetaling", value: casino.payout_time },
                    { icon: Landmark, label: "Min. indbet.", value: casino.min_deposit },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 rounded-xl bg-muted/30 border border-border/40 py-2.5 px-1"
                    >
                      <Icon className="h-3.5 w-3.5 text-muted-foreground/70" strokeWidth={1.6} />
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground font-semibold leading-none">
                        {label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground leading-none">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ── CTA ── */}
                <div className="mt-3.5">
                  <Button
                    variant="cta"
                    className="w-full h-11 text-sm font-black tracking-wide gap-2 rounded-xl"
                    onClick={() => getAffiliateRedirect(casino.slug, user?.id)}
                  >
                    {ctaText}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* ── Disclaimer ── */}
                <div className="mt-3">
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
