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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify caller is admin
    const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminUserId = claimsData.claims.sub;

    // Check admin role
    const serviceClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleCheck } = await serviceClient
      .from("user_roles")
      .select("id")
      .eq("user_id", adminUserId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleCheck) {
      return new Response(JSON.stringify({ error: "Forbidden: not admin" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { userId, reason } = await req.json();
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Insert ban record
    const { error: banError } = await serviceClient.from("user_bans").insert({
      user_id: userId,
      banned_by: adminUserId,
      reason: reason || null,
    });
    if (banError) throw banError;

    // 2. Delete leaderboard data (slot_game_results)
    await serviceClient.from("slot_game_results").delete().eq("user_id", userId);

    // 3. Reset credits to 0
    await serviceClient
      .from("slot_spins")
      .update({ spins_remaining: 0 })
      .eq("user_id", userId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
