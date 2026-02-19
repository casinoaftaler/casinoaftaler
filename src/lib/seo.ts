/**
 * SEO configuration constants.
 *
 * In production, all canonical/og:url references use the primary domain.
 * Preview deployments on lovable.app will still use the production domain
 * for SEO consistency.
 */
export const SITE_URL = "https://casinoaftaler.dk";
export const SITE_NAME = "Casinoaftaler";
export const SITE_BRAND = "Casinoaftaler.dk";

/**
 * Returns the canonical URL for the current page.
 * Combines SITE_URL with the given pathname.
 * Ensures lowercase, no trailing slash, no double slashes.
 */
export const getCanonicalUrl = (pathname: string): string => {
  const cleanPath = pathname === "/"
    ? "/"
    : pathname.replace(/\/+$/, "").toLowerCase();
  return `${SITE_URL}${cleanPath}`;
};

/**
 * Shared Organization schema for JSON-LD (used as publisher in Article schema).
 * The full Organization schema with founder, employee, knowsAbout etc.
 * lives exclusively on /om (OmTeamet.tsx) to avoid duplication.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Casinoaftaler.dk",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/header-icon.jpg",
    width: 192,
    height: 192,
  },
  sameAs: [
    "https://www.twitch.tv/fedesvinsejer",
    "https://www.youtube.com/@casinoaftaler",
    "https://www.instagram.com/casinoaftaler",
    "https://www.facebook.com/casinoaftaler",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/kontakt`,
    availableLanguage: "Danish",
  },
};

/** Ensure date string is full ISO 8601 with CET timezone for Google validation. */
function toIso8601WithTz(date: string): string {
  // Already has time component (T)
  if (date.includes("T")) return date;
  // Date-only → append midnight CET (+01:00)
  return `${date}T00:00:00+01:00`;
}

/**
 * Generate Article JSON-LD schema with all required fields.
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
    image: opts.image || `${SITE_URL}/og-image.png`,
    datePublished: toIso8601WithTz(opts.datePublished),
    dateModified: toIso8601WithTz(opts.dateModified),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
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
        width: 192,
        height: 192,
      },
    },
  };
}

/**
 * Extract plain text from a React node for use in structured data.
 * Handles strings, numbers, arrays, and React elements with children.
 */
export function reactNodeToText(node: unknown): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    return reactNodeToText(props?.children);
  }
  return "";
}

/**
 * Generate FAQ JSON-LD schema from question/answer pairs.
 * Accepts both string and ReactNode answers – ReactNode is auto-converted to plain text.
 */
export function buildFaqSchema(faqs: { question: string; answer: unknown }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : reactNodeToText(faq.answer),
      },
    })),
  };
}
