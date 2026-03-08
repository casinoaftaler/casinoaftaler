import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://casinoaftaler.dk";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const urls: string[] = [];

    // 1. Casino logos from reviews
    const { data: casinos } = await supabase
      .from("casinos")
      .select("slug, name, logo_url")
      .eq("is_active", true)
      .not("logo_url", "is", null);

    for (const casino of casinos || []) {
      if (!casino.logo_url) continue;
      urls.push(`  <url>
    <loc>${SITE_URL}/casino-anmeldelser/${casino.slug}</loc>
    <image:image>
      <image:loc>${escapeXml(casino.logo_url)}</image:loc>
      <image:title>${escapeXml(casino.name)} Logo</image:title>
      <image:caption>${escapeXml(casino.name)} – Online Casino med Dansk Licens</image:caption>
    </image:image>
  </url>`);
    }

    // 2. News featured images
    const { data: articles } = await supabase
      .from("casino_news")
      .select("slug, title, featured_image")
      .eq("status", "published")
      .not("featured_image", "is", null)
      .order("published_at", { ascending: false })
      .limit(50);

    for (const article of articles || []) {
      if (!article.featured_image) continue;
      urls.push(`  <url>
    <loc>${SITE_URL}/casino-nyheder/${article.slug}</loc>
    <image:image>
      <image:loc>${escapeXml(article.featured_image)}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>
  </url>`);
    }

    // 3. Highlight thumbnails
    const { data: highlights } = await supabase
      .from("highlights")
      .select("title, thumbnail_url")
      .eq("is_active", true)
      .not("thumbnail_url", "is", null)
      .limit(30);

    for (const hl of highlights || []) {
      if (!hl.thumbnail_url) continue;
      urls.push(`  <url>
    <loc>${SITE_URL}/highlights</loc>
    <image:image>
      <image:loc>${escapeXml(hl.thumbnail_url)}</image:loc>
      <image:title>${escapeXml(hl.title)}</image:title>
    </image:image>
  </url>`);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("Image sitemap error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
