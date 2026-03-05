import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    // Verify the request has the service role key or a shared secret
    const authHeader = req.headers.get("authorization");
    const expectedKey = Deno.env.get("LOVABLE_API_KEY");
    
    if (!authHeader || !authHeader.includes(expectedKey || "___no_key___")) {
      // Also accept service role key via standard Supabase auth
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (!authHeader || !authHeader.includes(supabaseKey || "___no_key___")) {
        return new Response("Unauthorized", { status: 401, headers: corsHeaders });
      }
    }

    const { paths } = await req.json();

    if (!Array.isArray(paths) || paths.length === 0) {
      return new Response(
        JSON.stringify({ error: "paths must be a non-empty array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date().toISOString();
    const results: { path: string; status: string }[] = [];

    for (const path of paths) {
      const { error } = await supabase
        .from("page_metadata")
        .update({ updated_at: now })
        .eq("path", path);

      results.push({
        path,
        status: error ? `error: ${error.message}` : "updated",
      });
    }

    return new Response(
      JSON.stringify({ updated_at: now, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("touch-page-dates error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
