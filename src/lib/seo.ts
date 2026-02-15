/**
 * SEO configuration constants.
 * 
 * In production, all canonical/og:url references use the primary domain.
 * Preview deployments on lovable.app will still use the production domain
 * for SEO consistency.
 */
export const SITE_URL = "https://casinoaftaler.dk";
export const SITE_NAME = "Casinoaftaler";

/**
 * Returns the canonical URL for the current page.
 * Combines SITE_URL with the given pathname.
 */
export const getCanonicalUrl = (pathname: string): string => {
  // Ensure no double slashes and consistent trailing format
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  return `${SITE_URL}${cleanPath}`;
};

/**
 * Shared Organization schema for JSON-LD.
 */
export const organizationSchema = {
  "@type": "Organization",
  name: "Casinoaftaler.dk",
  url: SITE_URL,
  logo: "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/header-icon.jpg",
  sameAs: [
    "https://www.twitch.tv/fedesvinansen",
    "https://www.instagram.com/casinoaftaler",
    "https://www.youtube.com/@casinoaftaler",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/contact`,
    availableLanguage: "Danish",
  },
};

/**
 * Generate Article JSON-LD schema.
 */
export function buildArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorUrl?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: opts.url,
    author: {
      "@type": "Person",
      name: opts.authorName || "Jonas",
      url: opts.authorUrl || `${SITE_URL}/forfatter/jonas`,
    },
    publisher: {
      "@type": "Organization",
      name: "Casinoaftaler.dk",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/header-icon.jpg",
      },
    },
  };
}

/**
 * Generate FAQ JSON-LD schema from question/answer pairs.
 */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
