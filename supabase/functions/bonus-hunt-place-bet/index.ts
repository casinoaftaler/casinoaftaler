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

    // Auth client to verify user
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
    }
    const userId = claimsData.claims.sub;

    // Service role client for operations
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const { sessionId, betType, betAmount, guessAmount, groupLetter } = body;

    if (!sessionId || !betType || !betAmount) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
    }

    if (betAmount <= 0 || !Number.isInteger(betAmount)) {
      return new Response(JSON.stringify({ error: 'Invalid bet amount' }), { status: 400, headers: corsHeaders });
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

    // Validate betting window and limits
    if (betType === 'gtw') {
      if (!session.gtw_betting_open) {
        return new Response(JSON.stringify({ error: 'GTW betting is closed' }), { status: 400, headers: corsHeaders });
      }
      if (betAmount < session.gtw_min_bet || betAmount > session.gtw_max_bet) {
        return new Response(JSON.stringify({ error: `Bet must be between ${session.gtw_min_bet} and ${session.gtw_max_bet}` }), { status: 400, headers: corsHeaders });
      }
      if (!guessAmount || guessAmount <= 0) {
        return new Response(JSON.stringify({ error: 'Invalid guess amount' }), { status: 400, headers: corsHeaders });
      }

      // Check existing bet
      const { data: existing } = await adminClient
        .from('bonus_hunt_gtw_bets')
        .select('id')
        .eq('session_id', sessionId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        return new Response(JSON.stringify({ error: 'You have already placed a GTW bet on this hunt' }), { status: 400, headers: corsHeaders });
      }
    } else if (betType === 'avgx') {
      if (!session.avgx_betting_open) {
        return new Response(JSON.stringify({ error: 'AVG X betting is closed' }), { status: 400, headers: corsHeaders });
      }
      if (betAmount < session.avgx_min_bet || betAmount > session.avgx_max_bet) {
        return new Response(JSON.stringify({ error: `Bet must be between ${session.avgx_min_bet} and ${session.avgx_max_bet}` }), { status: 400, headers: corsHeaders });
      }
      if (!groupLetter || !['A','B','C','D','E','F','G','H','I','J'].includes(groupLetter)) {
        return new Response(JSON.stringify({ error: 'Invalid group letter' }), { status: 400, headers: corsHeaders });
      }

      // Check existing bet
      const { data: existing } = await adminClient
        .from('bonus_hunt_avgx_bets')
        .select('id')
        .eq('session_id', sessionId)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        return new Response(JSON.stringify({ error: 'You have already placed an AVG X bet on this hunt' }), { status: 400, headers: corsHeaders });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Invalid bet type' }), { status: 400, headers: corsHeaders });
    }

    // Deduct credits
    const today = new Date().toISOString().split('T')[0];
    const { data: remaining, error: deductError } = await adminClient.rpc('deduct_spin', {
      p_user_id: userId,
      p_date: today,
      p_bet: betAmount,
      p_max_spins: 200,
    });

    if (deductError || remaining === -1) {
      return new Response(JSON.stringify({ error: 'Not enough credits' }), { status: 400, headers: corsHeaders });
    }

    // Place bet
    if (betType === 'gtw') {
      const { error: insertError } = await adminClient
        .from('bonus_hunt_gtw_bets')
        .insert({
          session_id: sessionId,
          user_id: userId,
          guess_amount: guessAmount,
          bet_amount: betAmount,
        });

      if (insertError) {
        // Refund credits on failure
        await adminClient.from('slot_spins').update({
          spins_remaining: remaining + betAmount,
        }).eq('user_id', userId).eq('date', today);
        return new Response(JSON.stringify({ error: insertError.message }), { status: 500, headers: corsHeaders });
      }
    } else {
      const { error: insertError } = await adminClient
        .from('bonus_hunt_avgx_bets')
        .insert({
          session_id: sessionId,
          user_id: userId,
          group_letter: groupLetter,
          bet_amount: betAmount,
        });

      if (insertError) {
        await adminClient.from('slot_spins').update({
          spins_remaining: remaining + betAmount,
        }).eq('user_id', userId).eq('date', today);
        return new Response(JSON.stringify({ error: insertError.message }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ success: true, creditsRemaining: remaining }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
