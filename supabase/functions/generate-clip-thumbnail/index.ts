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
    const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY") || "";

    const supabase = createClient(supabaseUrl, serviceKey);

    const { clipId, batch } = await req.json();

    // Batch mode: generate for all approved clips without thumbnails (or all if regenerating)
    if (batch) {
      const query = supabase
        .from("community_clips")
        .select("id, title, description, thumbnail_url")
        .eq("status", "approved");

      // If batch === "all", regenerate for ALL clips (even those with existing thumbnails)
      if (batch !== "all") {
        query.is("thumbnail_url", null);
      }

      const { data: clips, error } = await query.limit(50);

      if (error) throw error;
      if (!clips || clips.length === 0) {
        return new Response(JSON.stringify({ message: "No clips need thumbnails", count: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const results = [];
      for (const clip of clips) {
        try {
          const url = await generateAndUpload(supabase, supabaseUrl, lovableApiKey, firecrawlKey, clip);
          results.push({ id: clip.id, title: clip.title, success: true, url });
        } catch (e) {
          console.error(`Failed for clip ${clip.id}:`, e);
          results.push({ id: clip.id, title: clip.title, success: false, error: e.message });
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

    const url = await generateAndUpload(supabase, supabaseUrl, lovableApiKey, firecrawlKey, clip);

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
  firecrawlKey: string,
  clip: { id: string; title: string | null; description: string | null }
): Promise<string> {
  const title = clip.title || "Casino Slot";
  const slotName = extractSlotName(title);
  const isGenericTitle = isGeneric(slotName);

  console.log(`Processing clip ${clip.id}: title="${title}", extracted="${slotName}", generic=${isGenericTitle}`);

  let imageData: Uint8Array | null = null;

  // For specific slot names, try to find a real image
  if (!isGenericTitle && firecrawlKey) {
    imageData = await tryFindRealImage(slotName, firecrawlKey);
  }

  // Fallback: generate AI image
  if (!imageData) {
    console.log(`Using AI fallback for clip ${clip.id}`);
    imageData = await generateAiImage(slotName, isGenericTitle, lovableApiKey);
  }

  // Upload to storage
  const filePath = `${clip.id}.png`;
  const { error: uploadError } = await supabase.storage
    .from("clip-thumbnails")
    .upload(filePath, imageData, {
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

  console.log(`Thumbnail set for clip ${clip.id}: ${publicUrl}`);
  return publicUrl;
}

async function tryFindRealImage(slotName: string, firecrawlKey: string): Promise<Uint8Array | null> {
  try {
    console.log(`Searching for real image of "${slotName}"...`);

    // Search for the slot machine image
    const searchResponse = await fetch("https://api.firecrawl.dev/v1/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `"${slotName}" slot machine game`,
        limit: 5,
        scrapeOptions: {
          formats: ["markdown"],
        },
      }),
    });

    if (!searchResponse.ok) {
      console.error(`Firecrawl search failed: ${searchResponse.status}`);
      return null;
    }

    const searchData = await searchResponse.json();
    const results = searchData.data || [];

    // Look for image URLs in the markdown content
    for (const result of results) {
      const markdown = result.markdown || "";
      const imageUrls = extractImageUrls(markdown, slotName);

      for (const imgUrl of imageUrls) {
        try {
          const downloaded = await downloadImage(imgUrl);
          if (downloaded && downloaded.length > 5000) {
            console.log(`Found real image for "${slotName}": ${imgUrl}`);
            return downloaded;
          }
        } catch (e) {
          console.log(`Failed to download image ${imgUrl}: ${e.message}`);
          continue;
        }
      }
    }

    console.log(`No suitable real image found for "${slotName}"`);
    return null;
  } catch (e) {
    console.error(`Error searching for real image: ${e.message}`);
    return null;
  }
}

function extractImageUrls(markdown: string, slotName: string): string[] {
  const urls: string[] = [];
  const slotWords = slotName.toLowerCase().split(/\s+/);

  // Find all image URLs in markdown: ![alt](url)
  const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = mdImageRegex.exec(markdown)) !== null) {
    const alt = match[1].toLowerCase();
    const url = match[2];

    // Skip tiny icons, SVGs, tracking pixels
    if (url.includes(".svg") || url.includes("icon") || url.includes("logo") || url.includes("favicon")) continue;
    if (url.includes("data:image")) continue;
    if (!url.startsWith("http")) continue;

    // Prioritize images whose alt text matches the slot name
    const altMatchesSlot = slotWords.some((w) => w.length > 3 && alt.includes(w));
    if (altMatchesSlot) {
      urls.unshift(url); // Add to front (priority)
    } else {
      urls.push(url);
    }
  }

  // Also look for bare image URLs in the text
  const bareUrlRegex = /https?:\/\/[^\s"'<>]+\.(jpg|jpeg|png|webp)/gi;
  while ((match = bareUrlRegex.exec(markdown)) !== null) {
    const url = match[0];
    if (!urls.includes(url) && !url.includes("icon") && !url.includes("logo") && !url.includes("favicon")) {
      urls.push(url);
    }
  }

  return urls.slice(0, 8); // Try at most 8 images
}

async function downloadImage(url: string): Promise<Uint8Array | null> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    },
    redirect: "follow",
  });

  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("image")) {
    await response.text(); // consume body
    return null;
  }

  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function generateAiImage(
  slotName: string,
  isGeneric: boolean,
  lovableApiKey: string
): Promise<Uint8Array> {
  const prompt = isGeneric
    ? `A vibrant, exciting casino slot machine game screenshot. Show colorful slot reels with various fruit and gem symbols, neon lighting, gold coins flying, and exciting visual effects. Modern online casino game art style. Dark background with glowing elements. 16:9 aspect ratio. Ultra high resolution.`
    : `A screenshot of the "${slotName}" online slot machine game. Show the game's slot reels with its themed symbols and visual style. Modern online casino game art. Dark background with glowing neon effects. 16:9 aspect ratio. Ultra high resolution.`;

  console.log(`Generating AI image with prompt: ${prompt.substring(0, 80)}...`);

  const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: prompt }],
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

  const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
  return Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
}

