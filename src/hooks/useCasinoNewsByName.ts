import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCasinoNewsByName(casinoName: string, limit = 3) {
  return useQuery({
    queryKey: ["casino-news-by-name", casinoName, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_news")
        .select("id, title, slug, excerpt, published_at, featured_image")
        .eq("status", "published")
        .or(`title.ilike.%${casinoName}%,content.ilike.%${casinoName}%`)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!casinoName && casinoName.length > 1,
  });
}
