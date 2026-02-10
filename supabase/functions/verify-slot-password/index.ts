import { createClient } from "npm:@supabase/supabase-js@2";

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
    const { password, gameId } = await req.json();

    if (!password || typeof password !== "string") {
      return new Response(
        JSON.stringify({ error: "Password is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validGameIds = ["book-of-fedesvin", "rise-of-fedesvin"];
    const safeGameId = validGameIds.includes(gameId) ? gameId : "book-of-fedesvin";

    const passwordKeyMap: Record<string, string> = {
      "book-of-fedesvin": "slot_page_password",
      "rise-of-fedesvin": "rise_of_fedesvin_password",
    };

    const passwordKey = passwordKeyMap[safeGameId];

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", passwordKey)
      .maybeSingle();

    if (error) {
      console.error("Error fetching password setting:", error);
      return new Response(
        JSON.stringify({ error: "Server error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const storedPassword = data?.value;
    if (!storedPassword) {
      return new Response(
        JSON.stringify({ valid: false, error: "Password not configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const isValid = password.length === storedPassword.length &&
      crypto.subtle.timingSafeEqual
        ? await (async () => {
            const encoder = new TextEncoder();
            const a = encoder.encode(password.padEnd(256));
            const b = encoder.encode(storedPassword.padEnd(256));
            return crypto.subtle.timingSafeEqual(a, b);
          })()
        : password === storedPassword;

    return new Response(
      JSON.stringify({ valid: isValid }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in verify-slot-password:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
