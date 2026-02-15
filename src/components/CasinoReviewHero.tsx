import { useCasinos } from "@/hooks/useCasinos";

interface CasinoReviewHeroProps {
  slug: string;
  casinoName?: string;
}

export function CasinoReviewHero({ slug, casinoName }: CasinoReviewHeroProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);
  const logoUrl = casino?.logo_url;

  if (!logoUrl) return null;

  return (
    <div className="mb-8 mt-6 w-full overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-center py-12 px-6 md:py-16">
        <img
          src={logoUrl}
          alt={`${casinoName || casino?.name || slug} logo`}
          className="h-20 w-auto max-w-[320px] object-contain md:h-28 md:max-w-[400px]"
        />
      </div>
    </div>
  );
}
