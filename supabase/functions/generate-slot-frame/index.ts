import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight
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

    console.log("Starting Egyptian slot frame generation...");

    // Generate the Egyptian slot machine frame using AI
    const prompt = `Create an ornate Egyptian slot machine frame with a completely transparent center area for slot reels.

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

    // Extract the generated image
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data, null, 2));
      throw new Error("No image generated from AI");
    }

    console.log("Image generated, uploading to storage...");

    // Convert base64 to binary
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Create Supabase client with service role for storage upload
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `egyptian-frame-${timestamp}.png`;

    // Upload to storage
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

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("slot-frames")
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;
    console.log("Public URL:", publicUrl);

    // Save the URL to site_settings
    const { error: settingsError } = await supabase
      .from("site_settings")
      .upsert(
        { key: "slot_machine_frame_image", value: publicUrl },
        { onConflict: "key" }
      );

    if (settingsError) {
      console.error("Settings update error:", settingsError);
      // Don't throw - the image is still valid
    }

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: publicUrl,
        message: "Egyptian slot frame generated successfully!",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating slot frame:", error);
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
