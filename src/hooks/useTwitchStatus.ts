import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TwitchStreamInfo {
  title: string;
  gameName: string;
  viewerCount: number;
  startedAt: string;
  thumbnailUrl: string;
}

interface TwitchStatusResponse {
  isLive: boolean;
  stream: TwitchStreamInfo | null;
  error?: string;
}

function extractChannelName(twitchUrl: string): string | null {
  try {
    const url = new URL(twitchUrl);
    // Handle twitch.tv/channelname format
    const pathParts = url.pathname.split('/').filter(Boolean);
    return pathParts[0] || null;
  } catch {
    // If it's not a valid URL, assume it's already a channel name
    return twitchUrl || null;
  }
}

export function useTwitchStatus(twitchUrl: string | null | undefined) {
  const channelName = twitchUrl ? extractChannelName(twitchUrl) : null;

  return useQuery({
    queryKey: ["twitch-status", channelName],
    queryFn: async (): Promise<TwitchStatusResponse> => {
      if (!channelName) {
        return { isLive: false, stream: null };
      }

      const { data, error } = await supabase.functions.invoke<TwitchStatusResponse>(
        "twitch-stream-status",
        {
          body: { channelName },
        }
      );

      if (error) {
        console.error("Error fetching Twitch status:", error);
        return { isLive: false, stream: null, error: error.message };
      }

      return data || { isLive: false, stream: null };
    },
    enabled: !!channelName,
    // Poll every 3 minutes when not live, every 60s when live
    refetchInterval: (query) => {
      const isLive = query.state.data?.isLive;
      return isLive ? 60 * 1000 : 3 * 60 * 1000;
    },
    staleTime: 2 * 60 * 1000,
  });
}
