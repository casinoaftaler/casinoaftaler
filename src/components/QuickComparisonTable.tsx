import { useState } from "react";
import { useCasinos } from "@/hooks/useCasinos";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";
import { Link } from "react-router-dom";
import { Star, Flame, Check, ChevronDown, Gift, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

interface QuickComparisonTableProps {
  count?: number;
  title?: string;
  prioritySlugs?: string[];
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
        {display.map((casino, i) => (
          <QuickCasinoCard
            key={casino.id}
            casino={casino}
            rank={i + 1}
            ctaText={ctaText}
            userId={user?.id}
          />
        ))}
      </div>
    </div>
  );
}

function QuickCasinoCard({
  casino,
  rank,
  ctaText,
  userId,
}: {
  casino: NonNullable<ReturnType<typeof useCasinos>["data"]>[number];
  rank: number;
  ctaText: string;
  userId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const score = CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating);
  const features = (casino.features as string[] | null) ?? [];
  const pros = (casino.pros as string[] | null) ?? [];
  const cons = (casino.cons as string[] | null) ?? [];
  const bonusType = casino.bonus_type === "No-sticky" ? "No-Sticky" : "Sticky";

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative group transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20">
        {/* Glow for #1 */}
        {rank === 1 && (
          <div className="absolute -inset-1 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40" />
        )}

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(260,70%,15%)] via-[hsl(210,90%,20%)] to-[hsl(260,70%,15%)] border border-white/10">
          {/* Top right badges */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {casino.is_recommended && (
              <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm font-bold px-2.5 py-1">
                Anbefalet
              </Badge>
            )}
            {casino.is_hot && (
              <div className="flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5">
                <Flame className="h-4 w-4 text-destructive-foreground" />
                <span className="text-sm font-bold text-destructive-foreground">HOT</span>
              </div>
            )}
          </div>

          {/* Header: Logo + Name/Rating */}
          <div className="flex items-center gap-4 p-4 pb-0">
            <div className="flex-shrink-0">
              {casino.logo_url ? (
                <img
                  src={optimizeStorageImage(casino.logo_url, 192) ?? casino.logo_url}
                  alt={`${casino.name} logo`}
                  width={96}
                  height={96}
                  loading={rank <= 2 ? "eager" : "lazy"}
                  className="h-24 w-24 rounded-xl object-cover border-2 border-white/30 shadow-lg"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm font-bold text-white border-2 border-white/30 text-2xl">
                  {casino.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to={`/casino-anmeldelser/${casino.slug}`}
                className="text-xl font-bold text-white hover:text-accent transition-colors"
              >
                {casino.name}
              </Link>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(score)
                        ? "fill-accent text-accent"
                        : "fill-white/20 text-white/20"
                    }`}
                  />
                ))}
                <span className="text-sm text-white/80 ml-1 font-medium">{score.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col p-5 pt-4">
            {/* Features with green checkmarks */}
            {features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
                {features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-white">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bonus headline */}
            <p className="text-center font-bold text-white mb-3 text-3xl">
              {casino.bonus_title || casino.bonus_amount}
            </p>

            {/* Stats Box */}
            <div className="bg-black/40 rounded-xl p-3 mb-4 border border-white/10">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <Gift className="h-5 w-5 text-accent mb-1" />
                  <p className="text-[10px] text-white/70 uppercase tracking-wider mb-0.5">BONUS TYPE</p>
                  <p className="text-lg font-bold text-white">{bonusType}</p>
                </div>
                <div className="flex flex-col items-center border-l border-white/20">
                  <RotateCcw className="h-5 w-5 text-accent mb-1" />
                  <p className="text-[10px] text-white/70 uppercase tracking-wider mb-0.5">OMSÆTNING</p>
                  <p className="text-lg font-bold text-white">{casino.wagering_requirements}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => getAffiliateRedirect(casino.slug, userId)}
              data-sponsored="true"
              variant="cta"
              className="group/btn relative w-full rounded-full overflow-hidden py-5 text-base"
            >
              <span className="absolute inset-0 -translate-x-full animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Gift className="relative z-10 h-5 w-5" />
              <span className="relative z-10">{ctaText}</span>
            </Button>

            {/* Vis Funktioner + Læs Anmeldelse */}
            <div className="flex items-center justify-between mt-3">
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors">
                  {isOpen ? "Vis mindre" : "Vis Funktioner"}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </CollapsibleTrigger>

              <Link
                to={`/casino-anmeldelser/${casino.slug}`}
                className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                Læs Anmeldelse
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <CasinoCardDisclaimer />
            </div>

            {/* Collapsible Content */}
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="bg-black/40 rounded-xl p-4 mt-4 border border-white/10">
                {/* Casino Info */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold mb-3 uppercase tracking-wide text-white">Casino Info</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-start gap-2">
                      <Gift className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                      <div>
                        <p className="text-xs mb-0.5 text-white/70">Min. indbetaling</p>
                        <p className="text-sm font-medium text-white">{casino.min_deposit}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <RotateCcw className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                      <div>
                        <p className="text-xs mb-0.5 text-white/70">Udbetalingstid</p>
                        <p className="text-sm font-medium text-white">{casino.payout_time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                      <div>
                        <p className="text-xs mb-0.5 text-white/70">Gyldighed</p>
                        <p className="text-sm font-medium text-white">{casino.validity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {casino.description && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2 uppercase tracking-wide text-white">Beskrivelse</h4>
                    <p className="text-sm text-white/80">{casino.description}</p>
                  </div>
                )}

                {/* Pros & Cons */}
                {(pros.length > 0 || cons.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pros.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold mb-2 uppercase tracking-wide text-white">Fordele</h4>
                        <ul className="space-y-1">
                          {pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs">
                              <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-white/80">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {cons.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold mb-2 uppercase tracking-wide text-white">Ulemper</h4>
                        <ul className="space-y-1">
                          {cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs">
                              <span className="h-3.5 w-3.5 text-destructive flex-shrink-0 mt-0.5">✕</span>
                              <span className="text-white/80">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Extra features */}
                {features.length > 3 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-bold mb-2 uppercase tracking-wide text-white">Flere Funktioner</h4>
                    <div className="flex flex-wrap gap-2">
                      {features.slice(3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs text-white/80 border-white/30">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </div>
      </div>
    </Collapsible>
  );
}
