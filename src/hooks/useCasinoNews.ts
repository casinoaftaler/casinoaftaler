import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CasinoNewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[];
  featured_image: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
  meta_title: string | null;
  meta_description: string | null;
}

export type CasinoNewsInsert = Omit<CasinoNewsArticle, "id" | "created_at" | "updated_at">;

export function usePublishedNews(page = 1, perPage = 10, category?: string) {
  return useQuery({
    queryKey: ["casino-news", "published", page, perPage, category ?? "all"],
    queryFn: async () => {
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      let query = supabase
        .from("casino_news")
        .select("*", { count: "exact" })
        .eq("status", "published");

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error, count } = await query
        .order("published_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { articles: (data ?? []) as CasinoNewsArticle[], total: count ?? 0 };
    },
  });
}

export function usePublishedNewsByAuthor(authorId: string, page = 1, perPage = 100) {
  return useQuery({
    queryKey: ["casino-news", "published", "author", authorId, page, perPage],
    queryFn: async () => {
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      const { data, error, count } = await supabase
        .from("casino_news")
        .select("*", { count: "exact" })
        .eq("status", "published")
        .eq("author_id", authorId)
        .order("published_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { articles: (data ?? []) as CasinoNewsArticle[], total: count ?? 0 };
    },
    enabled: !!authorId,
  });
}

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: ["casino-news", "article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_news")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data as CasinoNewsArticle | null;
    },
    enabled: !!slug,
  });
}

export function useAllNews() {
  return useQuery({
    queryKey: ["casino-news", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casino_news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data ?? []) as CasinoNewsArticle[];
    },
  });
}

export function useCreateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (article: Partial<CasinoNewsInsert>) => {
      const { data, error } = await supabase
        .from("casino_news")
        .insert(article as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["casino-news"] }),
  });
}

export function useUpdateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<CasinoNewsInsert>) => {
      const { data, error } = await supabase
        .from("casino_news")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["casino-news"] }),
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("casino_news")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["casino-news"] }),
  });
}
