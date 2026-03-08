import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
const STREAMER_ID = "959262659";

const TITLE_CASE_LOWER = new Set(['of', 'and', 'the', 'in', 'at', 'by', 'to', 'for', 'or', 'on', 'a', 'an']);
const ROMAN_NUMERALS = new Set(['ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii']);

function smartTitleCase(name: string): string {
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((word, i) => {
      if (ROMAN_NUMERALS.has(word)) return word.toUpperCase();
      if (i > 0 && TITLE_CASE_LOWER.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Fetch all hunts from StreamSystem
    const allRes = await fetch(`${STREAMSYSTEM_BASE}/all/${STREAMER_ID}`, {
      headers: { Accept: 'application/json' },
    });
    if (!allRes.ok) throw new Error(`Failed to fetch all hunts: ${allRes.status}`);
    const allData = await allRes.json();
    const allHunts = allData.data || [];

    // Sort by createdAt ascending (oldest first)
    allHunts.sort((a: any, b: any) => a.createdAt - b.createdAt);

    console.log(`Found ${allHunts.length} hunts total`);

    // Step 2: Fetch each hunt's detailed data and filter out empty ones
    const validHunts: Array<{ summary: any; detail: any }> = [];

    for (const hunt of allHunts) {
      try {
        const detailRes = await fetch(`${STREAMSYSTEM_BASE}/${hunt.id}`, {
          headers: { Accept: 'application/json' },
        });
        if (!detailRes.ok) {
          console.log(`Skipping ${hunt.id} (${hunt.name}): HTTP ${detailRes.status}`);
          continue;
        }
        const detailData = await detailRes.json();
        const huntDetail = detailData.data || detailData;
        const slots = huntDetail.slots || [];

        if (slots.length === 0) {
          console.log(`Skipping ${hunt.id} (${hunt.name}): no slots`);
          continue;
        }

        console.log(`Valid: ${hunt.id} (${hunt.name}) - ${slots.length} slots`);
        validHunts.push({ summary: hunt, detail: huntDetail });
      } catch (e) {
        console.error(`Error fetching ${hunt.id}:`, e);
      }
    }

    console.log(`${validHunts.length} valid hunts with slots`);

    // Step 3: Clear existing archives
    const { error: deleteError } = await supabase
      .from('bonus_hunt_archives')
      .delete()
      .gte('hunt_number', 1);

    if (deleteError) {
      console.error('Delete error:', deleteError);
    }

    // Step 4: Insert each valid hunt with sequential numbering
    const results: Array<{ huntNumber: number; name: string; id: string; slots: number; casino: string }> = [];
    const allSlotNames: string[] = [];

    for (let i = 0; i < validHunts.length; i++) {
      const huntNumber = i + 1;
      const { summary, detail } = validHunts[i];
      const slots = detail.slots || [];
      const openedSlots = slots.filter((s: any) => s.played);

      // Calculate stats
      const totalBets = slots.reduce((sum: number, s: any) => sum + (s.bet || 0), 0);
      const openedWithWins = openedSlots.filter((s: any) => {
        const bet = s.bet || 0;
        const win = s.win || 0;
        return bet > 0 && win > 0;
      });
      const avgX = openedWithWins.length > 0
        ? openedWithWins.reduce((sum: number, s: any) => sum + ((s.win || 0) / (s.bet || 1)), 0) / openedWithWins.length
        : null;

      const startBalance = detail.start || totalBets;
      const endBalance = detail.end || null;

      // Determine hunt status
      const allOpened = slots.length > 0 && openedSlots.length === slots.length;
      const huntStatus = allOpened ? 'completed' : (summary.started ? 'active' : 'upcoming');

      // Build api_data in same format as existing archives
      const apiData = {
        id: summary.id,
        name: summary.name,
        casino: summary.casino,
        createdAt: summary.createdAt,
        start: startBalance,
        end: endBalance,
        played: summary.played,
        started: summary.started,
        currency: summary.currency,
        slots: slots.map((s: any) => ({
          slot: {
            name: s.slot?.name || 'Unknown',
            provider: s.slot?.provider || 'Custom Slot',
            id: s.slot?.id || s.id,
          },
          bet: s.bet || 0,
          win: s.win || 0,
          played: s.played ?? false,
          note: s.note || '',
          balance: s.balance || 0,
        })),
        statistics: detail.statistics || null,
      };

      const { error: insertError } = await supabase
        .from('bonus_hunt_archives')
        .insert({
          hunt_number: huntNumber,
          hunt_name: summary.name,
          hunt_status: huntStatus,
          start_balance: startBalance,
          end_balance: endBalance && endBalance > 0 ? endBalance : null,
          average_x: avgX ? Math.round(avgX * 100) / 100 : null,
          total_slots: slots.length,
          opened_slots: openedSlots.length,
          api_data: apiData,
        });

      if (insertError) {
        console.error(`Failed to insert hunt #${huntNumber}:`, insertError);
        continue;
      }

      // Sync slots to catalog
      for (const slot of slots) {
        const slotName = slot.slot?.name || 'Unknown';
        const provider = slot.slot?.provider || 'Custom Slot';
        if (slotName === 'Unknown') continue;

        const titleCaseName = smartTitleCase(slotName);
        const bet = slot.bet || 0;
        const win = slot.win || 0;
        const multiplier = bet > 0 && slot.played ? win / bet : 0;

        allSlotNames.push(titleCaseName);

        const { error: catalogError } = await supabase.rpc('upsert_slot_catalog', {
          p_slot_name: titleCaseName,
          p_provider: provider === 'Custom Slot' ? 'Unknown' : provider,
          p_win: win,
          p_multiplier: multiplier,
        });

        if (catalogError) {
          console.error(`Catalog upsert failed for ${titleCaseName}:`, catalogError);
        }
      }

      results.push({
        huntNumber,
        name: summary.name,
        id: summary.id,
        slots: slots.length,
        casino: summary.casino,
      });
    }

    // Step 5: Increment bonus counts for all slots
    if (allSlotNames.length > 0) {
      const uniqueSlots = [...new Set(allSlotNames)];
      // bonus_count is already incremented by upsert_slot_catalog (sets 1 on insert)
      // For existing slots that appeared in multiple hunts, we need to increment
      console.log(`Processed ${uniqueSlots.length} unique slots across all hunts`);
    }

    const response = {
      success: true,
      totalApiHunts: allHunts.length,
      validHunts: validHunts.length,
      imported: results.length,
      mapping: results,
    };

    console.log('Import complete:', JSON.stringify(response, null, 2));

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Import failed:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
