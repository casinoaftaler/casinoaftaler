import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PROVIDER_DISPLAY_NAMES } from "@/lib/slotProviderLinks";

export interface ProviderSlotEntry {
  slot_name: string;
  rtp: number | null;
  volatility: string | null;
  highest_x: number | null;
  bonus_count: number;
}

/**
 * Resolves a provider slug (e.g. "pragmatic-play") to the display name
 * used in the slot_catalog.provider column (e.g. "Pragmatic Play").
 */
function resolveProviderName(slug: string): string {
  return PROVIDER_DISPLAY_NAMES[slug] || slug;
}

/**
 * Fetch all slots from slot_catalog for a specific provider.
 * Uses the provider slug and resolves it to the display name.
 */
export function useProviderSlots(providerSlug: string) {
  const providerName = resolveProviderName(providerSlug);

  return useQuery({
    queryKey: ["provider-slots", providerSlug],
    queryFn: async () => {
      const batchSize = 1000;
      let allData: ProviderSlotEntry[] = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabase
          .from("slot_catalog")
          .select("slot_name, rtp, volatility, highest_x, bonus_count")
          .eq("provider", providerName)
          .order("bonus_count", { ascending: false })
          .range(from, from + batchSize - 1);
        if (error) throw error;
        allData = allData.concat((data || []) as ProviderSlotEntry[]);
        if (!data || data.length < batchSize) break;
        from += batchSize;
      }
      return allData;
    },
    staleTime: 300000,
    enabled: !!providerSlug,
  });
}

/**
 * Fetch the latest catalog update timestamp and latest bonus hunt number
 * for freshness signals.
 */
export function useLatestCatalogUpdate() {
  return useQuery({
    queryKey: ["catalog-freshness"],
    queryFn: async () => {
      // Get latest updated_at from slot_catalog
      const { data: catalogData, error: catalogError } = await supabase
        .from("slot_catalog")
        .select("updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();
      if (catalogError) throw catalogError;

      // Get latest hunt number from archives
      const { data: huntData, error: huntError } = await supabase
        .from("bonus_hunt_archives")
        .select("hunt_number, vod_date")
        .order("hunt_number", { ascending: false })
        .limit(1)
        .single();
      if (huntError && huntError.code !== "PGRST116") throw huntError;

      return {
        lastUpdated: catalogData?.updated_at || new Date().toISOString(),
        latestHuntNumber: huntData?.hunt_number || null,
        latestHuntDate: huntData?.vod_date || null,
      };
    },
    staleTime: 60000, // 1 min – freshness data should be relatively current
  });
}
