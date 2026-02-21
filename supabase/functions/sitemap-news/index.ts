import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://casinoaftaler.dk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: articles, error } = await supabase
      .from("casino_news")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;

    // Find most recent updated_at for the hub lastmod
    const latestUpdate = articles && articles.length > 0
      ? articles.reduce((latest, a) => {
          const d = new Date(a.updated_at);
          return d > latest ? d : latest;
        }, new Date(0))
      : new Date();

    const hubLastmod = latestUpdate.toISOString().split("T")[0];

    const urls: string[] = [];

    // Hub entry
    urls.push(`  <url>
    <loc>${SITE_URL}/casino-nyheder</loc>
    <lastmod>${hubLastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);

    // Article entries
    for (const article of articles || []) {
      const lastmod = new Date(article.updated_at).toISOString().split("T")[0];
      urls.push(`  <url>
    <loc>${SITE_URL}/casino-nyheder/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
    console.error("Sitemap generation error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
