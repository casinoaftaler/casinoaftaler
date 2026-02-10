import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const today = getTodayDanish();
    const BASE_DAILY_SPINS = 200;
    const MAX_SPINS_CAP = 220;

    // Get all users with a Twitch account (active users)
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("user_id, bonus_spins_permanent")
      .not("twitch_id", "is", null);

    if (profilesError) throw profilesError;

    if (!profiles || profiles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users to allocate credits to", date: today }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build upsert rows for all users
    const rows = profiles.map((p) => ({
      user_id: p.user_id,
      date: today,
      spins_remaining: Math.min(
        BASE_DAILY_SPINS + (p.bonus_spins_permanent || 0),
        MAX_SPINS_CAP
      ),
    }));

    // Upsert with ignoreDuplicates so we don't overwrite users who already
    // have a record for today (e.g. admin gave extra credits earlier)
    const { error: upsertError } = await supabase
      .from("slot_spins")
      .upsert(rows, { onConflict: "user_id,date", ignoreDuplicates: true });

    if (upsertError) throw upsertError;

    // Log the allocation for each user
    const logRows = rows.map((r) => ({
      user_id: r.user_id,
      amount: r.spins_remaining,
      source: "daily_cron",
      note: `Daglig tildeling: ${r.spins_remaining} credits`,
    }));

    const { error: logError } = await supabase
      .from("credit_allocation_log")
      .insert(logRows);

    if (logError) {
      // Don't fail the whole allocation just because logging failed
      console.error("Failed to log credit allocations:", logError);
    }

    console.log(`Daily credit allocation complete: ${rows.length} users, date: ${today}`);

    return new Response(
      JSON.stringify({
        success: true,
        date: today,
        usersProcessed: rows.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Daily credit allocation error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
