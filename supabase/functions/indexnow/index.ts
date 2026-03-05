import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const INDEXNOW_KEY = "b4f3c8a2e7d14f6e9a1b5c3d8f0e2a47";
const HOST = "casinoaftaler.dk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(JSON.stringify({ error: "urls array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Submit to IndexNow via Bing endpoint (propagates to Yandex, Naver etc.)
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls.map((u: string) => u.startsWith("http") ? u : `https://${HOST}${u}`),
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const body = await response.text();

    return new Response(
      JSON.stringify({
        success: status >= 200 && status < 300,
        indexnow_status: status,
        submitted_urls: payload.urlList.length,
        detail: body || "OK",
      }),
      {
        status: 200,
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