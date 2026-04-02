import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePublishedNewsByAuthor } from "@/hooks/useCasinoNews";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { Badge } from "@/components/ui/badge";
import { Badge, ChevronLeft, ChevronRight, Link } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;

interface AuthorNewsSectionProps {
  authorId: string;
  authorName: string;
}

export function AuthorNewsSection({ authorId, authorName }: AuthorNewsSectionProps) {
  const { data: newsData } = usePublishedNewsByAuthor(authorId, 1, 100);
  const newsArticles = newsData?.articles ?? [];
  const ITEMS_PER_PAGE = 6;

  const [newsPage, setNewsPage] = useState(0);
  const totalNewsPages = Math.max(1, Math.ceil(newsArticles.length / ITEMS_PER_PAGE));
  const visibleNews = newsArticles.slice(
    newsPage * ITEMS_PER_PAGE,
    (newsPage + 1) * ITEMS_PER_PAGE
  );
  const prevNewsPage = useCallback(() => setNewsPage((p) => Math.max(0, p - 1)), []);
  const nextNewsPage = useCallback(
    () => setNewsPage((p) => Math.min(totalNewsPages - 1, p + 1)),
    [totalNewsPages]
  );

  if (newsArticles.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MenuIcon iconName="newspaper" className="h-7 w-7 text-primary" />
          Nyheder af {authorName}
        </h2>
        {totalNewsPages > 1 && (
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground mr-2">
              {newsPage + 1} / {totalNewsPages}
            </span>
            <button onClick={prevNewsPage} disabled={newsPage === 0} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" aria-label="Forrige nyheder">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextNewsPage} disabled={newsPage >= totalNewsPages - 1} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none" aria-label="Næste nyheder">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visibleNews.map((article) => (
          <Link
            key={article.slug}
            to={`/casino-nyheder/${article.slug}`}
            className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
          >
            {article.featured_image && (
              <img
                src={optimizeStorageImage(article.featured_image, 120, 70) || article.featured_image}
                alt={article.title}
                className="h-20 w-28 shrink-0 rounded-lg object-cover"
                loading="lazy"
              />
            )}
            <div className="flex flex-col min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">Nyhed</Badge>
                {article.published_at && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MenuIcon iconName="clock" className="h-3 w-3" />
                    {new Date(article.published_at).toLocaleDateString("da-DK")}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-2">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-1">{article.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
