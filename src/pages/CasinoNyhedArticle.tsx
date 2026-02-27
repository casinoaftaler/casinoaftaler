import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { RelatedCasinos } from "@/components/RelatedCasinos";
import { RelatedGuides } from "@/components/RelatedGuides";
import { NewsContextualCTA } from "@/components/NewsContextualCTA";
import { useNewsArticle } from "@/hooks/useCasinoNews";
import { useRelatedNews } from "@/hooks/useRelatedNews";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { CalendarDays, Loader2, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CasinoNyhedArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useNewsArticle(slug || "");

  // Fetch related articles by category/tags instead of just latest
  const { data: relatedArticles = [] } = useRelatedNews(
    slug || "",
    article?.category || "",
    article?.tags || [],
    4
  );

  // Extract FAQ from HTML content and split into structured data + clean content
  const { contentWithoutFaq, faqs } = useMemo(() => {
    if (!article?.content) return { contentWithoutFaq: "", faqs: [] };

    const html = article.content;
    const faqHeadingRegex = /<h2[^>]*>\s*FAQ\s*<\/h2>/i;
    const match = html.match(faqHeadingRegex);

    if (!match || match.index === undefined) {
      return { contentWithoutFaq: html, faqs: [] };
    }

    const beforeFaq = html.slice(0, match.index);
    const faqHtml = html.slice(match.index + match[0].length);

    const nextH2Match = faqHtml.match(/<h2[^>]*>/i);
    const afterFaqContent = nextH2Match && nextH2Match.index !== undefined
      ? faqHtml.slice(nextH2Match.index)
      : "";
    const faqOnlyHtml = nextH2Match && nextH2Match.index !== undefined
      ? faqHtml.slice(0, nextH2Match.index)
      : faqHtml;

    const parsedFaqs: { question: string; answer: string }[] = [];
    const pRegex = /<p>\s*<strong>(.*?)<\/strong>\s*<br\s*\/?>\s*([\s\S]*?)<\/p>/gi;
    let pMatch;
    while ((pMatch = pRegex.exec(faqOnlyHtml)) !== null) {
      const question = pMatch[1].replace(/<[^>]*>/g, "").trim();
      const answer = pMatch[2].replace(/<[^>]*>/g, "").trim();
      if (question && answer) {
        parsedFaqs.push({ question, answer });
      }
    }

    return { contentWithoutFaq: beforeFaq + afterFaqContent, faqs: parsedFaqs };
  }, [article?.content]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/casino-nyheder" replace />;
  }

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Ikke publiceret";

  const articleUrl = `${SITE_URL}/casino-nyheder/${article.slug}`;

  const newsArticleSchema = buildArticleSchema({
    articleType: "NewsArticle",
    headline: article.meta_title || article.title,
    description: article.meta_description || article.excerpt || "",
    url: articleUrl,
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at,
    image: article.featured_image || undefined,
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
    authorSameAs: [],
  });

  const faqJsonLd = faqs.length > 0 ? buildFaqSchema(faqs) : null;
  const jsonLdSchemas = faqJsonLd
    ? [newsArticleSchema, faqJsonLd]
    : newsArticleSchema;

  return (
    <>
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt || ""}
        type="article"
        image={article.featured_image || undefined}
        noindex={article.status === "draft"}
        jsonLd={jsonLdSchemas}
        breadcrumbLabel={article.title}
      />

      <Breadcrumbs dynamicLabel={article.title} />

      {/* Gradient Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          background:
            "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Newspaper className="mr-1.5 h-3.5 w-3.5" />
              {article.category}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-lg text-white/80">{article.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar
          author="ajse"
          date={publishedDate}
          readTime="5 min"
          showFactCheck={true}
          showAffiliateDisclaimer={false}
        />

        {/* Hero Image */}
        {article.featured_image && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={optimizeStorageImage(article.featured_image, 1200) ?? article.featured_image}
              alt={article.title}
              width={1200}
              height={400}
              className="w-full h-auto object-cover max-h-[400px]"
              loading="eager"
            />
          </div>
        )}

        {/* Article Content - render HTML content (without FAQ) */}
        <section
          className="prose prose-lg dark:prose-invert max-w-none mb-12 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-3 [&>p]:mb-5 [&>p]:leading-relaxed [&>p]:text-muted-foreground [&>ul]:mb-5 [&>ol]:mb-5 [&>h2:first-of-type]:mt-0"
          dangerouslySetInnerHTML={{ __html: contentWithoutFaq }}
        />

        {/* Contextual CTA Bridge – category-based money-page links */}
        <NewsContextualCTA category={article.category} />

        {/* Structured FAQ Accordion */}
        {faqs.length > 0 && (
          <FAQSection
            title="Ofte Stillede Spørgsmål"
            faqs={faqs}
          />
        )}

        {/* Related Casinos - SEO internal linking */}
        <RelatedCasinos content={article.content} category={article.category} />

        <Separator className="my-8" />

        {/* Related Articles – category/tag matched */}
        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-2">Relaterede Nyheder</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Flere artikler om {article.category === "regulering" ? "regulering og lovgivning" :
                article.category === "licenser" ? "casino-licenser" :
                article.category === "nye-casinoer" ? "nye casinoer i Danmark" :
                article.category === "betalingsmetoder" ? "betalingsmetoder" :
                article.category === "markedsbevægelser" ? "markedsudviklinger" :
                article.category === "juridisk" ? "juridiske emner" :
                "det danske casinomarked"}.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/casino-nyheder/${related.slug}`}
                  className="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:border-primary/50"
                >
                  {related.featured_image && (
                    <img
                      src={optimizeStorageImage(related.featured_image, 400) ?? related.featured_image}
                      alt={related.title}
                      width={400}
                      height={160}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                      <CalendarDays className="h-3 w-3" />
                      {related.published_at &&
                        new Date(related.published_at).toLocaleDateString("da-DK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                    </span>
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AuthorBio author="ajse" showCommunity={false} />

        <RelatedGuides currentPath={`/casino-nyheder/${slug}`} maxLinks={5} />
      </div>
    </>
  );
};

export default CasinoNyhedArticle;
