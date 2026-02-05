/**
 * RESET SLOT STATS EDGE FUNCTION
 * ================================
 * 
 * This function ONLY resets user-facing gameplay data:
 * ✅ RESETS: slot_game_results (user leaderboard/winnings)
 * ✅ RESETS: slot_spins (user spin counters)
 * ✅ ARCHIVES: Aggregates current stats to slot_statistics_archive before reset
 * 
 * ⚠️ NEVER TOUCH ADMIN ANALYTICS - These are PRESERVED:
 * ❌ page_views (page tracking analytics)
 * ❌ click_events (affiliate click tracking)
 * ❌ Any other analytics/tracking tables
 * 
 * PRINCIPLE: Archive stats before reset, then only reset user-facing gameplay data.
 */

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ResetRequest {
  target?: "leaderboard" | "spins" | "all";
  source?: "cron" | "admin";
}

const ARCHIVE_ID = "00000000-0000-0000-0000-000000000001";

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    let body: ResetRequest = { target: "all", source: "admin" };
    try {
      body = await req.json();
    } catch {
      // Default values if no body provided
    }

    const { target = "all", source = "admin" } = body;

    // For admin calls, verify the user is an admin
    if (source === "admin") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: "Unauthorized: No auth header" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        console.error("Auth error:", authError);
        return new Response(
          JSON.stringify({ error: "Unauthorized: Invalid token" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError || !roleData) {
        console.error("Role check failed:", roleError);
        return new Response(
          JSON.stringify({ error: "Forbidden: Admin access required" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log(`Admin ${user.id} initiating ${target} reset`);
    } else {
      console.log(`Cron job initiating ${target} reset`);
    }

    let leaderboardDeleted = 0;
    let spinsDeleted = 0;

    // Archive current stats before resetting leaderboard
    if (target === "leaderboard" || target === "all") {
      console.log("Archiving current statistics before reset...");

      // Fetch current aggregates from slot_game_results
      const { data: currentResults, error: fetchError } = await supabase
        .from("slot_game_results")
        .select("user_id, bet_amount, win_amount, bonus_win_amount, is_bonus_triggered");

      if (fetchError) {
        console.error("Error fetching current results:", fetchError);
        throw new Error(`Failed to fetch current results: ${fetchError.message}`);
      }

      if (currentResults && currentResults.length > 0) {
        // Calculate aggregates
        const totalSpins = currentResults.length;
        const totalWinnings = currentResults.reduce((sum, r) => sum + Number(r.win_amount) + Number(r.bonus_win_amount), 0);
        const totalBets = currentResults.reduce((sum, r) => sum + Number(r.bet_amount), 0);
        const biggestWin = currentResults.reduce((max, r) => Math.max(max, Number(r.win_amount) + Number(r.bonus_win_amount)), 0);
        const totalBonuses = currentResults.filter(r => r.is_bonus_triggered).length;
        const uniquePlayers = new Set(currentResults.map(r => r.user_id)).size;

        // Fetch current archive
        const { data: archive, error: archiveError } = await supabase
          .from("slot_statistics_archive")
          .select("*")
          .eq("id", ARCHIVE_ID)
          .single();

        if (archiveError) {
          console.error("Error fetching archive:", archiveError);
          throw new Error(`Failed to fetch archive: ${archiveError.message}`);
        }

        // Update archive with accumulated totals
        const { error: updateError } = await supabase
          .from("slot_statistics_archive")
          .update({
            total_spins: (archive?.total_spins || 0) + totalSpins,
            total_winnings: Number(archive?.total_winnings || 0) + totalWinnings,
            total_bets: Number(archive?.total_bets || 0) + totalBets,
            biggest_win: Math.max(Number(archive?.biggest_win || 0), biggestWin),
            total_bonuses: (archive?.total_bonuses || 0) + totalBonuses,
            unique_players: (archive?.unique_players || 0) + uniquePlayers, // Approximate, may have overlap
            last_reset_at: new Date().toISOString(),
            reset_count: (archive?.reset_count || 0) + 1,
          })
          .eq("id", ARCHIVE_ID);

        if (updateError) {
          console.error("Error updating archive:", updateError);
          throw new Error(`Failed to update archive: ${updateError.message}`);
        }

        console.log(`Archived stats: ${totalSpins} spins, ${totalWinnings} winnings, ${totalBonuses} bonuses`);
      }

      // Delete from slot_game_results (leaderboard)
      const { data: resultsData, error: resultsError } = await supabase
        .from("slot_game_results")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
        .select("id");

      if (resultsError) {
        console.error("Error deleting game results:", resultsError);
        throw new Error(`Failed to delete game results: ${resultsError.message}`);
      }
      
      leaderboardDeleted = resultsData?.length || 0;
      console.log(`Deleted ${leaderboardDeleted} game results`);
    }

    // Delete from slot_spins
    if (target === "spins" || target === "all") {
      const { data: spinsData, error: spinsError } = await supabase
        .from("slot_spins")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
        .select("id");

      if (spinsError) {
        console.error("Error deleting spins:", spinsError);
        throw new Error(`Failed to delete spins: ${spinsError.message}`);
      }
      
      spinsDeleted = spinsData?.length || 0;
      console.log(`Deleted ${spinsDeleted} spin records`);
    }

    const result = {
      success: true,
      message: `Stats reset complete (archived before deletion)`,
      target,
      leaderboardDeleted,
      spinsDeleted,
      timestamp: new Date().toISOString(),
    };

    console.log("Reset complete:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Reset error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
