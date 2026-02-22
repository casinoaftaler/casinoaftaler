import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const twitchUsername = url.searchParams.get('user')?.toLowerCase()?.trim();
    const cmd = url.searchParams.get('cmd')?.toLowerCase()?.trim();
    const argsRaw = url.searchParams.get('args')?.trim() || '';

    if (!twitchUsername) return new Response('❌ Mangler brugernavn.');
    if (!cmd || !['gtw', 'avgx'].includes(cmd)) return new Response('❌ Ugyldig kommando.');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    // Look up user by twitch username
    const { data: profile, error: profileError } = await admin
      .from('profiles')
      .select('user_id, twitch_username')
      .ilike('twitch_username', twitchUsername)
      .maybeSingle();

    if (profileError || !profile) {
      return new Response(`❌ @${twitchUsername}, din Twitch-konto er ikke tilknyttet. Log ind på casinoaftaler.dk først.`);
    }

    const userId = profile.user_id;

    if (cmd === 'gtw') {
      // Parse args: <guess_amount> [bet_amount]
      const parts = argsRaw.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return new Response(`❌ @${twitchUsername}, brug: !gtw <beløb> [credits]. Fx: !gtw 45000`);

      const guessAmount = parseFloat(parts[0]);
      if (isNaN(guessAmount) || guessAmount <= 0) return new Response(`❌ @${twitchUsername}, ugyldigt gæt-beløb.`);

      // Find latest session
      const { data: session } = await admin
        .from('bonus_hunt_sessions')
        .select('*')
        .in('status', ['upcoming', 'active'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!session) return new Response(`⏳ @${twitchUsername}, der er ingen aktiv bonus hunt lige nu. Vent venligst!`);
      if (!session.gtw_betting_open) return new Response(`⏳ @${twitchUsername}, GTW betting er lukket lige nu. Vent på at den åbner!`);

      const betAmount = parts.length >= 2 ? parseInt(parts[1]) : session.gtw_min_bet;
      if (isNaN(betAmount) || betAmount <= 0 || !Number.isInteger(betAmount)) {
        return new Response(`❌ @${twitchUsername}, ugyldigt credit-beløb.`);
      }
      if (betAmount < session.gtw_min_bet || betAmount > session.gtw_max_bet) {
        return new Response(`❌ @${twitchUsername}, bet skal være mellem ${session.gtw_min_bet} og ${session.gtw_max_bet} credits.`);
      }

      // Check existing bet
      const { data: existing } = await admin
        .from('bonus_hunt_gtw_bets')
        .select('id')
        .eq('session_id', session.id)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) return new Response(`❌ @${twitchUsername}, du har allerede placeret et GTW bet på denne hunt.`);

      // Deduct credits
      const today = new Date().toISOString().split('T')[0];
      const { data: remaining, error: deductError } = await admin.rpc('deduct_spin', {
        p_user_id: userId,
        p_date: today,
        p_bet: betAmount,
        p_max_spins: 200,
      });

      if (deductError || remaining === -1) {
        return new Response(`❌ @${twitchUsername}, ikke nok credits.`);
      }

      // Place bet
      const { error: insertError } = await admin
        .from('bonus_hunt_gtw_bets')
        .insert({
          session_id: session.id,
          user_id: userId,
          guess_amount: guessAmount,
          bet_amount: betAmount,
        });

      if (insertError) {
        // Refund
        await admin.from('slot_spins').update({
          spins_remaining: remaining + betAmount,
        }).eq('user_id', userId).eq('date', today);
        return new Response(`❌ @${twitchUsername}, fejl ved bet. Credits refunderet.`);
      }

      return new Response(`✅ @${twitchUsername}, dit GTW bet er placeret! Gæt: ${guessAmount.toLocaleString('da-DK')} kr (${betAmount} credits brugt)`);

    } else if (cmd === 'avgx') {
      // Parse args: <group_letter> [bet_amount]
      const parts = argsRaw.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return new Response(`❌ @${twitchUsername}, brug: !avgx <gruppe> [credits]. Fx: !avgx F`);

      const groupLetter = parts[0].toUpperCase();
      const validGroups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      if (!validGroups.includes(groupLetter)) {
        return new Response(`❌ @${twitchUsername}, ugyldig gruppe. Vælg A-J.`);
      }

      // Find latest session
      const { data: session } = await admin
        .from('bonus_hunt_sessions')
        .select('*')
        .in('status', ['upcoming', 'active'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!session) return new Response(`⏳ @${twitchUsername}, der er ingen aktiv bonus hunt lige nu. Vent venligst!`);
      if (!session.avgx_betting_open) return new Response(`⏳ @${twitchUsername}, AVG X betting er lukket lige nu. Vent på at den åbner!`);

      const betAmount = parts.length >= 2 ? parseInt(parts[1]) : session.avgx_min_bet;
      if (isNaN(betAmount) || betAmount <= 0 || !Number.isInteger(betAmount)) {
        return new Response(`❌ @${twitchUsername}, ugyldigt credit-beløb.`);
      }
      if (betAmount < session.avgx_min_bet || betAmount > session.avgx_max_bet) {
        return new Response(`❌ @${twitchUsername}, bet skal være mellem ${session.avgx_min_bet} og ${session.avgx_max_bet} credits.`);
      }

      // Check existing bet
      const { data: existing } = await admin
        .from('bonus_hunt_avgx_bets')
        .select('id')
        .eq('session_id', session.id)
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) return new Response(`❌ @${twitchUsername}, du har allerede placeret et AVG X bet på denne hunt.`);

      // Deduct credits
      const today = new Date().toISOString().split('T')[0];
      const { data: remaining, error: deductError } = await admin.rpc('deduct_spin', {
        p_user_id: userId,
        p_date: today,
        p_bet: betAmount,
        p_max_spins: 200,
      });

      if (deductError || remaining === -1) {
        return new Response(`❌ @${twitchUsername}, ikke nok credits.`);
      }

      // Place bet
      const { error: insertError } = await admin
        .from('bonus_hunt_avgx_bets')
        .insert({
          session_id: session.id,
          user_id: userId,
          group_letter: groupLetter,
          bet_amount: betAmount,
        });

      if (insertError) {
        // Refund
        await admin.from('slot_spins').update({
          spins_remaining: remaining + betAmount,
        }).eq('user_id', userId).eq('date', today);
        return new Response(`❌ @${twitchUsername}, fejl ved bet. Credits refunderet.`);
      }

      return new Response(`✅ @${twitchUsername}, dit AVG X bet er placeret! Gruppe: ${groupLetter} (${betAmount} credits brugt)`);
    }

    return new Response('❌ Ukendt kommando.');
  } catch (error) {
    return new Response('❌ Der opstod en fejl. Prøv igen senere.');
  }
});
