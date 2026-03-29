import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CasinoBySlug {
  name: string;
  slug: string;
  rating: number;
  bonus_amount: string;
  bonus_type: string;
  bonus_title: string;
  wagering_requirements: string;
  free_spins: string | null;
  logo_url: string | null;
  is_recommended: boolean;
  is_hot: boolean;
}

export function useCasinoBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["casino-by-slug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("casinos_public")
        .select("name, slug, rating, bonus_amount, bonus_type, bonus_title, wagering_requirements, free_spins, logo_url, is_recommended, is_hot")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      return data as CasinoBySlug | null;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 min cache
  });
}
