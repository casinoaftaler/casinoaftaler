import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const BonusHuntLatestNews = forwardRef<HTMLElement>(function BonusHuntLatestNews(_props, ref) {
  const { data: articles = [] } = useQuery({
    queryKey: ["bonus-hunt-latest-news"],
    queryFn: async () => {
      const { data } = await supabase
        .from("casino_news")
        .select("title, slug, published_at, excerpt")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (articles.length === 0) return null;

  return (
    <section ref={ref} className="space-y-4">
      <div className="flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Seneste casino nyheder</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/casino-nyheder/${article.slug}`}
            className="group rounded-xl border border-border/50 bg-card p-4 space-y-2 transition-all duration-200 hover:border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
          >
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            )}
            <time className="block text-[11px] text-muted-foreground/60">
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString("da-DK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </time>
          </Link>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        <Link
          to="/casino-nyheder"
          className="font-medium hover:text-foreground hover:underline transition-colors"
        >
          Se alle nyheder →
        </Link>
      </p>
    </section>
  );
});
