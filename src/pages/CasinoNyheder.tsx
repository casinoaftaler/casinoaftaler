import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { NewsHubSections } from "@/components/NewsHubSections";
import { usePublishedNews } from "@/hooks/useCasinoNews";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { CalendarDays, ChevronLeft, ChevronRight, Newspaper, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCategoryLabel } from "@/lib/newsCategoryLabels";
import { formatTimestampDanish } from "@/hooks/usePageLastmod";
import {
  buildNewsHubPath,
  buildNewsHubSearchParams,
  getNewsHubSeo,
  NEWS_DEFAULT_CATEGORY,
  normalizePositivePage,
} from "@/lib/hubSeo";

const ARTICLES_PER_PAGE = 10;

/** Category display names and SEO intro texts */
const CATEGORY_META: Record<string, { label: string; intro: string }> = {
  alle: {
    label: "Alle Nyheder",
    intro: "",
  },
  generelt: {
    label: "Generelt",
    intro: "Generelle nyheder fra det danske casinomarked. Alt fra nye tiltag til branchetrends der påvirker danske spillere.",
  },
  regulering: {
    label: "Regulering",
    intro: "Følg de seneste ændringer i dansk spillelovgivning og EU-regulering. Vi analyserer nye krav til operatører, ændrede bonusregler og hvordan regulering påvirker din spiloplevelse på danske online casinoer.",
  },
  licenser: {
    label: "Licenser",
    intro: "Hold dig opdateret med nye licensudstedelser og -inddragelser fra Spillemyndigheden. Vi dækker hvilke operatører der får dansk licens, og hvad det betyder for udvalget af lovlige casinoer i Danmark.",
  },
  bonusser: {
    label: "Bonusser",
    intro: "De seneste bonusnyheder fra danske casinoer. Nye velkomstbonusser, ændrede omsætningskrav og eksklusive tilbud analyseret af vores redaktion.",
  },
  "nye-casinoer": {
    label: "Nye Casinoer",
    intro: "De nyeste casino-lanceringer på det danske marked. Vi vurderer nye operatører, deres bonusser og spiludvalg – så du kan træffe informerede valg om de seneste tilføjelser til markedet.",
  },
  betalingsmetoder: {
    label: "Betalingsmetoder",
    intro: "Nyheder om betalingsløsninger på danske casinoer. Fra MobilePay-integrationer til nye fintech-partnerskaber – vi dækker alt der påvirker dine ind- og udbetalingsmuligheder.",
  },
  lovgivning: {
    label: "Lovgivning",
    intro: "Nyheder om lovgivning der påvirker danske casinoer og spillere. Vi oversætter nye love og bekendtgørelser til forståeligt dansk.",
  },
  teknologi: {
    label: "Teknologi",
    intro: "Teknologiske nyheder fra iGaming-branchen. AI, blockchain, nye platforme og softwareinnovationer der former fremtidens online casinoer.",
  },
  "markedsbevægelser": {
    label: "Markedsanalyse",
    intro: "Analyser af markedstendenser, fusioner, opkøb og strategiske bevægelser i den danske iGaming-branche. Forstå de kommercielle kræfter der former dit casinovalg.",
  },
  juridisk: {
    label: "Juridisk",
    intro: "Juridiske nyheder der berører danske spillere og casinooperatører. Fra forbrugerbeskyttelse til GDPR-compliance – vi oversætter juraen til forståeligt dansk.",
  },
};

const CATEGORIES = ["alle", "generelt", "regulering", "licenser", "bonusser", "nye-casinoer", "betalingsmetoder", "lovgivning", "teknologi", "markedsbevægelser", "juridisk"];

