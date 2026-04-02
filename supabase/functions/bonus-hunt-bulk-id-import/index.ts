import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";

const TITLE_CASE_LOWER = new Set(['of', 'and', 'the', 'in', 'at', 'by', 'to', 'for', 'or', 'on', 'a', 'an']);
const ROMAN_NUMERALS = new Set(['ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii']);

function smartTitleCase(name: string): string {
  return name.toLowerCase().split(/\s+/).map((word, i) => {
    if (ROMAN_NUMERALS.has(word)) return word.toUpperCase();
    if (i > 0 && TITLE_CASE_LOWER.has(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

function buildArchiveRow(huntNumber: number, huntDetail: any, apiId: string) {
  const slots = huntDetail.slots || [];
  const openedSlots = slots.filter((s: any) => s.played);
  const totalBets = slots.reduce((sum: number, s: any) => sum + (s.bet || 0), 0);
  const openedWithWins = openedSlots.filter((s: any) => (s.bet || 0) > 0 && (s.win || 0) > 0);
  const avgX = openedWithWins.length > 0
    ? openedWithWins.reduce((sum: number, s: any) => sum + ((s.win || 0) / (s.bet || 1)), 0) / openedWithWins.length
    : null;

  const startBalance = huntDetail.start || totalBets;
  const totalWins = openedSlots.reduce((sum: number, s: any) => sum + (s.win || 0), 0);
  const endBalance = (huntDetail.end && huntDetail.end > 0) ? huntDetail.end : (totalWins > 0 ? totalWins : null);

  return {
    hunt_number: huntNumber,
    hunt_name: `Bonus Hunt #${huntNumber}`,
    hunt_status: 'completed',
    start_balance: startBalance,
    end_balance: endBalance && endBalance > 0 ? endBalance : null,
    average_x: avgX ? Math.round(avgX * 100) / 100 : null,
    total_slots: slots.length,
    opened_slots: openedSlots.length,
    api_data: {
      id: apiId,
      name: huntDetail.name,
      casino: huntDetail.casino,
      createdAt: huntDetail.createdAt,
      start: startBalance,
      end: endBalance,
      played: huntDetail.played,
      started: huntDetail.started,
      currency: huntDetail.currency,
      slots: slots.map((s: any) => ({
        slot: { name: s.slot?.name || 'Unknown', provider: s.slot?.provider || 'Custom Slot', id: s.slot?.id || s.id },
        bet: s.bet || 0, win: s.win || 0, played: s.played ?? false,
        note: s.note || '', balance: s.balance || 0,
      })),
      statistics: huntDetail.statistics || null,
    },
    casino_name: huntDetail.casino || null,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const body = await req.json();
    const rawIds: string[] = body.huntIds || [];
    if (rawIds.length === 0) {
      return new Response(JSON.stringify({ error: 'No huntIds provided' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 1. Deduplicate input
    const uniqueIds = [...new Set(rawIds)];
    const inputDuplicates = rawIds.length - uniqueIds.length;
    console.log(`Input: ${rawIds.length} IDs, ${inputDuplicates} duplicates, ${uniqueIds.length} unique`);

    // 2. Load all existing archives
    const { data: allArchives } = await supabase
      .from('bonus_hunt_archives')
      .select('id, hunt_number, api_data')
      .order('hunt_number', { ascending: true });

    const existingApiIds = new Set<string>();
    const existingArchives = (allArchives || []).map((a: any) => {
      const apiId = a.api_data?.id || '';
      if (apiId) existingApiIds.add(apiId);
      const createdAt = a.api_data?.createdAt || null;
      return { dbId: a.id, huntNumber: a.hunt_number, apiId, createdAt, isExisting: true as const };
    });

    const newIds = uniqueIds.filter(id => !existingApiIds.has(id));
    const alreadyImported = uniqueIds.length - newIds.length;
    console.log(`${alreadyImported} already in DB, ${newIds.length} new to import`);

    // 3. Fetch new hunts from API in batches of 5
    const fetchedHunts: Array<{ apiId: string; detail: any; createdAt: number }> = [];
    const fetchErrors: string[] = [];

    for (let i = 0; i < newIds.length; i += 5) {
      const batch = newIds.slice(i, i + 5);
      const results = await Promise.allSettled(
        batch.map(async (id) => {
          const res = await fetch(`${STREAMSYSTEM_BASE}/${id}`, { headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const detail = data.data || data;
          if ((detail.slots || []).length === 0) throw new Error('no_slots');
          return { apiId: id, detail, createdAt: detail.createdAt || 0 };
        })
      );
      for (let j = 0; j < results.length; j++) {
        const r = results[j];
        if (r.status === 'fulfilled') fetchedHunts.push(r.value);
        else fetchErrors.push(`${batch[j]}: ${r.reason?.message || 'unknown'}`);
      }
      if (i + 5 < newIds.length) await new Promise(r => setTimeout(r, 300));
    }

    console.log(`Fetched ${fetchedHunts.length} new hunts, ${fetchErrors.length} errors`);

    // 4. Merge and sort chronologically
    type HuntEntry = { dbId?: string; apiId: string; createdAt: number | null; isExisting: boolean; huntNumber?: number; detail?: any };
    const allHunts: HuntEntry[] = [
      ...existingArchives,
      ...fetchedHunts.map(h => ({ apiId: h.apiId, createdAt: h.createdAt, isExisting: false as const, detail: h.detail })),
    ];

    const withDate = allHunts.filter(h => h.createdAt && h.createdAt > 0);
    const withoutDate = allHunts.filter(h => !h.createdAt || h.createdAt <= 0);
    withDate.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    withoutDate.sort((a, b) => (a.huntNumber || 9999) - (b.huntNumber || 9999));
    const sorted = [...withDate, ...withoutDate];

    // 5. Phase 1: Move ALL existing hunts to negative temp numbers to free up the number space
    console.log('Phase 1: Moving existing to temp numbers...');
    const updatePromises: Promise<any>[] = [];
    for (const hunt of existingArchives) {
      updatePromises.push(
        supabase.from('bonus_hunt_archives')
          .update({ hunt_number: -(hunt.huntNumber + 10000) })
          .eq('id', hunt.dbId)
      );
      // Process in batches of 20 to avoid overwhelming
      if (updatePromises.length >= 20) {
        await Promise.all(updatePromises);
        updatePromises.length = 0;
      }
    }
    if (updatePromises.length > 0) await Promise.all(updatePromises);

    // 6. Phase 2: Insert new hunts with temp negative numbers
    console.log('Phase 2: Inserting new hunts...');
    let imported = 0;
    for (let i = 0; i < sorted.length; i++) {
      const hunt = sorted[i];
      if (!hunt.isExisting && hunt.detail) {
        const row = buildArchiveRow(-(i + 20000), hunt.detail, hunt.apiId);
        const { error } = await supabase.from('bonus_hunt_archives').insert(row);
        if (error) {
          console.error(`Insert error ${hunt.apiId}:`, error.message);
          fetchErrors.push(`${hunt.apiId}: insert_error`);
          sorted.splice(i, 1); i--; // remove from sorted
          continue;
        }
        imported++;
      }
    }

    // 7. Phase 3: Set final numbers for ALL hunts
    console.log('Phase 3: Assigning final numbers...');
    let renumbered = 0;
    const finalPromises: Promise<any>[] = [];

    for (let i = 0; i < sorted.length; i++) {
      const newNumber = i + 1;
      const hunt = sorted[i];

      if (hunt.isExisting) {
        const tempNum = -(hunt.huntNumber! + 10000);
        finalPromises.push(
          supabase.from('bonus_hunt_archives')
            .update({ hunt_number: newNumber, hunt_name: `Bonus Hunt #${newNumber}` })
            .eq('hunt_number', tempNum)
        );
        if (hunt.huntNumber !== newNumber) renumbered++;
      } else {
        const tempNum = -(i + 20000);
        finalPromises.push(
          supabase.from('bonus_hunt_archives')
            .update({ hunt_number: newNumber, hunt_name: `Bonus Hunt #${newNumber}` })
            .eq('hunt_number', tempNum)
        );
      }

      if (finalPromises.length >= 20) {
        await Promise.all(finalPromises);
        finalPromises.length = 0;
      }
    }
    if (finalPromises.length > 0) await Promise.all(finalPromises);

    // 8. Upsert slot catalog for new hunts (fire-and-forget style, batched)
    console.log('Phase 4: Upserting slot catalog...');
    for (const hunt of fetchedHunts) {
      const slots = hunt.detail.slots || [];
      for (const slot of slots) {
        const slotName = slot.slot?.name || 'Unknown';
        if (slotName === 'Unknown') continue;
        const provider = slot.slot?.provider || 'Custom Slot';
        const bet = slot.bet || 0;
        const win = slot.win || 0;
        const multiplier = bet > 0 && slot.played ? win / bet : 0;
        await supabase.rpc('upsert_slot_catalog', {
          p_slot_name: smartTitleCase(slotName),
          p_provider: provider === 'Custom Slot' ? 'Unknown' : provider,
          p_rtp: null,
          p_win: win,
          p_multiplier: multiplier,
        });
      }
    }

    console.log(`Done. Imported: ${imported}, Renumbered: ${renumbered}`);

    return new Response(JSON.stringify({
      success: true,
      summary: {
        inputIds: rawIds.length,
        inputDuplicates,
        uniqueIds: uniqueIds.length,
        alreadyImported,
        fetched: fetchedHunts.length,
        fetchErrors: fetchErrors.length,
        imported,
        renumbered,
        totalArchives: sorted.length,
      },
      errors: fetchErrors.length > 0 ? fetchErrors : undefined,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Bulk import failed:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
