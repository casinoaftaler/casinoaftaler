import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { useLocation } from "react-router-dom";
import { optimizeStorageImage } from "@/lib/imageOptimization";

interface CasinoReviewLogoProps {
  slug?: string;
}

// Maps URL paths to casino slugs in the database
const PATH_TO_SLUG: Record<string, string> = {
  "bet365": "bet365",
  "betano": "betano",
  "betinia": "betinia",
  "bwin": "bwin",
  "888-casino": "888-casino",
  "casinostuen": "casinostuen",
  "comeon": "comeon",
  "danske-spil": "danske-spil",
  "expekt": "expekt",
  "getlucky": "getlucky",
  "kapow-casino": "kapow-casino",
  "leovegas": "leovegas",
  "marathonbet": "marathonbet",
  "maria-casino": "maria-casino",
  "mr-green": "mr-green",
  "mr-vegas": "mr-vegas",
  "nordicbet": "nordicbet",
  "one-casino": "one-casino",
  "pokerstars": "pokerstars",
  "royal-casino": "royal-casino",
  "spildansknu": "spildansknu",
  "spilleautomaten": "spilleautomaten",
  "spilnu": "spilnu",
  "stake-casino": "stake-casino",
  "swift-casino": "swift-casino",
  "unibet": "unibet",
  "videoslots": "videoslots",
  "campobet": "campobet",
  "luna-casino": "luna-casino",
  "betit": "betit",
  "playkasino": "playkasino",
};

export function CasinoReviewLogo({ slug }: CasinoReviewLogoProps) {
  const location = useLocation();

  // Auto-detect slug from URL if not provided
  const effectiveSlug = slug || (() => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    return PATH_TO_SLUG[lastPart] || lastPart;
  })();

  const { data: casino } = useCasinoBySlug(effectiveSlug);
  const logoUrl = casino?.logo_url;

  if (!logoUrl) return null;

  return (
    <div className="mb-6 flex justify-center">
      <img
        src={optimizeStorageImage(logoUrl, 192) ?? logoUrl}
        alt={casino?.name || effectiveSlug}
        width={96}
        height={96}
        className="h-20 w-20 rounded-2xl object-contain bg-white/10 p-2 backdrop-blur-sm border border-white/20 shadow-lg md:h-24 md:w-24"
        loading="lazy"
      />
    </div>
  );
}
