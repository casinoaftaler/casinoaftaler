import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Single UPDATE with CASE statement — no AI needed
    const { data, error } = await supabase.rpc("execute_sql" as any, {} as any);
    // Can't use raw SQL via RPC, so we do batched updates per archetype

    // 1. Stats-heavy
    const { error: e1, count: c1 } = await supabase
      .from("slot_catalog")
      .update({ content_archetype: "stats-heavy" } as any)
      .not("rtp", "is", null)
      .gte("bonus_count", 3)
      .or("highest_x.gt.0,highest_win.gt.0");

    // 2. Community-driven (bonus_count 1-2 with win data, not already stats-heavy)
    const { error: e2, count: c2 } = await supabase
      .from("slot_catalog")
      .update({ content_archetype: "community-driven" } as any)
      .is("content_archetype" as any, null)
      .gte("bonus_count", 1)
      .or("highest_x.gt.0,highest_win.gt.0");

    // 3. Comparison (has RTP but no wins/hunts, not already classified)
    const { error: e3, count: c3 } = await supabase
      .from("slot_catalog")
      .update({ content_archetype: "comparison" } as any)
      .is("content_archetype" as any, null)
      .not("rtp", "is", null);

    // 4. Minimal (everything else)
    const { error: e4, count: c4 } = await supabase
      .from("slot_catalog")
      .update({ content_archetype: "minimal" } as any)
      .is("content_archetype" as any, null);

    const errors = [e1, e2, e3, e4].filter(Boolean);
    if (errors.length > 0) {
      throw new Error(errors.map((e) => e!.message).join("; "));
    }

    // Fetch distribution
    const { data: distribution } = await supabase
      .from("slot_catalog")
      .select("content_archetype")
      .not("content_archetype" as any, "is", null);

    const counts: Record<string, number> = {};
    (distribution || []).forEach((row: any) => {
      const arch = row.content_archetype || "unknown";
      counts[arch] = (counts[arch] || 0) + 1;
    });

    return new Response(
      JSON.stringify({ success: true, distribution: counts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
