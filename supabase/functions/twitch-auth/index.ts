import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, redirect_uri, state, link_to_user_id } = await req.json();

    if (!code) {
      return json({ error: "Authorization code is required" });
    }

    const clientId = Deno.env.get("TWITCH_CLIENT_ID");
    const clientSecret = Deno.env.get("TWITCH_CLIENT_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!clientId || !clientSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error("Missing credentials");
      return json({ error: "Server configuration error" });
    }

    console.log("Exchanging code for token...");
    console.log("Link mode:", link_to_user_id ? `linking to user ${link_to_user_id}` : "normal login");

    // Exchange code for access token
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
      return json({ error: "Failed to exchange authorization code" });
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
      return json({ error: "Failed to fetch user information" });
    }

    const userData = await userResponse.json();
    const twitchUser: TwitchUser = userData.data[0];
    console.log("Fetched Twitch user:", twitchUser.login);

    // Create Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // LINKING MODE: If link_to_user_id is provided, just update the profile
    if (link_to_user_id) {
      console.log("Linking Twitch to existing user:", link_to_user_id);

      const { data: existingTwitchProfile } = await supabaseAdmin
        .from("profiles")
        .select("user_id")
        .eq("twitch_id", twitchUser.id)
        .maybeSingle();

      if (existingTwitchProfile && existingTwitchProfile.user_id !== link_to_user_id) {
        return json({ error: "Denne Twitch-konto er allerede tilknyttet en anden bruger" });
      }

      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          user_id: link_to_user_id,
          twitch_id: twitchUser.id,
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
          twitch_access_token: tokenData.access_token,
          twitch_refresh_token: tokenData.refresh_token,
        }, { onConflict: "user_id" });

      if (profileError) {
        console.error("Profile update error:", profileError);
        return json({ error: "Failed to link Twitch account" });
      }

      console.log("Successfully linked Twitch to user:", link_to_user_id);
      return json({
        success: true,
        linked: true,
        user: {
          id: link_to_user_id,
          twitch_id: twitchUser.id,
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
        },
      });
    }

    // NORMAL LOGIN MODE: Check if user already exists by looking up profile with twitch_id
    const { data: existingProfileByTwitch } = await supabaseAdmin
      .from("profiles")
      .select("user_id")
      .eq("twitch_id", twitchUser.id)
      .maybeSingle();

    let userId: string;
    let isNewUser = false;
    const email = twitchUser.email || `${twitchUser.id}@twitch.placeholder`;

    if (existingProfileByTwitch) {
      userId = existingProfileByTwitch.user_id;
      console.log("Found existing user by Twitch ID:", userId);

      await supabaseAdmin
        .from("profiles")
        .update({
          twitch_username: twitchUser.login,
          display_name: twitchUser.display_name,
          avatar_url: twitchUser.profile_image_url,
          twitch_access_token: tokenData.access_token,
          twitch_refresh_token: tokenData.refresh_token,
        })
        .eq("user_id", userId);
    } else {
      // No profile with this Twitch ID - check if user exists by email
      // Use the DB function instead of listUsers() to avoid the 1000 user limit
      const { data: existingUserId } = await supabaseAdmin
        .rpc("get_user_id_by_email", { lookup_email: email });

      if (existingUserId) {
        // User exists by email - link Twitch to this existing user
        userId = existingUserId;
        console.log("Found existing user by email (linking Twitch):", userId, email);

        const { data: existingUserProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        if (existingUserProfile) {
          const { error: updateError } = await supabaseAdmin
            .from("profiles")
            .update({
              twitch_id: twitchUser.id,
              twitch_username: twitchUser.login,
              display_name: twitchUser.display_name,
              avatar_url: twitchUser.profile_image_url,
              twitch_access_token: tokenData.access_token,
              twitch_refresh_token: tokenData.refresh_token,
            })
            .eq("user_id", userId);

          if (updateError) {
            console.error("Profile update error:", updateError);
          } else {
            console.log("Updated existing profile with Twitch data for user:", userId);
          }
        } else {
          const { error: insertError } = await supabaseAdmin
            .from("profiles")
            .insert({
              user_id: userId,
              twitch_id: twitchUser.id,
              twitch_username: twitchUser.login,
              display_name: twitchUser.display_name,
              avatar_url: twitchUser.profile_image_url,
              twitch_access_token: tokenData.access_token,
              twitch_refresh_token: tokenData.refresh_token,
            });

          if (insertError) {
            console.error("Profile insert error:", insertError);
          } else {
            console.log("Created profile for existing user:", userId);
          }
        }
      } else {
        // Completely new user - create auth user and profile
        isNewUser = true;
        console.log("Creating new user with email:", email);

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
          console.error("Create user error:", createError);
          return json({ error: "Failed to create user account" });
        }

        userId = newUser.user.id;
        console.log("Created new user:", userId);

        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .insert({
            user_id: userId,
            twitch_id: twitchUser.id,
            twitch_username: twitchUser.login,
            display_name: twitchUser.display_name,
            avatar_url: twitchUser.profile_image_url,
            twitch_access_token: tokenData.access_token,
            twitch_refresh_token: tokenData.refresh_token,
          });

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }
      }
    }

    // Generate a magic link for the user to establish a session
    const { data: authUser, error: authUserError } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (authUserError || !authUser?.user?.email) {
      console.error("Failed to fetch auth user for magic link:", authUserError);
      return json({ error: "Failed to generate session" });
    }

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: authUser.user.email,
    });

    if (linkError) {
      console.error("Generate link error:", linkError);
      return json({ error: "Failed to generate session" });
    }

    const actionLink = linkData.properties.action_link;
    console.log("Login successful for:", twitchUser.login);

    return json({
      success: true,
      action_link: actionLink,
      user: {
        id: userId,
        twitch_id: twitchUser.id,
        twitch_username: twitchUser.login,
        display_name: twitchUser.display_name,
        avatar_url: twitchUser.profile_image_url,
      },
      is_new_user: isNewUser,
    });
  } catch (error: unknown) {
    console.error("Error in twitch-auth function:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return json({ error: message });
  }
});
