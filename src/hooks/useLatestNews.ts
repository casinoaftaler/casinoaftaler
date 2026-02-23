import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useLatestNews(limit = 3) {
  return useQuery({
    queryKey: ["latest-news-footer", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_news")
        .select("slug, title, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
