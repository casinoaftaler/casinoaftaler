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

async function fetchStreamSystemData(options: {
  streamsystemHuntId?: string | null;
  visibleId?: number | string | null;
  includeLiveEndpoint?: boolean;
}) {
  const urls: string[] = [];

  if (options.streamsystemHuntId) {
    urls.push(`${STREAMSYSTEM_BASE}/${options.streamsystemHuntId}`);
  }

  if (options.visibleId !== undefined && options.visibleId !== null && options.visibleId !== '') {
    urls.push(`${STREAMSYSTEM_BASE}/${STREAMER_ID}?visibleId=${options.visibleId}`);
  }

  if (options.includeLiveEndpoint) {
    urls.push(`${STREAMSYSTEM_BASE}/latest/${STREAMER_ID}`);
  }

  for (const apiUrl of urls) {
    try {
      const apiResponse = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
      if (!apiResponse.ok) continue;

      const apiData = await apiResponse.json();
      if (apiData?.data) {
        return apiData;
      }
    } catch (e) {
      console.error(`StreamSystem fetch failed for ${apiUrl}:`, e);
    }
  }

  return null;
}

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
        // Inject correct visibleId so the frontend uses the archive hunt_number, not the API name
        const archiveResponse = typeof archived.api_data === 'object' && archived.api_data !== null
          ? { ...archived.api_data, data: { ...(archived.api_data as any).data || archived.api_data, visibleId: requestedHunt } }
          : archived.api_data;
        return new Response(JSON.stringify(archiveResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
        });
      }

      // Fallback: try StreamSystem API (hunt-id endpoint first, then visibleId)
      try {
        const { data: sessionRef } = await supabase
          .from("bonus_hunt_sessions")
          .select("streamsystem_hunt_id")
          .eq("hunt_number", requestedHunt)
          .maybeSingle();

        const apiData = await fetchStreamSystemData({
          streamsystemHuntId: sessionRef?.streamsystem_hunt_id,
          visibleId: requestedHunt,
        });

        if (apiData?.data) {
          const huntData = apiData.data;
          const huntNumber = requestedHunt;
          const stats = huntData.statistics || {};

          // Persist full hunt snapshots when slot data exists
          if ((huntData.slots?.length || 0) > 0 && huntNumber > 0 && !BLOCKED_HUNTS.has(huntNumber)) {
            const archTotalSlots = stats.numberOfSlots || 0;
            const archOpenedSlots = stats.openedSlots || 0;
            const archIsCompleted = huntData.played || (archTotalSlots > 0 && archOpenedSlots >= archTotalSlots);

            await supabase
              .from("bonus_hunt_archives")
              .upsert({
                hunt_number: huntNumber,
                api_data: apiData,
                hunt_name: `Bonus Hunt #${huntNumber}`,
                hunt_status: archIsCompleted ? 'completed' : 'active',
                total_slots: archTotalSlots,
                opened_slots: archOpenedSlots,
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
    let data: any = null;

    if (huntId) {
      const requestedHunt = parseInt(huntId, 10);
      const { data: sessionRef } = await supabase
        .from("bonus_hunt_sessions")
        .select("streamsystem_hunt_id")
        .eq("hunt_number", requestedHunt)
        .maybeSingle();

      data = await fetchStreamSystemData({
        streamsystemHuntId: sessionRef?.streamsystem_hunt_id,
        visibleId: huntId,
      });
    } else {
      data = await fetchStreamSystemData({ includeLiveEndpoint: true });
    }

    if (!data) {
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
        JSON.stringify({ error: `StreamSystem API returned no data` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If StreamSystem returns {data: false}, fall back to our active session
    if (data?.data === false || !data?.data) {
      const { data: activeSession } = await supabase
        .from("bonus_hunt_sessions")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (activeSession) {
        const fallbackPayload = {
          status: true,
          data: {
            id: activeSession.streamsystem_hunt_id || `session-${activeSession.hunt_number}`,
            visibleId: activeSession.hunt_number,
            played: false,
            started: true,
            user: STREAMER_ID,
            name: `bonus hunt #${activeSession.hunt_number}`,
            currency: 'dkk',
            end: activeSession.end_balance || 0,
            start: 0,
            createdAt: Math.floor(new Date(activeSession.created_at).getTime() / 1000),
            casino: activeSession.casino_slug || 'spildansknu',
            currencySymbol: 'DKK ',
            startFormatted: '0.0 KR.',
            endFormatted: `${activeSession.end_balance || 0}.0 KR.`,
            slots: [],
            statistics: {
              openedSlots: 0,
              numberOfSlots: 0,
              averageBet: 0,
              averageBetFormatted: '0.0 KR.',
              averageCost: 0,
              averageCostFormatted: '0.0 KR.',
              winnings: activeSession.end_balance || 0,
              winningsFormatted: `${activeSession.end_balance || 0}.0 KR.`,
              progress: 0,
              progressFormatted: '0.0 KR.',
              reqAverage: '0',
              bestWin: 0,
              bestWinFormatted: '0.0 KR.',
              bestWinX: '0.00',
              runAverage: activeSession.average_x ? String(activeSession.average_x) : '0.00',
              best_win_x_slot_name: '-',
            },
          },
        };

        return new Response(JSON.stringify(fallbackPayload), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' },
        });
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=30' },
      });
    }

    // Archive the hunt data (upsert by hunt_number)
    // Map StreamSystem hunt ID → our sequential position number
    let isNewHunt = false;
    if (data?.data) {
      const huntData = data.data;
      const ssHuntId = huntData.id || '';
      const stats = huntData.statistics || {};

      // Look up position by matching the StreamSystem hunt ID in existing archives
      let huntNumber = 0;
      if (ssHuntId) {
        // Find the archive whose api_data contains this StreamSystem hunt ID
        const { data: matchingArchive } = await supabase
          .from("bonus_hunt_archives")
          .select("hunt_number")
          .filter("api_data->data->>id", "eq", ssHuntId)
          .order("hunt_number", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (matchingArchive) {
          huntNumber = matchingArchive.hunt_number;
        }
      }

      // If no archive match, assign next sequential number
      if (huntNumber === 0) {
        const { data: maxRow } = await supabase
          .from("bonus_hunt_archives")
          .select("hunt_number")
          .order("hunt_number", { ascending: false })
          .limit(1)
          .maybeSingle();
        huntNumber = (maxRow?.hunt_number || 0) + 1;
      }

      if (huntNumber > 0 && !BLOCKED_HUNTS.has(huntNumber)) {
        // Check if archive exists already
        const { data: existing } = await supabase
          .from("bonus_hunt_archives")
          .select("id")
          .eq("hunt_number", huntNumber)
          .maybeSingle();

        isNewHunt = !existing;

        const totalSlots = stats.numberOfSlots || 0;
        const openedSlots = stats.openedSlots || 0;
        const isCompleted = huntData.played || (totalSlots > 0 && openedSlots >= totalSlots);

        await supabase
          .from("bonus_hunt_archives")
          .upsert({
            hunt_number: huntNumber,
            api_data: data,
            hunt_name: `Bonus Hunt #${huntNumber}`,
            hunt_status: isCompleted ? 'completed' : 'active',
            total_slots: totalSlots,
            opened_slots: openedSlots,
            start_balance: huntData.start || 0,
            end_balance: huntData.end || null,
            average_x: stats.runAverage ? parseFloat(stats.runAverage) : null,
          }, { onConflict: 'hunt_number' });
      }

      // Auto-create betting session if none exists (check both hunt_number and streamsystem_hunt_id)
      {
        const { data: existingSession } = await supabase
          .from("bonus_hunt_sessions")
          .select("id, hunt_number")
          .or(`hunt_number.eq.${huntNumber},streamsystem_hunt_id.eq.${ssHuntId}`)
          .order('created_at', { ascending: true })
          .limit(1)
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
            avgx_max_bet: 999999,
            gtw_prizes: defaultPrizes,
            casino_slug: huntData.casino || 'spildansknu',
            host: 'kevin',
          });
          console.log(`Auto-created betting session for hunt #${huntNumber}`);
        }
      }

      // Auto-close bets after 3 bonuses opened
      const openedSlots = stats.openedSlots || 0;
      const totalSlots = stats.numberOfSlots || 0;

      if (openedSlots >= 3) {
        const { data: openSession } = await supabase
          .from("bonus_hunt_sessions")
          .select("id, gtw_betting_open, avgx_betting_open, status")
          .eq("hunt_number", huntNumber)
          .order('created_at', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (openSession && (openSession.gtw_betting_open || openSession.avgx_betting_open)) {
          await supabase.from("bonus_hunt_sessions").update({
            gtw_betting_open: false,
            avgx_betting_open: false,
          }).eq("id", openSession.id);
          console.log(`Auto-closed betting for hunt #${huntNumber} (${openedSlots} slots opened)`);
        }

        // Auto-settle hunt when ALL bonuses have been opened
        if (totalSlots > 0 && openedSlots >= totalSlots && openSession?.status === 'active') {
          console.log(`All ${totalSlots} bonuses opened for hunt #${huntNumber} — triggering auto-settle`);
          // Fire-and-forget: call the auto-settle edge function
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
          fetch(`${supabaseUrl}/functions/v1/bonus-hunt-auto-settle`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${serviceRoleKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }).catch(e => console.error('Auto-settle trigger error:', e));
        }
      }

      // Fire-and-forget: sync slots + enrich (non-blocking for fast response)
      syncSlotCatalog(supabase, huntData, isNewHunt)
        .then(() => triggerEnrich(supabase))
        .catch(e => console.error('Slot catalog sync error:', e));

      // Auto-match pending slot requests against current hunt slots
      if (huntNumber > 0 && Array.isArray(huntData?.slots) && huntData.slots.length > 0) {
        const huntSlotNames = huntData.slots.map((s: any) => (s.slot?.searchName || s.slot?.name || s.title || '').toLowerCase()).filter(Boolean);
        if (huntSlotNames.length > 0) {
          (async () => {
            try {
              // Get already-awarded slots for this hunt to enforce 1 credit per slot
              const { data: alreadyAwarded } = await supabase
                .from('slot_requests')
                .select('slot_name')
                .eq('hunt_number', huntNumber)
                .eq('status', 'bonus_hit');
              const awardedSlotNames = new Set((alreadyAwarded || []).map((r: any) => r.slot_name.toLowerCase()));

              const { data: pendingReqs } = await supabase
                .from('slot_requests')
                .select('id, user_id, slot_name')
                .eq('status', 'pending')
                .order('created_at', { ascending: true }); // First come, first served

              // Track slots we award in this batch to prevent duplicates within same run
              const awardedThisBatch = new Set<string>();

              for (const req of (pendingReqs || [])) {
                const slotKey = req.slot_name.toLowerCase();
                if (huntSlotNames.includes(slotKey)) {
                  // Skip if already awarded to another user in this hunt
                  if (awardedSlotNames.has(slotKey) || awardedThisBatch.has(slotKey)) {
                    // Mark as no_bonus instead — slot was already claimed
                    await supabase.from('slot_requests').update({
                      status: 'no_bonus',
                      hunt_number: huntNumber,
                    }).eq('id', req.id);
                    console.log(`Slot "${req.slot_name}" already awarded in hunt #${huntNumber}, marking as no_bonus for user ${req.user_id}`);
                    continue;
                  }

                  awardedThisBatch.add(slotKey);

                  // Auto bonus-hit — first request only
                  await supabase.from('slot_requests').update({
                    status: 'bonus_hit',
                    hunt_number: huntNumber,
                    credits_awarded: 200,
                  }).eq('id', req.id);

                  // Award 200 credits — use proper ISO date with zero-padding
                  const now = new Date();
                  const today = `${now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Copenhagen' })}`;

                  const { data: existing } = await supabase
                    .from('slot_spins')
                    .select('id, spins_remaining')
                    .eq('user_id', req.user_id)
                    .eq('date', today)
                    .eq('game_id', 'shared')
                    .maybeSingle();

                  if (existing) {
                    await supabase.from('slot_spins').update({
                      spins_remaining: existing.spins_remaining + 200,
                    }).eq('id', existing.id);
                  } else {
                    await supabase.from('slot_spins').insert({
                      user_id: req.user_id,
                      date: today,
                      spins_remaining: 200,
                      game_id: 'shared',
                    });
                  }

                  await supabase.from('credit_allocation_log').insert({
                    user_id: req.user_id,
                    amount: 200,
                    source: 'slot_request_bonus',
                    note: `Auto bonus hit på slot request (hunt #${huntNumber})`,
                  });

                  console.log(`Auto-matched slot request "${req.slot_name}" for user ${req.user_id} in hunt #${huntNumber}`);
                }
              }
            } catch (e) {
              console.error('Auto-match slot requests error:', e);
            }
          })();
        }
      }

      // Inject our hunt_number as visibleId so frontend shows correct position
      if (huntNumber > 0 && data?.data) {
        data.data.visibleId = huntNumber;
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
