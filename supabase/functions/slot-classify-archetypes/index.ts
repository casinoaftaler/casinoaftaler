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

    // Use a single RPC call with raw SQL for maximum speed
    // Step 1: Classify all in one UPDATE using CASE
    const { error: classifyError } = await supabase.rpc("classify_slot_archetypes" as any);

    if (classifyError) {
      // Fallback: do it via batched client updates if RPC doesn't exist
      await classifyViaBatches(supabase);
    }

    // Fetch distribution
    const counts = await getDistribution(supabase);

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

async function classifyViaBatches(supabase: any) {
  // Order matters: most specific first, no reset needed
  // 1. Stats-heavy
  await batchUpdate(supabase, (q: any) =>
    q.not("rtp", "is", null).gte("bonus_count", 3).or("highest_x.gt.0,highest_win.gt.0"),
    "stats-heavy"
  );
  // 2. Community-driven (not already stats-heavy)
  await batchUpdate(supabase, (q: any) =>
    q.neq("content_archetype", "stats-heavy").gte("bonus_count", 1).or("highest_x.gt.0,highest_win.gt.0"),
    "community-driven"
  );
  // 3. Comparison (not already classified as above)
  await batchUpdate(supabase, (q: any) =>
    q.not("content_archetype", "in", '("stats-heavy","community-driven")').not("rtp", "is", null),
    "comparison"
  );
  // 4. Minimal (everything not yet classified)
  await batchUpdate(supabase, (q: any) =>
    q.not("content_archetype", "in", '("stats-heavy","community-driven","comparison")'),
    "minimal"
  );
}

async function batchUpdate(supabase: any, applyFilters: (q: any) => any, archetype: string) {
  const batchSize = 500;
  while (true) {
    let q = supabase.from("slot_catalog").select("id").limit(batchSize);
    q = applyFilters(q);
    const { data: ids, error } = await q;
    if (error) throw error;
    if (!ids || ids.length === 0) break;

    const idList = ids.map((r: any) => r.id);
    const { error: ue } = await supabase
      .from("slot_catalog")
      .update({ content_archetype: archetype } as any)
      .in("id", idList);
    if (ue) throw ue;
    if (ids.length < batchSize) break;
  }
}

async function getDistribution(supabase: any) {
  const batchSize = 1000;
  const counts: Record<string, number> = {};
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("slot_catalog")
      .select("content_archetype")
      .range(from, from + batchSize - 1);
    if (error) throw error;
    (data || []).forEach((r: any) => {
      const a = r.content_archetype || "unknown";
      counts[a] = (counts[a] || 0) + 1;
    });
    if (!data || data.length < batchSize) break;
    from += batchSize;
  }
  return counts;
}
