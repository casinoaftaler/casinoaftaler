import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { usePublishedNews } from "@/hooks/useCasinoNews";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { CalendarDays, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ARTICLES_PER_PAGE = 10;

const CasinoNyheder = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePublishedNews(page, ARTICLES_PER_PAGE);

  const articles = data?.articles ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

  const articleSchema = buildArticleSchema({
    headline: "Casino Nyheder 2026 – Seneste Opdateringer fra Danske Online Casinoer",
    description: "Hold dig opdateret med de seneste casino nyheder, analyser og opdateringer fra det danske casinomarked. Licenser, bonusændringer og lovgivning.",
    url: `${SITE_URL}/casino-nyheder`,
    datePublished: "2026-02-21",
    dateModified: "2026-02-21",
  });

  // Find the most recently published article date
  const latestDate = articles.length > 0 && articles[0].published_at
    ? new Date(articles[0].published_at).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <SEO
        title="Casino Nyheder 2026 – Seneste Opdateringer fra Danske Online Casinoer"
        description="Hold dig opdateret med de seneste casino nyheder, analyser og opdateringer fra det danske casinomarked. Nye licenser, bonusændringer, betalingsmetoder og lovgivning."
        jsonLd={articleSchema}
      />

      <main className="container py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Casino Nyheder 2026</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
            Seneste nyt, analyser og opdateringer fra det danske casinomarked
          </p>
          {latestDate && (
            <p className="mt-2 text-sm text-muted-foreground">
              Senest opdateret: {latestDate}
            </p>
          )}
        </header>

        <AuthorMetaBar
          author="jonas"
          date="21. februar 2026"
          readTime="Løbende opdateret"
          showFactCheck={true}
          showAffiliateDisclaimer={false}
        />

        {/* SEO Intro */}
        <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p>
            Velkommen til Casino Nyheder – din kilde til aktuelle opdateringer fra det danske online casino-landskab. 
            Her dækker vi alt fra nye licensudstedelser fra <Link to="/spillemyndigheden" className="text-primary hover:underline">Spillemyndigheden</Link> og 
            ændringer i bonusvilkår, til teknologiske fremskridt inden for <Link to="/betalingsmetoder" className="text-primary hover:underline">betalingsmetoder</Link> og 
            nye <Link to="/nye-casinoer" className="text-primary hover:underline">casino-lanceringer</Link>.
          </p>
          <p>
            Vores redaktionelle team analyserer hver nyhed i dansk kontekst og vurderer, hvad ændringerne konkret 
            betyder for dig som dansk spiller. Vi fokuserer på substans frem for sensationer – ingen clickbait, 
            kun kvalificerede analyser baseret på vores <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">testmetodik</Link> og 
            mangeårige erfaring med det regulerede danske marked.
          </p>
          <p>
            Alle artikler gennemgår samme redaktionelle kvalitetskontrol som vores <Link to="/casino-anmeldelser" className="text-primary hover:underline">casino-anmeldelser</Link> og 
            <Link to="/casino-bonus" className="text-primary hover:underline"> bonusguides</Link>. Vi publicerer aldrig tyndt indhold – hver artikel 
            indeholder minimum 900 ord med dansk kontekstualisering og konkrete implikationer.
          </p>
        </section>

        <Separator className="mb-8" />

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Seneste casino-nyheder</h2>
          <p className="text-muted-foreground">Korte analyser og opdateringer fra det danske online casino-marked.</p>
        </div>

        {/* Article List */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 text-center">
            <Newspaper className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg text-muted-foreground">
              Første opdateringer udgives snart. Vi publicerer nye analyser hver tirsdag og fredag.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/casino-nyheder/${article.slug}`}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  {article.featured_image && (
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="mb-4 h-48 w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                    {article.published_at && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3 w-3" />
                        {new Date(article.published_at).toLocaleDateString("da-DK", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Forrige
                </Button>
                <span className="text-sm text-muted-foreground">
                  Side {page} af {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Næste <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default CasinoNyheder;
