import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BUCKET = "slot-thumbnails";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-upload-key",
};

// Simple upload key to prevent unauthorized uploads
const UPLOAD_KEY = Deno.env.get("SLOT_UPLOAD_KEY") || "casinoaftaler-slot-upload-2026";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify upload key
    const uploadKey = req.headers.get("x-upload-key");
    if (uploadKey !== UPLOAD_KEY) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const gameId = formData.get("game_id") as string | null;

    if (!file || !gameId) {
      return new Response(JSON.stringify({ error: "Missing file or game_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!/^[a-zA-Z0-9_\-]+$/.test(gameId)) {
      return new Response(JSON.stringify({ error: "Invalid game_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const imageData = await file.arrayBuffer();
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Store as WebP if the client already converted, otherwise store as PNG
    // The client script handles conversion to WebP before uploading
    const contentType = file.type || "image/webp";
    const ext = contentType.includes("webp") ? "webp" : "png";
    const storagePath = `${gameId}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, imageData, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(JSON.stringify({ error: "Upload failed", details: uploadError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: publicUrl } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    return new Response(JSON.stringify({ 
      success: true, 
      game_id: gameId,
      url: publicUrl.publicUrl 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
