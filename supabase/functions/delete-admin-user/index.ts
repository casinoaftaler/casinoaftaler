import { createClient } from "npm:@supabase/supabase-js@^2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey || !anonKey) {
      console.error("Missing environment variables");
      return new Response(
        JSON.stringify({ error: "Server konfiguration mangler" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate auth header
    const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Missing/invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Ikke autoriseret" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // User-context client to validate the caller
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Verify the caller's identity
    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData?.user) {
      console.log("User verification failed:", userError?.message);
      return new Response(
        JSON.stringify({ error: "Ikke autoriseret" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requesterUserId = userData.user.id;
    console.log(`Delete request from user: ${requesterUserId}`);

    // Service-role client for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check if requester is admin
    const { data: isAdmin, error: roleError } = await supabaseAdmin
      .rpc("has_role", { _user_id: requesterUserId, _role: "admin" });

    if (roleError || !isAdmin) {
      console.log("Role check failed:", { roleError, isAdmin, requesterUserId });
      return new Response(
        JSON.stringify({ error: "Kun administratorer kan fjerne admin brugere" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get request body
    const { userId, role: targetRole } = await req.json();
    const roleToDelete = targetRole === "moderator" ? "moderator" : "admin";

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Bruger ID er påkrævet" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prevent self-deletion
    if (userId === requesterUserId) {
      return new Response(
        JSON.stringify({ error: "Du kan ikke fjerne din egen admin rolle" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Removing admin role for user: ${userId}`);

    // Remove admin role from user_roles table
    const { error: deleteRoleError } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");

    if (deleteRoleError) {
      console.error("Error removing admin role:", deleteRoleError);
      return new Response(
        JSON.stringify({ error: "Kunne ikke fjerne admin rolle" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Admin role removed for user: ${userId}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in delete-admin-user function:", error);
    const message = error instanceof Error ? error.message : "En uventet fejl opstod";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
