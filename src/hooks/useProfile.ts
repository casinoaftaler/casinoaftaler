import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export interface ProfileData {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  twitch_id: string | null;
  twitch_username: string | null;
  bio: string | null;
  highest_win_amount: number | null;
  highest_win_game: string | null;
  highest_win_casino: string | null;
  biggest_spin_win: number | null;
  biggest_x_win: number | null;
  favorite_slot: string | null;
  favorite_provider: string | null;
  favorite_casino: string | null;
  typical_bet_size: string | null;
  play_styles: string[] | null;
  preferred_game_type: string | null;
  volatility_preference: string | null;
  stats_public: boolean | null;
  hide_amounts: boolean | null;
  // Profile completion tracking
  profile_section_completed: boolean | null;
  stats_section_completed: boolean | null;
  favorites_section_completed: boolean | null;
  playstyle_section_completed: boolean | null;
  bonus_spins_permanent: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateData {
  display_name?: string | null;
  bio?: string | null;
  highest_win_amount?: number | null;
  highest_win_game?: string | null;
  highest_win_casino?: string | null;
  biggest_spin_win?: number | null;
  biggest_x_win?: number | null;
  favorite_slot?: string | null;
  favorite_provider?: string | null;
  favorite_casino?: string | null;
  typical_bet_size?: string | null;
  play_styles?: string[] | null;
  preferred_game_type?: string | null;
  volatility_preference?: string | null;
  stats_public?: boolean | null;
  hide_amounts?: boolean | null;
}

export function useProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as ProfileData | null;
    },
    enabled: !!user?.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (updates: ProfileUpdateData) => {
      if (!user?.id) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast({
        title: "Profil opdateret",
        description: "Dine ændringer er blevet gemt.",
      });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast({
        title: "Fejl",
        description: "Kunne ikke opdatere profilen. Prøv igen.",
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfile.mutate,
    isUpdating: updateProfile.isPending,
  };
}
