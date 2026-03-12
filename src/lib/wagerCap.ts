/**
 * Danish regulatory compliance: wagering requirements cannot exceed 10x.
 * This utility sanitizes wagering display values from external/scraped data.
 */

const MAX_WAGER_DK = 10;

/**
 * Sanitize a wagering requirement string to cap at 10x.
 * E.g. "35x" → "10x", "10x (d+b)" → "10x (d+b)", "Omsætningsfri" → "Omsætningsfri"
 * Returns null if input is null/undefined.
 */
export function capWagerDisplay(wager: string | null | undefined): string | null {
  if (!wager) return null;

  // Extract numeric value
  const match = wager.match(/(\d+)\s*x/i);
  if (!match) return wager; // No "Nx" pattern found, return as-is (e.g. "Omsætningsfri")

  const value = parseInt(match[1], 10);
  if (value <= MAX_WAGER_DK) return wager; // Already compliant

  // Replace the non-compliant value with 10x
  return wager.replace(/\d+\s*x/i, `${MAX_WAGER_DK}x`);
}
