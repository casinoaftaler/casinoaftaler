import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL, SITE_NAME, SITE_BRAND, getCanonicalUrl } from "@/lib/seo";
import { buildBreadcrumbListSchema } from "@/lib/breadcrumbs";

/** WebSite + SearchAction schema for Sitelinks Searchbox eligibility. */
const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/casino-anmeldelser?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Override the last breadcrumb label (for dynamic pages like news articles). */
  breadcrumbLabel?: string;
  /** ISO 8601 date for article:published_time (only emitted when type="article") */
  datePublished?: string;
  /** ISO 8601 date for article:modified_time (only emitted when type="article") */
  dateModified?: string;
}

/**
 * Normalise any page title to end with "| Casinoaftaler.dk".
 * Strips existing brand suffixes first to avoid duplication.
 */
function formatTitle(raw: string): string {
  const stripped = raw
    .replace(/\s*[|–:-]\s*Casinoaftaler(?:\.dk)?\s*$/i, "")
    .trim();
  return `${stripped} | ${SITE_BRAND}`;
}

export function SEO({ title, description, type = "website", image = `${SITE_URL}/og-image.png`, noindex, jsonLd, breadcrumbLabel, datePublished, dateModified }: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = getCanonicalUrl(pathname);
  const formattedTitle = formatTitle(title);

  // Truncate description to 160 chars at a word boundary for SEO best practice
  const safeDescription = (() => {
    if (description.length <= 160) return description;
    const truncated = description.slice(0, 157);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + "…";
  })();

  // Build BreadcrumbList and inject it alongside page-level jsonLd so it
  // gets absorbed into the unified @graph when an Article @graph is present.
  const breadcrumbSchema = !noindex ? buildBreadcrumbListSchema(pathname, breadcrumbLabel) : null;

  const rawJsonLd: Record<string, unknown>[] = [
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    // Inject WebSite + SearchAction on homepage only (avoids duplication)
    ...(pathname === "/" ? [websiteSchema as Record<string, unknown>] : []),
  ];

  /**
   * Merge all jsonLd items into a single unified @graph.
   * Any item that already has a @graph array gets its entities extracted.
   * Standalone entities (VideoObject, FAQPage, etc.) are appended to the same graph.
   * This ensures Google receives one coherent knowledge graph per page.
   */
  const mergedJsonLd = (() => {
    if (rawJsonLd.length === 0) return null;
    const hasGraph = rawJsonLd.some(
      (item) => item["@graph"] && Array.isArray(item["@graph"])
    );
    if (!hasGraph) {
      // No @graph found – keep as-is (single or multiple standalone scripts)
      return null;
    }
    const entities: Record<string, unknown>[] = [];
    for (const item of rawJsonLd) {
      if (item["@graph"] && Array.isArray(item["@graph"])) {
        entities.push(...(item["@graph"] as Record<string, unknown>[]));
      } else {
        // Standalone entity (e.g. VideoObject, FAQPage) → absorb into @graph
        const { "@context": _ctx, ...rest } = item as Record<string, unknown>;
        void _ctx;
        entities.push(rest);
      }
    }
    return { "@context": "https://schema.org", "@graph": entities };
  })();

  // When merging failed or no @graph exists, fall back to individual scripts
  const standaloneScripts = mergedJsonLd ? [] : rawJsonLd;

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={safeDescription} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <>
          <link rel="canonical" href={canonicalUrl} />
          <link rel="alternate" hrefLang="da" href={canonicalUrl} />
          <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        </>
      )}

      <meta property="og:locale" content="da_DK" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {type === "article" && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {type === "article" && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={image} />

      {/* Single unified @graph – preferred path */}
      {mergedJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(mergedJsonLd)}
        </script>
      )}

      {/* Fallback: standalone scripts when no @graph is present */}
      {standaloneScripts.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
