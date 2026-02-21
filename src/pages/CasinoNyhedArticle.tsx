import { useParams, Link, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { useNewsArticle, usePublishedNews } from "@/hooks/useCasinoNews";
import { SITE_URL } from "@/lib/seo";
import { CalendarDays, Loader2, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CasinoNyhedArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useNewsArticle(slug || "");
  
  // Fetch related articles (latest 3 excluding current)
  const { data: latestNews } = usePublishedNews(1, 4);
  const relatedArticles = (latestNews?.articles ?? [])
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
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

  const updatedDate = new Date(article.updated_at).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleUrl = `${SITE_URL}/casino-nyheder/${article.slug}`;

  // Build NewsArticle + BreadcrumbList schema in @graph
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        headline: article.meta_title || article.title,
        description: article.meta_description || article.excerpt || "",
        image: article.featured_image || `${SITE_URL}/og-image.png`,
        datePublished: article.published_at || article.created_at,
        dateModified: article.updated_at,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        author: {
          "@id": `${SITE_URL}/forfatter/jonas#person`,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Casinoaftaler.dk",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/favicon-48x48.png`,
            width: 192,
            height: 192,
          },
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/forfatter/jonas#person`,
        name: "Jonas Theill",
        url: `${SITE_URL}/forfatter/jonas`,
        jobTitle: "Casino Bonus Ekspert",
        worksFor: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt || ""}
        type="article"
        image={article.featured_image || undefined}
        noindex={article.status === "draft"}
        jsonLd={newsArticleSchema}
        breadcrumbLabel={article.title}
      />

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
        <Breadcrumbs dynamicLabel={article.title} />
        <AuthorMetaBar
          author="jonas"
          date={publishedDate}
          readTime="5 min"
          showFactCheck={true}
          showAffiliateDisclaimer={false}
        />

        {/* Hero Image */}
        {article.featured_image && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[400px]"
              loading="eager"
            />
          </div>
        )}

        {/* Article Content - render HTML content */}
        <section
          className="prose prose-lg dark:prose-invert max-w-none mb-12 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-4 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-3 [&>p]:mb-5 [&>p]:leading-relaxed [&>p]:text-muted-foreground [&>ul]:mb-5 [&>ol]:mb-5 [&>h2:first-of-type]:mt-0"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Separator className="my-8" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Relaterede Nyheder</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/casino-nyheder/${related.slug}`}
                  className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                    <CalendarDays className="h-3 w-3" />
                    {related.published_at &&
                      new Date(related.published_at).toLocaleDateString("da-DK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                  </span>
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
};

export default CasinoNyhedArticle;
