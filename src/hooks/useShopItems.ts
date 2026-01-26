import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ShopItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  price: string;
  stock: string;
  external_url: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ShopItemInsert = Omit<ShopItem, "id" | "created_at" | "updated_at">;
export type ShopItemUpdate = Partial<ShopItemInsert> & { id: string };

export function useShopItems(adminView = false) {
  return useQuery({
    queryKey: ["shop-items", adminView],
    queryFn: async () => {
      // For admin view, fetch all items including inactive ones
      // For public view, only fetch active items
      let query = supabase
        .from("shop_items")
        .select("*")
        .order("position", { ascending: true });

      if (!adminView) {
        query = query.eq("is_active", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as unknown as ShopItem[];
    },
  });
}

export function useCreateShopItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (item: Omit<ShopItemInsert, "position">) => {
      // Get the highest position to add new item at the end
      const { data: existingItems } = await supabase
        .from("shop_items")
        .select("position")
        .order("position", { ascending: false })
        .limit(1);

      const nextPosition = existingItems && existingItems.length > 0 
        ? (existingItems[0] as unknown as { position: number }).position + 1 
        : 0;

      const { data, error } = await supabase
        .from("shop_items")
        .insert({ ...item, position: nextPosition } as any)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as ShopItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-items"] });
      toast({
        title: "Produkt oprettet",
        description: "Det nye produkt er blevet tilføjet til butikken.",
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

export function useUpdateShopItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ShopItemUpdate) => {
      const { data, error } = await supabase
        .from("shop_items")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as ShopItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-items"] });
      toast({
        title: "Produkt opdateret",
        description: "Produktet er blevet opdateret.",
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

export function useDeleteShopItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("shop_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shop-items"] });
      toast({
        title: "Produkt slettet",
        description: "Produktet er blevet fjernet fra butikken.",
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

export function useUpdateShopItemPositions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (items: { id: string; position: number }[]) => {
      const updates = items.map(({ id, position }) =>
        supabase
          .from("shop_items")
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
      queryClient.invalidateQueries({ queryKey: ["shop-items"] });
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
