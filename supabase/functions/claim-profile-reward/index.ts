import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_SECTIONS = ["profile", "stats", "favorites", "playstyle"] as const;

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

    const body = await req.json();
    const { section } = body;

    if (!section || !VALID_SECTIONS.includes(section)) {
      return new Response(
        JSON.stringify({ error: "Invalid section. Must be one of: profile, stats, favorites, playstyle" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    // Rate limiting: max 4 profile reward claims per hour (there are only 4 sections total)
    const { count: recentCount } = await serviceClient
      .from("credit_allocation_log")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("source", "profile_reward")
      .gte("created_at", new Date(Date.now() - 3_600_000).toISOString());

    if ((recentCount ?? 0) >= 4) {
      return new Response(
        JSON.stringify({ error: "For mange forsøg. Vent venligst." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Server-side validation: verify the section is actually filled in
    const { data: profile, error: profileError } = await serviceClient
      .from("profiles")
      .select("bio, highest_win_amount, highest_win_game, highest_win_casino, favorite_slot, favorite_provider, favorite_casino, typical_bet_size, play_styles, preferred_game_type, volatility_preference")
      .eq("user_id", userId)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: "Profile not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let sectionComplete = false;
    switch (section) {
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

    const today = getTodayDanish();
    const { data: result, error: rpcError } = await serviceClient.rpc(
      "claim_profile_section_reward",
      { p_user_id: userId, p_section: section, p_today: today }
    );

    if (rpcError) {
      console.error("RPC error:", rpcError);
      return new Response(
        JSON.stringify({ error: "Failed to claim reward" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (result?.error) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        section,
        spinsEarned: 50,
        newBonusSpins: result.newBonusSpins,
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
