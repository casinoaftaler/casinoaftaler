import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BASE_STYLE = `
STYLE REQUIREMENTS (MANDATORY - MUST FOLLOW EXACTLY):
- Art style: High-quality digital painting, semi-realistic with stylized elements
- Rendering: Smooth gradients, soft shadows, polished game art quality
- Color palette: Warm golden and amber tones, with accents of deep blue, turquoise, and rich browns
- Lighting: Dramatic golden rim lighting from behind, creating a divine glow effect
- Detail level: High detail on the main subject, slightly softer background

BACKGROUND REQUIREMENTS (MANDATORY):
- Egyptian temple interior background
- Stone columns with hieroglyphic carvings visible on both sides
- Subtle torch light creating warm ambient glow
- Slightly blurred/depth-of-field background to make the symbol pop
- The background must fill the ENTIRE canvas edge-to-edge
- NO white borders, NO white edges, NO margins anywhere

FORMAT: Square 1:1 aspect ratio, suitable for a slot machine symbol.
`;

function getPromptForSymbol(name: string, isScatter: boolean): string {
  const normalizedName = name.toLowerCase().trim();

  // Scatter symbol - the cat on a book
  if (isScatter || normalizedName.includes("fedesvin") || normalizedName.includes("book")) {
    return `Create a slot machine symbol for an Egyptian-themed game called "Book of Fedesvin".

MAIN SUBJECT:
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears an Egyptian pharaoh headdress (nemes) in gold and blue stripes
- A decorative golden collar with blue gems around the cat's neck
- The cat is sitting ON TOP of an ancient Egyptian golden book
- The book has ornate golden decorations with winged scarab and gems on the spine/cover
- A red bookmark ribbon visible from the book

COMPOSITION:
- Cat and book centered, filling most of the frame
- The cat should be the main focus with the book as a pedestal
- Golden divine light emanating from behind

${BASE_STYLE}

This is a "Book of the Dead" themed scatter/wild symbol for a slot game.`;
  }

  // Pharaoh symbol (Premium - most rare)
  if (normalizedName.includes("pharaoh") || normalizedName.includes("farao")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A majestic Egyptian Pharaoh depicted as a bust/portrait
- Golden nemes headdress with blue and gold stripes
- Royal uraeus cobra prominently on the forehead
- Strong, regal face with kohl-lined eyes
- Golden usekh collar (broad collar) with lapis lazuli, turquoise, and carnelian gems
- Powerful, commanding expression befitting a god-king
- Skin with a warm, bronze tone

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
  }

  // Anubis symbol (Premium)
  if (normalizedName.includes("anubis")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian god Anubis depicted as a bust/portrait
- Sleek black jackal head with elegant pointed ears
- Fur rendered with subtle sheen and detail
- Piercing golden/amber eyes with an intense, mysterious gaze
- Golden Egyptian usekh collar (broad collar) with lapis lazuli and turquoise inlays
- Golden earrings and ceremonial headdress elements
- Noble, powerful, and slightly menacing expression

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
  }

  // Horus symbol (Premium)
  if (normalizedName.includes("horus")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian god Horus depicted as a bust/portrait
- Majestic falcon head with detailed feathers in brown, gold, and white
- Sharp, piercing golden eyes with divine intensity
- Golden and blue pschent (double crown) or sun disk headdress
- Golden usekh collar with Eye of Horus motifs
- Regal and divine appearance befitting the sky god

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
  }

  // Scarab symbol (Premium)
  if (normalizedName.includes("scarab")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A sacred golden scarab beetle, highly detailed
- Wings spread outward in a majestic display
- Body encrusted with turquoise, lapis lazuli, and ruby gems
- Holding the sun disk above its head
- Intricate golden filigree and hieroglyphic patterns on the wings
- Polished, reflective gold surface with depth

COMPOSITION:
- Scarab centered and filling approximately 75% of the frame
- Wings spread symmetrically
- Sun disk creating a golden glow above

${BASE_STYLE}`;
  }

  // Isis symbol (Common)
  if (normalizedName.includes("isis")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- The Egyptian goddess Isis depicted as a bust/portrait
- Elegant feminine face with kohl-lined eyes and warm bronze skin
- Throne-shaped hieroglyph crown (her namesake) in gold
- Golden wings gracefully framing her shoulders
- Ornate golden usekh collar with lapis lazuli and turquoise
- Serene, wise, and powerful expression

COMPOSITION:
- Centered portrait filling most of the frame
- Subject facing slightly to the side (3/4 view) for dramatic effect
- Golden divine light emanating from behind the subject

${BASE_STYLE}`;
  }

  // Ankh symbol (Common)
  if (normalizedName.includes("ankh")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- An ornate golden ankh (key of life), large and detailed
- Made of polished gold with a metallic sheen
- Encrusted with turquoise and lapis lazuli gems at key points
- Intricate hieroglyphic engravings carved into the gold
- Subtle divine glow emanating from within
- 3D appearance with depth and dimension

COMPOSITION:
- Ankh centered and filling approximately 70% of the frame
- Slight angle to show depth and dimension
- Golden rays of light behind it

${BASE_STYLE}`;
  }

  // Letter A (Common)
  if (normalizedName === "a" || normalizedName.includes("letter a")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "A" as the central focus
- Made of polished gold with a metallic sheen
- Decorated with subtle hieroglyphic engravings carved into the gold
- Small turquoise and lapis lazuli gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a golden artifact/treasure

${BASE_STYLE}`;
  }

  // Letter K (Common)
  if (normalizedName === "k" || normalizedName.includes("letter k")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "K" as the central focus
- Made of polished gold with a metallic sheen
- Decorated with subtle hieroglyphic engravings carved into the gold
- Small turquoise and lapis lazuli gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a golden artifact/treasure

${BASE_STYLE}`;
  }

  // Letter Q (Common)
  if (normalizedName === "q" || normalizedName.includes("letter q")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "Q" as the central focus
- Made of polished gold with a metallic sheen
- Decorated with subtle hieroglyphic engravings carved into the gold
- Small turquoise and lapis lazuli gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a golden artifact/treasure

${BASE_STYLE}`;
  }

  // Letter J (Common)
  if (normalizedName === "j" || normalizedName.includes("letter j")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate letter "J" as the central focus
- Made of polished gold with a metallic sheen
- Decorated with subtle hieroglyphic engravings carved into the gold
- Small turquoise and lapis lazuli gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Letter centered and filling approximately 70% of the frame
- Letter should appear to be a golden artifact/treasure

${BASE_STYLE}`;
  }

  // Number 10 (Common)
  if (normalizedName === "10" || normalizedName.includes("ten")) {
    return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A large, ornate number "10" as the central focus
- Made of polished gold with a metallic sheen
- Decorated with subtle hieroglyphic engravings carved into the gold
- Small turquoise and lapis lazuli gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes

COMPOSITION:
- Number centered and filling approximately 70% of the frame
- Number should appear to be a golden artifact/treasure

${BASE_STYLE}`;
  }

  // Default fallback - generic Egyptian symbol
  return `Create a slot machine symbol for an Egyptian-themed game.

MAIN SUBJECT:
- A ${name} themed icon rendered in ancient Egyptian style
- Made of or decorated with polished gold
- Rich details with turquoise and lapis lazuli accents
- Hieroglyphic decorative elements
- 3D appearance with depth and dimension

COMPOSITION:
- Subject centered and filling approximately 70% of the frame
- Should appear as a precious Egyptian artifact

${BASE_STYLE}`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { symbolId } = await req.json();

    if (!symbolId) {
      return new Response(
        JSON.stringify({ error: "symbolId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating AI symbol for symbolId: ${symbolId}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the symbol to get its name and type
    const { data: symbol, error: fetchError } = await supabase
      .from("slot_symbols")
      .select("name, is_scatter")
      .eq("id", symbolId)
      .single();

    if (fetchError || !symbol) {
      console.error("Failed to fetch symbol:", fetchError);
      return new Response(
        JSON.stringify({ error: "Symbol not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating symbol for: ${symbol.name} (is_scatter: ${symbol.is_scatter})`);

    // Generate dynamic prompt based on symbol type
    const prompt = getPromptForSymbol(symbol.name, symbol.is_scatter);
    console.log(`Using prompt for: ${symbol.name}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Call Lovable AI to generate the image
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errorText = await aiResponse.text();
      console.error(`AI API error: ${status} - ${errorText}`);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI generation failed: ${status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");

    // Extract base64 image from response
    const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageData) {
      throw new Error("No image generated by AI");
    }

    // Parse the base64 data
    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      throw new Error("Invalid image format from AI");
    }

    const imageFormat = base64Match[1];
    const base64Content = base64Match[2];

    // Decode base64 to binary
    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `ai-generated-${symbolId}-${timestamp}.${imageFormat}`;

    console.log(`Uploading to storage: ${filename}`);

    // Upload to storage bucket
    const { error: uploadError } = await supabase.storage
      .from("slot-symbols")
      .upload(filename, bytes, {
        contentType: `image/${imageFormat}`,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("slot-symbols")
      .getPublicUrl(filename);

    const imageUrl = urlData.publicUrl;
    console.log(`Image uploaded successfully: ${imageUrl}`);

    // Update the symbol in the database
    const { error: updateError } = await supabase
      .from("slot_symbols")
      .update({ image_url: imageUrl })
      .eq("id", symbolId);

    if (updateError) {
      console.error("Database update error:", updateError);
      throw new Error(`Failed to update symbol: ${updateError.message}`);
    }

    console.log(`Symbol ${symbolId} updated with new image URL`);

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl,
        symbolId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating symbol:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
