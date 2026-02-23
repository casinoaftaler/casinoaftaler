import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
const STREAMER_ID = "959262659";

async function syncSlotCatalog(supabase: any, huntData: any) {
  const slots = huntData?.slots;
  if (!Array.isArray(slots) || slots.length === 0) return;

  // Fetch provider overrides
  const { data: overrides } = await supabase
    .from('bonus_hunt_provider_overrides')
    .select('slot_name, provider_override');

  const overrideMap = new Map(
    (overrides || []).map((o: any) => [o.slot_name, o.provider_override])
  );

  for (const entry of slots) {
    const slotInfo = entry.slot || {};
    const slotName = slotInfo.name;
    if (!slotName) continue;

    const rawProvider = slotInfo.provider || 'Unknown';
    const provider = overrideMap.get(slotName) || rawProvider;
    const rtp = slotInfo.rtp && slotInfo.rtp > 0 ? slotInfo.rtp : null;
    const win = entry.played ? (entry.win || 0) : 0;
    const bet = entry.bet || 1;
    const multiplier = win > 0 && bet > 0 ? Math.round((win / bet) * 100) / 100 : 0;

    // Upsert: only update highest_win/highest_x if new values are higher
    // Provider and RTP set on insert only (preserve admin edits)
    const { error } = await supabase.rpc('upsert_slot_catalog', {
      p_slot_name: slotName,
      p_provider: provider,
      p_rtp: rtp,
      p_win: win,
      p_multiplier: multiplier,
    });

    // Fallback if RPC doesn't exist yet - use raw upsert
    if (error) {
      await supabase
        .from('slot_catalog')
        .upsert({
          slot_name: slotName,
          provider: provider,
          rtp: rtp,
          highest_win: win,
          highest_x: multiplier,
        }, { onConflict: 'slot_name' });
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const huntId = url.searchParams.get("huntId");
    const fromArchive = url.searchParams.get("archive") === "true";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // If requesting a specific past hunt, try archive first
    if (huntId && fromArchive) {
      const { data: archived } = await supabase
        .from("bonus_hunt_archives")
        .select("api_data")
        .eq("hunt_number", parseInt(huntId))
        .maybeSingle();

      if (archived?.api_data) {
        return new Response(JSON.stringify(archived.api_data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        });
      }
    }

    // Fetch from StreamSystem API
    const apiUrl = huntId
      ? `${STREAMSYSTEM_BASE}/${STREAMER_ID}?visibleId=${huntId}`
      : `${STREAMSYSTEM_BASE}/${STREAMER_ID}`;

    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      // If API fails for a past hunt, try archive as fallback
      if (huntId) {
        const { data: archived } = await supabase
          .from("bonus_hunt_archives")
          .select("api_data")
          .eq("hunt_number", parseInt(huntId))
          .maybeSingle();

        if (archived?.api_data) {
          return new Response(JSON.stringify(archived.api_data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      return new Response(
        JSON.stringify({ error: `StreamSystem API returned ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // Archive the hunt data (upsert by hunt_number)
    if (data?.data?.name) {
      const huntData = data.data;
      const huntNumber = parseInt(huntData.name.replace(/\D/g, ''), 10) || 0;

      if (huntNumber > 0) {
        const stats = huntData.statistics || {};
        await supabase
          .from("bonus_hunt_archives")
          .upsert({
            hunt_number: huntNumber,
            api_data: data,
            hunt_name: huntData.name,
            hunt_status: huntData.played ? 'completed' : 'active',
            total_slots: stats.numberOfSlots || 0,
            opened_slots: stats.openedSlots || 0,
            start_balance: huntData.start || 0,
            end_balance: huntData.end || null,
            average_x: stats.runAverage ? parseFloat(stats.runAverage) : null,
          }, { onConflict: 'hunt_number' });
      }

      // Auto-sync slots to catalog
      try {
        await syncSlotCatalog(supabase, huntData);
      } catch (e) {
        console.error('Slot catalog sync error:', e);
      }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
