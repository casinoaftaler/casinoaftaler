import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface HighlightCategory {
  name: string;
  slug: string;
}

export interface Highlight {
  id: string;
  title: string;
  url: string;
  platform: string;
  description: string | null;
  thumbnail_url: string | null;
  position: number;
  is_active: boolean;
  category_id: string | null;
  created_at: string;
  updated_at: string;
  highlight_categories?: HighlightCategory | null;
}

export type HighlightInsert = Omit<Highlight, "id" | "created_at" | "updated_at" | "highlight_categories">;
export type HighlightUpdate = Partial<HighlightInsert> & { id: string };

export function useHighlights(adminView = false, categoryId?: string, platform?: string) {
  return useQuery({
    queryKey: ["highlights", adminView, categoryId, platform],
    queryFn: async () => {
      let query = supabase
        .from("highlights")
        .select("*, highlight_categories(name, slug)")
        .order("position", { ascending: true });

      if (!adminView) {
        query = query.eq("is_active", true);
      }

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      if (platform) {
        query = query.eq("platform", platform);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as unknown as Highlight[];
    },
  });
}

export function useCreateHighlight() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (item: Omit<HighlightInsert, "position">) => {
      const { data: existingItems } = await supabase
        .from("highlights")
        .select("position")
        .order("position", { ascending: false })
        .limit(1);

      const nextPosition = existingItems && existingItems.length > 0
        ? (existingItems[0] as unknown as { position: number }).position + 1
        : 0;

      const { data, error } = await supabase
        .from("highlights")
        .insert({ ...item, position: nextPosition } as any)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Highlight;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      toast({
        title: "Highlight oprettet",
        description: "Det nye highlight er blevet tilføjet.",
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

export function useUpdateHighlight() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: HighlightUpdate) => {
      const { data, error } = await supabase
        .from("highlights")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as Highlight;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      toast({
        title: "Highlight opdateret",
        description: "Highlightet er blevet opdateret.",
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

export function useDeleteHighlight() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("highlights")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      toast({
        title: "Highlight slettet",
        description: "Highlightet er blevet fjernet.",
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

export function useUpdateHighlightPositions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (items: { id: string; position: number }[]) => {
      const updates = items.map(({ id, position }) =>
        supabase
          .from("highlights")
          .update({ position } as any)
          .eq("id", id)
      );

      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);

      if (errors.length > 0) {
        throw new Error("Failed to update positions");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
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
