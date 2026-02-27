import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Newspaper } from "lucide-react";

/**
 * Maps money-page paths to news categories/tags for contextual matching.
 */
const PAGE_CATEGORY_MAP: Record<string, { categories: string[]; tags: string[]; label: string }> = {
  "/betalingsmetoder": { categories: ["betalingsmetoder"], tags: ["betaling", "trustly", "mobilepay"], label: "betalingsmetoder" },
  "/betalingsmetoder/trustly": { categories: ["betalingsmetoder"], tags: ["trustly", "open banking"], label: "Trustly" },
  "/betalingsmetoder/mobilepay": { categories: ["betalingsmetoder"], tags: ["mobilepay"], label: "MobilePay" },
  "/betalingsmetoder/paypal": { categories: ["betalingsmetoder"], tags: ["paypal"], label: "PayPal" },
  "/betalingsmetoder/skrill": { categories: ["betalingsmetoder"], tags: ["skrill"], label: "Skrill" },
  "/betalingsmetoder/visa-mastercard": { categories: ["betalingsmetoder"], tags: ["visa", "mastercard", "kort"], label: "kortbetaling" },
  "/casino-licenser": { categories: ["licenser", "regulering"], tags: ["licens", "spillemyndigheden"], label: "danske casino-licenser" },
  "/nye-casinoer": { categories: ["nye-casinoer"], tags: ["nyt casino", "lancering"], label: "nye casinoer" },
  "/casino-bonus": { categories: ["nye-casinoer", "regulering"], tags: ["bonus", "velkomstbonus"], label: "casino-bonusser" },
  "/ansvarligt-spil": { categories: ["regulering", "juridisk"], tags: ["ansvarligt spil", "rofus"], label: "ansvarligt spil" },
  "/spillemyndigheden": { categories: ["regulering", "licenser"], tags: ["spillemyndigheden", "tilsyn"], label: "Spillemyndigheden" },
  "/casino-anmeldelser": { categories: ["nye-casinoer", "markedsbevægelser"], tags: [], label: "det danske casinomarked" },
  "/live-casino": { categories: ["nye-casinoer"], tags: ["live casino", "evolution"], label: "live casino" },
};

function useNewsByCategory(categories: string[], tags: string[], limit = 3) {
  return useQuery({
    queryKey: ["news-by-category", categories, tags, limit],
    queryFn: async () => {
      // Try category match first
      let query = supabase
        .from("casino_news")
        .select("id, title, slug, published_at, category")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(limit);

      if (categories.length === 1) {
        query = query.eq("category", categories[0]);
      } else if (categories.length > 1) {
        query = query.in("category", categories);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      if ((data?.length ?? 0) >= limit) return data!;

      // Fallback: get latest
      const existingIds = (data ?? []).map((d) => d.id);
      const { data: fallback } = await supabase
        .from("casino_news")
        .select("id, title, slug, published_at, category")
        .eq("status", "published")
        .not("id", "in", `(${existingIds.map((id) => `"${id}"`).join(",")})`)
        .order("published_at", { ascending: false })
        .limit(limit - (data?.length ?? 0));

      return [...(data ?? []), ...(fallback ?? [])].slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
    enabled: categories.length > 0,
  });
}

interface LatestNewsByCategoryProps {
  /** Current money page path, e.g. "/betalingsmetoder/trustly" */
  pagePath: string;
}

/**
 * Contextual news section for money pages.
 * Shows 2-3 relevant news articles matched by category/tags.
 */
export function LatestNewsByCategory({ pagePath }: LatestNewsByCategoryProps) {
  const mapping = PAGE_CATEGORY_MAP[pagePath];
  
  // Fallback for unmapped pages
  const categories = mapping?.categories ?? ["regulering"];
  const label = mapping?.label ?? "det danske casinomarked";
  const tags = mapping?.tags ?? [];

  const { data: articles } = useNewsByCategory(categories, tags, 3);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary" />
        Seneste opdateringer om {label}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Hold dig opdateret med de nyeste nyheder og analyser relateret til {label} på danske online casinoer.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/casino-nyheder/${article.slug}`}
            className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
              <CalendarDays className="h-3 w-3" />
              {article.published_at &&
                new Date(article.published_at).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </span>
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
