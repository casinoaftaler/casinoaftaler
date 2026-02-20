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
  "@id": `${SITE_URL}/#organization`,
  name: "Casinoaftaler.dk",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon-48x48.png`,
    width: 192,
    height: 192,
  },
  sameAs: [
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
 * Jonas Theill – canonical sameAs list (7 social profiles).
 * Discord excluded for stronger Knowledge Graph disambiguation signal.
 */
export const JONAS_SAME_AS = [
  "https://www.twitch.tv/fedesvinsejer",
  "https://www.youtube.com/@fedesvinsejer",
  "https://www.instagram.com/jonastheill",
  "https://www.linkedin.com/in/info-casinoaftaler-5782203b1/",
  "https://x.com/casinoaftaler",
  "https://www.snapchat.com/@fedesvinsejer",
  // facebook.com/casinoaftaler belongs to the Organization entity – not added here
];

export const KEVIN_SAME_AS = [
  "https://www.twitch.tv/kevin_casinoaftaler",
  "https://www.instagram.com/kevin.casinoaftaler",
  // facebook.com/casinoaftaler belongs to the Organization entity – not added here
];

/** Canonical Person entity for Jonas Theill – reused across all article pages. */
const JONAS_PERSON_ID = `${SITE_URL}/forfatter/jonas#person`;

function buildPersonEntity(authorName: string, authorUrl: string, authorSameAs: string[]) {
  const isKevin = authorName === "Kevin";
  return {
    "@type": "Person",
    "@id": `${authorUrl}#person`,
    name: isKevin ? "Kevin" : "Jonas Theill",
    url: authorUrl,
    jobTitle: isKevin ? "Casino Streamer & IT-medansvarlig" : "Casino Bonus Ekspert",
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Casinoaftaler.dk",
      url: SITE_URL,
    },
    sameAs: authorSameAs,
  };
}

/**
 * Generate Article + Person JSON-LD as a unified @graph.
 * Optionally links to a VideoObject via hasPart if videoId is provided.
 *
 * Usage:
 *   buildArticleSchema({ headline, description, url, datePublished, dateModified })
 *   // with video binding:
 *   buildArticleSchema({ ..., videoId: "abc123" })
 */
export function buildArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorUrl?: string;
  /** Defaults to Jonas's sameAs list. Pass KEVIN_SAME_AS or custom array to override. */
  authorSameAs?: string[];
  image?: string;
  /** YouTube video ID – when provided, creates hasPart ↔ isPartOf binding */
  videoId?: string;
  /**
   * Optional AggregateRating for casino review pages.
   * Enables star ratings in SERP. Must not be inflated (max 4.9, ratingCount ≥ 8).
   */
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
    bestRating?: string;
    worstRating?: string;
  };
}) {
  const authorName = opts.authorName || "Jonas";
  const authorUrl = opts.authorUrl || `${SITE_URL}/forfatter/jonas`;
  const authorSameAs = opts.authorSameAs
    ?? (authorName === "Kevin" ? KEVIN_SAME_AS : JONAS_SAME_AS);

  const articleId = `${opts.url}#article`;
  const personId = `${authorUrl}#person`;
  const videoId = opts.videoId ? `${opts.url}#video` : undefined;

  const article = {
    "@type": "Article",
    "@id": articleId,
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
      "@id": personId,
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
    ...(videoId && {
      hasPart: {
        "@id": videoId,
      },
    }),
    ...(opts.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: opts.aggregateRating.ratingValue,
        ratingCount: opts.aggregateRating.ratingCount,
        bestRating: opts.aggregateRating.bestRating ?? "5",
        worstRating: opts.aggregateRating.worstRating ?? "1",
      },
    }),
  };

  const person = buildPersonEntity(authorName, authorUrl, authorSameAs);

  const graph: Record<string, unknown>[] = [article, person];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Build a VideoObject entity with explicit @id and isPartOf binding to its Article.
 * Inject this separately via SEO jsonLd prop alongside the @graph from buildArticleSchema.
 *
 * @param articleUrl  – canonical URL of the parent article (no trailing slash)
 * @param videoId     – YouTube video ID
 * @param opts        – VideoObject metadata
 */
export function buildVideoSchema(
  articleUrl: string,
  videoId: string,
  opts: {
    title: string;
    description: string;
    uploadDate: string;
    duration: string;
    viewCount?: number;
    thumbnailUrl?: string;
  }
) {
  const videoEntityId = `${articleUrl}#video`;
  const articleEntityId = `${articleUrl}#article`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumb = opts.thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": videoEntityId,
    name: opts.title,
    description: opts.description,
    thumbnailUrl: thumb,
    uploadDate: toIso8601WithTz(opts.uploadDate),
    duration: opts.duration,
    embedUrl: embedUrl,
    contentUrl: watchUrl,
    isPartOf: {
      "@id": articleEntityId,
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
    ...(opts.viewCount !== undefined && {
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: opts.viewCount,
      },
    }),
  };
}

export { JONAS_PERSON_ID };

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
