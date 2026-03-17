import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CasinoPartnerRecord {
  slug: string;
  name: string;
  has_affiliate: boolean | null;
}

export function useCasinoPartner(slug: string | null) {
  return useQuery({
    queryKey: ["casino-partner", slug],
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casinos_public")
        .select("slug, name, has_affiliate")
        .eq("slug", slug!)
        .maybeSingle();

      if (error) {
        console.warn("Failed to fetch casino partner status:", error.message);
        return null;
      }

      return (data ?? null) as CasinoPartnerRecord | null;
    },
  });
}
