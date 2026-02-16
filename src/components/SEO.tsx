import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL, SITE_NAME, SITE_BRAND, getCanonicalUrl } from "@/lib/seo";

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Normalise any page title to end with "| Casinoaftaler.dk".
 * Strips existing brand suffixes first to avoid duplication.
 */
function formatTitle(raw: string): string {
  const stripped = raw
    .replace(/\s*[|–-]\s*Casinoaftaler(?:\.dk)?\s*$/i, "")
    .trim();
  return `${stripped} | ${SITE_BRAND}`;
}

export function SEO({ title, description, type = "website", image, noindex, jsonLd }: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = getCanonicalUrl(pathname);
  const formattedTitle = formatTitle(title);

  // Truncate description to 160 chars for SEO best practice
  const safeDescription = description.length > 160
    ? description.slice(0, 157) + "..."
    : description;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={safeDescription} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      <meta property="og:locale" content="da_DK" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={safeDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
