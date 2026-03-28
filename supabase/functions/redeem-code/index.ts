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
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Ikke autoriseret" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Ikke autoriseret" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return new Response(JSON.stringify({ error: "Angiv venligst en kode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: max 5 redemption attempts per minute
    const { count: recentCount } = await adminClient
      .from("redeem_code_uses")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("redeemed_at", new Date(Date.now() - 60_000).toISOString());

    if ((recentCount ?? 0) >= 5) {
      return new Response(JSON.stringify({ error: "For mange forsøg. Vent venligst et minut." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the code
    const { data: codeData, error: codeError } = await adminClient
      .from("redeem_codes")
      .select("*")
      .eq("code", code.trim().toUpperCase())
      .maybeSingle();

    if (codeError || !codeData) {
      return new Response(JSON.stringify({ error: "Ugyldig kode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!codeData.is_active) {
      return new Response(JSON.stringify({ error: "Denne kode er ikke længere aktiv" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (codeData.expires_at && new Date(codeData.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Denne kode er udløbet" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (codeData.max_uses && codeData.times_used >= codeData.max_uses) {
      return new Response(JSON.stringify({ error: "Denne kode er brugt op" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user already used this code
    const { data: existingUse } = await adminClient
      .from("redeem_code_uses")
      .select("id")
      .eq("code_id", codeData.id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingUse) {
      return new Response(JSON.stringify({ error: "Du har allerede brugt denne kode" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // For single_user codes, check if anyone has used it
    if (codeData.usage_type === "single_user" && codeData.times_used > 0) {
      return new Response(JSON.stringify({ error: "Denne kode er allerede blevet brugt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record the use
    const { error: useError } = await adminClient
      .from("redeem_code_uses")
      .insert({
        code_id: codeData.id,
        user_id: user.id,
        credits_awarded: codeData.credits_amount,
      });

    if (useError) {
      if (useError.code === "23505") {
        return new Response(JSON.stringify({ error: "Du har allerede brugt denne kode" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw useError;
    }

    // Atomically increment times_used
    const { error: incrementError } = await adminClient.rpc('increment_redeem_code_uses', {
      code_id_input: codeData.id,
    });
    if (incrementError) throw incrementError;

    // Add credits to user's slot_spins for today
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Copenhagen" });

    const { data: existingSpins } = await adminClient
      .from("slot_spins")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle();

    if (existingSpins) {
      const newBalance = existingSpins.spins_remaining + codeData.credits_amount;
      await adminClient
        .from("slot_spins")
        .update({ spins_remaining: newBalance })
        .eq("id", existingSpins.id);
    } else {
      await adminClient
        .from("slot_spins")
        .insert({
          user_id: user.id,
          date: today,
          spins_remaining: codeData.credits_amount,
        });
    }

    // Create a notification for the user
    const { data: notif } = await adminClient
      .from("notifications")
      .insert({
        title: "Kode indløst! 🎉",
        message: `Du har indløst koden "${code}" og modtaget ${codeData.credits_amount} credits.`,
        target_user_id: user.id,
      })
      .select("id")
      .single();

    if (notif) {
      await adminClient.from("user_notifications").insert({
        user_id: user.id,
        notification_id: notif.id,
        is_read: false,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        credits_awarded: codeData.credits_amount,
        message: `Du har modtaget ${codeData.credits_amount} credits!`,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Redeem code error:", error);
    return new Response(JSON.stringify({ error: "Der opstod en fejl. Prøv igen." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
