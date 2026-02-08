import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ===== PROMPT GENERATORS PER GAME =====

function getEgyptianPrompt(generationType: string): string {
  if (generationType === "frame") {
    return `Create an ornate Egyptian slot machine frame with a completely transparent center area for slot reels.

The frame should feature:
- Golden hieroglyph-decorated borders on all sides with ancient Egyptian symbols
- Two majestic Pharaoh head sculptures as pillars on the left and right sides
- Lotus flowers and scarab beetles as ornamental details at the bottom
- Ancient Egyptian sandstone texture with gold leaf and metallic gold accents
- Eye of Horus symbols at each of the four corners, glowing with mystical energy
- The center area MUST be completely empty/transparent (for the slot reels to show through)
- Decorative winged sun disk at the top center
- Subtle golden glow emanating from the hieroglyphs

Style: Ancient Egyptian temple architecture aesthetic, rich gold and amber tones with hints of turquoise and lapis lazuli accents, detailed stone carvings with weathered texture, mystical ambient glow effects. Ultra high resolution.

The frame should have an aspect ratio of approximately 5:3 (width:height) suitable for a 5-column by 3-row slot machine grid.

IMPORTANT: The center must be completely transparent/empty - only generate the decorative frame border around the edges.`;
  }

  return `Create an immersive Egyptian temple interior background for a slot machine game.

The scene should feature:
- A grand ancient Egyptian temple hall with massive stone columns decorated with hieroglyphics
- Golden torches with flickering flames along the walls casting warm amber light
- Mysterious hieroglyphics and ancient carvings on the sandstone walls
- A sacred altar or shrine in the background with golden artifacts
- Subtle rays of light filtering through the temple ceiling
- Egyptian statues of Anubis or Pharaohs guarding the sides
- Rich warm color palette: deep amber, gold, burnt orange, with hints of turquoise accents
- Atmospheric dust particles floating in the light beams
- A sense of mystery and ancient treasure

Style: Cinematic, high-quality game art, detailed textures, atmospheric lighting with golden hour warmth, mystical ancient Egyptian aesthetic. Ultra high resolution. 16:9 aspect ratio.

This should be a full background image with NO transparent areas - it will be used as the background for a slot machine game.`;
}

function getRiseOfFedesvinPrompt(generationType: string): string {
  if (generationType === "frame") {
    return `Create an ornate magical wizard-themed slot machine frame with a completely transparent center area for slot reels.

The frame should feature:
- Silver and purple arcane-decorated borders on all sides with glowing magical runes
- Two majestic wizard/Merlin stone sculptures as pillars on the left and right sides, with long beards and pointed hats
- Magical crystals and enchanted gems as ornamental details at the bottom, glowing purple and teal
- Dark stone texture with silver metallic accents and purple magical energy veins
- Glowing arcane star/crystal motifs at each of the four corners, pulsing with mystical energy
- The center area MUST be completely empty/transparent (for the slot reels to show through)
- A decorative magical crescent moon or arcane symbol at the top center
- Subtle purple and teal magical glow emanating from the runes
- Floating magical particles and wisps of energy around the frame edges

Style: Mystical wizard tower aesthetic, rich deep purple and midnight blue tones with silver and teal accents, detailed stone carvings with arcane rune patterns, magical ambient glow effects. Ultra high resolution.

The frame should have an aspect ratio of approximately 5:3 (width:height) suitable for a 5-column by 3-row slot machine grid.

IMPORTANT: The center must be completely transparent/empty - only generate the decorative frame border around the edges.`;
  }

  return `Create an immersive mystical wizard tower interior background for a slot machine game.

The scene should feature:
- A grand wizard's tower chamber with tall dark stone walls covered in glowing arcane runes
- Magical floating candles and crystal orbs casting purple and teal ambient light
- Ancient bookshelves filled with spell books and magical tomes along the walls
- A magical workbench or arcane altar in the background with glowing potions and artifacts
- Subtle rays of moonlight filtering through arched Gothic windows
- Mystical crystal formations and enchanted artifacts on pedestals
- Rich dark color palette: deep purple, midnight blue, dark teal, with silver and magical glow accents
- Floating magical particles, arcane energy wisps, and subtle sparkles in the air
- A sense of ancient magic, wisdom, and mystical power

Style: Cinematic, high-quality game art, detailed textures, atmospheric lighting with purple and blue magical glow, mystical wizard/Merlin aesthetic. Ultra high resolution. 16:9 aspect ratio.

This should be a full background image with NO transparent areas - it will be used as the background for a slot machine game.`;
}

// ===== MAIN HANDLER =====

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration missing");
    }

    // Parse request body
    let generationType = "background";
    let gameId = "book-of-fedesvin";
    try {
      const body = await req.json();
      if (body?.type === "frame") {
        generationType = "frame";
      }
      if (body?.gameId) {
        gameId = body.gameId;
      }
    } catch {
      // No body or invalid JSON, use defaults
    }

    const themeName = gameId === "rise-of-fedesvin" ? "Rise of Fedesvin (wizard)" : "Book of Fedesvin (Egyptian)";
    console.log(`Starting ${themeName} slot ${generationType} generation...`);

    // Route to correct prompt based on gameId
    const prompt = gameId === "rise-of-fedesvin"
      ? getRiseOfFedesvinPrompt(generationType)
      : getEgyptianPrompt(generationType);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-pro-image-preview",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          modalities: ["image", "text"],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data, null, 2));
      throw new Error("No image generated from AI");
    }

    console.log("Image generated, uploading to storage...");

    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Use game-specific filename prefix
    const prefix = gameId === "rise-of-fedesvin" ? "wizard" : "egyptian";
    const timestamp = Date.now();
    const filename = `${prefix}-${generationType}-${timestamp}.png`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("slot-frames")
      .upload(filename, imageBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    console.log("Image uploaded successfully:", uploadData.path);

    const { data: publicUrlData } = supabase.storage
      .from("slot-frames")
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;
    console.log("Public URL:", publicUrl);

    // Save to game-specific site_settings key
    const settingsKeyMap: Record<string, Record<string, string>> = {
      "book-of-fedesvin": {
        frame: "slot_machine_frame_image",
        background: "slot_background_image",
      },
      "rise-of-fedesvin": {
        frame: "rise_of_fedesvin_frame_image",
        background: "rise_of_fedesvin_background_image",
      },
    };

    const settingsKey = settingsKeyMap[gameId]?.[generationType] 
      ?? `${gameId.replace(/-/g, "_")}_${generationType}_image`;
      
    const { error: settingsError } = await supabase
      .from("site_settings")
      .upsert(
        { key: settingsKey, value: publicUrl },
        { onConflict: "key" }
      );

    if (settingsError) {
      console.error("Settings update error:", settingsError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: publicUrl,
        type: generationType,
        gameId,
        message: `${themeName} slot ${generationType} generated successfully!`,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating slot image:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
