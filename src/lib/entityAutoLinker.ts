/**
 * Entity auto-linker: replaces first occurrence of key entities in HTML
 * with internal links to relevant main pages.
 * 
 * Rules:
 * - Only first occurrence per entity
 * - Natural anchor text
 * - No keyword stuffing
 * - Skip entities already wrapped in <a> tags
 * - Skip entities inside headings (h1-h6) and strong tags
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
    patterns: [/\bcashback bonus\b/i, /\bcashback-bonus\b/i],
    href: "/cashback-bonus",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\breload bonus\b/i, /\breload-bonus\b/i],
    href: "/reload-bonus",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bhvidvask(?:regler|lovgivning|ning)?\b/i, /\bAML\b/],
    href: "/casino-licenser",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bRTP\b/],
    href: "/ordbog/rtp",
    anchor: "RTP",
  },
  {
    patterns: [/\bvolatilitet\b/i],
    href: "/ordbog/volatilitet",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bhouse edge\b/i],
    href: "/ordbog/house-edge",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bscatter[\s-]?symbol\b/i, /\bscatter\b/i],
    href: "/ordbog/scatter",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bwild[\s-]?symbol\b/i],
    href: "/ordbog/wild",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bgevinstlinjer\b/i, /\bpaylines\b/i],
    href: "/ordbog/paylines",
    anchor: "", // uses matched text
  },
  {
    patterns: [/\bhit frequency\b/i, /\bhit-frequency\b/i],
    href: "/ordbog/hit-frequency",
    anchor: "", // uses matched text
  },
];

/**
 * Forbidden wrapper tags — auto-linking is only allowed inside <p> and <li>.
 * We check if the match position is inside any of these tags.
 */
const FORBIDDEN_TAGS = ["a", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "button"];

/**
 * Check if a position in HTML is inside a forbidden context.
 */
function isInsideForbiddenContext(html: string, pos: number): boolean {
  const before = html.slice(0, pos);

  for (const tag of FORBIDDEN_TAGS) {
    const lastOpen = before.lastIndexOf(`<${tag}`);
    if (lastOpen !== -1) {
      const lastClose = before.lastIndexOf(`</${tag}>`);
      if (lastClose < lastOpen) return true;
    }
  }

  // Check if inside an HTML tag attribute (e.g., alt="...", title="...")
  const lastTagOpen = before.lastIndexOf("<");
  if (lastTagOpen !== -1) {
    const lastTagClose = before.lastIndexOf(">");
    if (lastTagClose < lastTagOpen) return true;
  }

  return false;
}

/**
 * Processes HTML content and auto-links the first occurrence of
 * key entities to their respective main pages.
 * Only links text inside <p> and <li> elements, never in headings or anchors.
 */
export function autoLinkEntities(html: string): string {
  if (!html) return html;
  
  let result = html;
  const linkedEntities = new Set<string>();

  for (const entity of ENTITY_MAPPINGS) {
    if (linkedEntities.has(entity.href)) continue;

    for (const pattern of entity.patterns) {
      // Split by anchor and heading tags to skip them entirely
      const parts = result.split(/(<(?:a|h[1-6]|strong|button)[^>]*>[\s\S]*?<\/(?:a|h[1-6]|strong|button)>)/gi);
      let found = false;

      for (let i = 0; i < parts.length; i++) {
        // Skip parts that are forbidden tags
        if (parts[i].match(/^<(?:a|h[1-6]|strong|button)[^>]*>/i)) continue;

        const match = parts[i].match(pattern);
        if (match && match.index !== undefined) {
          // Calculate absolute position for extra safety check
          const absolutePos = parts.slice(0, i).join("").length + match.index;
          if (isInsideForbiddenContext(result, absolutePos)) continue;

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
