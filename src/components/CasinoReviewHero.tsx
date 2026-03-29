import { useCasinos } from "@/hooks/useCasinos";

interface CasinoReviewHeroProps {
  slug: string;
  casinoName?: string;
}

const LIGHT_LOGO_SLUGS = new Set([
  "unibet", "leovegas", "mr-vegas", "mr-green", "comeon",
  "nordicbet", "onecasino", "betinia", "getlucky",
]);

export function CasinoReviewHero({ slug, casinoName }: CasinoReviewHeroProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);
  const logoUrl = casino?.logo_url;
  const displayName = casinoName || casino?.name || slug;
  const needsDarkBg = LIGHT_LOGO_SLUGS.has(slug);

  if (!logoUrl) return null;

  return (
    <div className="mb-8 mt-6 w-full overflow-hidden rounded-2xl border border-border/60">
      <div
        className="flex items-center justify-center py-10 px-8 md:py-14 lg:py-16"
        style={needsDarkBg ? { backgroundColor: "hsl(230, 25%, 18%)" } : undefined}
      >
        <img
          src={logoUrl}
          alt={`${displayName} logo`}
          className="h-16 max-w-[300px] object-contain md:h-24 md:max-w-[400px] lg:h-28 lg:max-w-[480px]"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
