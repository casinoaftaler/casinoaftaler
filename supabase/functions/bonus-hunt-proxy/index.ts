import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
const STREAMER_ID = "959262659";

// Hunt numbers to permanently exclude (test hunts)
const BLOCKED_HUNTS = new Set<number>();

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

async function triggerEnrich(supabase: any) {
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
}

async function syncSlotCatalog(supabase: any, huntData: any, isNewHunt: boolean) {
  const slots = huntData?.slots;
  if (!Array.isArray(slots) || slots.length === 0) return;

  // Fetch provider overrides
  const { data: overrides } = await supabase
    .from('bonus_hunt_provider_overrides')
    .select('slot_name, provider_override');

  const overrideMap = new Map(
    (overrides || []).map((o: any) => [o.slot_name, o.provider_override])
  );

  const slotNames: string[] = [];

  for (const entry of slots) {
    const slotInfo = entry.slot || {};
    const slotName = toTitleCase(slotInfo.name);
    if (!slotName) continue;

    const rawProvider = slotInfo.provider || 'Unknown';
    const provider = overrideMap.get(slotName) || rawProvider;
    const rtp = slotInfo.rtp && slotInfo.rtp > 0 ? slotInfo.rtp : null;
    const win = entry.played ? (entry.win || 0) : 0;
    const bet = entry.bet || 1;
    const multiplier = win > 0 && bet > 0 ? Math.round((win / bet) * 100) / 100 : 0;

    const { error } = await supabase.rpc('upsert_slot_catalog', {
      p_slot_name: slotName,
      p_provider: provider,
      p_rtp: rtp,
      p_win: win,
      p_multiplier: multiplier,
    });

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

    slotNames.push(slotName);
  }

  // Increment bonus_count once per hunt (only when this is a newly archived hunt)
  if (isNewHunt && slotNames.length > 0) {
    const uniqueNames = [...new Set(slotNames)];
    await supabase.rpc('increment_slot_bonus_counts', { p_slot_names: uniqueNames });
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
      const requestedHunt = parseInt(huntId, 10);

      const { data: archived } = await supabase
        .from("bonus_hunt_archives")
        .select("api_data")
        .eq("hunt_number", requestedHunt)
        .maybeSingle();

      if (archived?.api_data) {
        return new Response(JSON.stringify(archived.api_data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        });
      }

      // Fallback: try StreamSystem API with visibleId before falling back to sessions
      try {
        const apiUrl = `${STREAMSYSTEM_BASE}/${STREAMER_ID}?visibleId=${requestedHunt}`;
        const apiResponse = await fetch(apiUrl, {
          headers: { 'Accept': 'application/json' },
        });

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          // Verify we got valid data with slots
          if (apiData?.data?.slots && apiData.data.slots.length > 0) {
            // Only accept API fallback when it actually matches requested hunt
            const huntData = apiData.data;
            const huntNumber = parseInt(huntData.name?.replace(/\D/g, '') || '0', 10);
            if (huntNumber === requestedHunt) {
              if (huntNumber > 0 && !BLOCKED_HUNTS.has(huntNumber)) {
                const stats = huntData.statistics || {};
                await supabase
                  .from("bonus_hunt_archives")
                  .upsert({
                    hunt_number: huntNumber,
                    api_data: apiData,
                    hunt_name: huntData.name,
                    hunt_status: huntData.played ? 'completed' : 'active',
                    total_slots: stats.numberOfSlots || 0,
                    opened_slots: stats.openedSlots || 0,
                    start_balance: huntData.start || 0,
                    end_balance: huntData.end || null,
                    average_x: stats.runAverage ? parseFloat(stats.runAverage) : null,
                  }, { onConflict: 'hunt_number' });

                // Sync slot catalog
                syncSlotCatalog(supabase, huntData, true)
                  .then(() => triggerEnrich(supabase))
                  .catch(e => console.error('Slot catalog sync error:', e));
              }

              return new Response(JSON.stringify(apiData), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
              });
            }

            console.info(`Fallback API returned hunt #${huntNumber}, expected #${requestedHunt}; using session fallback`);
          }
        }
      } catch (e) {
        console.error('StreamSystem API fallback error:', e);
      }

      // Final fallback: build a lightweight response from sessions table
      const { data: session } = await supabase
        .from("bonus_hunt_sessions")
        .select("hunt_number, status, average_x, end_balance, created_at, casino_slug, streamsystem_hunt_id")
        .eq("hunt_number", requestedHunt)
        .maybeSingle();

      if (session) {
        const fallbackPayload = {
          status: true,
          data: {
            id: session.streamsystem_hunt_id || `session-${requestedHunt}`,
            played: session.status === 'completed',
            started: true,
            user: STREAMER_ID,
            name: `bonus hunt #${requestedHunt}`,
            currency: 'dkk',
            end: session.end_balance || 0,
            createdAt: Math.floor(new Date(session.created_at).getTime() / 1000),
            casino: session.casino_slug || 'spildansknu',
            start: 0,
            currencySymbol: 'DKK ',
            startFormatted: '0.0 KR.',
            endFormatted: `${session.end_balance || 0}.0 KR.`,
            slots: [],
            statistics: {
              openedSlots: 0,
              numberOfSlots: 0,
              averageBet: 0,
              averageBetFormatted: '0.0 KR.',
              averageCost: 0,
              averageCostFormatted: '0.0 KR.',
              winnings: session.end_balance || 0,
              winningsFormatted: `${session.end_balance || 0}.0 KR.`,
              progress: 0,
              progressFormatted: '0.0 KR.',
              reqAverage: '0',
              bestWin: 0,
              bestWinFormatted: '0.0 KR.',
              bestWinX: '0.00',
              runAverage: session.average_x ? String(session.average_x) : '0.00',
              best_win_x_slot_name: '-',
            },
          },
        };

        return new Response(JSON.stringify(fallbackPayload), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        });
      }

      return new Response(
        JSON.stringify({ error: `Archived hunt #${requestedHunt} not found` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
    // Check if this hunt is already archived to determine isNewHunt
    let isNewHunt = false;
    if (data?.data?.name) {
      const huntData = data.data;
      const huntNumber = parseInt(huntData.name.replace(/\D/g, ''), 10) || 0;
      const stats = huntData.statistics || {};

      if (huntNumber > 0 && !BLOCKED_HUNTS.has(huntNumber)) {
        // Check if archive exists already
        const { data: existing } = await supabase
          .from("bonus_hunt_archives")
          .select("id")
          .eq("hunt_number", huntNumber)
          .maybeSingle();

        isNewHunt = !existing;

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

      // Auto-create betting session if none exists
      {
        const { data: existingSession } = await supabase
          .from("bonus_hunt_sessions")
          .select("id")
          .eq("hunt_number", huntNumber)
          .maybeSingle();

        if (!existingSession) {
          const defaultPrizes = [
            { place: 1, points: 300, credits: 0 },
            { place: 2, points: 200, credits: 0 },
            { place: 3, points: 100, credits: 0 },
            { place: 4, points: 75, credits: 0 },
            { place: 5, points: 50, credits: 0 },
          ];
          await supabase.from("bonus_hunt_sessions").insert({
            streamsystem_hunt_id: huntData.id || `hunt-${huntNumber}`,
            hunt_number: huntNumber,
            status: 'active',
            gtw_betting_open: true,
            avgx_betting_open: true,
            gtw_min_bet: 1,
            gtw_max_bet: 50,
            avgx_min_bet: 1,
            avgx_max_bet: 50,
            gtw_prizes: defaultPrizes,
            casino_slug: huntData.casino || 'spildansknu',
            host: 'kevin',
          });
          console.log(`Auto-created betting session for hunt #${huntNumber}`);
        }
      }

      // Auto-close bets after 3 bonuses opened
      const openedSlots = stats.openedSlots || 0;
      if (openedSlots >= 3) {
        const { data: openSession } = await supabase
          .from("bonus_hunt_sessions")
          .select("id, gtw_betting_open, avgx_betting_open")
          .eq("hunt_number", huntNumber)
          .maybeSingle();

        if (openSession && (openSession.gtw_betting_open || openSession.avgx_betting_open)) {
          await supabase.from("bonus_hunt_sessions").update({
            gtw_betting_open: false,
            avgx_betting_open: false,
          }).eq("id", openSession.id);
          console.log(`Auto-closed betting for hunt #${huntNumber} (${openedSlots} slots opened)`);
        }
      }

      // Fire-and-forget: sync slots + enrich (non-blocking for fast response)
      syncSlotCatalog(supabase, huntData, isNewHunt)
        .then(() => triggerEnrich(supabase))
        .catch(e => console.error('Slot catalog sync error:', e));
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
