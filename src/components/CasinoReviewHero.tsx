import { useCasinos } from "@/hooks/useCasinos";
import { GPWASealBadge } from "@/components/GPWASealBadge";

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
      <div className="flex flex-col items-center justify-center gap-4 py-10 px-6 md:flex-row md:gap-6 md:py-14">
        <img
          src={logoUrl}
          alt={`${displayName} logo`}
          width={160}
          height={160}
          className="h-16 w-16 rounded-xl object-contain bg-background/50 p-1.5 md:h-20 md:w-20"
          loading="eager"
          fetchPriority="high"
        />
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {displayName}
        </h2>
        <div className="mt-3">
          <GPWASealBadge variant="inline" showTrustLink />
        </div>
      </div>
    </div>
  );
}
