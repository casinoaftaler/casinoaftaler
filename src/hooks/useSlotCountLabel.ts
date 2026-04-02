/**
 * Central slot count label — rounded down to nearest 100.
 * Used across all SEO texts, descriptions, and static content.
 * 
 * This hook fetches the actual count from the database and rounds it,
 * so "1.640+" automatically becomes "1.700+" when we pass 1,700 slots.
 */

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Rounds down to nearest 100 and formats with dot-separator, e.g. 1649 → "1.600+" */
function formatSlotCount(count: number): string {
  const rounded = Math.floor(count / 100) * 100;
  // Format with dot as thousands separator (Danish style)
  const formatted = rounded.toLocaleString("da-DK");
  return `${formatted}+`;
}

/** Default fallback while loading */
const DEFAULT_SLOT_COUNT_LABEL = "1.640+";

export function useSlotCountLabel() {
  const { data: label } = useQuery({
    queryKey: ["slot-count-label"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("slot_catalog")
        .select("*", { count: "exact", head: true });
      if (error || count === null) return DEFAULT_SLOT_COUNT_LABEL;
      return formatSlotCount(count);
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  return label ?? DEFAULT_SLOT_COUNT_LABEL;
}

/** For non-React contexts (noscript, static SEO text) */
export const SLOT_COUNT_LABEL = DEFAULT_SLOT_COUNT_LABEL;
