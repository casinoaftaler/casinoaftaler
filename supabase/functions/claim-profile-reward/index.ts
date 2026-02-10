import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SPINS_PER_SECTION = 5;

const VALID_SECTIONS = ["profile", "stats", "favorites", "playstyle"] as const;
type Section = typeof VALID_SECTIONS[number];

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

    // User-scoped client for reads
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
    const { section } = body;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return new Response(
        JSON.stringify({ error: "Invalid section. Must be one of: profile, stats, favorites, playstyle" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Service role client for writes
    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    // Fetch current profile to validate
    const { data: profile, error: profileError } = await serviceClient
      .from("profiles")
      .select("bonus_spins_permanent, profile_section_completed, stats_section_completed, favorites_section_completed, playstyle_section_completed, bio, highest_win_amount, highest_win_game, highest_win_casino, favorite_slot, favorite_provider, favorite_casino, typical_bet_size, play_styles, preferred_game_type, volatility_preference")
      .eq("user_id", userId)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: "Profile not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if section is already completed
    const completedColumn = `${section}_section_completed` as keyof typeof profile;
    if (profile[completedColumn]) {
      return new Response(
        JSON.stringify({ error: "Section already completed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Server-side validation: verify the section is actually filled in
    let sectionComplete = false;
    switch (section as Section) {
      case "profile":
        sectionComplete = (profile.bio || "").trim().length > 0;
        break;
      case "stats":
        sectionComplete = 
          String(profile.highest_win_amount || "").trim().length > 0 &&
          (profile.highest_win_game || "").trim().length > 0 &&
          (profile.highest_win_casino || "").trim().length > 0;
        break;
      case "favorites":
        sectionComplete =
          (profile.favorite_slot || "").trim().length > 0 &&
          (profile.favorite_provider || "").trim().length > 0 &&
          (profile.favorite_casino || "").trim().length > 0 &&
          (profile.typical_bet_size || "").trim().length > 0;
        break;
      case "playstyle":
        sectionComplete =
          (profile.play_styles || []).length > 0 &&
          (profile.preferred_game_type || "").trim().length > 0 &&
          (profile.volatility_preference || "").trim().length > 0;
        break;
    }

    if (!sectionComplete) {
      return new Response(
        JSON.stringify({ error: "Section is not fully completed. Fill in all required fields first." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const newBonusSpins = (profile.bonus_spins_permanent || 0) + SPINS_PER_SECTION;

    // Update profile with service role (bypasses trigger protection)
    const { error: updateError } = await serviceClient
      .from("profiles")
      .update({
        [`${section}_section_completed`]: true,
        bonus_spins_permanent: newBonusSpins,
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Profile update error:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update profile" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Add spins to today's slot_spins record
    const today = getTodayDanish();
    const { data: todaySpins } = await serviceClient
      .from("slot_spins")
      .select("id, spins_remaining")
      .eq("user_id", userId)
      .eq("date", today)
      .maybeSingle();

    if (todaySpins) {
      await serviceClient
        .from("slot_spins")
        .update({ spins_remaining: todaySpins.spins_remaining + SPINS_PER_SECTION })
        .eq("id", todaySpins.id);
    }

    // Log the credit allocation
    await serviceClient.from("credit_allocation_log").insert({
      user_id: userId,
      amount: SPINS_PER_SECTION,
      source: "profile_reward",
      note: `Profil sektion: ${section}`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        section,
        spinsEarned: SPINS_PER_SECTION,
        newBonusSpins,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Claim profile reward error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
