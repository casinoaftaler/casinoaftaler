import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TITLE_CASE_LOWER = new Set(['of', 'and', 'the', 'in', 'at', 'by', 'to', 'for', 'or', 'on', 'a', 'an']);
const ROMAN_NUMERALS = new Set(['ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii']);

function smartTitleCase(name: string): string {
  return name.toLowerCase().split(/\s+/).map((word, i) => {
    if (ROMAN_NUMERALS.has(word)) return word.toUpperCase();
    if (i > 0 && TITLE_CASE_LOWER.has(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
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

    // 1. Fetch ALL archives with api_data
    console.log('Fetching all archives...');
    const batchSize = 500;
    let allArchives: any[] = [];
    let from = 0;
    while (true) {
      const { data, error } = await supabase
        .from('bonus_hunt_archives')
        .select('hunt_number, api_data')
        .range(from, from + batchSize - 1);
      if (error) throw error;
      allArchives = allArchives.concat(data || []);
      if (!data || data.length < batchSize) break;
      from += batchSize;
    }
    console.log(`Loaded ${allArchives.length} archives`);

    // 2. Extract all slot appearances and aggregate stats
    const slotMap = new Map<string, {
      name: string;
      provider: string;
      huntNumbers: Set<number>;
      highestWin: number;
      highestX: number;
    }>();

    for (const archive of allArchives) {
      const apiData = archive.api_data;
      const slots = apiData?.slots;
      if (!Array.isArray(slots)) continue;

      for (const s of slots) {
        const rawName = s.slot?.name || s.name;
        if (!rawName || rawName === 'Unknown') continue;
        
        const name = smartTitleCase(rawName);
        const key = name.toLowerCase();
        const provider = s.slot?.provider || s.provider || 'Unknown';
        const bet = Number(s.bet) || 0;
        const win = Number(s.win) || 0;
        const played = s.played ?? false;
        const x = (played && bet > 0 && win > 0) ? win / bet : 0;

        let entry = slotMap.get(key);
        if (!entry) {
          entry = { name, provider: 'Unknown', huntNumbers: new Set(), highestWin: 0, highestX: 0 };
          slotMap.set(key, entry);
        }

        entry.huntNumbers.add(archive.hunt_number);
        if (provider && provider !== 'Custom Slot' && provider !== 'Unknown') {
          entry.provider = provider;
        }
        if (played && win > entry.highestWin) entry.highestWin = win;
        if (x > entry.highestX) entry.highestX = x;
      }
    }

    console.log(`Found ${slotMap.size} unique slots across archives`);

    // 3. Upsert each slot into slot_catalog
    let updated = 0;
    let created = 0;
    let errors = 0;

    for (const [, slot] of slotMap) {
      const { error } = await supabase.rpc('upsert_slot_catalog', {
        p_slot_name: slot.name,
        p_provider: slot.provider,
        p_rtp: null,
        p_win: slot.highestWin,
        p_multiplier: slot.highestX,
      });

      if (error) {
        console.error(`Error upserting ${slot.name}:`, error.message);
        errors++;
        continue;
      }
      updated++;
    }

    // 4. Now update bonus_count for ALL slots based on actual hunt appearances
    console.log('Updating bonus_counts...');
    let bonusUpdated = 0;

    // Fetch all slot_catalog entries to match by normalized name
    let allCatalog: any[] = [];
    from = 0;
    while (true) {
      const { data, error } = await supabase
        .from('slot_catalog')
        .select('id, slot_name')
        .range(from, from + batchSize - 1);
      if (error) throw error;
      allCatalog = allCatalog.concat(data || []);
      if (!data || data.length < batchSize) break;
      from += batchSize;
    }

    // Build catalog lookup by normalized name
    const catalogLookup = new Map<string, string>(); // normalized -> id
    for (const entry of allCatalog) {
      catalogLookup.set(entry.slot_name.toLowerCase(), entry.id);
    }

    // Update bonus_count for each slot
    const updatePromises: Promise<any>[] = [];
    for (const [key, slot] of slotMap) {
      const catalogId = catalogLookup.get(key);
      if (!catalogId) continue;

      const bonusCount = slot.huntNumbers.size;
      updatePromises.push(
        supabase
          .from('slot_catalog')
          .update({ bonus_count: bonusCount })
          .eq('id', catalogId)
          .then(({ error }) => {
            if (error) { errors++; }
            else { bonusUpdated++; }
          })
      );

      // Batch 20 at a time
      if (updatePromises.length >= 20) {
        await Promise.all(updatePromises);
        updatePromises.length = 0;
      }
    }
    if (updatePromises.length > 0) await Promise.all(updatePromises);

    console.log(`Done. Upserted: ${updated}, Bonus counts updated: ${bonusUpdated}, Errors: ${errors}`);

    return new Response(JSON.stringify({
      success: true,
      archives_processed: allArchives.length,
      unique_slots_found: slotMap.size,
      slots_upserted: updated,
      bonus_counts_updated: bonusUpdated,
      errors,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Recalc failed:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
