import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface HighlightCategory {
  id: string;
  name: string;
  slug: string;
  position: number;
  created_at: string;
}

export function useHighlightCategories() {
  return useQuery({
    queryKey: ["highlight-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("highlight_categories")
        .select("*")
        .order("position", { ascending: true });

      if (error) throw error;
      return data as HighlightCategory[];
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (name: string) => {
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const { data: existingItems } = await supabase
        .from("highlight_categories")
        .select("position")
        .order("position", { ascending: false })
        .limit(1);

      const nextPosition =
        existingItems && existingItems.length > 0
          ? (existingItems[0] as { position: number }).position + 1
          : 0;

      const { data, error } = await supabase
        .from("highlight_categories")
        .insert({ name, slug, position: nextPosition })
        .select()
        .single();

      if (error) throw error;
      return data as HighlightCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlight-categories"] });
      toast({
        title: "Kategori oprettet",
        description: "Den nye kategori er blevet tilføjet.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const { data, error } = await supabase
        .from("highlight_categories")
        .update({ name, slug })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as HighlightCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlight-categories"] });
      toast({
        title: "Kategori opdateret",
        description: "Kategorien er blevet opdateret.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("highlight_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlight-categories"] });
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      toast({
        title: "Kategori slettet",
        description: "Kategorien er blevet fjernet.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCategoryPositions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (items: { id: string; position: number }[]) => {
      const updates = items.map(({ id, position }) =>
        supabase
          .from("highlight_categories")
          .update({ position })
          .eq("id", id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);

      if (errors.length > 0) {
        throw new Error("Failed to update positions");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlight-categories"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
