import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const COOLDOWN_HOURS = 12;

// 10 wheel segments with weights
const WHEEL_SEGMENTS = [
  { id: 0, label: "100 Points", type: "points" as const, value: 100, weight: 20 },
  { id: 1, label: "200 Points", type: "points" as const, value: 200, weight: 18 },
  { id: 2, label: "300 Points", type: "points" as const, value: 300, weight: 14 },
  { id: 3, label: "400 Points", type: "points" as const, value: 400, weight: 8 },
  { id: 4, label: "500 Points", type: "points" as const, value: 500, weight: 5 },
  { id: 5, label: "50 Spins", type: "spins" as const, value: 50, weight: 10 },
  { id: 6, label: "100 Spins", type: "spins" as const, value: 100, weight: 5 },
  { id: 7, label: "200 Points", type: "points" as const, value: 200, weight: 15 },
  { id: 8, label: "Ingenting", type: "none" as const, value: 0, weight: 25 },
  { id: 9, label: "Ingenting", type: "none" as const, value: 0, weight: 25 },
];

function getSecureRandomSegment() {
  const totalWeight = WHEEL_SEGMENTS.reduce((sum, s) => sum + s.weight, 0);
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  let random = (randomBytes[0] / 0xFFFFFFFF) * totalWeight;
  
  for (const segment of WHEEL_SEGMENTS) {
    random -= segment.weight;
    if (random <= 0) return segment;
  }
  return WHEEL_SEGMENTS[WHEEL_SEGMENTS.length - 1];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify user
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Service client for writes
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    // Check user has twitch_id
    const { data: profile, error: profileError } = await serviceClient
      .from("profiles")
      .select("twitch_id, twitch_username, last_spin_at, spin_reel_extra_spins")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: "Profil ikke fundet" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!profile.twitch_id) {
      return new Response(
        JSON.stringify({ error: "Du skal have et Twitch ID tilknyttet din profil" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isUnlimitedUser = profile.twitch_username?.toLowerCase() === "fedesvinsejer";
    const hasExtraSpins = (profile as any).spin_reel_extra_spins > 0;

    // Cooldown check (skip for unlimited users and users with extra spins)
    if (!isUnlimitedUser && !hasExtraSpins && profile.last_spin_at) {
      const lastSpin = new Date(profile.last_spin_at);
      const cooldownEnd = new Date(lastSpin.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000);
      const now = new Date();

      if (now < cooldownEnd) {
        const remainingMs = cooldownEnd.getTime() - now.getTime();
        return new Response(
          JSON.stringify({
            error: "Cooldown aktiv",
            cooldownEnd: cooldownEnd.toISOString(),
            remainingMs,
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Rate limiting - max 1 spin per 10 seconds (skip for unlimited users)
    if (!isUnlimitedUser) {
      const { data: recentSpins } = await serviceClient
        .from("spin_history")
        .select("created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (recentSpins && recentSpins.length > 0) {
        const lastSpinTime = new Date(recentSpins[0].created_at);
        if (Date.now() - lastSpinTime.getTime() < 10000) {
          return new Response(
            JSON.stringify({ error: "For mange forsøg. Vent venligst." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    // Generate result
    const result = getSecureRandomSegment();

    // If user has extra spins, decrement instead of setting cooldown
    if (hasExtraSpins) {
      await serviceClient
        .from("profiles")
        .update({ spin_reel_extra_spins: (profile as any).spin_reel_extra_spins - 1 })
        .eq("user_id", userId);
    } else if (!isUnlimitedUser) {
      // Update last_spin_at for normal cooldown
      await serviceClient
        .from("profiles")
        .update({ last_spin_at: new Date().toISOString() })
        .eq("user_id", userId);
    }

    // Log spin
    await serviceClient.from("spin_history").insert({
      user_id: userId,
      twitch_id: profile.twitch_id,
      reward_type: result.type,
      reward_value: result.value,
    });

    // Distribute rewards
    if (result.type === "spins" && result.value > 0) {
      // Get today's date in Danish timezone
      const now = new Date();
      const parts = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Copenhagen",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now);

      // Upsert slot_spins for today
      const { data: existingSpins } = await serviceClient
        .from("slot_spins")
        .select("id, spins_remaining")
        .eq("user_id", userId)
        .eq("date", parts)
        .maybeSingle();

      if (existingSpins) {
        await serviceClient
          .from("slot_spins")
          .update({ spins_remaining: existingSpins.spins_remaining + result.value })
          .eq("id", existingSpins.id);
      } else {
        await serviceClient
          .from("slot_spins")
          .insert({ user_id: userId, date: parts, spins_remaining: 200 + result.value });
      }

      // Log credit allocation
      await serviceClient.from("credit_allocation_log").insert({
        user_id: userId,
        amount: result.value,
        source: "spin_the_reel",
        note: `Spin the Reel: +${result.value} spins`,
      });
    }

    // Points are StreamElements-based, so we just log them.
    // The points reward is informational - actual SE points require SE API integration.
    // For now we log it and show it as a win.

    const cooldownEnd = new Date(Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000);

    return new Response(
      JSON.stringify({
        success: true,
        segmentId: result.id,
        rewardType: result.type,
        rewardValue: result.value,
        rewardLabel: result.label,
        cooldownEnd: cooldownEnd.toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Spin error:", error);
    return new Response(
      JSON.stringify({ error: "Der opstod en fejl. Prøv igen." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
