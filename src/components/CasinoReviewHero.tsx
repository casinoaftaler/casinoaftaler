import { useCasinos } from "@/hooks/useCasinos";

interface CasinoReviewHeroProps {
  slug: string;
  casinoName?: string;
}

export function CasinoReviewHero({ slug, casinoName }: CasinoReviewHeroProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);
  const logoUrl = casino?.logo_url;
  const displayName = casinoName || casino?.name || slug;

  if (!logoUrl) return null;

  return (
    <div className="mb-8 mt-6 w-full overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-center py-12 px-6 md:py-16">
        <img
          src={logoUrl}
          alt={`${displayName} logo`}
          className="h-20 max-w-[280px] object-contain md:h-28 md:max-w-[360px] lg:h-32 lg:max-w-[420px]"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
