import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    const twitchUsername = url.searchParams.get('user')?.toLowerCase()?.trim();
    const cmd = url.searchParams.get('cmd')?.toLowerCase()?.trim();
    const argsRaw = url.searchParams.get('args')?.trim() || '';

    if (!twitchUsername) return new Response('Mangler brugernavn.');
    if (!cmd || (cmd !== 'gtw' && cmd !== 'avgx')) return new Response('Ugyldig kommando.');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    const { data: profile } = await admin
      .from('profiles')
      .select('user_id, twitch_username')
      .ilike('twitch_username', twitchUsername)
      .maybeSingle();

    if (!profile) {
      return new Response('@' + twitchUsername + ', din Twitch-konto er ikke tilknyttet. Log ind paa casinoaftaler.dk foerst.');
    }

    const userId = profile.user_id;
    const today = new Date().toISOString().split('T')[0];

    const { data: session } = await admin
      .from('bonus_hunt_sessions')
      .select('*')
      .in('status', ['upcoming', 'active'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!session) return new Response('@' + twitchUsername + ', ingen aktiv bonus hunt lige nu.');

    if (cmd === 'gtw') {
      if (!session.gtw_betting_open) return new Response('@' + twitchUsername + ', GTW betting er lukket.');
      const parts = argsRaw.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return new Response('@' + twitchUsername + ', brug: !gtw <beloeb> [credits]');
      const guessAmount = parseFloat(parts[0]);
      if (isNaN(guessAmount) || guessAmount <= 0) return new Response('@' + twitchUsername + ', ugyldigt gaet.');
      const betAmount = parts.length >= 2 ? parseInt(parts[1]) : session.gtw_min_bet;
      if (isNaN(betAmount) || betAmount <= 0) return new Response('@' + twitchUsername + ', ugyldigt credit-beloeb.');
      if (betAmount < session.gtw_min_bet || betAmount > session.gtw_max_bet) {
        return new Response('@' + twitchUsername + ', bet mellem ' + session.gtw_min_bet + '-' + session.gtw_max_bet + ' credits.');
      }
      const { data: existing } = await admin.from('bonus_hunt_gtw_bets').select('id, bet_amount').eq('session_id', session.id).eq('user_id', userId).maybeSingle();
      if (existing) {
        const diff = betAmount - existing.bet_amount;
        if (diff > 0) {
          const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: diff, p_max_spins: 200 });
          if (de || rem === -1) return new Response('@' + twitchUsername + ', ikke nok credits.');
          const { error: ue } = await admin.from('bonus_hunt_gtw_bets').update({ guess_amount: guessAmount, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: rem + diff }).eq('user_id', userId).eq('date', today); return new Response('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else if (diff < 0) {
          const refund = Math.abs(diff);
          const { data: cs } = await admin.from('slot_spins').select('spins_remaining').eq('user_id', userId).eq('date', today).maybeSingle();
          const nb = (cs?.spins_remaining || 0) + refund;
          await admin.from('slot_spins').update({ spins_remaining: nb }).eq('user_id', userId).eq('date', today);
          const { error: ue } = await admin.from('bonus_hunt_gtw_bets').update({ guess_amount: guessAmount, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: nb - refund }).eq('user_id', userId).eq('date', today); return new Response('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else {
          await admin.from('bonus_hunt_gtw_bets').update({ guess_amount: guessAmount }).eq('id', existing.id);
        }
        return new Response('@' + twitchUsername + ', GTW bet opdateret! Gaet: ' + guessAmount + ' kr (' + betAmount + ' credits)');
      } else {
        const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: betAmount, p_max_spins: 200 });
        if (de || rem === -1) return new Response('@' + twitchUsername + ', ikke nok credits.');
        const { error: ie } = await admin.from('bonus_hunt_gtw_bets').insert({ session_id: session.id, user_id: userId, guess_amount: guessAmount, bet_amount: betAmount });
        if (ie) { await admin.from('slot_spins').update({ spins_remaining: rem + betAmount }).eq('user_id', userId).eq('date', today); return new Response('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        return new Response('@' + twitchUsername + ', GTW bet placeret! Gaet: ' + guessAmount + ' kr (' + betAmount + ' credits brugt)');
      }
    }

    if (cmd === 'avgx') {
      if (!session.avgx_betting_open) return new Response('@' + twitchUsername + ', AVG X betting er lukket.');
      const parts = argsRaw.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return new Response('@' + twitchUsername + ', brug: !avgx <gruppe> [credits]');
      const groupLetter = parts[0].toUpperCase();
      if (!['A','B','C','D','E','F','G','H','I','J'].includes(groupLetter)) return new Response('@' + twitchUsername + ', ugyldig gruppe. Vaelg A-J.');
      const betAmount = parts.length >= 2 ? parseInt(parts[1]) : session.avgx_min_bet;
      if (isNaN(betAmount) || betAmount <= 0) return new Response('@' + twitchUsername + ', ugyldigt credit-beloeb.');
      if (betAmount < session.avgx_min_bet || betAmount > session.avgx_max_bet) {
        return new Response('@' + twitchUsername + ', bet mellem ' + session.avgx_min_bet + '-' + session.avgx_max_bet + ' credits.');
      }
      const { data: existing } = await admin.from('bonus_hunt_avgx_bets').select('id, bet_amount').eq('session_id', session.id).eq('user_id', userId).maybeSingle();
      if (existing) {
        const diff = betAmount - existing.bet_amount;
        if (diff > 0) {
          const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: diff, p_max_spins: 200 });
          if (de || rem === -1) return new Response('@' + twitchUsername + ', ikke nok credits.');
          const { error: ue } = await admin.from('bonus_hunt_avgx_bets').update({ group_letter: groupLetter, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: rem + diff }).eq('user_id', userId).eq('date', today); return new Response('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else if (diff < 0) {
          const refund = Math.abs(diff);
          const { data: cs } = await admin.from('slot_spins').select('spins_remaining').eq('user_id', userId).eq('date', today).maybeSingle();
          const nb = (cs?.spins_remaining || 0) + refund;
          await admin.from('slot_spins').update({ spins_remaining: nb }).eq('user_id', userId).eq('date', today);
          const { error: ue } = await admin.from('bonus_hunt_avgx_bets').update({ group_letter: groupLetter, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: nb - refund }).eq('user_id', userId).eq('date', today); return new Response('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else {
          await admin.from('bonus_hunt_avgx_bets').update({ group_letter: groupLetter }).eq('id', existing.id);
        }
        return new Response('@' + twitchUsername + ', AVG X bet opdateret! Gruppe: ' + groupLetter + ' (' + betAmount + ' credits)');
      } else {
        const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: betAmount, p_max_spins: 200 });
        if (de || rem === -1) return new Response('@' + twitchUsername + ', ikke nok credits.');
        const { error: ie } = await admin.from('bonus_hunt_avgx_bets').insert({ session_id: session.id, user_id: userId, group_letter: groupLetter, bet_amount: betAmount });
        if (ie) { await admin.from('slot_spins').update({ spins_remaining: rem + betAmount }).eq('user_id', userId).eq('date', today); return new Response('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        return new Response('@' + twitchUsername + ', AVG X bet placeret! Gruppe: ' + groupLetter + ' (' + betAmount + ' credits brugt)');
      }
    }

    return new Response('Ukendt kommando.');
  } catch (_e) {
    return new Response('Der opstod en fejl.');
  }
});
