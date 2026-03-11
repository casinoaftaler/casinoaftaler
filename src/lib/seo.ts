import { getRouteLastmod } from "@/lib/seoRoutes";

/**
 * SEO configuration constants.
 *
 * In production, all canonical/og:url references use the primary domain.
 * Preview deployments on lovable.app will still use the production domain
 * for SEO consistency.
 */
export const SITE_URL = "https://casinoaftaler.dk";
export const SITE_NAME = "Casinoaftaler";
export const SITE_BRAND = "Casinoaftaler";

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
    url: `${SITE_URL}/icon-512x512.png`,
    width: 512,
    height: 512,
  },
  sameAs: [
    "https://www.youtube.com/@casinoaftaler",
    "https://www.instagram.com/casinoaftaler",
    "https://www.facebook.com/casinoaftaler",
    "https://x.com/casinoaftaler",
    "https://www.twitch.tv/fedesvinsejer",
    "https://www.linkedin.com/in/info-casinoaftaler-5782203b1/",
    "https://discord.gg/ZD4YdSeY",
    "https://www.tiktok.com/@casinoaftaler",
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
  "https://www.twitch.tv/kevinsylence",
  "https://www.youtube.com/@KevinSylence",
  "https://www.linkedin.com/in/kevin-s%C3%B8rensen-76308819b/",
  "https://www.instagram.com/kevinsylence/",
  "https://x.com/KevinSylence",
  // facebook.com/casinoaftaler belongs to the Organization entity – not added here
];

export const AJSE_SAME_AS = [
  "https://www.linkedin.com/in/ajse-serifovski-587b25278/",
  "https://www.instagram.com/serifoaaa/",
];


