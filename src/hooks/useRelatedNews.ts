import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches related news articles by category and tags, excluding the current slug.
 * Falls back to latest articles if no category matches are found.
 */
export function useRelatedNews(slug: string, category: string, tags: string[] = [], limit = 3) {
  return useQuery({
    queryKey: ["related-news", slug, category, tags, limit],
    queryFn: async () => {
      // First try: same category, excluding current
      const { data: catMatches, error: catErr } = await supabase
        .from("casino_news")
        .select("id, title, slug, excerpt, published_at, category, featured_image")
        .eq("status", "published")
        .eq("category", category)
        .neq("slug", slug)
        .order("published_at", { ascending: false })
        .limit(limit + 2); // fetch extras to allow filtering

      if (catErr) throw catErr;

      let results = catMatches ?? [];

      // If we have enough category matches, return them
      if (results.length >= limit) {
        return results.slice(0, limit);
      }

      // Fallback: fill remaining with latest articles from any category
      const existingSlugs = [slug, ...results.map((r) => r.slug)];
      const remaining = limit - results.length;

      const { data: fallback, error: fbErr } = await supabase
        .from("casino_news")
        .select("id, title, slug, excerpt, published_at, category, featured_image")
        .eq("status", "published")
        .not("slug", "in", `(${existingSlugs.map((s) => `"${s}"`).join(",")})`)
        .order("published_at", { ascending: false })
        .limit(remaining);

      if (fbErr) throw fbErr;

      return [...results, ...(fallback ?? [])].slice(0, limit);
    },
    enabled: !!slug && !!category,
  });
}
