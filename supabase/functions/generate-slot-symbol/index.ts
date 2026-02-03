import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BASE_STYLE = `Style: High-quality cartoon/game art style, clean lines, vibrant colors, detailed but stylized. Square 1:1 aspect ratio suitable for a slot machine symbol. Egyptian temple background with subtle columns and hieroglyphics. Warm golden color palette with rich amber tones.`;

function getPromptForSymbol(name: string, isScatter: boolean): string {
  const normalizedName = name.toLowerCase().trim();

  // Scatter symbol - the cat on a book
  if (isScatter || normalizedName.includes("fedesvin") || normalizedName.includes("book")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game called "Book of Fedesvin".

The symbol MUST feature:
- A CHUBBY/FAT gray and white cat (similar to British Shorthair) sitting comfortably
- The cat has green eyes and a sweet, slightly smug expression
- The cat wears an Egyptian pharaoh headdress (nemes) in gold and blue stripes
- A decorative golden collar with blue gems around the cat's neck
- The cat is sitting ON TOP of an ancient Egyptian golden book
- The book has ornate golden decorations with winged scarab and gems on the spine/cover
- A red bookmark ribbon visible from the book
- Background with subtle Egyptian temple elements (columns, hieroglyphics, Anubis statues)
- Warm golden color palette with rich amber tones

${BASE_STYLE}

This is a "Book of the Dead" themed scatter/wild symbol for a slot game.`;
  }

  // Pharaoh symbol
  if (normalizedName.includes("pharaoh") || normalizedName.includes("farao")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A majestic Egyptian Pharaoh bust/portrait
- Golden nemes headdress with blue and gold stripes
- Royal uraeus cobra on the forehead
- Golden collar/pectoral with lapis lazuli and turquoise gems
- Regal, powerful expression with kohl-lined eyes
- Warm golden lighting with subtle glow

${BASE_STYLE}`;
  }

  // Anubis symbol
  if (normalizedName.includes("anubis")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- The Egyptian god Anubis (jackal-headed deity)
- Sleek black jackal head with pointed ears
- Golden Egyptian collar and ceremonial adornments
- Piercing golden or amber eyes
- Mysterious and noble appearance
- Holding an ankh or was-scepter

${BASE_STYLE}`;
  }

  // Horus symbol
  if (normalizedName.includes("horus")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- The Egyptian god Horus (falcon-headed deity)
- Majestic falcon head with detailed feathers
- Golden and blue headdress with sun disk
- The Eye of Horus symbolism incorporated
- Regal and divine appearance
- Golden collar with precious gems

${BASE_STYLE}`;
  }

  // Scarab symbol
  if (normalizedName.includes("scarab")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A golden jeweled scarab beetle
- Ornate wings spread outward
- Encrusted with turquoise, lapis lazuli, and ruby gems
- Holding the sun disk above its head
- Intricate golden filigree details
- Sacred Egyptian symbolism

${BASE_STYLE}`;
  }

  // Isis symbol
  if (normalizedName.includes("isis")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- The Egyptian goddess Isis
- Elegant feminine face with kohl-lined eyes
- Throne-shaped crown (hieroglyph of her name)
- Golden wings spread gracefully
- Ornate golden jewelry and collar
- Serene and powerful expression

${BASE_STYLE}`;
  }

  // Ankh symbol
  if (normalizedName.includes("ankh")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- An ornate golden ankh (key of life)
- Encrusted with turquoise and lapis lazuli gems
- Intricate hieroglyphic engravings
- Glowing with divine golden light
- Surrounded by subtle rays of power
- Sacred Egyptian symbolism

${BASE_STYLE}`;
  }

  // Letter A
  if (normalizedName === "a" || normalizedName.includes("letter a")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A stylized letter "A" in golden Egyptian style
- Decorated with hieroglyphic patterns
- Adorned with small turquoise and gold gems
- Egyptian lotus or papyrus motifs incorporated
- Elegant serif font with Egyptian flair
- Subtle golden glow effect

${BASE_STYLE}`;
  }

  // Letter K
  if (normalizedName === "k" || normalizedName.includes("letter k")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A stylized letter "K" in golden Egyptian style
- Decorated with hieroglyphic patterns
- Adorned with small turquoise and gold gems
- Egyptian scarab or eye motifs incorporated
- Elegant serif font with Egyptian flair
- Subtle golden glow effect

${BASE_STYLE}`;
  }

  // Letter Q
  if (normalizedName === "q" || normalizedName.includes("letter q")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A stylized letter "Q" in golden Egyptian style
- Decorated with hieroglyphic patterns
- Adorned with small turquoise and gold gems
- Egyptian snake or cobra motifs incorporated
- Elegant serif font with Egyptian flair
- Subtle golden glow effect

${BASE_STYLE}`;
  }

  // Letter J
  if (normalizedName === "j" || normalizedName.includes("letter j")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A stylized letter "J" in golden Egyptian style
- Decorated with hieroglyphic patterns
- Adorned with small turquoise and gold gems
- Egyptian feather or reed motifs incorporated
- Elegant serif font with Egyptian flair
- Subtle golden glow effect

${BASE_STYLE}`;
  }

  // Number 10
  if (normalizedName === "10" || normalizedName.includes("ten")) {
    return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A stylized number "10" in golden Egyptian style
- Decorated with hieroglyphic patterns
- Adorned with small turquoise and gold gems
- Egyptian pyramid or obelisk motifs incorporated
- Elegant serif font with Egyptian flair
- Subtle golden glow effect

${BASE_STYLE}`;
  }

  // Default fallback - generic Egyptian symbol
  return `Create a slot machine symbol icon for an Egyptian-themed game.

The symbol features:
- A ${name} themed icon in ancient Egyptian style
- Rich golden colors with blue and turquoise accents
- Ornate decorative details
- Egyptian hieroglyphic background elements
- Warm, glowing golden lighting

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
