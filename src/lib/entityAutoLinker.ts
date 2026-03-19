import { ENTITY_MAPPINGS } from "./entityMappings";

/**
 * Entity auto-linker: replaces first occurrence of key entities in HTML
 * with internal links to relevant main pages.
 *
 * CRITICAL PRIORITY ORDER:
 * 1. Money-pages FIRST (commercial/transactional targets)
 * 2. Glossary-sider KUN for termer uden kommerciel modpart
 *
 * Rules:
 * - Only first occurrence per entity
 * - Natural anchor text
 * - No keyword stuffing
 * - Skip entities already wrapped in <a> tags
 * - Skip entities inside headings (h1-h6) and strong tags
 */

/**
 * Forbidden wrapper tags — auto-linking is only allowed inside <p> and <li>.
 * We check if the match position is inside any of these tags.
 */
const FORBIDDEN_TAGS = ["a", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "button"];

const PRIORITY_MONEY_RULES = [
  {
    href: "/top-10-casino-online",
    patterns: [
      /\bonline casino(er)?\b/i,
      /\bbedste casino(er)?\b/i,
      /\bbedste online casino(er)?\b/i,
      /\btop casino(er)?\b/i,
      /\bonline casino(er)? i (danmark|dk)\b/i,
    ],
  },
  {
    href: "/casino-bonus",
    patterns: [/\bcasino bonus\b/i, /\bcasinobonus\b/i],
  },
  {
    href: "/velkomstbonus",
    patterns: [/\bvelkomstbonus\b/i, /\bvelkomst-bonus\b/i],
  },
  {
    href: "/free-spins-i-dag",
    patterns: [/\bfree spins i dag\b/i, /\bgratis spins i dag\b/i, /\bdagens free spins\b/i],
  },
  {
    href: "/casino-med-mobilepay",
    patterns: [/\bcasino med mobilepay\b/i, /\bmobilepay casino\b/i, /\bcasinoer med mobilepay\b/i],
  },
] as const;

const MONEY_PAGE_HREFS = new Set(PRIORITY_MONEY_RULES.map((rule) => rule.href));
const MAX_MONEY_LINKS = 3;

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
 * Simple string hash for deterministic variant selection.
 */
function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function tryInsertFirstValidLink({
  html,
  patterns,
  href,
  anchorText,
}: {
  html: string;
  patterns: RegExp[];
  href: string;
  anchorText?: string;
}): string | null {
  for (const pattern of patterns) {
    const parts = html.split(/(<(?:a|h[1-6]|strong|button)[^>]*>[\s\S]*?<\/(?:a|h[1-6]|strong|button)>)/gi);

    for (let i = 0; i < parts.length; i++) {
      if (/^<(?:a|h[1-6]|strong|button)[^>]*>/i.test(parts[i])) continue;

      const match = parts[i].match(pattern);
      if (!match || match.index === undefined) continue;

      const absolutePos = parts.slice(0, i).join("").length + match.index;
      if (isInsideForbiddenContext(html, absolutePos)) continue;

      const matchedText = match[0];
      const linkText = anchorText || matchedText;
      const link = `<a href="${href}" class="text-primary hover:underline">${linkText}</a>`;

      parts[i] =
        parts[i].slice(0, match.index) +
        link +
        parts[i].slice(match.index + matchedText.length);

      return parts.join("");
    }
  }

  return null;
}

/**
 * Processes HTML content and auto-links the first occurrence of
 * key entities to their respective main pages.
 * Only links text inside <p> and <li> elements, never in headings or anchors.
 * Uses anchorVariants (if available) with a content-hash to vary anchor text
 * across different pages, reducing anchor homogeneity.
 */
export function autoLinkEntities(html: string): string {
  if (!html) return html;

  const contentHash = simpleHash(html);
  let result = html;
  const linkedEntities = new Set<string>();
  let moneyLinksInserted = 0;

  for (const rule of PRIORITY_MONEY_RULES) {
    if (moneyLinksInserted >= MAX_MONEY_LINKS) break;
    if (linkedEntities.has(rule.href)) continue;

    const updatedHtml = tryInsertFirstValidLink({
      html: result,
      patterns: [...rule.patterns],
      href: rule.href,
    });

    if (!updatedHtml) continue;

    result = updatedHtml;
    linkedEntities.add(rule.href);
    moneyLinksInserted += 1;
  }

  for (const entity of ENTITY_MAPPINGS) {
    if (linkedEntities.has(entity.href)) continue;
    if (MONEY_PAGE_HREFS.has(entity.href) && moneyLinksInserted >= MAX_MONEY_LINKS) continue;

    const anchorText = entity.anchorVariants?.length
      ? entity.anchorVariants[contentHash % entity.anchorVariants.length]
      : entity.anchor;

    const updatedHtml = tryInsertFirstValidLink({
      html: result,
      patterns: entity.patterns,
      href: entity.href,
      anchorText,
    });

    if (!updatedHtml) continue;

    result = updatedHtml;
    linkedEntities.add(entity.href);

    if (MONEY_PAGE_HREFS.has(entity.href)) {
      moneyLinksInserted += 1;
    }
  }

  return result;
}
