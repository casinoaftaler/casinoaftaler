import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return json({ error: 'Unauthorized' }, 401);
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await authClient.auth.getUser();
    if (userError || !userData?.user) {
      return json({ error: 'Unauthorized' }, 401);
    }
    const userId = userData.user.id;

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const { sessionId, betType, betAmount, guessAmount, groupLetter } = body;

    if (!sessionId || !betType || !betAmount) {
      return json({ error: 'Missing required fields' });
    }

    if (betAmount <= 0 || !Number.isInteger(betAmount)) {
      return json({ error: 'Invalid bet amount' });
    }

    // Fetch session
    const { data: session, error: sessionError } = await adminClient
      .from('bonus_hunt_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      return json({ error: 'Session not found' });
    }

    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

    if (betType === 'gtw') {
      if (!session.gtw_betting_open) {
        return json({ error: 'GTW betting is closed' });
      }
      if (betAmount < session.gtw_min_bet || betAmount > session.gtw_max_bet) {
        return json({ error: `Bet must be between ${session.gtw_min_bet} and ${session.gtw_max_bet}` });
      }
      if (!guessAmount || guessAmount <= 0) {
        return json({ error: 'Invalid guess amount' });
      }

      // Check existing bet
      const { data: existing } = await adminClient
        .from('bonus_hunt_gtw_bets')
        .select('id, bet_amount')
        .eq('session_id', sessionId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        const diff = betAmount - existing.bet_amount;

        if (diff > 0) {
          const { data: remaining, error: deductError } = await adminClient.rpc('deduct_spin', {
            p_user_id: userId, p_date: today, p_bet: diff, p_max_spins: 200,
          });
          if (deductError || remaining === -1) {
            return json({ error: 'Not enough credits' });
          }

          const { error: updateError } = await adminClient
            .from('bonus_hunt_gtw_bets')
            .update({ guess_amount: guessAmount, bet_amount: betAmount })
            .eq('id', existing.id);

          if (updateError) {
            await adminClient.from('slot_spins').update({ spins_remaining: remaining + diff }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
            return json({ error: updateError.message });
          }

          return json({ success: true, updated: true, creditsRemaining: remaining });
        } else if (diff < 0) {
          const refund = Math.abs(diff);
          const { data: currentSpins } = await adminClient
            .from('slot_spins')
            .select('spins_remaining')
            .eq('user_id', userId)
            .eq('date', today)
            .eq('game_id', 'shared')
            .maybeSingle();

          const newBalance = (currentSpins?.spins_remaining || 0) + refund;
          await adminClient.from('slot_spins').update({ spins_remaining: newBalance }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');

          const { error: updateError } = await adminClient
            .from('bonus_hunt_gtw_bets')
            .update({ guess_amount: guessAmount, bet_amount: betAmount })
            .eq('id', existing.id);

          if (updateError) {
            await adminClient.from('slot_spins').update({ spins_remaining: newBalance - refund }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
            return json({ error: updateError.message });
          }

          return json({ success: true, updated: true, creditsRemaining: newBalance });
        } else {
          const { error: updateError } = await adminClient
            .from('bonus_hunt_gtw_bets')
            .update({ guess_amount: guessAmount })
            .eq('id', existing.id);

          if (updateError) {
            return json({ error: updateError.message });
          }

          const { data: currentSpins } = await adminClient
            .from('slot_spins')
            .select('spins_remaining')
            .eq('user_id', userId)
            .eq('date', today)
            .eq('game_id', 'shared')
            .maybeSingle();

          return json({ success: true, updated: true, creditsRemaining: currentSpins?.spins_remaining || 0 });
        }
      } else {
        const { data: remaining, error: deductError } = await adminClient.rpc('deduct_spin', {
          p_user_id: userId, p_date: today, p_bet: betAmount, p_max_spins: 200,
        });

        if (deductError || remaining === -1) {
          return json({ error: 'Not enough credits' });
        }

        const { error: insertError } = await adminClient
          .from('bonus_hunt_gtw_bets')
          .insert({ session_id: sessionId, user_id: userId, guess_amount: guessAmount, bet_amount: betAmount });

        if (insertError) {
          await adminClient.from('slot_spins').update({ spins_remaining: remaining + betAmount }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
          return json({ error: insertError.message });
        }

        return json({ success: true, creditsRemaining: remaining });
      }

    } else if (betType === 'avgx') {
      if (!session.avgx_betting_open) {
        return json({ error: 'AVG X betting is closed' });
      }
      if (betAmount < session.avgx_min_bet || betAmount > session.avgx_max_bet) {
        return json({ error: `Bet must be between ${session.avgx_min_bet} and ${session.avgx_max_bet}` });
      }
      if (!groupLetter || !['A','B','C','D','E','F','G','H','I','J'].includes(groupLetter)) {
        return json({ error: 'Invalid group letter' });
      }

      const { data: existing } = await adminClient
        .from('bonus_hunt_avgx_bets')
        .select('id, bet_amount')
        .eq('session_id', sessionId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        const diff = betAmount - existing.bet_amount;

        if (diff > 0) {
          const { data: remaining, error: deductError } = await adminClient.rpc('deduct_spin', {
            p_user_id: userId, p_date: today, p_bet: diff, p_max_spins: 200,
          });
          if (deductError || remaining === -1) {
            return json({ error: 'Not enough credits' });
          }

          const { error: updateError } = await adminClient
            .from('bonus_hunt_avgx_bets')
            .update({ group_letter: groupLetter, bet_amount: betAmount })
            .eq('id', existing.id);

          if (updateError) {
            await adminClient.from('slot_spins').update({ spins_remaining: remaining + diff }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
            return json({ error: updateError.message });
          }

          return json({ success: true, updated: true, creditsRemaining: remaining });
        } else if (diff < 0) {
          const refund = Math.abs(diff);
          const { data: currentSpins } = await adminClient
            .from('slot_spins')
            .select('spins_remaining')
            .eq('user_id', userId)
            .eq('date', today)
            .eq('game_id', 'shared')
            .maybeSingle();

          const newBalance = (currentSpins?.spins_remaining || 0) + refund;
          await adminClient.from('slot_spins').update({ spins_remaining: newBalance }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');

          const { error: updateError } = await adminClient
            .from('bonus_hunt_avgx_bets')
            .update({ group_letter: groupLetter, bet_amount: betAmount })
            .eq('id', existing.id);

          if (updateError) {
            await adminClient.from('slot_spins').update({ spins_remaining: newBalance - refund }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
            return json({ error: updateError.message });
          }

          return json({ success: true, updated: true, creditsRemaining: newBalance });
        } else {
          const { error: updateError } = await adminClient
            .from('bonus_hunt_avgx_bets')
            .update({ group_letter: groupLetter })
            .eq('id', existing.id);

          if (updateError) {
            return json({ error: updateError.message });
          }

          const { data: currentSpins } = await adminClient
            .from('slot_spins')
            .select('spins_remaining')
            .eq('user_id', userId)
            .eq('date', today)
            .eq('game_id', 'shared')
            .maybeSingle();

          return json({ success: true, updated: true, creditsRemaining: currentSpins?.spins_remaining || 0 });
        }
      } else {
        const { data: remaining, error: deductError } = await adminClient.rpc('deduct_spin', {
          p_user_id: userId, p_date: today, p_bet: betAmount, p_max_spins: 200,
        });

        if (deductError || remaining === -1) {
          return json({ error: 'Not enough credits' });
        }

        const { error: insertError } = await adminClient
          .from('bonus_hunt_avgx_bets')
          .insert({ session_id: sessionId, user_id: userId, group_letter: groupLetter, bet_amount: betAmount });

        if (insertError) {
          await adminClient.from('slot_spins').update({ spins_remaining: remaining + betAmount }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
          return json({ error: insertError.message });
        }

        return json({ success: true, creditsRemaining: remaining });
      }
    } else {
      return json({ error: 'Invalid bet type' });
    }
  } catch (error) {
    console.error('bonus-hunt-place-bet error:', error);
    return json({ error: error.message });
  }
});
