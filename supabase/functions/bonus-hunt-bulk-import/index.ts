import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
const STREAMER_ID = "959262659";
const BLOCKED_HUNTS = new Set([6, 7]);

const TITLE_CASE_LOWER = new Set(['of', 'and', 'the', 'in', 'at', 'by', 'to', 'for', 'or', 'on', 'a', 'an']);
const ROMAN_NUMERALS = new Set(['ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii']);

function toTitleCase(str: string): string {
  return str.split(' ').map((word, i) => {
    const lower = word.toLowerCase();
    if (ROMAN_NUMERALS.has(lower)) return word.toUpperCase();
    if (i > 0 && TITLE_CASE_LOWER.has(lower)) return lower;
    if (word.includes("'")) {
      return word.split("'").map((part, j) => j === 0 ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part).join("'");
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Parse optional range from request body
    let startHunt = 1;
    let endHunt = 250;
    try {
      const body = await req.json();
      if (body.start) startHunt = body.start;
      if (body.end) endHunt = body.end;
    } catch (_) {}

    // Get existing hunt numbers to know which are new
    const { data: existingHunts } = await supabase
      .from("bonus_hunt_archives")
      .select("hunt_number");
    const existingSet = new Set((existingHunts || []).map((h: any) => h.hunt_number));

    // Fetch provider overrides once
    const { data: overrides } = await supabase
      .from('bonus_hunt_provider_overrides')
      .select('slot_name, provider_override');
    const overrideMap = new Map(
      (overrides || []).map((o: any) => [o.slot_name, o.provider_override])
    );

    const results: { hunt: number; status: string; slots?: number }[] = [];
    let imported = 0;
    let skipped = 0;
    let failed = 0;

    // Process in batches of 5 concurrent requests to avoid overwhelming the API
    for (let batchStart = startHunt; batchStart <= endHunt; batchStart += 5) {
      const batchEnd = Math.min(batchStart + 4, endHunt);
      const promises = [];

      for (let huntNum = batchStart; huntNum <= batchEnd; huntNum++) {
        if (BLOCKED_HUNTS.has(huntNum)) {
          results.push({ hunt: huntNum, status: 'blocked' });
          skipped++;
          continue;
        }

        promises.push(
          (async () => {
            try {
              const apiUrl = `${STREAMSYSTEM_BASE}/${STREAMER_ID}?visibleId=${huntNum}`;
              const response = await fetch(apiUrl, {
                headers: { 'Accept': 'application/json' },
              });

              if (!response.ok) {
                results.push({ hunt: huntNum, status: `api_error_${response.status}` });
                failed++;
                return;
              }

              const data = await response.json();
              const huntData = data?.data;

              if (!huntData?.name) {
                results.push({ hunt: huntNum, status: 'no_data' });
                skipped++;
                return;
              }

              const stats = huntData.statistics || {};
              const totalSlots = stats.numberOfSlots || 0;

              // Skip hunts with no slots (empty/test hunts)
              if (totalSlots === 0) {
                results.push({ hunt: huntNum, status: 'empty' });
                skipped++;
                return;
              }

              const isNewHunt = !existingSet.has(huntNum);

              // Upsert the archive
              const { error: archiveError } = await supabase
                .from("bonus_hunt_archives")
                .upsert({
                  hunt_number: huntNum,
                  api_data: data,
                  hunt_name: huntData.name,
                  hunt_status: huntData.played ? 'completed' : 'active',
                  total_slots: totalSlots,
                  opened_slots: stats.openedSlots || 0,
                  start_balance: huntData.start || 0,
                  end_balance: huntData.end || null,
                  average_x: stats.runAverage ? parseFloat(stats.runAverage) : null,
                }, { onConflict: 'hunt_number' });

              if (archiveError) {
                console.error(`Hunt ${huntNum} archive error:`, archiveError);
                results.push({ hunt: huntNum, status: 'archive_error' });
                failed++;
                return;
              }

              // Sync slot catalog
              const slots = huntData.slots;
              const slotNames: string[] = [];
              if (Array.isArray(slots)) {
                for (const entry of slots) {
                  const slotInfo = entry.slot || {};
                  const slotName = toTitleCase(slotInfo.name || '');
                  if (!slotName) continue;

                  const rawProvider = slotInfo.provider || 'Unknown';
                  const provider = overrideMap.get(slotName) || rawProvider;
                  const rtp = slotInfo.rtp && slotInfo.rtp > 0 ? slotInfo.rtp : null;
                  const win = entry.played ? (entry.win || 0) : 0;
                  const bet = entry.bet || 1;
                  const multiplier = win > 0 && bet > 0 ? Math.round((win / bet) * 100) / 100 : 0;

                  await supabase.rpc('upsert_slot_catalog', {
                    p_slot_name: slotName,
                    p_provider: provider,
                    p_rtp: rtp,
                    p_win: win,
                    p_multiplier: multiplier,
                  });

                  slotNames.push(slotName);
                }

                // Increment bonus_count for new hunts
                if (isNewHunt && slotNames.length > 0) {
                  const uniqueNames = [...new Set(slotNames)];
                  await supabase.rpc('increment_slot_bonus_counts', { p_slot_names: uniqueNames });
                }
              }

              existingSet.add(huntNum); // Mark as existing for subsequent checks
              imported++;
              results.push({ hunt: huntNum, status: 'ok', slots: slotNames.length });
            } catch (e) {
              console.error(`Hunt ${huntNum} error:`, e);
              results.push({ hunt: huntNum, status: 'error' });
              failed++;
            }
          })()
        );
      }

      await Promise.all(promises);

      // Small delay between batches to be polite to the API
      if (batchStart + 5 <= endHunt) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // After import, trigger enrichment
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      await fetch(`${supabaseUrl}/functions/v1/slot-catalog-enrich`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
    } catch (e) {
      console.error('Enrich trigger error:', e);
    }

    return new Response(
      JSON.stringify({
        summary: { imported, skipped, failed, total: imported + skipped + failed },
        results: results.sort((a, b) => a.hunt - b.hunt),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
