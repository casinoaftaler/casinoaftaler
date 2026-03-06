import { useParams, Link, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";
import { getTermBySlug, glossaryTerms } from "@/data/glossaryTerms";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { autoLinkEntities } from "@/lib/entityAutoLinker";
import { useMemo } from "react";

const OrdbogTerm = () => {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? getTermBySlug(slug) : undefined;

  const processedContent = useMemo(() => {
    if (!term?.fullContent) return "";
    return autoLinkEntities(term.fullContent);
  }, [term]);

  if (!term) return <Navigate to="/ordbog" replace />;

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
    datePublished: "2026-03-06",
    dateModified: "2026-03-06",
    path: `/ordbog/${term.slug}`,
    author: "Jonas",
  });

  return (
    <>
      <SEO
        title={term.metaTitle}
        description={term.metaDescription}
        jsonLd={[articleSchema, definedTermSchema] as Record<string, unknown>[]}
      />
      <article className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <AuthorMetaBar author="Jonas" readTime={5} />

        <Link to="/ordbog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Tilbage til Casino Ordbog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-7 w-7 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{term.title}</h1>
          </div>
          {term.category && <Badge variant="secondary" className="mb-4">{term.category}</Badge>}
          <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-4 bg-muted/30 py-3 rounded-r-md">
            {term.shortDefinition}
          </p>
        </header>

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

        {term.relatedPages.length > 0 && (
          <RelatedGuides guides={term.relatedPages.map((p) => ({ title: p.label, href: p.href }))} />
        )}

        <AuthorBio author="Jonas" />
      </article>
    </>
  );
};

export default OrdbogTerm;
