import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  thumbnail_url: string;
}

interface TwitchStreamsResponse {
  data: TwitchStream[];
}

// Cache the access token to avoid fetching it on every request
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    console.log("Using cached Twitch access token");
    return cachedToken.token;
  }

  console.log("Fetching new Twitch access token");
  
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to get Twitch access token:", errorText);
    throw new Error(`Failed to get Twitch access token: ${response.status}`);
  }

  const data: TwitchTokenResponse = await response.json();
  
  // Cache the token with a 1-hour buffer before expiry
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 3600) * 1000,
  };

  return data.access_token;
}

async function checkStreamStatus(
  clientId: string,
  accessToken: string,
  channelName: string
): Promise<{ isLive: boolean; stream: TwitchStream | null }> {
  console.log(`Checking stream status for channel: ${channelName}`);
  
  const response = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(channelName)}`,
    {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to check stream status:", errorText);
    throw new Error(`Failed to check stream status: ${response.status}`);
  }

  const data: TwitchStreamsResponse = await response.json();
  
  const isLive = data.data.length > 0;
  console.log(`Stream status for ${channelName}: ${isLive ? 'LIVE' : 'OFFLINE'}`);
  
  return {
    isLive,
    stream: isLive ? data.data[0] : null,
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get('TWITCH_CLIENT_ID');
    const clientSecret = Deno.env.get('TWITCH_CLIENT_SECRET');

    if (!clientId) {
      console.error("TWITCH_CLIENT_ID not configured");
      return new Response(
        JSON.stringify({ error: 'TWITCH_CLIENT_ID not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!clientSecret) {
      console.error("TWITCH_CLIENT_SECRET not configured");
      return new Response(
        JSON.stringify({ error: 'TWITCH_CLIENT_SECRET not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the request body to get the channel name
    let channelName: string;
    
    try {
      const body = await req.json();
      channelName = body.channelName;
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON with channelName field.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!channelName) {
      return new Response(
        JSON.stringify({ error: 'channelName is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get access token
    const accessToken = await getAccessToken(clientId, clientSecret);
    
    // Check stream status
    const status = await checkStreamStatus(clientId, accessToken, channelName);

    return new Response(
      JSON.stringify({
        isLive: status.isLive,
        stream: status.stream ? {
          title: status.stream.title,
          gameName: status.stream.game_name,
          viewerCount: status.stream.viewer_count,
          startedAt: status.stream.started_at,
          thumbnailUrl: status.stream.thumbnail_url
            .replace('{width}', '320')
            .replace('{height}', '180'),
        } : null,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in twitch-stream-status function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
