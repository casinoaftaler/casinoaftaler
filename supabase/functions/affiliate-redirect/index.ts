import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    const userId = url.searchParams.get("userId");

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Missing casino slug" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role to access affiliate_url (not exposed publicly)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: casino, error } = await supabaseAdmin
      .from("casinos")
      .select("id, affiliate_url, name")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !casino) {
      console.error("Casino not found:", slug, error);
      return new Response(
        JSON.stringify({ error: "Casino not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log the click event
    const userAgent = req.headers.get("user-agent") || null;
    const referrer = req.headers.get("referer") || null;

    const { error: insertError } = await supabaseAdmin
      .from("click_events")
      .insert({
        casino_id: casino.id,
        casino_slug: slug,
        casino_name: casino.name,
        event_type: "affiliate_click",
        user_agent: userAgent,
        referrer: referrer,
        user_id: userId || null,
      });

    if (insertError) {
      console.error("Failed to log click event:", insertError);
      // Don't fail the request if logging fails
    } else {
      console.log("Click logged for casino:", casino.name);
    }

    if (!casino.affiliate_url) {
      return new Response(
        JSON.stringify({ error: "No affiliate link available" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Perform an actual redirect so the client can simply open this endpoint in a new tab
    // without ever exposing the affiliate URL in client code/HTML.
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: casino.affiliate_url,
      },
    });
  } catch (error) {
    console.error("Affiliate redirect error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