function buildPersonEntity(authorName: string, authorUrl: string, authorSameAs: string[]) {
  const isKevin = authorName === "Kevin";
  const isAjse = authorName === "Ajse";
  return {
    "@type": "Person",
    "@id": `${authorUrl}#person`,
    name: isAjse ? "Ajse" : isKevin ? "Kevin" : "Jonas Theill",
    url: authorUrl,
    image: isAjse
      ? `${SITE_URL}/ajse-avatar.webp`
      : isKevin
        ? `${SITE_URL}/kevin-avatar.webp`
        : `${SITE_URL}/jonas-avatar.webp`,
    jobTitle: isAjse
      ? "Juridisk redaktør & casinoanalytiker"
      : isKevin
        ? "Casino Streamer & IT-medansvarlig"
        : "Casino Bonus Ekspert",
    knowsAbout: isAjse
      ? ["dansk spillelovgivning", "online casino regulering", "ansvarligt spil", "casino compliance", "slot-markedet", "Gambling Law", "Casino Regulation", "Responsible Gambling"]
      : isKevin
        ? ["online casino", "casino streaming", "betalingsmetoder", "spiludviklere", "IT-sikkerhed"]
        : ["online casino", "iGaming", "casino bonus", "spillemaskiner", "RTP", "ansvarligt spil"],
    nationality: {
      "@type": "Country",
      name: "Denmark",
    },
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Casinoaftaler.dk",
      url: SITE_URL,
    },
    memberOf: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
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
  /**
   * If omitted, automatically resolved from seoRoutes.ts lastmod
   * based on the URL path. Pass explicitly only to override.
   */
  dateModified?: string;
  /** Override @type – defaults to "Article". Use "NewsArticle" for news. */
  articleType?: string;
  authorName?: string;
  authorUrl?: string;
  /** Defaults to Jonas's sameAs list. Pass KEVIN_SAME_AS or custom array to override. */
  authorSameAs?: string[];
  image?: string;
  /** YouTube video ID – when provided, creates hasPart ↔ isPartOf binding */
  videoId?: string;
  /**
   * Primary topic of the article – strengthens Knowledge Graph entity recognition.
   * Pass a Thing with @type and name, e.g. { "@type": "Thing", name: "Casino Bonus" }
   */
  about?: { "@type": string; name: string; url?: string }[];
  /**
   * Secondary entities mentioned in the article – broadens Knowledge Graph signals.
   * E.g. game providers, payment methods, regulatory bodies.
   */
  mentions?: { "@type": string; name: string; url?: string }[];
  /**
   * @deprecated This parameter is intentionally ignored. AggregateRating is NOT valid
   * on Article type per Google. Use buildReviewSchema() instead, which attaches it
   * to itemReviewed (SoftwareApplication). Kept only for backward compatibility.
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
    ?? (authorName === "Kevin" ? KEVIN_SAME_AS : authorName === "Ajse" ? AJSE_SAME_AS : JONAS_SAME_AS);

  // Auto-resolve dateModified from seoRoutes if not explicitly provided
  const urlPath = opts.url.replace(SITE_URL, "");
  const resolvedDateModified = opts.dateModified
    ?? getRouteLastmod(urlPath)
    ?? opts.datePublished;

  const articleId = `${opts.url}#article`;
  const personId = `${authorUrl}#person`;
  const videoId = opts.videoId ? `${opts.url}#video` : undefined;

  const article = {
    "@type": opts.articleType || "Article",
    "@id": articleId,
    headline: opts.headline,
    description: opts.description,
    image: opts.image || `${SITE_URL}/og-image.png`,
    datePublished: toIso8601WithTz(opts.datePublished),
    dateModified: toIso8601WithTz(resolvedDateModified),
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
        url: `${SITE_URL}/icon-512x512.png`,
        width: 512,
        height: 512,
      },
    },
    ...(videoId && {
      hasPart: {
        "@id": videoId,
      },
    }),
    ...(opts.about && opts.about.length > 0 && {
      about: opts.about.map((a) => ({
        "@type": a["@type"],
        name: a.name,
        ...(a.url ? { url: a.url } : {}),
      })),
    }),
    ...(opts.mentions && opts.mentions.length > 0 && {
      mentions: opts.mentions.map((m) => ({
        "@type": m["@type"],
        name: m.name,
        ...(m.url ? { url: m.url } : {}),
      })),
    }),
    // NOTE: aggregateRating is NOT valid on Article type per Google.
    // Use buildReviewSchema() to attach it to the Review's itemReviewed instead.
  };

  const person = buildPersonEntity(authorName, authorUrl, authorSameAs);

  const graph: Record<string, unknown>[] = [article, person];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Build a Review JSON-LD with AggregateRating on itemReviewed.
 * This is the correct placement per Google's structured data spec.
 */
export function buildReviewSchema(opts: {
  itemName: string;
  itemUrl: string;
  ratingValue: string;
  ratingCount: string;
  reviewBody: string;
  authorUrl?: string;
}) {
  const authorUrl = opts.authorUrl || `${SITE_URL}/forfatter/jonas`;
  // Derive a stable slug from the external URL domain for the @id
  const slug = opts.itemUrl
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\.dk\/?$|\.com\/?$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();
  const reviewId = `${SITE_URL}/casino-anmeldelser/${slug}#review`;
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": reviewId,
    name: `${opts.itemName} Anmeldelse`,
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: opts.itemName,
      url: opts.itemUrl,
      applicationCategory: "GameApplication",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: opts.ratingValue,
        ratingCount: opts.ratingCount,
        bestRating: "5",
        worstRating: "1",
      },
    },
    author: { "@type": "Person", "@id": `${authorUrl}#person` },
    reviewRating: {
      "@type": "Rating",
      ratingValue: opts.ratingValue,
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: opts.reviewBody,
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
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
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
        url: `${SITE_URL}/icon-512x512.png`,
        width: 512,
        height: 512,
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

/**
 * Generate HowTo JSON-LD schema for step-by-step guides.
 * Used selectively on slot guides and payment method pages for rich snippet eligibility.
 *
 * @param opts.name       – Human-readable title, e.g. "Sådan spiller du Book of Dead"
 * @param opts.steps      – Array of { name, text } objects (minimum 3 steps)
 * @param opts.pageUrl    – Canonical URL of the page (used for @id)
 * @param opts.description – Optional description for the HowTo
 * @param opts.totalTime  – Optional ISO 8601 duration, e.g. "PT5M"
 */
export function buildHowToSchema(opts: {
  name: string;
  steps: { name: string; text: string }[];
  pageUrl: string;
  description?: string;
  totalTime?: string;
}) {
  if (opts.steps.length < 3) {
    console.warn("buildHowToSchema: at least 3 steps required for valid HowTo markup");
  }
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${opts.pageUrl}#howto`,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep" as const,
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
