import { useCasinos } from "@/hooks/useCasinos";
import { StickyCTA } from "@/components/StickyCTA";

interface StickyCtaBySlugProps {
  slug: string;
}

export function StickyCtaBySlug({ slug }: StickyCtaBySlugProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);

  if (!casino) return null;

  return (
    <StickyCTA
      casinoSlug={casino.slug}
      casinoName={casino.name}
      bonusAmount={casino.bonus_amount}
      bonusType={casino.bonus_type}
      freeSpins={casino.free_spins}
      wageringRequirements={casino.wagering_requirements}
      rating={casino.rating}
      logoUrl={casino.logo_url}
      isRecommended={casino.is_recommended}
      isHot={casino.is_hot}
    />
  );
}
