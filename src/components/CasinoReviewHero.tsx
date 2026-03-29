import { useCasinos } from "@/hooks/useCasinos";

interface CasinoReviewHeroProps {
  slug: string;
  casinoName?: string;
}

/* Import all local logo assets (same sources as mega-menu) */
const casinoLogos = import.meta.glob<{ default: string }>(
  "/src/assets/casino-logos/*.{webp,png,jpg}",
  { eager: true }
);
const reviewLogos = import.meta.glob<{ default: string }>(
  "/src/assets/reviews/*.{webp,png,jpg}",
  { eager: true }
);

/* Map every review slug → local asset path (matching navData.ts exactly) */
const SLUG_TO_ASSET: Record<string, string> = {
  "spildansknu": "/src/assets/casino-logos/spildansknu.webp",
  "spilleautomaten": "/src/assets/casino-logos/spilleautomaten.webp",
  "betinia": "/src/assets/casino-logos/betinia.webp",
  "campobet": "/src/assets/casino-logos/campobet.webp",
  "swift-casino": "/src/assets/casino-logos/swift-casino.webp",
  "luna-casino": "/src/assets/casino-logos/luna-casino.webp",
  "playkasino": "/src/assets/casino-logos/playkasino.webp",
  "comeon": "/src/assets/casino-logos/comeon.webp",
  "videoslots": "/src/assets/casino-logos/videoslots.webp",
  "mr-vegas": "/src/assets/casino-logos/mrvegas.webp",
  "leovegas": "/src/assets/casino-logos/leovegas.webp",
  "bet365": "/src/assets/casino-logos/bet365.jpg",
  "888-casino": "/src/assets/casino-logos/888casino.webp",
  "royal-casino": "/src/assets/casino-logos/royal-casino.webp",
  "kapow-casino": "/src/assets/casino-logos/kapow.webp",
  "one-casino": "/src/assets/casino-logos/onecasino.webp",
  "bwin": "/src/assets/casino-logos/bwin.webp",
  "expekt": "/src/assets/casino-logos/expekt.webp",
  // Reviews folder
  "getlucky": "/src/assets/reviews/getlucky.webp",
  "mr-green": "/src/assets/reviews/mrgreen.webp",
  "unibet": "/src/assets/reviews/unibet.webp",
  "betano": "/src/assets/reviews/betano.webp",
  "maria-casino": "/src/assets/reviews/maria-casino.webp",
  "nordicbet": "/src/assets/reviews/nordicbet.webp",
  "spilnu": "/src/assets/reviews/spilnu.webp",
  "casinostuen": "/src/assets/reviews/casinostuen.webp",
  "pokerstars": "/src/assets/reviews/pokerstars.webp",
  "marathonbet": "/src/assets/reviews/marathonbet.webp",
};

/* Remote fallbacks for casinos without local assets */
const REMOTE_LOGOS: Record<string, string> = {
  "danske-spil": "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/danskespil.png",
  "stake-casino": "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/stake.png",
};

function resolveHeroLogo(slug: string): string | undefined {
  const assetPath = SLUG_TO_ASSET[slug];
  if (assetPath) {
    // Check both glob maps
    const resolved = casinoLogos[assetPath]?.default || reviewLogos[assetPath]?.default;
    if (resolved) return resolved;
  }
  return REMOTE_LOGOS[slug];
}

const LIGHT_LOGO_SLUGS = new Set([
  "unibet", "leovegas", "mr-vegas", "mr-green", "comeon",
  "nordicbet", "onecasino", "one-casino", "betinia", "getlucky",
]);

export function CasinoReviewHero({ slug, casinoName }: CasinoReviewHeroProps) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);
  const displayName = casinoName || casino?.name || slug;

  // Prefer local asset, then remote mapping, then DB logo_url as last resort
  const logoUrl = resolveHeroLogo(slug) || casino?.logo_url;
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
