/**
 * Danish regulatory compliance: wagering requirements cannot exceed 10x.
 * Utilities in this file sanitize scraped/displayed wager values and related text.
 */

const MAX_WAGER_DK = 10;

function clampWagerValue(value: number): number {
  return Math.min(value, MAX_WAGER_DK);
}

/**
 * Parse first Nx wager value from text.
 * Returns null if no wager pattern exists.
 */
export function getWagerMultiple(value: string | null | undefined): number | null {
  if (!value) return null;
  const match = value.match(/(\d+)\s*x/i);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

/**
 * True when wager is absent or <=10x.
 */
export function isWagerCompliant(value: string | null | undefined): boolean {
  const parsed = getWagerMultiple(value);
  return parsed === null || parsed <= MAX_WAGER_DK;
}

/**
 * Sanitize a wagering requirement string to cap at 10x.
 * E.g. "35x" → "10x", "10x (d+b)" → "10x (d+b)", "Omsætningsfri" → "Omsætningsfri"
 * Returns null if input is null/undefined.
 */
export function capWagerDisplay(wager: string | null | undefined): string | null {
  if (!wager) return null;

  const parsed = getWagerMultiple(wager);
  if (parsed === null) return wager;
  if (parsed <= MAX_WAGER_DK) return wager;

  return wager.replace(/\d+\s*x/i, `${clampWagerValue(parsed)}x`);
}

/**
 * Sanitize free-text terms/summary so any "omsætningskrav/wager" mention above 10x is capped.
 */
export function capWagerInText(text: string | null | undefined): string | null {
  if (!text) return null;

  // Omsætningskrav: 35x / omsætningskrav på 35x
  let sanitized = text.replace(
    /(oms[æa]tningskrav(?:ene)?(?:\s*(?:på|:|=|er))?\s*)(\d+)\s*x/gi,
    (_full, prefix: string, rawValue: string) => `${prefix}${clampWagerValue(Number.parseInt(rawValue, 10))}x`
  );

  // Wager / wagering: 35x
  sanitized = sanitized.replace(
    /(wager(?:ing)?(?:\s*(?:krav)?\s*(?:på|:|=|er))?\s*)(\d+)\s*x/gi,
    (_full, prefix: string, rawValue: string) => `${prefix}${clampWagerValue(Number.parseInt(rawValue, 10))}x`
  );

  return sanitized;
}
