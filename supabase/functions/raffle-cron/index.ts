import { createClient } from "https://esm.sh/@supabase/supabase-js@2.87.1";

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase.rpc("ensure_active_raffle");

    if (error) {
      console.error("ensure_active_raffle error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    console.log("Raffle cron result:", data);
    return new Response(JSON.stringify({ ok: true, result: data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Raffle cron error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
