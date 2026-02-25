import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Google News Sitemap – serves ONLY articles published within the last 48 hours.
 * Uses the correct <news:news> format per Google's specification.
 * 
 * Static/evergreen routes are handled by the build-time sitemap.xml
 * generated from seoRoutes.ts via the Vite plugin.
 */

const SITE_URL = "https://casinoaftaler.dk";
const PUBLICATION_NAME = "Casinoaftaler.dk";
const PUBLICATION_LANGUAGE = "da";
const MAX_AGE_HOURS = 48;

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

    // Calculate cutoff: only articles from the last 48 hours
    const cutoff = new Date(Date.now() - MAX_AGE_HOURS * 60 * 60 * 1000).toISOString();

    const { data: articles, error } = await supabase
      .from("casino_news")
      .select("slug, title, published_at, updated_at, tags")
      .eq("status", "published")
      .gte("published_at", cutoff)
      .order("published_at", { ascending: false });

    if (error) throw error;

    const urls = (articles || []).map((article) => {
      // Use published_at as publication_date (ISO 8601 with timezone)
      const pubDate = new Date(article.published_at).toISOString();
      const keywords = (article.tags || []).join(", ");

      return `  <url>
    <loc>${SITE_URL}/casino-nyheder/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLICATION_NAME}</news:name>
        <news:language>${PUBLICATION_LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>${keywords ? `\n      <news:keywords>${escapeXml(keywords)}</news:keywords>` : ""}
    </news:news>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls.join("\n")}
</urlset>`;

    const now = new Date();

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=1800, s-maxage=1800, stale-while-revalidate=300",
        "Last-Modified": now.toUTCString(),
      },
    });
  } catch (err) {
    console.error("News sitemap error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

/** Escape XML special characters */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
