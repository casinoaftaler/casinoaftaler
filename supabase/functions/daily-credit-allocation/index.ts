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

    // Check if this is a cron call (body contains "time" field from pg_cron)
    // The function is fully idempotent so cron calls are safe without admin auth.
    let isCronCall = false;
    let body: any = {};
    try {
      body = await req.json();
      if (body?.time) isCronCall = true;
    } catch {
      // No body or invalid JSON — not a cron call
    }

    if (!isCronCall) {
      // Manual call — require admin authentication
      const authHeader = req.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const token = authHeader.replace("Bearer ", "");

      // Allow service_role key OR admin user
      if (token !== serviceRoleKey) {
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
          return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (!roleData) {
          return new Response(
            JSON.stringify({ error: "Admin access required" }),
            { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    const today = getTodayDanish();
    const BASE_DAILY_SPINS = 2000;
    const SUBSCRIBER_BONUS = 100;

    // Get all users with a Twitch account (active users)
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("user_id, bonus_spins_permanent, twitch_badges")
      .not("twitch_id", "is", null);

    if (profilesError) throw profilesError;

    if (!profiles || profiles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users to allocate credits to", date: today }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Helper to batch .in() queries (Supabase URL length limit)
    async function batchIn<T>(
      table: string,
      column: string,
      values: string[],
      select: string,
      extraFilters?: (q: any) => any,
    ): Promise<T[]> {
      const BATCH = 50;
      const results: T[] = [];
      for (let i = 0; i < values.length; i += BATCH) {
        const chunk = values.slice(i, i + BATCH);
        let q = supabase.from(table).select(select).in(column, chunk);
        if (extraFilters) q = extraFilters(q);
        const { data, error } = await q;
        if (error) throw error;
        if (data) results.push(...(data as T[]));
      }
      return results;
    }

    // Get the most recent spin record for each user (before today)
    const userIds = profiles.map((p) => p.user_id);
    const latestSpins = await batchIn<any>(
      "slot_spins", "user_id", userIds,
      "user_id, spins_remaining, date",
      (q) => q.lt("date", today).eq("game_id", "shared").order("date", { ascending: false }),
    );

    // Build a map of user_id -> most recent spins_remaining (before today)
    const latestSpinMap = new Map<string, number>();
    for (const spin of latestSpins) {
      if (!latestSpinMap.has(spin.user_id)) {
        latestSpinMap.set(spin.user_id, spin.spins_remaining);
      }
    }

    // Also check if today's records already exist (to skip those users)
    const todaySpins = await batchIn<any>(
      "slot_spins", "user_id", userIds,
      "user_id",
      (q) => q.eq("date", today).eq("game_id", "shared"),
    );

    const usersWithTodayRecord = new Set(todaySpins.map((s: any) => s.user_id));

    // Build upsert rows with top-up logic
    const rows: Array<{ user_id: string; date: string; spins_remaining: number }> = [];
    const logRows: Array<{ user_id: string; amount: number; source: string; note: string }> = [];

    for (const p of profiles) {
      // Skip users who already have a record for today
      if (usersWithTodayRecord.has(p.user_id)) continue;

      const isSubscriber = !!(p as any).twitch_badges?.is_subscriber;
      const subBonus = isSubscriber ? SUBSCRIBER_BONUS : 0;
      const cap = BASE_DAILY_SPINS + subBonus + (p.bonus_spins_permanent || 0);
      const previous = latestSpinMap.get(p.user_id);

      let startValue: number;
      let topUpAmount: number;

      if (previous === undefined) {
        // New user or no history - give full cap
        startValue = cap;
        topUpAmount = cap;
      } else if (previous >= cap) {
        // User has more than cap from gifts/rewards — carry over as-is, do NOT reduce
        startValue = previous;
        topUpAmount = 0;
      } else {
        // User is below cap - top up to cap
        startValue = cap;
        topUpAmount = cap - previous;
      }

      rows.push({
        user_id: p.user_id,
        date: today,
        spins_remaining: startValue,
        game_id: "shared",
      });

      logRows.push({
        user_id: p.user_id,
        amount: topUpAmount,
        source: "daily_cron",
        note: topUpAmount > 0
          ? `Daglig top-up: +${topUpAmount} credits (fra ${previous ?? 0} til ${startValue})`
          : `Carry-over: ${startValue} credits beholdt (over daglig cap på ${cap})`,
      });
    }

    if (rows.length > 0) {
      // Insert new records (ignoreDuplicates for safety)
      const { error: upsertError } = await supabase
        .from("slot_spins")
        .upsert(rows, { onConflict: "user_id,date,game_id", ignoreDuplicates: true });

      if (upsertError) throw upsertError;

      // Log the allocations
      const { error: logError } = await supabase
        .from("credit_allocation_log")
        .insert(logRows);

      if (logError) {
        console.error("Failed to log credit allocations:", logError);
      }
    }

    const skipped = usersWithTodayRecord.size;
    console.log(`Daily credit allocation complete: ${rows.length} users processed, ${skipped} skipped (already had today's record), date: ${today}`);

    return new Response(
      JSON.stringify({
        success: true,
        date: today,
        usersProcessed: rows.length,
        usersSkipped: skipped,
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
