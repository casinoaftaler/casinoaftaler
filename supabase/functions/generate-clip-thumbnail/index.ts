import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, serviceKey);

    const { clipId, batch } = await req.json();

    // Batch mode: generate for all approved clips without thumbnails
    if (batch) {
      const { data: clips, error } = await supabase
        .from("community_clips")
        .select("id, title, description")
        .eq("status", "approved")
        .is("thumbnail_url", null)
        .limit(10);

      if (error) throw error;
      if (!clips || clips.length === 0) {
        return new Response(JSON.stringify({ message: "No clips need thumbnails", count: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const results = [];
      for (const clip of clips) {
        try {
          const url = await generateAndUpload(supabase, supabaseUrl, lovableApiKey, clip);
          results.push({ id: clip.id, success: true, url });
        } catch (e) {
          console.error(`Failed for clip ${clip.id}:`, e);
          results.push({ id: clip.id, success: false, error: e.message });
        }
      }

      return new Response(JSON.stringify({ results, count: results.length }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Single clip mode
    if (!clipId) {
      return new Response(JSON.stringify({ error: "clipId or batch required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: clip, error: clipError } = await supabase
      .from("community_clips")
      .select("id, title, description, thumbnail_url")
      .eq("id", clipId)
      .single();

    if (clipError || !clip) {
      return new Response(JSON.stringify({ error: "Clip not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (clip.thumbnail_url) {
      return new Response(JSON.stringify({ message: "Clip already has thumbnail", url: clip.thumbnail_url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = await generateAndUpload(supabase, supabaseUrl, lovableApiKey, clip);

    return new Response(JSON.stringify({ success: true, url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function generateAndUpload(
  supabase: any,
  supabaseUrl: string,
  lovableApiKey: string,
  clip: { id: string; title: string | null; description: string | null }
): Promise<string> {
  const title = clip.title || "Casino Slot";
  const slotName = extractSlotName(title);

  const prompt = `A vibrant, colorful casino slot machine game screenshot for "${slotName}". 
Show the slot game interface with spinning reels, bright neon colors, gold coins, and exciting visual effects. 
Style: modern online casino game art, high quality, detailed symbols visible on the reels.
Dark background with glowing elements. 16:9 aspect ratio. Ultra high resolution.`;

  console.log(`Generating thumbnail for clip ${clip.id}: "${slotName}"`);

  // Generate image using Lovable AI
  const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      modalities: ["image", "text"],
    }),
  });

  if (!aiResponse.ok) {
    const errText = await aiResponse.text();
    throw new Error(`AI generation failed: ${aiResponse.status} - ${errText}`);
  }

  const aiData = await aiResponse.json();
  const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

  if (!imageUrl) {
    throw new Error("No image returned from AI");
  }

  // Extract base64 data
  const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
  const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

  // Upload to storage
  const filePath = `${clip.id}.png`;
  const { error: uploadError } = await supabase.storage
    .from("clip-thumbnails")
    .upload(filePath, binaryData, {
      contentType: "image/png",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("clip-thumbnails")
    .getPublicUrl(filePath);

  const publicUrl = urlData.publicUrl;

  // Update clip with thumbnail
  const { error: updateError } = await supabase
    .from("community_clips")
    .update({ thumbnail_url: publicUrl })
    .eq("id", clip.id);

  if (updateError) {
    throw new Error(`DB update failed: ${updateError.message}`);
  }

  console.log(`Thumbnail generated for clip ${clip.id}: ${publicUrl}`);
  return publicUrl;
}

function extractSlotName(title: string): string {
  // Common patterns: "17185x på Hounds of Hell", "Sugar rush 1000", "Big win on Sweet 1000"
  const cleanTitle = title
    .replace(/\d+(\.\d+)?x\s*(på|on|i)?\s*/gi, "") // Remove multiplier prefixes
    .replace(/^(big\s*win|mega\s*win|max\s*win|epic\s*win)\s*(på|on|i)?\s*/gi, "")
    .replace(/\(.*?\)/g, "") // Remove parenthetical content
    .replace(/\s*(base\s*game|bonus\s*buy|free\s*spins?)\s*/gi, "")
    .trim();

  return cleanTitle || title;
}
