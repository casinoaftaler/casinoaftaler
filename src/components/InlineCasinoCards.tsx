import { Loader2 } from "lucide-react";
import { useCasinos } from "@/hooks/useCasinos";
import { CasinoCard } from "@/components/CasinoCard";
import { Separator } from "@/components/ui/separator";

interface InlineCasinoCardsProps {
  /** Heading displayed above the casino cards */
  title?: string;
  /** Number of casinos to show (default: 2) */
  count?: number;
}

export function InlineCasinoCards({
  title = "Anbefalede Casinoer",
  count = 2,
}: InlineCasinoCardsProps) {
  const { data: casinos, isLoading } = useCasinos();
  const displayCasinos = casinos?.slice(0, count) ?? [];

  const mapCasino = (casino: (typeof displayCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
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
        <section className="mb-12">
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
      <section className="mb-12 space-y-4">
        <h3 className="text-lg font-semibold text-center text-muted-foreground">
          {title}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {displayCasinos.map((casino, index) => (
            <CasinoCard
              key={casino.id}
              casino={mapCasino(casino)}
              rank={index + 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
