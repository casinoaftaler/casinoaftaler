import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TwitchBadges {
  is_moderator: boolean;
  is_vip: boolean;
  is_subscriber: boolean;
  is_follower: boolean;
  follow_duration_days: number | null;
  tier?: number | null;
}

interface TwitchBadgesResponse {
  badges: TwitchBadges | null;
  cached: boolean;
  follow_date: string | null;
  message?: string;
  error?: string;
}

export function useTwitchBadges(userId: string | null | undefined) {
  return useQuery({
    queryKey: ["twitch-badges", userId],
    queryFn: async (): Promise<TwitchBadgesResponse> => {
      if (!userId) {
        return { badges: null, cached: false, follow_date: null };
      }

      const { data, error } = await supabase.functions.invoke<TwitchBadgesResponse>(
        "twitch-badges",
        {
          body: { user_id: userId },
        }
      );

      if (error) {
        console.error("Error fetching Twitch badges:", error);
        return { badges: null, cached: false, follow_date: null, error: error.message };
      }

      return data || { badges: null, cached: false, follow_date: null };
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Helper to get badge display info
export function getBadgeInfo(badges: TwitchBadges | null) {
  if (!badges) return [];

  const badgeList: Array<{
    key: string;
    label: string;
    icon: string;
    color: string;
    priority: number;
  }> = [];

  if (badges.is_moderator) {
    badgeList.push({
      key: "moderator",
      label: "Moderator",
      icon: "sword",
      color: "text-green-400",
      priority: 1,
    });
  }

  if (badges.is_vip) {
    badgeList.push({
      key: "vip",
      label: "VIP",
      icon: "gem",
      color: "text-pink-400",
      priority: 2,
    });
  }

  if (badges.is_subscriber) {
    badgeList.push({
      key: "subscriber",
      label: "Subscriber",
      icon: "star",
      color: "text-amber-400",
      priority: 3,
    });
  }

  if (badges.is_follower) {
    // Check for special follow duration badges
    const days = badges.follow_duration_days || 0;
    
    if (days >= 365 * 2) {
      badgeList.push({
        key: "og_follower",
        label: "OG Follower",
        icon: "crown",
        color: "text-amber-400",
        priority: 4,
      });
    } else if (days >= 365) {
      badgeList.push({
        key: "year_follower",
        label: "1+ År Follower",
        icon: "award",
        color: "text-yellow-400",
        priority: 5,
      });
    } else {
      badgeList.push({
        key: "follower",
        label: "Follower",
        icon: "heart",
        color: "text-red-400",
        priority: 6,
      });
    }
  }

  // Sort by priority
  return badgeList.sort((a, b) => a.priority - b.priority);
}
