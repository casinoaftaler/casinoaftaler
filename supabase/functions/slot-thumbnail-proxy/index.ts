import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BUCKET = "slot-thumbnails";

// Pragmatic Play CDN base for game thumbnails
const PP_CDN_BASE = "https://cdn.pragmaticplay.net/game_pic/rec/325";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const gameId = url.searchParams.get("game_id");

    if (!gameId || !/^[a-zA-Z0-9_]+$/.test(gameId)) {
      return new Response(JSON.stringify({ error: "Invalid game_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const storagePath = `${gameId}.png`;

    // 1. Check if we already have it cached in storage
    const { data: existing } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, 60);

    if (existing?.signedUrl) {
      // Verify it actually exists by checking the public URL
      const { data: publicUrl } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(storagePath);

      const checkResp = await fetch(publicUrl.publicUrl, { method: "HEAD" });
      if (checkResp.ok) {
        return new Response(JSON.stringify({ url: publicUrl.publicUrl }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 2. Fetch from Pragmatic Play CDN (server-side can handle TLS)
    const cdnUrl = `${PP_CDN_BASE}/${gameId}.png`;
    console.log(`Fetching from CDN: ${cdnUrl}`);

    const cdnResp = await fetch(cdnUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SlotThumbnailProxy/1.0)",
        "Accept": "image/png,image/webp,image/*",
      },
    });

    if (!cdnResp.ok) {
      console.log(`CDN returned ${cdnResp.status} for ${gameId}`);
      return new Response(JSON.stringify({ error: "Image not found on CDN", status: cdnResp.status }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const imageData = await cdnResp.arrayBuffer();
    const contentType = cdnResp.headers.get("content-type") || "image/png";

    // 3. Upload to our storage bucket
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, imageData, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(JSON.stringify({ error: "Failed to cache image" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4. Return the public URL
    const { data: publicUrl } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    return new Response(JSON.stringify({ url: publicUrl.publicUrl, cached: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
