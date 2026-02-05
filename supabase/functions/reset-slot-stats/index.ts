/**
 * RESET SLOT STATS EDGE FUNCTION
 * ================================
 * 
 * This function ONLY resets user-facing gameplay data:
 * ✅ RESETS: slot_game_results (user leaderboard/winnings)
 * ✅ RESETS: slot_spins (user spin counters)
 * 
 * ⚠️ NEVER TOUCH ADMIN ANALYTICS - These are PRESERVED:
 * ❌ page_views (page tracking analytics)
 * ❌ click_events (affiliate click tracking)
 * ❌ Any other analytics/tracking tables
 * 
 * PRINCIPLE: Only reset user-facing gameplay data, never admin analytics.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ResetRequest {
  target?: "leaderboard" | "spins" | "all";
  source?: "cron" | "admin";
}

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

    // Delete from slot_game_results (leaderboard)
    if (target === "leaderboard" || target === "all") {
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
      message: `Stats reset complete`,
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
