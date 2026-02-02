import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string[];
  token_type: string;
}

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  email?: string;
  profile_image_url: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, redirect_uri, state, link_to_user_id } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: "Authorization code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientId = Deno.env.get("TWITCH_CLIENT_ID");
    const clientSecret = Deno.env.get("TWITCH_CLIENT_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!clientId || !clientSecret) {
      console.error("Missing Twitch credentials");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase credentials");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Exchanging code for token...");
    console.log("Link mode:", link_to_user_id ? `linking to user ${link_to_user_id}` : "normal login");

    // Exchange code for access token
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to exchange authorization code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tokenData: TwitchTokenResponse = await tokenResponse.json();
    console.log("Token exchange successful");

    // Fetch user info from Twitch
    const userResponse = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        "Authorization": `Bearer ${tokenData.access_token}`,
        "Client-Id": clientId,
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch user info:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch user information" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userData = await userResponse.json();
    const twitchUser: TwitchUser = userData.data[0];
    console.log("Fetched Twitch user:", twitchUser.login);

    // Create Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // LINKING MODE: If link_to_user_id is provided, just update the profile
    if (link_to_user_id) {
      console.log("Linking Twitch to existing user:", link_to_user_id);

      // Check if this Twitch account is already linked to another user
      const { data: existingTwitchProfile } = await supabaseAdmin
        .from("profiles")
        .select("user_id")
        .eq("twitch_id", twitchUser.id)
        .maybeSingle();

      if (existingTwitchProfile && existingTwitchProfile.user_id !== link_to_user_id) {
        console.error("Twitch account already linked to another user");
        return new Response(
          JSON.stringify({ error: "Denne Twitch-konto er allerede tilknyttet en anden bruger" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update or create profile for the existing user
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          user_id: link_to_user_id,
          twitch_id: twitchUser.id,
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
        }, {
          onConflict: "user_id",
        });

      if (profileError) {
        console.error("Profile update error:", profileError);
        return new Response(
          JSON.stringify({ error: "Failed to link Twitch account" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Successfully linked Twitch to user:", link_to_user_id);

      return new Response(
        JSON.stringify({
          success: true,
          linked: true,
          user: {
            id: link_to_user_id,
            twitch_id: twitchUser.id,
            twitch_username: twitchUser.login,
            display_name: twitchUser.display_name,
            avatar_url: twitchUser.profile_image_url,
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // NORMAL LOGIN MODE: Check if user already exists by looking up profile with twitch_id
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("user_id")
      .eq("twitch_id", twitchUser.id)
      .maybeSingle();

    let userId: string;
    let isNewUser = false;

    if (existingProfile) {
      // User exists, get their ID
      userId = existingProfile.user_id;
      console.log("Found existing user:", userId);

      // Update their profile with latest Twitch data
      await supabaseAdmin
        .from("profiles")
        .update({
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
        })
        .eq("user_id", userId);
    } else {
      // Create new user
      isNewUser = true;
      const email = twitchUser.email || `${twitchUser.id}@twitch.placeholder`;
      
      // Try to create user with Twitch email or placeholder
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        email_confirm: true,
        user_metadata: {
          twitch_id: twitchUser.id,
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
        },
      });

      if (createError) {
        // If email already exists, try to find by email
        if (createError.message.includes("already been registered")) {
          const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
          const existingUser = existingUsers?.users.find(u => u.email === email);
          
          if (existingUser) {
            userId = existingUser.id;
            console.log("Found existing user by email:", userId);
          } else {
            console.error("Create user error:", createError);
            return new Response(
              JSON.stringify({ error: "Failed to create user account" }),
              { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        } else {
          console.error("Create user error:", createError);
          return new Response(
            JSON.stringify({ error: "Failed to create user account" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } else {
        userId = newUser.user.id;
        console.log("Created new user:", userId);
      }

      // Create profile for new user
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          user_id: userId,
          twitch_id: twitchUser.id,
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
        }, {
          onConflict: "user_id",
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Non-fatal, continue with login
      }
    }

    // Generate a session for the user using a magic link token approach
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: twitchUser.email || `${twitchUser.id}@twitch.placeholder`,
    });

    if (linkError) {
      console.error("Generate link error:", linkError);
      return new Response(
        JSON.stringify({ error: "Failed to generate session" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract token from the magic link
    const magicLinkUrl = new URL(linkData.properties.action_link);
    const token = magicLinkUrl.searchParams.get("token");
    const tokenHash = linkData.properties.hashed_token;

    console.log("Login successful for:", twitchUser.login);

    return new Response(
      JSON.stringify({
        success: true,
        token_hash: tokenHash,
        email: twitchUser.email || `${twitchUser.id}@twitch.placeholder`,
        user: {
          id: userId,
          twitch_id: twitchUser.id,
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
        },
        is_new_user: isNewUser,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in twitch-auth function:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
