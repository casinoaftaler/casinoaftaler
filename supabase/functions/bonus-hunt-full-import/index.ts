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

function buildArchiveRow(huntNumber: number, summary: any, detail: any) {
  const slots = detail.slots || [];
  const openedSlots = slots.filter((s: any) => s.played);

  const totalBets = slots.reduce((sum: number, s: any) => sum + (s.bet || 0), 0);
  const openedWithWins = openedSlots.filter((s: any) => (s.bet || 0) > 0 && (s.win || 0) > 0);
  const avgX = openedWithWins.length > 0
    ? openedWithWins.reduce((sum: number, s: any) => sum + ((s.win || 0) / (s.bet || 1)), 0) / openedWithWins.length
    : null;

  const startBalance = detail.start || totalBets;
  const totalWins = openedSlots.reduce((sum: number, s: any) => sum + (s.win || 0), 0);
  const endBalance = (detail.end && detail.end > 0) ? detail.end : (totalWins > 0 ? totalWins : null);
  const allOpened = slots.length > 0 && openedSlots.length === slots.length;
  const huntStatus = allOpened ? 'completed' : (summary.started ? 'active' : 'upcoming');

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
      slot: { name: s.slot?.name || 'Unknown', provider: s.slot?.provider || 'Custom Slot', id: s.slot?.id || s.id },
      bet: s.bet || 0, win: s.win || 0, played: s.played ?? false,
      note: s.note || '', balance: s.balance || 0,
    })),
    statistics: detail.statistics || null,
  };

  return {
    hunt_number: huntNumber,
    hunt_name: summary.name,
    hunt_status: huntStatus,
    start_balance: startBalance,
    end_balance: endBalance && endBalance > 0 ? endBalance : null,
    average_x: avgX ? Math.round(avgX * 100) / 100 : null,
    total_slots: slots.length,
    opened_slots: openedSlots.length,
    api_data: apiData,
    casino_name: summary.casino || null,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check for single-hunt import mode
    let body: any = {};
    try { body = await req.json(); } catch {}

    const singleHuntId = body.singleHuntId as string | undefined;
    const singleHuntNumber = body.huntNumber as number | undefined;

    // ── Single-hunt import mode ──
    if (singleHuntId && singleHuntNumber) {
      console.log(`Single import: ${singleHuntId} as hunt #${singleHuntNumber}`);

      const detailRes = await fetch(`${STREAMSYSTEM_BASE}/${singleHuntId}`, {
        headers: { Accept: 'application/json' },
      });
      if (!detailRes.ok) throw new Error(`Failed to fetch hunt ${singleHuntId}: ${detailRes.status}`);
      const detailData = await detailRes.json();
      const huntDetail = detailData.data || detailData;
      const slots = huntDetail.slots || [];
      if (slots.length === 0) throw new Error(`Hunt ${singleHuntId} has no slots`);

      // Build summary from detail
      const summary = {
        id: singleHuntId,
        name: huntDetail.name || `Hunt #${singleHuntNumber}`,
        casino: huntDetail.casino || null,
        createdAt: huntDetail.createdAt,
        played: huntDetail.played,
        started: huntDetail.started,
        currency: huntDetail.currency,
      };

      const row = buildArchiveRow(singleHuntNumber, summary, huntDetail);

      // Shift existing hunts at or after this position up by 1
      // Fetch all hunts at or after the target position, ordered descending to avoid conflicts
      const { data: existingHunts } = await supabase
        .from('bonus_hunt_archives')
        .select('id, hunt_number')
        .gte('hunt_number', singleHuntNumber)
        .order('hunt_number', { ascending: false });

      if (existingHunts && existingHunts.length > 0) {
        for (const hunt of existingHunts) {
          await supabase
            .from('bonus_hunt_archives')
            .update({ hunt_number: hunt.hunt_number + 1 })
            .eq('id', hunt.id);
        }
      }

      const { error: insertError } = await supabase.from('bonus_hunt_archives').insert(row);
      if (insertError) throw insertError;

      // Sync slots to catalog
      for (const slot of slots) {
        const slotName = slot.slot?.name || 'Unknown';
        const provider = slot.slot?.provider || 'Custom Slot';
        if (slotName === 'Unknown') continue;
        const titleCaseName = smartTitleCase(slotName);
        const bet = slot.bet || 0;
        const win = slot.win || 0;
        const multiplier = bet > 0 && slot.played ? win / bet : 0;

        await supabase.rpc('upsert_slot_catalog', {
          p_slot_name: titleCaseName,
          p_provider: provider === 'Custom Slot' ? 'Unknown' : provider,
          p_win: win,
          p_multiplier: multiplier,
        });
      }

      return new Response(JSON.stringify({
        success: true,
        mode: 'single',
        huntNumber: singleHuntNumber,
        huntId: singleHuntId,
        slots: slots.length,
        name: summary.name,
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ── Full import mode (existing logic) ──
    const allRes = await fetch(`${STREAMSYSTEM_BASE}/all/${STREAMER_ID}`, {
      headers: { Accept: 'application/json' },
    });
    if (!allRes.ok) throw new Error(`Failed to fetch all hunts: ${allRes.status}`);
    const allData = await allRes.json();
    const allHunts = allData.data || [];
    allHunts.sort((a: any, b: any) => a.createdAt - b.createdAt);
    console.log(`Found ${allHunts.length} hunts total`);

    const validHunts: Array<{ summary: any; detail: any }> = [];
    for (const hunt of allHunts) {
      try {
        const detailRes = await fetch(`${STREAMSYSTEM_BASE}/${hunt.id}`, {
          headers: { Accept: 'application/json' },
        });
        if (!detailRes.ok) { console.log(`Skipping ${hunt.id}: HTTP ${detailRes.status}`); continue; }
        const detailData = await detailRes.json();
        const huntDetail = detailData.data || detailData;
        if ((huntDetail.slots || []).length === 0) { console.log(`Skipping ${hunt.id}: no slots`); continue; }
        validHunts.push({ summary: hunt, detail: huntDetail });
      } catch (e) { console.error(`Error fetching ${hunt.id}:`, e); }
    }

    console.log(`${validHunts.length} valid hunts with slots`);

    const { error: deleteError } = await supabase.from('bonus_hunt_archives').delete().gte('hunt_number', 1);
    if (deleteError) console.error('Delete error:', deleteError);

    const results: Array<{ huntNumber: number; name: string; id: string; slots: number; casino: string }> = [];

    for (let i = 0; i < validHunts.length; i++) {
      const huntNumber = i + 1;
      const { summary, detail } = validHunts[i];
      const row = buildArchiveRow(huntNumber, summary, detail);

      const { error: insertError } = await supabase.from('bonus_hunt_archives').insert(row);
      if (insertError) { console.error(`Failed to insert hunt #${huntNumber}:`, insertError); continue; }

      for (const slot of (detail.slots || [])) {
        const slotName = slot.slot?.name || 'Unknown';
        const provider = slot.slot?.provider || 'Custom Slot';
        if (slotName === 'Unknown') continue;
        const titleCaseName = smartTitleCase(slotName);
        const bet = slot.bet || 0;
        const win = slot.win || 0;
        const multiplier = bet > 0 && slot.played ? win / bet : 0;

        await supabase.rpc('upsert_slot_catalog', {
          p_slot_name: titleCaseName,
          p_provider: provider === 'Custom Slot' ? 'Unknown' : provider,
          p_win: win,
          p_multiplier: multiplier,
        });
      }

      results.push({ huntNumber, name: summary.name, id: summary.id, slots: (detail.slots || []).length, casino: summary.casino });
    }

    return new Response(JSON.stringify({
      success: true, mode: 'full',
      totalApiHunts: allHunts.length, validHunts: validHunts.length, imported: results.length, mapping: results,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Import failed:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
