import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { getTermBySlug, glossaryTerms } from "@/data/glossaryTerms";
import { getGlossaryHero } from "@/data/glossaryHeroImages";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { autoLinkEntities } from "@/lib/entityAutoLinker";
import { useMemo } from "react";

const OrdbogTerm = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const term = slug ? getTermBySlug(slug) : undefined;

  const processedContent = useMemo(() => {
    if (!term?.fullContent) return "";
    return autoLinkEntities(term.fullContent);
  }, [term]);

  // Calculate read time from content length (strip HTML, ~200 words/min Danish)
  const readTime = useMemo(() => {
    if (!term?.fullContent) return "3 min";
    const textOnly = term.fullContent.replace(/<[^>]*>/g, "");
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(3, Math.ceil(wordCount / 200));
    return `${minutes} min`;
  }, [term]);

  if (!term) return <Navigate to="/ordbog" replace />;

  const heroImage = getGlossaryHero(term.slug);

  const relatedTermData = term.relatedTerms
    .map((s) => glossaryTerms.find((t) => t.slug === s))
    .filter(Boolean);

  const definedTermSchema = {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/ordbog/${term.slug}#term`,
    name: term.title,
    description: term.shortDefinition,
    url: `${SITE_URL}/ordbog/${term.slug}`,
    inDefinedTermSet: { "@id": `${SITE_URL}/ordbog#termset` },
  };

  const articleSchema = buildArticleSchema({
    headline: term.metaTitle,
    description: term.metaDescription,
    url: `${SITE_URL}/ordbog/${term.slug}`,
    datePublished: "2026-03-06",
    dateModified: "2026-03-06",
  });

  return (
    <>
      <SEO
        title={term.metaTitle}
        description={term.metaDescription}
        jsonLd={[articleSchema, definedTermSchema] as Record<string, unknown>[]}
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            {term.category && (
              <Badge variant="secondary" className="mb-4">
                {term.category}
              </Badge>
            )}
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {term.title}
            </h1>
            <p className="text-lg text-white/80">
              {term.shortDefinition}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="5 min" />

        <Link to="/ordbog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Tilbage til Casino Ordbog
        </Link>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={heroImage}
            alt={`${term.title} – casino ordbog begreb illustreret`}
            width={1920}
            height={1080}
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        <div
          className="prose prose-lg max-w-none dark:prose-invert mb-10 prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        {relatedTermData.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">Relaterede Begreber</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTermData.map((rt) =>
                rt ? (
                  <Card key={rt.slug} className="group hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <Link to={`/ordbog/${rt.slug}`} className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{rt.title}</span>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rt.shortDefinition}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    </CardContent>
                  </Card>
                ) : null
              )}
            </div>
          </section>
        )}

        <RelatedGuides currentPath={pathname} />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default OrdbogTerm;
