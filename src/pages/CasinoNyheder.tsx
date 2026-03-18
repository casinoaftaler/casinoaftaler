import { useState } from "react";
import { Link } from "react-router-dom";
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

/** PageRank control: page 4+ gets noindex */
const NOINDEX_THRESHOLD = 4;

const CasinoNyheder = () => {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("alle");
  const { data, isLoading } = usePublishedNews(page, ARTICLES_PER_PAGE);

  const allArticles = data?.articles ?? [];
  
  // Filter by category client-side (small dataset)
  const articles = activeCategory === "alle"
    ? allArticles
    : allArticles.filter((a) => a.category === activeCategory);
  
  const total = activeCategory === "alle" ? (data?.total ?? 0) : articles.length;
  const totalPages = activeCategory === "alle" ? Math.ceil(total / ARTICLES_PER_PAGE) : 1;

  const latestModified = allArticles.length > 0
    ? (allArticles[0].updated_at || allArticles[0].published_at || new Date().toISOString())
    : new Date().toISOString();

  const articleSchema = buildArticleSchema({
    headline: "Casino Nyheder 2026 – Seneste Opdateringer fra Danske Online Casinoer",
    description: "Hold dig opdateret med de seneste casino nyheder, analyser og opdateringer fra det danske casinomarked. Licenser, bonusændringer og lovgivning.",
    url: `${SITE_URL}/casino-nyheder`,
    datePublished: "2026-02-21",
    dateModified: latestModified,
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  const latestDate = allArticles.length > 0 && allArticles[0].published_at
    ? new Date(allArticles[0].published_at).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const categoryMeta = CATEGORY_META[activeCategory] || CATEGORY_META.alle;

  // PageRank: noindex for deep archive pages
  const shouldNoindex = page >= NOINDEX_THRESHOLD;

  return (
    <>
      <SEO
        title="Casino Nyheder 2026 – Seneste Opdateringer fra Danske Online Casinoer"
        description="Hold dig opdateret med de seneste casino nyheder, analyser og opdateringer fra det danske casinomarked. Nye licenser, bonusændringer, betalingsmetoder og lovgivning."
        jsonLd={articleSchema}
        noindex={shouldNoindex}
      />

      {/* Gradient Hero Section */}
      <section
        className="relative overflow-hidden py-8 text-white md:py-12 min-h-[280px] md:min-h-[320px]"
        style={{
          background: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
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
          date={latestDate || "21. februar 2026"}
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
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setActiveCategory(cat);
                  setPage(1);
                }}
              >
                {CATEGORY_META[cat]?.label || cat}
              </Button>
            ))}
          </div>
          {/* Category intro text for SEO */}
          {activeCategory !== "alle" && categoryMeta.intro && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {categoryMeta.intro}
            </p>
          )}
          {activeCategory === "alle" && (
            <p className="text-muted-foreground">Korte analyser og opdateringer fra det danske online casino-marked.</p>
          )}
        </div>

        {/* Evergreen hub sections – only on page 1, category "alle" */}
        {page === 1 && activeCategory === "alle" && <NewsHubSections />}

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
              {activeCategory !== "alle"
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
            {activeCategory === "alle" && totalPages > 1 && (
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

        <Separator className="my-10" />

        <AuthorBio author="ajse" showCommunity={false} />

        <RelatedGuides currentPath="/casino-nyheder" maxLinks={5} />
      </main>
    </>
  );
};

export default CasinoNyheder;
