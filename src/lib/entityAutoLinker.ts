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

import { ENTITY_MAPPINGS } from "./entityMappings";

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
 * Simple string hash for deterministic variant selection.
 */
function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
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
  
  // Compute a hash of the full content for deterministic variant selection
  const contentHash = simpleHash(html);
  
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
          // Pick anchor: use variant if available, otherwise static anchor or matched text
          let anchorText: string;
          if (entity.anchorVariants && entity.anchorVariants.length > 0) {
            anchorText = entity.anchorVariants[contentHash % entity.anchorVariants.length];
          } else {
            anchorText = entity.anchor || matchedText;
          }
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
