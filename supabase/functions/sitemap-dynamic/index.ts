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

    // Fetch all page metadata ordered by priority desc
    const { data: pages, error } = await supabase
      .from("page_metadata")
      .select("path, updated_at, changefreq, priority")
      .order("priority", { ascending: false });

    if (error) throw error;

    const urls = (pages || []).map((page) => {
      const loc =
        page.path === "/" ? SITE_URL + "/" : SITE_URL + page.path;
      // Format updated_at to ISO 8601 with timezone
      const date = new Date(page.updated_at);
      const lastmod = date.toISOString().replace(/\.\d{3}Z$/, "+00:00");

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${Number(page.priority).toFixed(1)}</priority>
  </url>`;
    });

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
    console.error("Dynamic sitemap error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
