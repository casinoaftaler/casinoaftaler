import { useCasinos } from "@/hooks/useCasinos";

interface CasinoReviewHeroProps {
  slug: string;
  casinoName?: string;
}

/* Map casino slugs to local logo assets (same as mega-menu uses) */
const localLogos = import.meta.glob<{ default: string }>(
  "/src/assets/casino-logos/*.{webp,png,jpg}",
  { eager: true }
);

const SLUG_TO_FILE: Record<string, string> = {
  "888casino": "888casino",
  "bet365": "bet365",
  "betinia": "betinia",
  "bwin": "bwin",
  "campobet": "campobet",
  "comeon": "comeon",
  "expekt": "expekt",
  "getlucky": "getlucky",
  "kapow-casino": "kapow",
  "leovegas": "leovegas",
  "luna-casino": "luna-casino",
  "mr-green": "mrgreen",
  "mr-vegas": "mrvegas",
  "onecasino": "onecasino",
  "play-kasino": "playkasino",
  "royal-casino": "royal-casino",
  "spildansknu": "spildansknu",
  "spilleautomaten": "spilleautomaten",
  "spreadex": "spreadex",
  "swift-casino": "swift-casino",
  "videoslots": "videoslots",
};

function resolveLocalLogo(slug: string): string | undefined {
  const fileName = SLUG_TO_FILE[slug];
  if (!fileName) return undefined;
  
  // Try webp first, then png, then jpg
  for (const ext of ["webp", "png", "jpg"]) {
    const key = `/src/assets/casino-logos/${fileName}.${ext}`;
    if (localLogos[key]) return localLogos[key].default;
  }
  return undefined;
}

const LIGHT_LOGO_SLUGS = new Set([
  "unibet", "leovegas", "mr-vegas", "mr-green", "comeon",
  "nordicbet", "onecasino", "betinia", "getlucky",
]);

export function CasinoReviewHero({ slug, casinoName }: CasinoReviewHeroProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);
  const displayName = casinoName || casino?.name || slug;
  
  // Prefer local asset (same as mega-menu), fall back to DB logo_url
  const logoUrl = resolveLocalLogo(slug) || casino?.logo_url;
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
