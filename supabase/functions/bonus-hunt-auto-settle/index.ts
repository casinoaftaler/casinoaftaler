import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
const STREAMER_ID = "959262659";
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

async function syncSlotCatalog(admin: any, huntData: any) {
  const slots = huntData?.slots;
  if (!Array.isArray(slots) || slots.length === 0) return;

  const { data: overrides } = await admin
    .from('bonus_hunt_provider_overrides')
    .select('slot_name, provider_override');

  const overrideMap = new Map(
    (overrides || []).map((o: any) => [o.slot_name, o.provider_override])
  );

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

    await admin.rpc('upsert_slot_catalog', {
      p_slot_name: slotName,
      p_provider: provider,
      p_rtp: rtp,
      p_win: win,
      p_multiplier: multiplier,
    });
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const seJwtToken = Deno.env.get('STREAMELEMENTS_JWT_TOKEN');
    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Find active/upcoming sessions that haven't been settled yet
    const { data: sessions, error: sessError } = await admin
      .from('bonus_hunt_sessions')
      .select('*')
      .in('status', ['upcoming', 'active'])
      .order('created_at', { ascending: false });

    if (sessError || !sessions || sessions.length === 0) {
      return new Response(JSON.stringify({ message: 'No active sessions to check' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: any[] = [];

    for (const session of sessions) {
      const apiUrl = `${STREAMSYSTEM_BASE}/${STREAMER_ID}?visibleId=${session.hunt_number}`;
      const response = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });

      if (!response.ok) {
        results.push({ huntNumber: session.hunt_number, status: 'api_error', code: response.status });
        continue;
      }

      const raw = await response.json();
      const huntData = raw?.data;

      if (!huntData) {
        results.push({ huntNumber: session.hunt_number, status: 'no_data' });
        continue;
      }

      const stats = huntData.statistics || {};
      const openedSlots = stats.openedSlots || 0;
      const totalSlots = stats.numberOfSlots || 0;
      const allOpened = totalSlots > 0 && openedSlots >= totalSlots;

      // Only settle if the hunt is marked as played OR all bonuses are opened
      if (!huntData.played && !allOpened) {
        results.push({ huntNumber: session.hunt_number, status: 'still_active', openedSlots, totalSlots });
        continue;
      }

      const endBalance = huntData.end || null;
      const averageX = stats.runAverage ? parseFloat(stats.runAverage) : null;

      if (!endBalance && !averageX) {
        results.push({ huntNumber: session.hunt_number, status: 'completed_but_no_data' });
        continue;
      }

      // Persist full archive snapshot at settlement moment (before API data disappears)
      if (!BLOCKED_HUNTS.has(session.hunt_number)) {
        try {
          const stats = huntData.statistics || {};
          await admin
            .from('bonus_hunt_archives')
            .upsert({
              hunt_number: session.hunt_number,
              api_data: raw,
              hunt_name: huntData.name || `bonus hunt #${session.hunt_number}`,
              hunt_status: 'completed',
              total_slots: stats.numberOfSlots || 0,
              opened_slots: stats.openedSlots || 0,
              start_balance: huntData.start || 0,
              end_balance: endBalance,
              average_x: averageX,
            }, { onConflict: 'hunt_number' });
        } catch (e) {
          console.error(`Archive upsert failed for hunt #${session.hunt_number}:`, e);
        }
      }

      // Sync slot catalog with final results
      try {
        await syncSlotCatalog(admin, huntData);
      } catch (e) {
        console.error('Slot catalog sync error during settle:', e);
      }

      // --- Auto-settle: same logic as bonus-hunt-settle ---
      const settleResults: Record<string, unknown> = {};
      const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

      // --- Settle GTW ---
      if (endBalance) {
        const { data: gtwBets } = await admin
          .from('bonus_hunt_gtw_bets')
          .select('*')
          .eq('session_id', session.id);

        if (gtwBets && gtwBets.length > 0) {
          const ranked = gtwBets
            .map((bet: any) => ({ ...bet, difference: Math.abs(bet.guess_amount - endBalance) }))
            .sort((a: any, b: any) => a.difference - b.difference);

          const prizes = (session.gtw_prizes as Array<{ place: number; points: number; credits?: number }>) || [];

          for (let i = 0; i < ranked.length; i++) {
            const bet = ranked[i];
            const rank = i + 1;
            const prize = prizes.find((p: any) => p.place === rank);

            await admin
              .from('bonus_hunt_gtw_bets')
              .update({ difference: bet.difference, rank, prize_points: prize?.points || 0 })
              .eq('id', bet.id);

            if (prize && prize.credits && prize.credits > 0) {
              try {
                const { data: spinsRow } = await admin
                  .from('slot_spins')
                  .select('id, spins_remaining')
                  .eq('user_id', bet.user_id)
                  .eq('date', today)
                  .single();

                if (spinsRow) {
                  await admin.from('slot_spins').update({ spins_remaining: spinsRow.spins_remaining + prize.credits }).eq('id', spinsRow.id);
                } else {
                  await admin.from('slot_spins').insert({ user_id: bet.user_id, date: today, spins_remaining: 200 + prize.credits });
                }

                await admin.from('credit_allocation_log').insert({
                  user_id: bet.user_id, amount: prize.credits, source: 'bonus_hunt_gtw',
                  note: `GTW ${rank}. plads: ${prize.credits} credits (auto-settle)`,
                });
              } catch (e) {
                console.error(`Failed to award credits to user ${bet.user_id}:`, e);
              }
            }

            if (prize && prize.points > 0 && seJwtToken) {
              try {
                const { data: profile } = await admin.from('profiles').select('twitch_username').eq('user_id', bet.user_id).single();
                if (profile?.twitch_username) {
                  const { data: channelSetting } = await admin.from('site_settings').select('value').eq('key', 'streamelements_channel_id').single();
                  if (channelSetting?.value) {
                    await fetch(`https://api.streamelements.com/kappa/v2/points/${channelSetting.value}/${profile.twitch_username}/${prize.points}`, {
                      method: 'PUT',
                      headers: { 'Authorization': `Bearer ${seJwtToken}`, 'Content-Type': 'application/json' },
                    });
                  }
                }
              } catch (e) {
                console.error(`Failed to award SE points to user ${bet.user_id}:`, e);
              }
            }
          }

          settleResults.gtw = { settled: ranked.length, topGuess: ranked[0]?.guess_amount };
        }

        await admin.from('bonus_hunt_sessions').update({ end_balance: endBalance }).eq('id', session.id);
      }

      // --- Settle AVG X ---
      if (averageX) {
        let winningGroup: string;
        if (averageX < 60) winningGroup = 'A';
        else if (averageX < 70) winningGroup = 'B';
        else if (averageX < 80) winningGroup = 'C';
        else if (averageX < 90) winningGroup = 'D';
        else if (averageX < 100) winningGroup = 'E';
        else if (averageX < 110) winningGroup = 'F';
        else if (averageX < 120) winningGroup = 'G';
        else if (averageX < 130) winningGroup = 'H';
        else if (averageX < 140) winningGroup = 'I';
        else winningGroup = 'J';

        const { data: allAvgxBets } = await admin
          .from('bonus_hunt_avgx_bets')
          .select('*')
          .eq('session_id', session.id);

        if (allAvgxBets && allAvgxBets.length > 0) {
          const totalPot = allAvgxBets.reduce((sum: number, b: any) => sum + b.bet_amount, 0);
          const winners = allAvgxBets.filter((b: any) => b.group_letter === winningGroup);
          const totalWinnerBets = winners.reduce((sum: number, b: any) => sum + b.bet_amount, 0);

          for (const bet of allAvgxBets) {
            if (bet.group_letter === winningGroup && totalWinnerBets > 0) {
              const share = Math.floor((bet.bet_amount / totalWinnerBets) * totalPot);
              await admin.from('bonus_hunt_avgx_bets').update({ winnings: share }).eq('id', bet.id);

              if (share > 0) {
                const { data: spinsRow } = await admin.from('slot_spins').select('id, spins_remaining').eq('user_id', bet.user_id).eq('date', today).single();
                if (spinsRow) {
                  await admin.from('slot_spins').update({ spins_remaining: spinsRow.spins_remaining + share }).eq('id', spinsRow.id);
                } else {
                  await admin.from('slot_spins').insert({ user_id: bet.user_id, date: today, spins_remaining: 200 + share });
                }
                await admin.from('credit_allocation_log').insert({
                  user_id: bet.user_id, amount: share, source: 'bonus_hunt_avgx',
                  note: `AVG X win: group ${winningGroup}, share ${share} credits (auto-settle)`,
                });
              }
            } else {
              await admin.from('bonus_hunt_avgx_bets').update({ winnings: 0 }).eq('id', bet.id);
            }
          }

          settleResults.avgx = { winningGroup, totalPot, winnersCount: winners.length };
        }

        await admin.from('bonus_hunt_sessions').update({ average_x: averageX, winning_group: winningGroup!, status: 'completed' }).eq('id', session.id);
      }

      await admin.from('bonus_hunt_sessions').update({ gtw_betting_open: false, avgx_betting_open: false, status: 'completed' }).eq('id', session.id);

      results.push({ huntNumber: session.hunt_number, status: 'auto_settled', ...settleResults });
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
