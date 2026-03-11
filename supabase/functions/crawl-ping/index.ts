/**
 * Crawl Ping – called by database triggers when content changes.
 * Pings Google sitemap + IndexNow for changed URLs.
 */

const SITE_URL = "https://casinoaftaler.dk";
const INDEXNOW_KEY = "b4f3c8a2e7d14f6e9a1b5c3d8f0e2a47";
const SITEMAP_URL = `${SITE_URL}/sitemap-index.xml`;

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
    const { urls, source } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: "urls array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fullUrls = urls.map((u: string) =>
      u.startsWith("http") ? u : `${SITE_URL}${u}`
    );

    // 1. Google sitemap ping
    const googlePing = fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
      { method: "GET" }
    ).catch(() => null);

    // 2. IndexNow ping (Bing, Yandex, Naver, etc.)
    const indexNowPing = fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "casinoaftaler.dk",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: fullUrls,
      }),
    }).catch(() => null);

    const [googleRes, indexNowRes] = await Promise.all([googlePing, indexNowPing]);

    console.log(`Crawl ping [${source || "unknown"}]: ${fullUrls.length} URLs, Google=${googleRes?.status}, IndexNow=${indexNowRes?.status}`);

    return new Response(
      JSON.stringify({
        success: true,
        urls_pinged: fullUrls.length,
        google_status: googleRes?.status ?? "failed",
        indexnow_status: indexNowRes?.status ?? "failed",
        source: source || "unknown",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
