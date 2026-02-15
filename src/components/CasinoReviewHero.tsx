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
    <div className="mb-8 mt-6 flex justify-center">
      <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
        <img
          src={logoUrl}
          alt={`${casinoName || casino?.name || slug} logo`}
          className="h-16 w-auto max-w-[280px] object-contain md:h-20 md:max-w-[360px]"
        />
      </div>
    </div>
  );
}