function extractSlotName(title: string): string {
  const cleanTitle = title
    .replace(/\d+(\.\d+)?x\s*(på|on|i)?\s*/gi, "") // Remove multiplier prefixes like "17185x på"
    .replace(/^(big\s*win|mega\s*win|max\s*win|epic\s*win|stort\s*win|mit|min|det|første|andet)\s*(på|on|i)?\s*/gi, "")
    .replace(/\(.*?\)/g, "") // Remove parenthetical content
    .replace(/\s*(base\s*game|bonus\s*buy|free\s*spins?|maxwin|max\s*win)\s*/gi, "")
    .replace(/!+$/, "") // Remove trailing exclamation marks
    .trim();

  return cleanTitle || title;
}

function isGeneric(slotName: string): boolean {
  const genericTitles = [
    "gg", "nice", "wow", "lol", "casino", "slot", "win", "big", "mega",
    "det paaaayer", "det payer", "stort win", "stor gevinst", "fedt",
    "vildt", "crazy", "epic", "insane", "omg", "let's go", "yes",
    "stort win her",
  ];

  const lower = slotName.toLowerCase().trim();

  // Too short to be a slot name
  if (lower.length < 4) return true;

  // Matches a known generic phrase
  if (genericTitles.some((g) => lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g))) return true;

  // Only common words, no proper slot name
  const words = lower.split(/\s+/);
  const allGeneric = words.every((w) =>
    ["det", "er", "en", "et", "på", "i", "og", "her", "der", "win", "big", "mega", "max", "stor", "stort", "nice", "gg", "fedt", "vildt"].includes(w)
  );

  return allGeneric;
}
