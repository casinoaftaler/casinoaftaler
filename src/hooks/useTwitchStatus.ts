import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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
    const pathParts = url.pathname.split('/').filter(Boolean);
    return pathParts[0] || null;
  } catch {
    return twitchUrl || null;
  }
}

export function useTwitchStatus(twitchUrl: string | null | undefined) {
  const channelName = twitchUrl ? extractChannelName(twitchUrl) : null;
  
  // Defer the twitch call so it doesn't block critical rendering path
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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
    enabled: !!channelName && ready,
    refetchInterval: (query) => {
      const isLive = query.state.data?.isLive;
      return isLive ? 60 * 1000 : 3 * 60 * 1000;
    },
    staleTime: 2 * 60 * 1000,
  });
}
