import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCasinos } from "@/hooks/useCasinos";
import { CasinoCard } from "@/components/CasinoCard";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { Separator } from "@/components/ui/separator";
import { LazySection } from "@/components/LazySection";
import { useAntiFootprint } from "@/hooks/useAntiFootprint";

/** Only show casino cards for partner casinos */
const PARTNER_SLUGS = [
  "spildansknu",
  "spilleautomaten",
  "betinia",
  "campobet",
  "swift-casino",
  "luna-casino",
];

interface InlineCasinoCardsProps {
  /** Heading displayed above the casino cards */
  title?: string;
  /** Number of casinos to show (default: 6) */
  count?: number;
  /** Casino slugs to exclude */
  excludeSlugs?: string[];
}

export function InlineCasinoCards({
  title = "Anbefalede Casinoer",
  count = 6,
  excludeSlugs = [],
}: InlineCasinoCardsProps) {
  return (
    <LazySection
      rootMargin="300px"
      minHeight="320px"
      fallback={
        <>
          <Separator className="my-10" />
          <section className="mb-12" style={{ minHeight: '320px' }} />
        </>
      }
    >
      <InlineCasinoCardsInner title={title} count={count} excludeSlugs={excludeSlugs} />
    </LazySection>
  );
}

function InlineCasinoCardsInner({
  title,
  count,
  excludeSlugs,
}: Required<Pick<InlineCasinoCardsProps, 'title' | 'count'>> & Pick<InlineCasinoCardsProps, 'excludeSlugs'>) {
  const { data: casinos, isLoading } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const { pathname } = useLocation();

  // Get eligible casinos, then rotate order based on current page path
  const eligible = (casinos ?? [])
    .filter((c) => PARTNER_SLUGS.includes(c.slug) && !(excludeSlugs ?? []).includes(c.slug));

  const hash = hashPath(pathname);
  const offset = hash % Math.max(eligible.length, 1);
  const rotated = [...eligible.slice(offset), ...eligible.slice(0, offset)];
  const displayCasinos = rotated.slice(0, count);

  const mapCasino = (casino: (typeof displayCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

  if (isLoading) {
    return (
      <>
        <Separator className="my-10" />
        <section className="mb-12" style={{ minHeight: '320px' }}>
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </section>
      </>
    );
  }

  if (displayCasinos.length === 0) return null;

  return (
    <>
      <Separator className="my-10" />
      <section className="mb-12" style={{ minHeight: '320px' }}>
        <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {displayCasinos.slice(0, 2).map((casino, index) => (
              <CasinoCard
                key={casino.id}
                casino={mapCasino(casino)}
                rank={index + 1}
                open={openCasinoId === casino.id}
                onOpenChange={(open) =>
                  setOpenCasinoId(open ? casino.id : null)
                }
              />
            ))}
          </div>
          {displayCasinos.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {displayCasinos.slice(2).map((casino, index) => (
                <CasinoCard
                  key={casino.id}
                  casino={mapCasino(casino)}
                  rank={index + 3}
                  open={openCasinoId === casino.id}
                  onOpenChange={(open) =>
                    setOpenCasinoId(open ? casino.id : null)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
