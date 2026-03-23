import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star, RefreshCw } from "lucide-react";
import { seoRoutes } from "@/lib/seoRoutes";
import { CASINO_SCORES } from "@/lib/reviewScoring";

/**
 * Shows 3 "recently updated" casino reviews, rotating weekly based on the current ISO week number.
 * Uses lastmod from seoRoutes.ts to determine recency and rotates which reviews are shown.
 */

// Display name map for review slugs
const REVIEW_NAMES: Record<string, string> = {
  spilleautomaten: "Spilleautomaten",
  campobet: "Campobet",
  betinia: "Betinia",
  "swift-casino": "Swift Casino",
  "luna-casino": "Luna Casino",
  spildansknu: "SpilDanskNu",
  "danske-spil": "Danske Spil",
  comeon: "ComeOn",
  getlucky: "GetLucky",
  "mr-green": "Mr Green",
  videoslots: "Videoslots",
  "mr-vegas": "Mr Vegas",
  leovegas: "LeoVegas",
  expekt: "Expekt",
  betano: "Betano",
  "888-casino": "888 Casino",
  unibet: "Unibet",
  bet365: "bet365",
  "royal-casino": "Royal Casino",
  "maria-casino": "Maria Casino",
  "kapow-casino": "Kapow Casino",
  nordicbet: "NordicBet",
  "one-casino": "One Casino",
  spilnu: "Spilnu",
  "stake-casino": "Stake Casino",
  casinostuen: "Casinostuen",
  pokerstars: "PokerStars",
  bwin: "bwin",
  marathonbet: "MarathonBet",
};

function getISOWeek(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function WeeklyRotationReviews() {
  const reviews = useMemo(() => {
    // Get all casino review routes with lastmod
    const reviewRoutes = seoRoutes
      .filter((r) => r.path.startsWith("/casino-anmeldelser/") && r.lastmod)
      .map((r) => {
        const slug = r.path.replace("/casino-anmeldelser/", "");
        return {
          path: r.path,
          slug,
          name: REVIEW_NAMES[slug] || slug,
          lastmod: r.lastmod!,
          score: CASINO_SCORES[slug]?.total ?? 0,
        };
      })
      .sort((a, b) => b.lastmod.localeCompare(a.lastmod));

    // Rotate based on ISO week: shift the starting index
    const week = getISOWeek();
    const offset = (week * 3) % reviewRoutes.length;
    const rotated = [...reviewRoutes.slice(offset), ...reviewRoutes.slice(0, offset)];
    return rotated.slice(0, 3);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <span aria-hidden="true">🔄</span>
        Senest Opdaterede Anmeldelser
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            to={review.path}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-sm block">{review.name} Anmeldelse</span>
              <div className="flex items-center gap-2 mt-1">
                {review.score > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {review.score.toFixed(1)}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  Opdateret: {review.lastmod}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
