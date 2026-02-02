import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    { method: "POST" }
  );
  
  if (!response.ok) {
    throw new Error("Failed to get Twitch access token");
  }
  
  const data = await response.json();
  return data.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clipSlug } = await req.json();
    
    if (!clipSlug) {
      return new Response(
        JSON.stringify({ error: "clipSlug is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientId = Deno.env.get("TWITCH_CLIENT_ID");
    const clientSecret = Deno.env.get("TWITCH_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: "Twitch credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const accessToken = await getAccessToken(clientId, clientSecret);

    const clipResponse = await fetch(
      `https://api.twitch.tv/helix/clips?id=${clipSlug}`,
      {
        headers: {
          "Client-ID": clientId,
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    if (!clipResponse.ok) {
      throw new Error("Failed to fetch clip info");
    }

    const clipData = await clipResponse.json();
    
    if (clipData.data && clipData.data.length > 0) {
      const clip = clipData.data[0];
      return new Response(
        JSON.stringify({ 
          thumbnail_url: clip.thumbnail_url,
          title: clip.title,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ thumbnail_url: null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error fetching clip thumbnail:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
