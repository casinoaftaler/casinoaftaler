import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PublicProfileData {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
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
  hide_amounts: boolean | null;
  created_at: string;
}

export function usePublicProfile(username: string | undefined) {
  return useQuery({
    queryKey: ["public-profile", username],
    queryFn: async (): Promise<PublicProfileData | null> => {
      if (!username) return null;
      
      // Query the public view - it only returns profiles where stats_public = true
      const { data, error } = await supabase
        .from("profiles_public" as any)
        .select("*")
        .eq("display_name", username)
        .maybeSingle();
      
      if (error) throw error;
      return data as unknown as PublicProfileData | null;
    },
    enabled: !!username,
  });
}
