/**
 * Entity auto-linker: replaces first occurrence of key entities in HTML
 * with internal links to relevant main pages.
 * 
 * Rules:
 * - Only first occurrence per entity
 * - Natural anchor text
 * - No keyword stuffing
 * - Skip entities already wrapped in <a> tags
 */

interface EntityMapping {
  patterns: RegExp[];
  href: string;
  anchor: string;
}

const ENTITY_MAPPINGS: EntityMapping[] = [
  {
    patterns: [/\bSpillemyndigheden\b/],
    href: "/spillemyndigheden",
    anchor: "Spillemyndigheden",
  },
  {
    patterns: [/\bROFUS\b/],
    href: "/ansvarligt-spil",
    anchor: "ROFUS",
  },
  {
    patterns: [/\bansvarligt spil\b/i],
    href: "/ansvarligt-spil",
    anchor: "ansvarligt spil",
  },
  {
    patterns: [/\bTrustly\b/],
    href: "/betalingsmetoder/trustly",
    anchor: "Trustly",
  },
  {
    patterns: [/\bMobilePay\b/],
    href: "/betalingsmetoder/mobilepay",
    anchor: "MobilePay",
  },
  {
    patterns: [/\bdansk licens\b/i, /\bdanske licenser\b/i],
    href: "/casino-licenser",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bnye casinoer\b/i],
    href: "/nye-casinoer",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bhvidvask(?:regler|lovgivning|ning)?\b/i, /\bAML\b/],
    href: "/casino-licenser",
    anchor: "", // uses matched text
  },
];

/**
 * Processes HTML content and auto-links the first occurrence of
 * key entities to their respective main pages.
 * Skips text already inside anchor tags.
 */
export function autoLinkEntities(html: string): string {
  if (!html) return html;
  
  let result = html;
  const linkedEntities = new Set<string>();

  for (const entity of ENTITY_MAPPINGS) {
    if (linkedEntities.has(entity.href)) continue;

    for (const pattern of entity.patterns) {
      // Find match that is NOT already inside an <a> tag
      // Strategy: split by <a...>...</a> blocks, only process non-anchor segments
      const parts = result.split(/(<a[^>]*>[\s\S]*?<\/a>)/gi);
      let found = false;

      for (let i = 0; i < parts.length; i++) {
        // Skip anchor tag segments (odd indices from split)
        if (parts[i].match(/^<a[^>]*>/i)) continue;

        const match = parts[i].match(pattern);
        if (match && match.index !== undefined) {
          const matchedText = match[0];
          const anchorText = entity.anchor || matchedText;
          const link = `<a href="${entity.href}" class="text-primary hover:underline">${anchorText}</a>`;
          
          parts[i] =
            parts[i].slice(0, match.index) +
            link +
            parts[i].slice(match.index + matchedText.length);
          
          found = true;
          linkedEntities.add(entity.href);
          break;
        }
      }

      if (found) {
        result = parts.join("");
        break;
      }
    }
  }

  return result;
}
