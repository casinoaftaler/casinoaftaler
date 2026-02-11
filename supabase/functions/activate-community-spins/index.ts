import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function getTodayDanish(): string {
  const now = new Date();
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    // Rate limiting: max 3 activations per minute
    const { count: recentCount } = await serviceClient
      .from("credit_allocation_log")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("source", "community_activation")
      .gte("created_at", new Date(Date.now() - 60_000).toISOString());

    if ((recentCount ?? 0) >= 3) {
      return new Response(
        JSON.stringify({ error: "For mange forsøg. Vent venligst et minut." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { amount } = body;

    if (typeof amount !== "number" || !Number.isInteger(amount) || amount <= 0 || amount > 1000) {
      return new Response(
        JSON.stringify({ error: "Invalid amount. Must be a positive integer (max 1000)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const today = getTodayDanish();

    const { data: result, error: rpcError } = await serviceClient.rpc(
      "activate_community_spins_safe",
      { p_user_id: userId, p_amount: amount, p_today: today }
    );

    if (rpcError) {
      console.error("RPC error:", rpcError);
      return new Response(
        JSON.stringify({ error: "Failed to activate spins" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (result?.error) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await serviceClient
      .from("community_bonus_spins_log")
      .insert({
        user_id: userId,
        event_type: "activation",
        amount: result.activated,
      });

    return new Response(
      JSON.stringify({
        success: true,
        amount: result.activated,
        newRemaining: result.newRemaining,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Activate community spins error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
