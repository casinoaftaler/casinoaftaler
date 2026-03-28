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
    console.log(`Request from user: ${requesterUserId}`);

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
        JSON.stringify({ error: "Kun administratorer kan oprette admin brugere" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get request body
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email og adgangskode er påkrævet" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Ugyldig email adresse" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Adgangskode skal være mindst 6 tegn" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Creating/promoting admin user: ${email}`);

    let userId: string;
    let userEmail: string;

    // Try to create the user first
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      // If user already exists, look them up via database function and assign admin role
      if (createError.message?.includes("already been registered") || (createError as any)?.code === "email_exists") {
        console.log(`User ${email} already exists, looking up via admin API...`);

        // Use admin listUsers to find the existing user by email
        const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 1,
        });

        let foundUserId: string | null = null;
        if (!listError && listData?.users) {
          // listUsers doesn't filter by email, so use getUserByEmail approach
          // Actually, let's just query auth.users via the RPC
          const { data: rpcResult, error: rpcError } = await supabaseAdmin
            .rpc("get_user_id_by_email", { lookup_email: email });

          console.log(`RPC result:`, JSON.stringify(rpcResult), `error:`, JSON.stringify(rpcError));
          
          // The RPC returns a UUID directly as a scalar
          if (rpcResult && !rpcError) {
            foundUserId = typeof rpcResult === 'string' ? rpcResult : null;
          }
        }

        if (!foundUserId) {
          // Fallback: try to get user by updating their password (which requires knowing the user exists)
          // Use a direct approach - search all users
          const { data: allUsers } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
          const matchedUser = allUsers?.users?.find(u => u.email?.toLowerCase() === email.toLowerCase());
          if (matchedUser) {
            foundUserId = matchedUser.id;
          }
        }

        if (!foundUserId) {
          console.error("Could not find existing user with email:", email);
          return new Response(
            JSON.stringify({ error: "Kunne ikke finde eksisterende bruger. Prøv med den email, brugeren er registreret med." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        userId = foundUserId;
        userEmail = email;
        console.log(`Found existing user: ${userId}`);
      } else {
        console.error("Error creating user:", createError);
        return new Response(
          JSON.stringify({ error: createError.message }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else if (!newUser.user) {
      return new Response(
        JSON.stringify({ error: "Kunne ikke oprette bruger" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      userId = newUser.user.id;
      userEmail = newUser.user.email || email;
      console.log(`User created: ${userId}`);
    }

    // Check if user already has admin role
    const { data: existingRole } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (existingRole) {
      console.log(`User ${userId} is already an admin`);
      return new Response(
        JSON.stringify({ success: true, userId, email: userEmail, message: "Bruger er allerede admin" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Assign admin role
    const { error: roleInsertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (roleInsertError) {
      console.error("Error assigning admin role:", roleInsertError);
      return new Response(
        JSON.stringify({ error: "Kunne ikke tildele admin rolle" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Admin role assigned to user: ${userId}`);

    return new Response(
      JSON.stringify({ success: true, userId, email: userEmail }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in create-admin-user function:", error);
    const message = error instanceof Error ? error.message : "En uventet fejl opstod";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