const CasinoNyheder = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get("kategori") ?? NEWS_DEFAULT_CATEGORY;
  const activeCategory = CATEGORIES.includes(rawCategory) ? rawCategory : NEWS_DEFAULT_CATEGORY;
  const page = normalizePositivePage(searchParams.get("side"));

  useEffect(() => {
    const normalized = buildNewsHubSearchParams({ category: activeCategory, page });
    if (normalized.toString() !== searchParams.toString()) {
      setSearchParams(normalized, { replace: true });
    }
  }, [activeCategory, page, searchParams, setSearchParams]);

  const { data, isLoading } = usePublishedNews(
    page,
    ARTICLES_PER_PAGE,
    activeCategory === NEWS_DEFAULT_CATEGORY ? undefined : activeCategory,
  );

  const articles = data?.articles ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));

  useEffect(() => {
    if (page > totalPages) {
      setSearchParams(
        buildNewsHubSearchParams({ category: activeCategory, page: totalPages }),
        { replace: true },
      );
    }
  }, [activeCategory, page, setSearchParams, totalPages]);

  const currentPage = Math.min(page, totalPages);
  const latestModified = articles[0]?.updated_at || articles[0]?.published_at || undefined;
  const latestDate = latestModified ? formatTimestampDanish(latestModified) : null;
  const categoryMeta = CATEGORY_META[activeCategory] || CATEGORY_META.alle;
  const seoState = getNewsHubSeo({ category: activeCategory, page: currentPage });
  const isDefaultHubState = activeCategory === NEWS_DEFAULT_CATEGORY && currentPage === 1;

  const articleSchema = isDefaultHubState
    ? buildArticleSchema({
        headline: "Casino Nyheder – Licens, bonus og marked i Danmark",
        description: "Seneste casino nyheder om bonusser, licenser, betalingsmetoder og markedet i Danmark. Redaktionelle analyser uden clickbait.",
        url: `${SITE_URL}/casino-nyheder`,
        datePublished: "2026-02-21",
        authorName: "Ajse",
        authorUrl: `${SITE_URL}/forfatter/ajse`,
      })
    : undefined;

  const handleCategoryChange = (category: string) => {
    setSearchParams(buildNewsHubSearchParams({ category, page: 1 }));
  };

  return (
    <>
      <SEO
        title={seoState.title}
        description={seoState.description}
        canonicalUrl={seoState.canonicalUrl}
        jsonLd={articleSchema}
        noindex={seoState.noindex}
      />

      {/* Gradient Hero Section */}
      <section
        className="relative overflow-hidden py-8 text-white md:py-12 min-h-[280px] md:min-h-[320px]"
        style={{
          background: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
        }}
      >
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 min-h-[40px]" />
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Casino Nyheder 2026
            </h1>
            <p className="mb-6 text-base text-white/80 md:text-lg">
              Seneste nyt, analyser og opdateringer fra det danske casinomarked
            </p>
            {latestDate && (
              <p className="text-sm text-white/60">
                Senest opdateret: {latestDate}
              </p>
            )}
          </div>
        </div>
        <div className="absolute left-0 top-0 h-full w-full opacity-20" aria-hidden="true">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-primary/60 blur-xl will-change-transform" style={{ animation: "float 6s ease-in-out infinite" }} />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-accent/60 blur-xl will-change-transform" style={{ animation: "float 8s ease-in-out infinite 1s" }} />
          <div className="absolute left-1/3 top-1/2 h-24 w-24 rounded-full bg-primary/40 blur-xl will-change-transform" style={{ animation: "float 7s ease-in-out infinite 0.5s" }} />
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-15px) translateX(5px); }
            50% { transform: translateY(-8px) translateX(-5px); }
            75% { transform: translateY(-20px) translateX(3px); }
          }
        `}</style>
      </section>

      <main className="container py-8">
        <AuthorMetaBar
          author="ajse"
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

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Seneste casino-nyheder</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const categoryHref = buildNewsHubPath({ category: cat, page: 1 });

              return (
                <Button
                  key={cat}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  asChild={!isActive}
                  onClick={isActive ? undefined : () => handleCategoryChange(cat)}
                >
                  {isActive ? (
                    <span>{CATEGORY_META[cat]?.label || cat}</span>
                  ) : (
                    <Link to={categoryHref}>{CATEGORY_META[cat]?.label || cat}</Link>
                  )}
                </Button>
              );
            })}
          </div>
          {/* Category intro text for SEO */}
          {activeCategory !== NEWS_DEFAULT_CATEGORY && categoryMeta.intro && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {categoryMeta.intro}
            </p>
          )}
          {activeCategory === NEWS_DEFAULT_CATEGORY && (
            <p className="text-muted-foreground">Korte analyser og opdateringer fra det danske online casino-marked.</p>
          )}
        </div>

        {/* Evergreen hub sections – only on page 1, category "alle" */}
        {currentPage === 1 && activeCategory === NEWS_DEFAULT_CATEGORY && <NewsHubSections />}

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
              {activeCategory !== NEWS_DEFAULT_CATEGORY
                ? `Ingen nyheder i kategorien "${categoryMeta.label}" endnu.`
                : "Første opdateringer udgives snart. Vi publicerer nye analyser hver tirsdag og fredag."}
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
                      src={optimizeStorageImage(article.featured_image, 600) ?? article.featured_image}
                      alt={article.title}
                      width={600}
                      height={192}
                      className="mb-4 h-48 w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{getCategoryLabel(article.category)}</Badge>
                    {(article as any).is_cornerstone && (
                      <Badge variant="default" className="text-xs flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Cornerstone
                      </Badge>
                    )}
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

            {/* Pagination - only for "alle" category */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  asChild={currentPage > 1}
                >
                  {currentPage > 1 ? (
                    <Link to={buildNewsHubPath({ category: activeCategory, page: currentPage - 1 })}>
                      <ChevronLeft className="h-4 w-4 mr-1" /> Forrige
                    </Link>
                  ) : (
                    <span>
                      <ChevronLeft className="h-4 w-4 mr-1" /> Forrige
                    </span>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  Side {currentPage} af {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  asChild={currentPage < totalPages}
                >
                  {currentPage < totalPages ? (
                    <Link to={buildNewsHubPath({ category: activeCategory, page: currentPage + 1 })}>
                      Næste <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  ) : (
                    <span>
                      Næste <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        <Separator className="my-10" />

        <AuthorBio author="ajse" showCommunity={false} />

        <RelatedGuides currentPath="/casino-nyheder" maxLinks={5} />
      </main>
    </>
  );
};

export default CasinoNyheder;
