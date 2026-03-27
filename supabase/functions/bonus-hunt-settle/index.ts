import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const seJwtToken = Deno.env.get('STREAMELEMENTS_JWT_TOKEN');

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }
    const userId = claimsData.claims.sub;

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check admin role
    const { data: isAdmin } = await adminClient.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Admin only' }), { status: 403, headers: corsHeaders });
    }

    const body = await req.json();
    const { sessionId, endBalance: manualEndBalance, averageX } = body;

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing sessionId' }), { status: 400, headers: corsHeaders });
    }

    // Fetch session
    const { data: session, error: sessionError } = await adminClient
      .from('bonus_hunt_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return new Response(JSON.stringify({ error: 'Session not found' }), { status: 404, headers: corsHeaders });
    }

    // Always fetch total winnings from StreamSystem API
    let totalWinnings = manualEndBalance;
    try {
      const STREAMSYSTEM_BASE = "https://www.streamsystem.bet/api/bonushunt/data";
      const apiUrl = `${STREAMSYSTEM_BASE}/${session.streamsystem_hunt_id}`;
      const apiResponse = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        if (apiData?.data?.bonuses && Array.isArray(apiData.data.bonuses)) {
          const openedSlots = apiData.data.bonuses.filter((b: any) => b.isOpen);
          const sumWinnings = openedSlots.reduce((sum: number, b: any) => sum + (Number(b.win) || 0), 0);
          if (sumWinnings > 0) {
            totalWinnings = sumWinnings;
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch StreamSystem data for total winnings:', e);
    }

    const endBalance = totalWinnings;
    const results: Record<string, unknown> = {};

    // --- Settle GTW ---
    if (endBalance !== undefined && endBalance !== null) {
      const { data: gtwBets } = await adminClient
        .from('bonus_hunt_gtw_bets')
        .select('*')
        .eq('session_id', sessionId);

      if (gtwBets && gtwBets.length > 0) {
        // Calculate differences and rank
        const ranked = gtwBets
          .map(bet => ({ ...bet, difference: Math.abs(bet.guess_amount - endBalance) }))
          .sort((a, b) => a.difference - b.difference);

        const prizes = (session.gtw_prizes as Array<{ place: number; points: number; credits?: number }>) || [];
        const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

        for (let i = 0; i < ranked.length; i++) {
          const bet = ranked[i];
          const rank = i + 1;
          const prize = prizes.find(p => p.place === rank);

          await adminClient
            .from('bonus_hunt_gtw_bets')
            .update({ difference: bet.difference, rank, prize_points: prize?.points || 0 })
            .eq('id', bet.id);

          // Award credits if prize has credits
          if (prize && prize.credits && prize.credits > 0) {
            try {
              const { data: spinsRow } = await adminClient
                .from('slot_spins')
                .select('id, spins_remaining')
                .eq('user_id', bet.user_id)
                .eq('date', today)
                .single();

              if (spinsRow) {
                await adminClient
                  .from('slot_spins')
                  .update({ spins_remaining: spinsRow.spins_remaining + prize.credits })
                  .eq('id', spinsRow.id);
              } else {
                await adminClient
                  .from('slot_spins')
                  .insert({ user_id: bet.user_id, date: today, spins_remaining: 200 + prize.credits });
              }

              await adminClient
                .from('credit_allocation_log')
                .insert({
                  user_id: bet.user_id,
                  amount: prize.credits,
                  source: 'bonus_hunt_gtw',
                  note: `GTW ${rank}. plads: ${prize.credits} credits`,
                });
            } catch (e) {
              console.error(`Failed to award credits to user ${bet.user_id}:`, e);
            }
          }

          // Award SE points if prize exists
          if (prize && prize.points > 0 && seJwtToken) {
            try {
              const { data: profile } = await adminClient
                .from('profiles')
                .select('twitch_username')
                .eq('user_id', bet.user_id)
                .single();

              if (profile?.twitch_username) {
                const { data: channelSetting } = await adminClient
                  .from('site_settings')
                  .select('value')
                  .eq('key', 'streamelements_channel_id')
                  .single();

                if (channelSetting?.value) {
                  await fetch(`https://api.streamelements.com/kappa/v2/points/${channelSetting.value}/${profile.twitch_username}/${prize.points}`, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${seJwtToken}`,
                      'Content-Type': 'application/json',
                    },
                  });
                }
              }
            } catch (e) {
              console.error(`Failed to award SE points to user ${bet.user_id}:`, e);
            }
          }
        }

        results.gtw = { settled: ranked.length, topGuess: ranked[0]?.guess_amount };
      }

      // Update session with end balance
      await adminClient
        .from('bonus_hunt_sessions')
        .update({ end_balance: endBalance })
        .eq('id', sessionId);
    }

    // --- Settle AVG X ---
    if (averageX !== undefined && averageX !== null) {
      // Determine winning group
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

      const { data: allAvgxBets } = await adminClient
        .from('bonus_hunt_avgx_bets')
        .select('*')
        .eq('session_id', sessionId);

      if (allAvgxBets && allAvgxBets.length > 0) {
        const totalPot = allAvgxBets.reduce((sum, b) => sum + b.bet_amount, 0);
        const winners = allAvgxBets.filter(b => b.group_letter === winningGroup);
        const totalWinnerBets = winners.reduce((sum, b) => sum + b.bet_amount, 0);

        const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

        for (const bet of allAvgxBets) {
          if (bet.group_letter === winningGroup && totalWinnerBets > 0) {
            // Proportional share of pot
            const share = Math.floor((bet.bet_amount / totalWinnerBets) * totalPot);
            await adminClient
              .from('bonus_hunt_avgx_bets')
              .update({ winnings: share })
              .eq('id', bet.id);

            // Add credits to winner's slot_spins
            if (share > 0) {
              const { data: spinsRow } = await adminClient
                .from('slot_spins')
                .select('id, spins_remaining')
                .eq('user_id', bet.user_id)
                .eq('date', today)
                .single();

              if (spinsRow) {
                await adminClient
                  .from('slot_spins')
                  .update({ spins_remaining: spinsRow.spins_remaining + share })
                  .eq('id', spinsRow.id);
              } else {
                await adminClient
                  .from('slot_spins')
                  .insert({ user_id: bet.user_id, date: today, spins_remaining: 200 + share });
              }

              await adminClient
                .from('credit_allocation_log')
                .insert({
                  user_id: bet.user_id,
                  amount: share,
                  source: 'bonus_hunt_avgx',
                  note: `AVG X win: group ${winningGroup}, share ${share} credits`,
                });
            }
          } else {
            await adminClient
              .from('bonus_hunt_avgx_bets')
              .update({ winnings: 0 })
              .eq('id', bet.id);
          }
        }

        results.avgx = { winningGroup, totalPot, winnersCount: winners.length };
      }

      // Update session
      await adminClient
        .from('bonus_hunt_sessions')
        .update({ average_x: averageX, winning_group: winningGroup!, status: 'completed' })
        .eq('id', sessionId);
    }

    // Close betting windows
    await adminClient
      .from('bonus_hunt_sessions')
      .update({ gtw_betting_open: false, avgx_betting_open: false, status: 'completed' })
      .eq('id', sessionId);

    return new Response(JSON.stringify({ success: true, results, totalWinningsUsed: endBalance }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
