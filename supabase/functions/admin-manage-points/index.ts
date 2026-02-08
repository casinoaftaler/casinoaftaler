import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ManagePointsRequest {
  targetUserId: string;
  action: "edit" | "reset";
  newPoints?: number;
  reason?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Get the authorization header to identify the admin
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's token to verify identity
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create service client for privileged operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const body: ManagePointsRequest = await req.json();
    const { targetUserId, action, newPoints, reason } = body;

    if (!targetUserId || !action) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: targetUserId and action" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action !== "edit" && action !== "reset") {
      return new Response(
        JSON.stringify({ error: "Invalid action. Must be 'edit' or 'reset'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate newPoints for edit action - enforce minimum of 0
    const sanitizedNewPoints = action === "edit" 
      ? Math.max(0, Math.floor(newPoints ?? 0)) 
      : 0;

    // Get current total winnings for the user from slot_game_results
    const { data: currentStats, error: statsError } = await supabaseAdmin
      .from("slot_game_results")
      .select("win_amount, bonus_win_amount")
      .eq("user_id", targetUserId);

    if (statsError) {
      console.error("Error fetching current stats:", statsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch current user stats" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate current total points
    const currentPoints = currentStats?.reduce(
      (sum, row) => sum + Number(row.win_amount || 0) + Number(row.bonus_win_amount || 0),
      0
    ) ?? 0;

    // Determine the adjustment needed
    const targetPoints = sanitizedNewPoints;
    const adjustment = targetPoints - currentPoints;

    // If we need to set to a specific value, we'll insert a single adjustment record
    // This approach preserves history while achieving the target points
    if (adjustment !== 0 || action === "reset") {
      if (action === "reset") {
        // For reset, delete all game results for this user
        const { error: deleteError } = await supabaseAdmin
          .from("slot_game_results")
          .delete()
          .eq("user_id", targetUserId);

        if (deleteError) {
          console.error("Error resetting points:", deleteError);
          return new Response(
            JSON.stringify({ error: "Failed to reset points" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } else if (adjustment !== 0) {
        // For edit, insert an adjustment record
        const { error: insertError } = await supabaseAdmin
          .from("slot_game_results")
          .insert({
            user_id: targetUserId,
            bet_amount: 0,
            win_amount: adjustment,
            bonus_win_amount: 0,
            is_bonus_triggered: false,
          });

        if (insertError) {
          console.error("Error adjusting points:", insertError);
          return new Response(
            JSON.stringify({ error: "Failed to adjust points" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    // Log the action to audit table
    const { error: auditError } = await supabaseAdmin
      .from("slot_points_audit_log")
      .insert({
        admin_user_id: user.id,
        target_user_id: targetUserId,
        action_type: action,
        previous_points: currentPoints,
        new_points: targetPoints,
        reason: reason || null,
      });

    if (auditError) {
      console.error("Error logging audit:", auditError);
      // Don't fail the request, but log the error
    }

    return new Response(
      JSON.stringify({
        success: true,
        previousPoints: currentPoints,
        newPoints: targetPoints,
        action,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
