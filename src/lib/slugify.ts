/**
 * Convert a slot name to a URL-safe slug.
 * "Sweet Bonanza" → "sweet-bonanza"
 * "Gonzo's Quest" → "gonzos-quest"
 */
export function slugifySlotName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
