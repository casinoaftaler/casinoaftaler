import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Newspaper, ArrowRight, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { DailyCasinoSpotlight } from "./DailyCasinoSpotlight";

/**
 * "Opdateret i dag" section for the homepage.
 * Shows dofollow links to /free-spins-i-dag and the latest news article.
 * Rendered as static visible HTML – no JS interaction required, no lazy loading.
 */
export function TodayUpdatedSection() {
  const todayFormatted = format(new Date(), "d. MMMM yyyy", { locale: da });

  const { data: latestArticle } = useQuery({
    queryKey: ["latest-news-for-homepage"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_news")
        .select("title, slug, published_at, excerpt")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="py-6 border-b border-border/30 bg-muted/30" style={{ minHeight: '120px' }}>
      <div className="container">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Opdateret i dag – {todayFormatted}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Free Spins i dag link */}
          <Link
            to="/free-spins-i-dag"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md group"
          >
            <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-sm block">Free Spins i Dag</span>
              <span className="text-xs text-muted-foreground">Dagligt opdaterede free spins tilbud fra danske casinoer</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </Link>

          {/* Latest news article link - always reserve space */}
          {latestArticle ? (
            <Link
              to={`/casino-nyheder/${latestArticle.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md group"
            >
              <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-sm block truncate">{latestArticle.title}</span>
                <span className="text-xs text-muted-foreground">
                  {latestArticle.published_at
                    ? format(new Date(latestArticle.published_at), "d. MMMM yyyy", { locale: da })
                    : "Seneste nyhed"}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <div className="rounded-lg bg-primary/10 p-2.5 flex-shrink-0">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-sm block text-muted-foreground">Seneste Nyhed</span>
                <span className="text-xs text-muted-foreground">Indlæser...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
