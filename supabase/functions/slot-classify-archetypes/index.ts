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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Use pg REST API with raw SQL via database function approach
    // Since we can't run raw SQL, we batch updates with range pagination

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // First, reset all archetypes to null so we get a clean classification
    await batchUpdate(supabase, "slot_catalog", { content_archetype: null }, {});

    // 1. Stats-heavy: rtp IS NOT NULL AND bonus_count >= 3 AND (highest_x > 0 OR highest_win > 0)
    await batchUpdate(supabase, "slot_catalog", { content_archetype: "stats-heavy" }, {
      filters: (q: any) => q.not("rtp", "is", null).gte("bonus_count", 3).or("highest_x.gt.0,highest_win.gt.0")
    });

    // 2. Community-driven: bonus_count >= 1 AND wins, not already classified
    await batchUpdate(supabase, "slot_catalog", { content_archetype: "community-driven" }, {
      filters: (q: any) => q.is("content_archetype", null).gte("bonus_count", 1).or("highest_x.gt.0,highest_win.gt.0")
    });

    // 3. Comparison: has RTP, not already classified
    await batchUpdate(supabase, "slot_catalog", { content_archetype: "comparison" }, {
      filters: (q: any) => q.is("content_archetype", null).not("rtp", "is", null)
    });

    // 4. Minimal: everything else
    await batchUpdate(supabase, "slot_catalog", { content_archetype: "minimal" }, {
      filters: (q: any) => q.is("content_archetype", null)
    });

    // Fetch distribution using paginated select
    const allRows = await fetchAll(supabase, "slot_catalog", "content_archetype");
    const counts: Record<string, number> = {};
    allRows.forEach((row: any) => {
      const arch = row.content_archetype || "unknown";
      counts[arch] = (counts[arch] || 0) + 1;
    });

    return new Response(
      JSON.stringify({ success: true, distribution: counts, total: allRows.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Batch update to bypass 1000-row limit
async function batchUpdate(
  supabase: any,
  table: string,
  updateData: Record<string, any>,
  opts: { filters?: (q: any) => any }
) {
  const batchSize = 500;
  let totalUpdated = 0;

  while (true) {
    // First, get IDs of matching rows
    let selectQuery = supabase.from(table).select("id").limit(batchSize);
    if (opts.filters) {
      selectQuery = opts.filters(selectQuery);
    }
    const { data: ids, error: selectErr } = await selectQuery;
    if (selectErr) throw selectErr;
    if (!ids || ids.length === 0) break;

    const idList = ids.map((r: any) => r.id);
    const { error: updateErr } = await supabase
      .from(table)
      .update(updateData)
      .in("id", idList);
    if (updateErr) throw updateErr;

    totalUpdated += idList.length;
    if (ids.length < batchSize) break;
  }

  return totalUpdated;
}

// Paginated fetch to bypass 1000-row limit
async function fetchAll(supabase: any, table: string, select: string) {
  const batchSize = 1000;
  let all: any[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .range(from, from + batchSize - 1);
    if (error) throw error;
    all = all.concat(data || []);
    if (!data || data.length < batchSize) break;
    from += batchSize;
  }
  return all;
}
