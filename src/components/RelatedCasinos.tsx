import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { optimizeStorageImage } from "@/lib/imageOptimization";

/**
 * Maps casino slugs (from CASINO_SCORES, which have review pages) to
 * search terms that may appear in article content.
 * Uses the DB name as primary match + common variants.
 */
const CASINO_NAME_VARIANTS: Record<string, string[]> = {
  betinia: ["Betinia"],
  spilleautomaten: ["Spilleautomaten"],
  campobet: ["Campobet"],
  "swift-casino": ["Swift Casino", "Swift"],
  "luna-casino": ["Luna Casino"],
  spildansknu: ["SpilDanskNu", "Spil Dansk Nu"],
  leovegas: ["LeoVegas", "Leo Vegas"],
  "danske-spil": ["Danske Spil"],
  bet365: ["bet365", "Bet365"],
  "mr-green": ["Mr Green", "MrGreen", "Mr. Green"],
  unibet: ["Unibet"],
  "royal-casino": ["Royal Casino"],
  pokerstars: ["PokerStars"],
  "888-casino": ["888casino", "888 Casino"],
  videoslots: ["Videoslots"],
  comeon: ["ComeOn", "Come On"],
  betano: ["Betano"],
  "stake-casino": ["Stake Casino", "Stake"],
  nordicbet: ["NordicBet", "Nordic Bet"],
  bwin: ["bwin", "Bwin"],
  "mr-vegas": ["Mr Vegas", "MrVegas", "Mr. Vegas"],
  "maria-casino": ["Maria Casino"],
  getlucky: ["GetLucky", "Get Lucky"],
  spilnu: ["Spilnu", "Spil Nu"],
  "kapow-casino": ["Kapow Casino", "Kapow"],
  marathonbet: ["MarathonBet", "Marathon Bet"],
  expekt: ["Expekt"],
  "one-casino": ["OneCasino", "One Casino"],
  casinostuen: ["Casinostuen"],
};

interface RelatedCasinosProps {
  /** The raw HTML content of the article */
  content: string;
  /** Article category for fallback matching */
  category?: string;
}

export function RelatedCasinos({ content, category }: RelatedCasinosProps) {
  // Fetch casino data (logo_url, name) from DB
  const { data: casinos } = useQuery({
    queryKey: ["casinos-for-related"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casinos")
        .select("slug, name, logo_url, rating")
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  const matched = useMemo(() => {
    if (!casinos || !content) return [];

    // Strip HTML tags for cleaner text matching
    const plainText = content.replace(/<[^>]*>/g, " ");

    const found: { slug: string; name: string; logo_url: string | null; rating: number }[] = [];

    for (const [slug, variants] of Object.entries(CASINO_NAME_VARIANTS)) {
      // Only include casinos that have a review page (exist in CASINO_SCORES)
      if (!CASINO_SCORES[slug]) continue;

      const casinoDb = casinos.find((c) => c.slug === slug);
      if (!casinoDb) continue;

      // Check if any variant name appears in the article text
      const isMatch = variants.some((name) => {
        // Use word boundary-like check to avoid partial matches
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escaped}\\b`, "i");
        return regex.test(plainText);
      });

      if (isMatch) {
        found.push({
          slug,
          name: casinoDb.name,
          logo_url: casinoDb.logo_url,
          rating: CASINO_SCORES[slug].total,
        });
      }
    }

    // If fewer than 2 matches, fill with top-rated reviews (rotation via date-based offset)
    if (found.length < 2) {
      const allSlugs = Object.keys(CASINO_SCORES).filter(
        (s) => !found.some((f) => f.slug === s)
      );
      // Rotate based on day-of-year
      const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
      );
      const sorted = allSlugs
        .map((s) => ({ slug: s, score: CASINO_SCORES[s].total }))
        .sort((a, b) => b.score - a.score);
      const offset = (dayOfYear * 2) % Math.max(sorted.length, 1);
      const rotated = [...sorted.slice(offset), ...sorted.slice(0, offset)];

      for (const item of rotated) {
        if (found.length >= 3) break;
        const casinoDb = casinos.find((c) => c.slug === item.slug);
        if (!casinoDb) continue;
        found.push({
          slug: item.slug,
          name: casinoDb.name,
          logo_url: casinoDb.logo_url,
          rating: item.score,
        });
      }
    }

    // Sort by rating descending, take max 3
    return found.sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [content, casinos]);

  if (matched.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Relaterede casinoer nævnt i denne artikel</h2>
      <p className="text-sm text-muted-foreground mb-3">
        Læs vores dybdegående anmeldelser for at sammenligne vilkår, bonusser og spiludvalg:
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {matched.map((casino) => (
          <Link
            key={casino.slug}
            to={`/casino-anmeldelser/${casino.slug}`}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            {casino.logo_url && (
              <img
                src={optimizeStorageImage(casino.logo_url, 80) ?? casino.logo_url}
                alt={casino.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-md object-cover"
                loading="lazy"
              />
            )}
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-sm block truncate">{casino.name}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {casino.rating.toFixed(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
