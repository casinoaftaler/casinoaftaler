import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TwitchBadges {
  is_moderator: boolean;
  is_vip: boolean;
  is_subscriber: boolean;
  is_follower: boolean;
  follow_duration_days: number | null;
  tier?: number | null; // Subscription tier (1, 2, 3)
}

// Get an app access token for API calls
async function getAppAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get app access token");
  }

  const data = await response.json();
  return data.access_token;
}

// Get broadcaster ID from username
async function getBroadcasterId(
  username: string,
  accessToken: string,
  clientId: string
): Promise<string | null> {
  const response = await fetch(
    `https://api.twitch.tv/helix/users?login=${encodeURIComponent(username)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );

  if (!response.ok) return null;
  
  const data = await response.json();
  return data.data?.[0]?.id || null;
}

// Check if user is a moderator
async function checkModerator(
  broadcasterId: string,
  userId: string,
  accessToken: string,
  clientId: string
): Promise<boolean> {
  const response = await fetch(
    `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${broadcasterId}&user_id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );

  if (!response.ok) return false;
  
  const data = await response.json();
  return data.data?.length > 0;
}

// Check if user is a VIP
async function checkVip(
  broadcasterId: string,
  userId: string,
  accessToken: string,
  clientId: string
): Promise<boolean> {
  const response = await fetch(
    `https://api.twitch.tv/helix/channels/vips?broadcaster_id=${broadcasterId}&user_id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );

  if (!response.ok) return false;
  
  const data = await response.json();
  return data.data?.length > 0;
}

// Check follower status and get follow date
async function checkFollower(
  broadcasterId: string,
  userId: string,
  accessToken: string,
  clientId: string
): Promise<{ isFollower: boolean; followedAt: string | null }> {
  const response = await fetch(
    `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}&user_id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );

  if (!response.ok) {
    return { isFollower: false, followedAt: null };
  }
  
  const data = await response.json();
  const follower = data.data?.[0];
  
  return {
    isFollower: !!follower,
    followedAt: follower?.followed_at || null,
  };
}

// Check subscription status (requires user access token, so we'll skip for now and use public info)
// Note: Checking subscriptions requires the broadcaster's access token or the user's token with proper scopes
// For now, we'll only support moderator, VIP, and follower badges which work with app tokens

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, force_refresh } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "user_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientId = Deno.env.get("TWITCH_CLIENT_ID");
    const clientSecret = Deno.env.get("TWITCH_CLIENT_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!clientId || !clientSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Get user's profile with twitch_id
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("twitch_id, twitch_username, twitch_badges, twitch_badges_updated_at, twitch_follow_date")
      .eq("user_id", user_id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch profile" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!profile?.twitch_id) {
      return new Response(
        JSON.stringify({ badges: null, message: "No Twitch account linked" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if cached badges are still fresh (1 hour cache)
    const cacheMaxAge = 60 * 60 * 1000; // 1 hour in ms
    const now = Date.now();
    const lastUpdated = profile.twitch_badges_updated_at 
      ? new Date(profile.twitch_badges_updated_at).getTime() 
      : 0;

    if (!force_refresh && profile.twitch_badges && (now - lastUpdated) < cacheMaxAge) {
      console.log("Returning cached badges for user:", user_id);
      return new Response(
        JSON.stringify({ 
          badges: profile.twitch_badges, 
          cached: true,
          follow_date: profile.twitch_follow_date 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get app access token
    const accessToken = await getAppAccessToken(clientId, clientSecret);

    // Get site owner's broadcaster ID from settings or resolve from twitch_url
    let { data: broadcasterSetting } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "twitch_broadcaster_id")
      .maybeSingle();

    let broadcasterId = broadcasterSetting?.value;

    // If not set, try to get from twitch_url
    if (!broadcasterId) {
      const { data: twitchUrlSetting } = await supabaseAdmin
        .from("site_settings")
        .select("value")
        .eq("key", "twitch_url")
        .maybeSingle();

      if (twitchUrlSetting?.value) {
        // Extract username from URL
        const url = new URL(twitchUrlSetting.value);
        const username = url.pathname.split('/').filter(Boolean)[0];
        
        if (username) {
          broadcasterId = await getBroadcasterId(username, accessToken, clientId);
          
          // Cache the broadcaster ID for future use
          if (broadcasterId) {
            await supabaseAdmin
              .from("site_settings")
              .update({ value: broadcasterId })
              .eq("key", "twitch_broadcaster_id");
          }
        }
      }
    }

    if (!broadcasterId) {
      return new Response(
        JSON.stringify({ error: "Broadcaster not configured" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userTwitchId = profile.twitch_id;

    // Fetch all badge statuses in parallel
    const [isModerator, isVip, followerInfo] = await Promise.all([
      checkModerator(broadcasterId, userTwitchId, accessToken, clientId),
      checkVip(broadcasterId, userTwitchId, accessToken, clientId),
      checkFollower(broadcasterId, userTwitchId, accessToken, clientId),
    ]);

    // Calculate follow duration
    let followDurationDays: number | null = null;
    if (followerInfo.followedAt) {
      const followDate = new Date(followerInfo.followedAt);
      const diffMs = now - followDate.getTime();
      followDurationDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    const badges: TwitchBadges = {
      is_moderator: isModerator,
      is_vip: isVip,
      is_subscriber: false, // Would need user token to check
      is_follower: followerInfo.isFollower,
      follow_duration_days: followDurationDays,
    };

    // Update profile with cached badges
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        twitch_badges: badges,
        twitch_badges_updated_at: new Date().toISOString(),
        twitch_follow_date: followerInfo.followedAt,
      })
      .eq("user_id", user_id);

    if (updateError) {
      console.error("Failed to cache badges:", updateError);
    }

    console.log("Fetched fresh badges for user:", user_id, badges);

    return new Response(
      JSON.stringify({ 
        badges, 
        cached: false,
        follow_date: followerInfo.followedAt 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in twitch-badges function:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
