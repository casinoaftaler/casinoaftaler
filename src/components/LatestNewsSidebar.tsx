import { Link } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import { usePublishedNews } from "@/hooks/useCasinoNews";

export function LatestNewsSidebar() {
  const { data, isLoading } = usePublishedNews(1, 2);
  const articles = data?.articles ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">
          Seneste nyt
        </span>
        <div className="h-16 animate-pulse rounded-lg bg-muted" />
        <div className="h-16 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 px-2 flex items-center gap-1.5">
        <Newspaper className="h-3.5 w-3.5" />
        Seneste nyt
      </span>
      {articles.map((article) => (
        <Link
          key={article.id}
          to={`/casino-nyheder/${article.slug}`}
          className="group flex flex-col gap-0.5 rounded-lg px-2 py-2 transition-colors hover:bg-accent"
        >
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {article.title}
          </span>
          {article.published_at && (
            <span className="text-[11px] text-muted-foreground">
              {new Date(article.published_at).toLocaleDateString("da-DK", {
                day: "numeric",
                month: "short",
              })}
            </span>
          )}
        </Link>
      ))}
      <Link
        to="/casino-nyheder"
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-primary hover:underline"
      >
        Alle nyheder <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
