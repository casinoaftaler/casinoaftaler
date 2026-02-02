import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "./useSiteSettings";
import { useAuth } from "./useAuth";

interface StreamElementsPointsResponse {
  channel: string;
  username: string;
  points: number;
  rank: number;
}

export function useStreamElementsPoints() {
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();

  const channelId = siteSettings?.streamelements_channel_id;

  // Fetch user's twitch_username from profile
  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("twitch_username")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const twitchUsername = profile?.twitch_username;

  // Fetch points from StreamElements API
  const {
    data: pointsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["streamelements-points", channelId, twitchUsername],
    queryFn: async () => {
      if (!channelId || !twitchUsername) return null;

      const response = await fetch(
        `https://api.streamelements.com/kappa/v2/points/${channelId}/${twitchUsername.toLowerCase()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          // User not found - return 0 points
          return { points: 0, rank: 0 } as StreamElementsPointsResponse;
        }
        throw new Error("Failed to fetch points");
      }

      return response.json() as Promise<StreamElementsPointsResponse>;
    },
    enabled: !!channelId && !!twitchUsername,
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: true,
  });

  return {
    points: pointsData?.points ?? null,
    rank: pointsData?.rank ?? null,
    isLoading: isLoading && !!channelId && !!twitchUsername,
    error,
    isConfigured: !!channelId,
    isLoggedIn: !!user,
    hasTwitchUsername: !!twitchUsername,
    refetch,
  };
}
