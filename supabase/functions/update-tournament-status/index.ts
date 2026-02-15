import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const now = new Date().toISOString();

    // Activate upcoming tournaments whose start time has passed
    const { data: activated, error: activateError } = await supabase
      .from("tournaments")
      .update({ status: "active" })
      .eq("status", "upcoming")
      .lte("starts_at", now)
      .gt("ends_at", now)
      .select("id, title");

    if (activateError) throw activateError;

    // End active tournaments whose end time has passed
    const { data: ended, error: endError } = await supabase
      .from("tournaments")
      .update({ status: "ended" })
      .eq("status", "active")
      .lte("ends_at", now)
      .select("id, title");

    if (endError) throw endError;

    // Also end upcoming tournaments that were never activated but have already passed
    const { data: missedEnded, error: missedError } = await supabase
      .from("tournaments")
      .update({ status: "ended" })
      .eq("status", "upcoming")
      .lte("ends_at", now)
      .select("id, title");

    if (missedError) throw missedError;

    const result = {
      activated: activated?.map((t) => t.title) ?? [],
      ended: [...(ended ?? []), ...(missedEnded ?? [])].map((t) => t.title),
      timestamp: now,
    };

    console.log("Tournament status update:", JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating tournament status:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
