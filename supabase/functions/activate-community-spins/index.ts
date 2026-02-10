import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Returns today's date (YYYY-MM-DD) in Danish timezone.
 */
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

    // Validate authorization
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

    // Parse and validate request
    const body = await req.json();
    const { amount } = body;

    if (typeof amount !== "number" || !Number.isInteger(amount) || amount <= 0 || amount > 1000) {
      return new Response(
        JSON.stringify({ error: "Invalid amount. Must be a positive integer (max 1000)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    // Fetch current community bonus spins to validate
    const { data: bonusData, error: bonusError } = await serviceClient
      .from("community_bonus_spins")
      .select("total_earned, total_activated")
      .eq("user_id", userId)
      .maybeSingle();

    if (bonusError || !bonusData) {
      return new Response(
        JSON.stringify({ error: "No community bonus spins found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const remaining = bonusData.total_earned - bonusData.total_activated;
    if (amount > remaining) {
      return new Response(
        JSON.stringify({ error: `Not enough spins. Available: ${remaining}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Update total_activated (service role bypasses trigger)
    const { error: updateError } = await serviceClient
      .from("community_bonus_spins")
      .update({ total_activated: bonusData.total_activated + amount })
      .eq("user_id", userId);

    if (updateError) throw updateError;

    // 2. Add to today's slot_spins
    const today = getTodayDanish();

    // Ensure today's record exists
    await serviceClient
      .from("slot_spins")
      .upsert(
        { user_id: userId, date: today, spins_remaining: 200 },
        { onConflict: "user_id,date", ignoreDuplicates: true }
      );

    // Get current spins and add
    const { data: spinsData, error: spinsReadError } = await serviceClient
      .from("slot_spins")
      .select("spins_remaining")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (spinsReadError) throw spinsReadError;

    const { error: spinsError } = await serviceClient
      .from("slot_spins")
      .update({ spins_remaining: spinsData.spins_remaining + amount })
      .eq("user_id", userId)
      .eq("date", today);

    if (spinsError) throw spinsError;

    // 3. Log the activation
    await serviceClient
      .from("community_bonus_spins_log")
      .insert({
        user_id: userId,
        event_type: "activation",
        amount,
      });

    return new Response(
      JSON.stringify({
        success: true,
        amount,
        newRemaining: remaining - amount,
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
