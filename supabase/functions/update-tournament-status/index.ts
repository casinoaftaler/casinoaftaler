import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function clawBackCredits(supabase: any, tournamentIds: string[]) {
  if (!tournamentIds.length) return;

  for (const tournamentId of tournamentIds) {
    // Check if tournament had max_credits
    const { data: tournament } = await supabase
      .from("tournaments")
      .select("max_credits")
      .eq("id", tournamentId)
      .single();

    if (!tournament?.max_credits) continue;

    // Get all credit tracking rows for this tournament (not yet clawed back)
    const { data: trackingRows, error: trackErr } = await supabase
      .from("tournament_credit_tracking")
      .select("id, user_id, credits_awarded, credits_clawed_back")
      .eq("tournament_id", tournamentId)
      .eq("credits_clawed_back", 0);

    if (trackErr || !trackingRows?.length) continue;

    // Get today's date in Danish timezone
    const todayParts = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/Copenhagen",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    for (const tracking of trackingRows) {
      // Sum total_credits_used across all game entries for this user in this tournament
      const { data: entries } = await supabase
        .from("tournament_entries")
        .select("total_credits_used")
        .eq("tournament_id", tournamentId)
        .eq("user_id", tracking.user_id);

      const totalUsed = (entries || []).reduce(
        (sum: number, e: any) => sum + Number(e.total_credits_used || 0),
        0
      );

      const unused = Math.max(0, tracking.credits_awarded - totalUsed);
      if (unused <= 0) continue;

      // Deduct from today's slot_spins balance
      const { data: spinsRow } = await supabase
        .from("slot_spins")
        .select("id, spins_remaining")
        .eq("user_id", tracking.user_id)
        .eq("date", todayParts)
        .maybeSingle();

      if (spinsRow) {
        const newBalance = Math.max(0, spinsRow.spins_remaining - unused);
        await supabase
          .from("slot_spins")
          .update({ spins_remaining: newBalance })
          .eq("id", spinsRow.id);
      }

      // Update tracking record
      await supabase
        .from("tournament_credit_tracking")
        .update({ credits_clawed_back: unused })
        .eq("id", tracking.id);

      // Log the clawback
      await supabase.from("credit_allocation_log").insert({
        user_id: tracking.user_id,
        amount: -unused,
        source: "tournament_clawback",
        note: `Turnering afsluttet: ${tournamentId} — -${unused} ubrugte credits`,
      });

      console.log(
        `Clawed back ${unused} credits from user ${tracking.user_id} for tournament ${tournamentId}`
      );
    }
  }
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

    // Claw back unused credits for all tournaments that just ended
    const allEnded = [...(ended ?? []), ...(missedEnded ?? [])];
    const endedIds = allEnded.map((t) => t.id);
    await clawBackCredits(supabase, endedIds);

    const result = {
      activated: activated?.map((t) => t.title) ?? [],
      ended: allEnded.map((t) => t.title),
      clawbackProcessed: endedIds.length,
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
