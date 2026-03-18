import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Newspaper, ArrowRight, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { DailyCasinoSpotlight } from "./DailyCasinoSpotlight";

/**
 * Homepage overview section with crawlable links to key discovery pages.
 * Rendered as static visible HTML – no JS interaction required, no lazy loading.
 */
export function TodayUpdatedSection() {
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
    <section className="py-6 border-b border-border/30 bg-muted/30" style={{ minHeight: "120px" }}>
      <div className="container">
        <div className="mb-3 flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Dagens overblik</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Free Spins i dag link */}
          <Link
            to="/free-spins-i-dag"
            className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">Free Spins i Dag</span>
              <span className="text-xs text-muted-foreground">Dagligt verificerede free spins tilbud fra danske casinoer</span>
            </div>
            <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          </Link>

          {/* Latest news article link - always reserve space */}
          {latestArticle ? (
            <Link
              to={`/casino-nyheder/${latestArticle.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{latestArticle.title}</span>
                <span className="text-xs text-muted-foreground">
                  {latestArticle.published_at
                    ? format(new Date(latestArticle.published_at), "d. MMMM yyyy", { locale: da })
                    : "Seneste nyhed"}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-muted-foreground">Seneste Nyhed</span>
                <span className="text-xs text-muted-foreground">Indlæser...</span>
              </div>
            </div>
          )}

          {/* Daily rotating casino spotlight */}
          <DailyCasinoSpotlight />
        </div>

        {/* Noscript fallback for crawlers */}
        <noscript>
          <div style={{ marginTop: "8px" }}>
            <ul>
              <li><a href="/free-spins-i-dag">Free Spins i Dag – dagligt opdaterede tilbud</a></li>
              <li><a href="/casino-nyheder">Seneste casino-nyheder fra Danmark</a></li>
              <li><a href="/casino-anmeldelser/spildansknu">SpilDanskNu Anmeldelse</a></li>
              <li><a href="/casino-anmeldelser/spilleautomaten">Spilleautomaten Anmeldelse</a></li>
              <li><a href="/casino-anmeldelser/betinia">Betinia Anmeldelse</a></li>
              <li><a href="/casino-anmeldelser/campobet">Campobet Anmeldelse</a></li>
              <li><a href="/casino-anmeldelser/swift-casino">Swift Casino Anmeldelse</a></li>
              <li><a href="/casino-anmeldelser/luna-casino">Luna Casino Anmeldelse</a></li>
            </ul>
          </div>
        </noscript>
      </div>
    </section>
  );
}
