import { Link } from "react-router-dom";
import { Star, ArrowRight, BookOpen } from "lucide-react";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { optimizeStorageImage } from "@/lib/imageOptimization";

/**
 * Displays a curated grid of popular casino reviews for the homepage.
 * Body-contextual links = highest equity weight.
 */
const FEATURED_REVIEWS = [
  { slug: "betinia", teaser: "No-sticky bonus på 100% op til 1.000 kr. med kun 10x omsætning. Dual casino- og sportsplatform." },
  { slug: "spilleautomaten", teaser: "Bredt spiludvalg med 40+ udbydere og konkurrencedygtige bonusvilkår for danske spillere." },
  { slug: "leovegas", teaser: "Prisvindende mobilcasino med hurtige udbetalinger og stærkt live casino-udvalg." },
  { slug: "unibet", teaser: "Etableret platform med dansk licens, bred sportsbetting og loyalitetsprogram." },
  { slug: "mr-green", teaser: "Innovativ Green Gaming-teknologi og fremragende mobiloplevelse med dansk support." },
  { slug: "danske-spil", teaser: "Danmarks største spiludbyder med bred dækning af casino, sport og lotteri." },
  { slug: "bet365", teaser: "Verdens største online betting-platform med omfattende live-streaming og odds." },
  { slug: "campobet", teaser: "Over 5.000 casinospil og bred sportssektion med konkurrencedygtig velkomstbonus." },
];

export function PopularReviewsSection() {
  const { data: casinos } = useQuery({
    queryKey: ["casinos-for-popular-reviews"],
    queryFn: async () => {
      const slugs = FEATURED_REVIEWS.map((r) => r.slug);
      const { data, error } = await supabase
        .from("casinos")
        .select("slug, name, logo_url")
        .in("slug", slugs)
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <section className="mb-12" style={{ minHeight: '280px' }}>
      <h2 className="mb-4 text-3xl font-bold">⭐ Populære Casino Anmeldelser</h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Læs vores dybdegående og uafhængige anmeldelser af de mest populære danske online casinoer. Hver anmeldelse dækker bonus, spiludvalg, betalingsmetoder og vores ekspertvurdering.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_REVIEWS.map((review) => {
          const casino = casinos?.find((c) => c.slug === review.slug);
          const score = CASINO_SCORES[review.slug]?.total;
          return (
            <Link
              key={review.slug}
              to={`/casino-anmeldelser/${review.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                {casino?.logo_url ? (
                  <img
                    src={optimizeStorageImage(casino.logo_url, 80) ?? casino.logo_url}
                    alt={casino.name || review.slug}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-md object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div className="min-w-0">
                  <span className="font-semibold text-sm block truncate group-hover:text-primary transition-colors">
                    {casino?.name || review.slug}
                  </span>
                  {score && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {score.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {review.teaser}
              </p>
              <span className="text-xs font-medium text-primary flex items-center gap-1 mt-auto">
                Læs anmeldelse <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Se alle vores{" "}
        <Link to="/casino-anmeldelser" className="text-primary hover:underline font-medium">
          29 casino anmeldelser
        </Link>{" "}
        for en komplet oversigt over det danske marked.
      </p>
    </section>
  );
}
