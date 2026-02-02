import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface HighlightCategory {
  id: string;
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
  category_id: string | null; // Legacy field, kept for backwards compatibility
  created_at: string;
  updated_at: string;
  highlight_categories?: HighlightCategory | null; // Legacy single category relation
  categories?: HighlightCategory[]; // New: multiple categories
}

export type HighlightInsert = Omit<Highlight, "id" | "created_at" | "updated_at" | "highlight_categories" | "categories">;
export type HighlightUpdate = Partial<HighlightInsert> & { id: string };

export function useHighlights(adminView = false, categoryId?: string, platform?: string) {
  return useQuery({
    queryKey: ["highlights", adminView, categoryId, platform],
    queryFn: async () => {
      // First fetch highlights
      let query = supabase
        .from("highlights")
        .select("*, highlight_categories(id, name, slug)")
        .order("position", { ascending: true });

      if (!adminView) {
        query = query.eq("is_active", true);
      }

      if (platform) {
        query = query.eq("platform", platform);
      }

      const { data: highlightsData, error: highlightsError } = await query;
      if (highlightsError) throw highlightsError;

      // Fetch all category assignments with category details
      const { data: assignments, error: assignmentsError } = await supabase
        .from("highlight_category_assignments")
        .select("highlight_id, category_id, highlight_categories(id, name, slug)");

      if (assignmentsError) throw assignmentsError;

      // Map assignments to highlights
      const highlightsWithCategories = (highlightsData || []).map((highlight: any) => {
        const highlightAssignments = (assignments || []).filter(
          (a: any) => a.highlight_id === highlight.id
        );
        const categories = highlightAssignments
          .map((a: any) => a.highlight_categories)
          .filter(Boolean);

        return {
          ...highlight,
          categories,
        };
      });

      // Filter by category if specified
      if (categoryId) {
        return highlightsWithCategories.filter((h: Highlight) =>
          h.categories?.some((c) => c.id === categoryId)
        );
      }

      return highlightsWithCategories as Highlight[];
    },
  });
}

export function useHighlightCategoryAssignments(highlightId: string) {
  return useQuery({
    queryKey: ["highlight-category-assignments", highlightId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("highlight_category_assignments")
        .select("category_id")
        .eq("highlight_id", highlightId);

      if (error) throw error;
      return (data || []).map((a: any) => a.category_id as string);
    },
    enabled: !!highlightId,
  });
}

export function useUpdateHighlightCategories() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ highlightId, categoryIds }: { highlightId: string; categoryIds: string[] }) => {
      // Delete existing assignments
      const { error: deleteError } = await supabase
        .from("highlight_category_assignments")
        .delete()
        .eq("highlight_id", highlightId);

      if (deleteError) throw deleteError;

      // Insert new assignments
      if (categoryIds.length > 0) {
        const assignments = categoryIds.map((categoryId) => ({
          highlight_id: highlightId,
          category_id: categoryId,
        }));

        const { error: insertError } = await supabase
          .from("highlight_category_assignments")
          .insert(assignments);

        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      queryClient.invalidateQueries({ queryKey: ["highlight-category-assignments"] });
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

export function useCreateHighlight() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (item: Omit<HighlightInsert, "position"> & { categoryIds?: string[] }) => {
      const { categoryIds, ...highlightData } = item;

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
        .insert({ ...highlightData, position: nextPosition } as any)
        .select()
        .single();

      if (error) throw error;

      // Insert category assignments
      if (categoryIds && categoryIds.length > 0) {
        const assignments = categoryIds.map((categoryId) => ({
          highlight_id: (data as any).id,
          category_id: categoryId,
        }));

        const { error: assignmentError } = await supabase
          .from("highlight_category_assignments")
          .insert(assignments);

        if (assignmentError) throw assignmentError;
      }

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
    mutationFn: async ({ id, categoryIds, ...updates }: HighlightUpdate & { categoryIds?: string[] }) => {
      const { data, error } = await supabase
        .from("highlights")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Update category assignments if provided
      if (categoryIds !== undefined) {
        // Delete existing assignments
        const { error: deleteError } = await supabase
          .from("highlight_category_assignments")
          .delete()
          .eq("highlight_id", id);

        if (deleteError) throw deleteError;

        // Insert new assignments
        if (categoryIds.length > 0) {
          const assignments = categoryIds.map((categoryId) => ({
            highlight_id: id,
            category_id: categoryId,
          }));

          const { error: insertError } = await supabase
            .from("highlight_category_assignments")
            .insert(assignments);

          if (insertError) throw insertError;
        }
      }

      return data as unknown as Highlight;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      queryClient.invalidateQueries({ queryKey: ["highlight-category-assignments"] });
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
