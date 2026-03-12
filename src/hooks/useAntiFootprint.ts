import { useLocation } from "react-router-dom";

/**
 * Anti-footprint utilities for shared components.
 *
 * RULE: Any component used on 5+ pages MUST use these helpers
 * to vary its output per page. This prevents Google from detecting
 * identical HTML blocks across programmatic page clusters.
 *
 * Usage:
 *   const { hash, rotate, shuffle, pick } = useAntiFootprint();
 *
 * - rotate(items, count?) → rotated slice unique per page
 * - shuffle(items) → deterministically shuffled per page
 * - pick(variants) → select one variant per page
 */

/** Deterministic hash (djb2) */
function djb2(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Seeded Fisher-Yates shuffle */
function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = ((s * 1103515245 + 12345) & 0x7fffffff);
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function useAntiFootprint(customKey?: string) {
  const { pathname } = useLocation();
  const key = customKey ?? pathname;
  const hash = djb2(key);

  return {
    /** Raw hash value */
    hash,

    /** Pathname used for hashing */
    key,

    /**
     * Rotate an array by a hash-based offset, optionally slicing to `count`.
     * Ensures each page shows a different starting point.
     *
     * @example
     * const visibleCasinos = rotate(allCasinos, 4); // 4 unique per page
     */
    rotate<T>(items: readonly T[], count?: number): T[] {
      if (items.length === 0) return [];
      const offset = hash % items.length;
      const rotated = [...items.slice(offset), ...items.slice(0, offset)];
      return count != null ? rotated.slice(0, count) : rotated;
    },

    /**
     * Deterministically shuffle an array. Same path → same order.
     *
     * @example
     * const sections = shuffle(["intro", "stats", "faq", "catalog"]);
     */
    shuffle<T>(items: readonly T[]): T[] {
      return seededShuffle(items, hash);
    },

    /**
     * Pick one variant from an array based on page hash.
     *
     * @example
     * const heading = pick(["Populære slots", "Udvalgte spil", "Anbefalede"]);
     */
    pick<T>(variants: readonly T[]): T {
      return variants[hash % variants.length];
    },
  };
}

/**
 * Standalone hash function for use outside React components
 * (e.g. in useMemo callbacks, utility functions).
 */
export { djb2 as hashStr, seededShuffle };
