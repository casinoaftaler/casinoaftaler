import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // User client for auth
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;
    const { tournament_id } = await req.json();

    if (!tournament_id) {
      return new Response(JSON.stringify({ error: "Missing tournament_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch tournament
    const { data: tournament, error: tErr } = await serviceClient
      .from("tournaments")
      .select("id, starts_at, ends_at, max_credits, status")
      .eq("id", tournament_id)
      .single();

    if (tErr || !tournament) {
      return new Response(JSON.stringify({ error: "Tournament not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check tournament is active
    const now = new Date();
    const start = new Date(tournament.starts_at);
    const end = new Date(tournament.ends_at);
    if (now < start || now >= end) {
      return new Response(JSON.stringify({ error: "Tournament is not active" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if already joined
    const { data: existing } = await serviceClient
      .from("tournament_participants")
      .select("id")
      .eq("tournament_id", tournament_id)
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: "Already joined" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert participant
    const { error: insertErr } = await serviceClient
      .from("tournament_participants")
      .insert({ tournament_id, user_id: userId });

    if (insertErr) {
      // Could be unique constraint race condition
      if (insertErr.code === "23505") {
        return new Response(JSON.stringify({ error: "Already joined" }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw insertErr;
    }

    // Add credits if max_credits is set
    let creditsAwarded = 0;
    let newBalance = 0;

    if (tournament.max_credits && tournament.max_credits > 0) {
      const maxCreditsCap = 1000;

      // Get today's date in Danish timezone
      const todayParts = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Copenhagen",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now);
      const today = todayParts; // YYYY-MM-DD

      // Upsert today's slot_spins record
      const { data: spinsRow } = await serviceClient
        .from("slot_spins")
        .select("id, spins_remaining")
        .eq("user_id", userId)
        .eq("date", today)
        .maybeSingle();

      let currentBalance: number;
      let spinsId: string;

      if (!spinsRow) {
        // Create record with default 200
        const { data: newRow, error: createErr } = await serviceClient
          .from("slot_spins")
          .insert({ user_id: userId, date: today, spins_remaining: 200 })
          .select("id, spins_remaining")
          .single();
        if (createErr) throw createErr;
        currentBalance = newRow.spins_remaining;
        spinsId = newRow.id;
      } else {
        currentBalance = spinsRow.spins_remaining;
        spinsId = spinsRow.id;
      }

      // Calculate credits to add (capped at 1000)
      creditsAwarded = Math.min(tournament.max_credits, maxCreditsCap - currentBalance);
      if (creditsAwarded < 0) creditsAwarded = 0;

      if (creditsAwarded > 0) {
        newBalance = currentBalance + creditsAwarded;
        await serviceClient
          .from("slot_spins")
          .update({ spins_remaining: newBalance })
          .eq("id", spinsId);

        // Log credit allocation
        await serviceClient.from("credit_allocation_log").insert({
          user_id: userId,
          amount: creditsAwarded,
          source: "tournament_join",
          note: `Turnering: ${tournament_id} — +${creditsAwarded} credits`,
        });
      } else {
        newBalance = currentBalance;
      }
    }

    return new Response(
      JSON.stringify({ success: true, creditsAwarded, newBalance }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[join-tournament] Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
