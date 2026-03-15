/**
 * Eagerly resolve all hero images via Vite glob so we can look them up by slug.
 * The actual image bytes are NOT loaded here – Vite only resolves the hashed URL string.
 */

const heroModules = import.meta.glob<{ default: string }>(
  "/src/assets/heroes/*-hero.{jpg,webp,png}",
  { eager: true },
);

// Build a map: slug (e.g. "casino-bonus") → resolved image URL
const heroBySlug: Record<string, string> = {};
for (const [path, mod] of Object.entries(heroModules)) {
  // path looks like "/src/assets/heroes/casino-bonus-hero.jpg"
  const filename = path.split("/").pop() ?? "";
  const slug = filename.replace(/-hero\.\w+$/, "");
  if (slug) heroBySlug[slug] = mod.default;
}

/**
 * Given an article path like "/casino-bonus" or "/casinospil/spillemaskiner/book-of-dead",
 * return the matching hero image URL (or undefined if none found).
 */
export function getHeroImageForPath(articlePath: string): string | undefined {
  // Try the last segment first (most common)
  const segments = articlePath.replace(/^\/|\/$/g, "").split("/");
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && heroBySlug[lastSegment]) {
    return heroBySlug[lastSegment];
  }

  // Try joining all segments (e.g., "/nye-casinoer/2026" → "nye-casinoer-2026")
  const joined = segments.join("-");
  if (heroBySlug[joined]) {
    return heroBySlug[joined];
  }

  return undefined;
}
