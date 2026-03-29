import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface GameProvider {
  name: string;
  logo_url: string;
}

export interface Casino {
  id: string;
  name: string;
  slug: string;
  rating: number;
  bonus_title: string;
  bonus_amount: string;
  bonus_type: string;
  wagering_requirements: string;
  validity: string;
  min_deposit: string;
  payout_time: string;
  free_spins: string;
  features: string[];
  pros: string[];
  cons: string[];
  description: string | null;
  is_active: boolean;
  is_recommended: boolean;
  is_hot: boolean;
  position: number;
  logo_url: string | null;
  affiliate_url: string | null;
  has_affiliate: boolean;
  game_providers: GameProvider[];
  created_at: string;
  updated_at: string;
}

export type CasinoInsert = Omit<Casino, "id" | "created_at" | "updated_at" | "position" | "is_recommended" | "is_hot" | "logo_url" | "affiliate_url" | "game_providers" | "has_affiliate"> & { 
  is_recommended?: boolean;
  is_hot?: boolean;
  logo_url?: string | null; 
  affiliate_url?: string | null;
  game_providers?: GameProvider[];
};

export function useCasinos(includeInactive = false) {
  return useQuery({
    queryKey: ["casinos", includeInactive],
    queryFn: async () => {
      if (includeInactive) {
        // Only check auth for admin path
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data, error } = await supabase
            .from("casinos")
            .select("*")
            .order("position", { ascending: true });
          
          if (error) throw error;
          return (data || []).map(casino => ({
            ...casino,
            has_affiliate: !!casino.affiliate_url,
            game_providers: (casino.game_providers as unknown as GameProvider[]) || []
          })) as Casino[];
        }
      }
      
      // Public users get data from the view (excludes affiliate_url)
      const { data, error } = await supabase
        .from("casinos_public")
        .select("*")
        .order("position", { ascending: true });
      
      if (error) throw error;
      // Map game_providers from JSON to typed array and add null affiliate_url
      return (data || []).map(casino => ({
        ...casino,
        affiliate_url: null,
        has_affiliate: !!(casino as any).has_affiliate,
        game_providers: (casino.game_providers as unknown as GameProvider[]) || []
      })) as Casino[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateCasinoPositions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: { id: string; position: number }[]) => {
      const promises = updates.map(({ id, position }) =>
        supabase.from("casinos").update({ position }).eq("id", id)
      );
      
      const results = await Promise.all(promises);
      const error = results.find((r) => r.error)?.error;
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casinos"] });
      toast({
        title: "Rækkefølge opdateret",
        description: "Casino rækkefølgen er gemt.",
      });
    },
    onError: (error) => {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateCasino() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (casino: CasinoInsert) => {
      const { game_providers, ...rest } = casino;
      const insertData = {
        ...rest,
        game_providers: game_providers ? JSON.parse(JSON.stringify(game_providers)) : []
      };
      const { data, error } = await supabase
        .from("casinos")
        .insert(insertData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casinos"] });
      toast({
        title: "Casino created",
        description: "The casino has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateCasino() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, game_providers, ...updates }: Partial<Casino> & { id: string }) => {
      const updateData = {
        ...updates,
        ...(game_providers !== undefined ? { game_providers: JSON.parse(JSON.stringify(game_providers)) } : {})
      };
      const { data, error } = await supabase
        .from("casinos")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casinos"] });
      toast({
        title: "Casino updated",
        description: "The casino has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteCasino() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("casinos")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["casinos"] });
      toast({
        title: "Casino deleted",
        description: "The casino has been removed successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
