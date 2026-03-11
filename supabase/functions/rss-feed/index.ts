import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://casinoaftaler.dk";
const FEED_TITLE = "Casinoaftaler.dk – Casino Nyheder";
const FEED_DESCRIPTION = "Seneste nyheder og artikler om online casinoer i Danmark";
const FEED_LANGUAGE = "da";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: articles, error } = await supabase
      .from("casino_news")
      .select("slug, title, excerpt, published_at, updated_at, category, tags")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    const now = new Date().toUTCString();

    const items = (articles || []).map((a) => {
      const pubDate = new Date(a.published_at).toUTCString();
      const categories = (a.tags || [])
        .map((t: string) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${SITE_URL}/casino-nyheder/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/casino-nyheder/${a.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.excerpt || "")}</description>
${categories}
    </item>`;
    });

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${FEED_TITLE}</title>
    <link>${SITE_URL}/casino-nyheder</link>
    <description>${FEED_DESCRIPTION}</description>
    <language>${FEED_LANGUAGE}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("RSS feed error:", err);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
