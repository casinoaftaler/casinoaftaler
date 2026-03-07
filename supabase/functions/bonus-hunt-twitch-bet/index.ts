import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const utf8 = { 'Content-Type': 'text/plain; charset=utf-8' };
const reply = (msg: string) => new Response(msg, { headers: utf8 });

Deno.serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    console.log('Full URL:', req.url);
    console.log('All params:', Object.fromEntries(url.searchParams.entries()));

    const twitchUsername = (url.searchParams.get('user') || url.searchParams.get('sender'))?.toLowerCase()?.trim();
    const cmd = url.searchParams.get('cmd')?.toLowerCase()?.trim();

    let argsRaw = url.searchParams.get('args')?.trim() || '';
    if (!argsRaw || argsRaw.includes('$(')) {
      const arg1 = url.searchParams.get('arg1')?.trim() || '';
      const arg2 = url.searchParams.get('arg2')?.trim() || '';
      argsRaw = [arg1, arg2].filter(Boolean).join(' ');
    }

    if (!twitchUsername || twitchUsername.includes('$(')) return reply('Mangler brugernavn.');
    if (!cmd || !['gtw', 'avgx', 'credits'].includes(cmd)) return reply('@' + (twitchUsername || 'bruger') + ', ugyldige kommandoer: !gtw <beløb> [credits] | !avgx <gruppe> [credits] | !credits');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceRoleKey);

    const { data: profile } = await admin
      .from('profiles')
      .select('user_id, twitch_username')
      .ilike('twitch_username', twitchUsername)
      .maybeSingle();

    if (!profile) {
      return reply('@' + twitchUsername + ', din Twitch-konto er ikke tilknyttet. Log ind på casinoaftaler.dk først.');
    }

    const userId = profile.user_id;
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

    if (cmd === 'credits') {
      const { data: spins } = await admin.from('slot_spins').select('spins_remaining').eq('user_id', userId).eq('date', today).maybeSingle();
      const credits = spins?.spins_remaining ?? 0;
      return reply('@' + twitchUsername + ', du har ' + credits + ' credits i dag.');
    }

    const { data: session } = await admin
      .from('bonus_hunt_sessions')
      .select('*')
      .in('status', ['upcoming', 'active'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!session) return reply('@' + twitchUsername + ', ingen aktiv bonus hunt lige nu.');

    if (cmd === 'gtw') {
      if (!session.gtw_betting_open) return reply('@' + twitchUsername + ', GTW betting er lukket.');
      const parts = argsRaw.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return reply('@' + twitchUsername + ', skriv: !gtw (gæt) (bet) — Eksempel: !gtw 45000 10');
      const guessAmount = parseFloat(parts[0]);
      if (isNaN(guessAmount) || guessAmount <= 0) return reply('@' + twitchUsername + ', skriv: !gtw (gæt) (bet) — Eksempel: !gtw 45000 10');
      const betAmount = parts.length >= 2 ? parseInt(parts[1]) : session.gtw_min_bet;
      if (isNaN(betAmount) || betAmount <= 0) return reply('@' + twitchUsername + ', ugyldigt credit-beløb. Skriv et tal, f.eks. !gtw 45000 10');
      if (betAmount < session.gtw_min_bet || betAmount > session.gtw_max_bet) {
        return reply('@' + twitchUsername + ', credits skal være mellem ' + session.gtw_min_bet + '-' + session.gtw_max_bet + '. Eksempel: !gtw 45000 ' + session.gtw_min_bet);
      }
      const { data: existing } = await admin.from('bonus_hunt_gtw_bets').select('id, bet_amount').eq('session_id', session.id).eq('user_id', userId).maybeSingle();
      if (existing) {
        const diff = betAmount - existing.bet_amount;
        if (diff > 0) {
          const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: diff, p_max_spins: 200, p_game_id: 'shared' });
          if (de || rem === -1) return reply('@' + twitchUsername + ', ikke nok credits.');
          const { error: ue } = await admin.from('bonus_hunt_gtw_bets').update({ guess_amount: guessAmount, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: rem + diff }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared'); return reply('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else if (diff < 0) {
          const refund = Math.abs(diff);
          const { data: cs } = await admin.from('slot_spins').select('spins_remaining').eq('user_id', userId).eq('date', today).eq('game_id', 'shared').maybeSingle();
          const nb = (cs?.spins_remaining || 0) + refund;
          await admin.from('slot_spins').update({ spins_remaining: nb }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared');
          const { error: ue } = await admin.from('bonus_hunt_gtw_bets').update({ guess_amount: guessAmount, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: nb - refund }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared'); return reply('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else {
          await admin.from('bonus_hunt_gtw_bets').update({ guess_amount: guessAmount }).eq('id', existing.id);
        }
        return reply('@' + twitchUsername + ', GTW bet opdateret! Gæt: ' + guessAmount + ' kr (' + betAmount + ' credits)');
      } else {
        const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: betAmount, p_max_spins: 200, p_game_id: 'shared' });
        if (de || rem === -1) return reply('@' + twitchUsername + ', ikke nok credits.');
        const { error: ie } = await admin.from('bonus_hunt_gtw_bets').insert({ session_id: session.id, user_id: userId, guess_amount: guessAmount, bet_amount: betAmount });
        if (ie) { await admin.from('slot_spins').update({ spins_remaining: rem + betAmount }).eq('user_id', userId).eq('date', today).eq('game_id', 'shared'); return reply('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        return reply('@' + twitchUsername + ', GTW bet placeret! Gæt: ' + guessAmount + ' kr (' + betAmount + ' credits brugt)');
      }
    }

    if (cmd === 'avgx') {
      if (!session.avgx_betting_open) return reply('@' + twitchUsername + ', AVG X betting er lukket.');
      const parts = argsRaw.split(/\s+/).filter(Boolean);
      if (parts.length === 0) return reply('@' + twitchUsername + ', skriv: !avgx <gruppe> [credits] — Eksempel: !avgx A eller !avgx B 10');
      const groupLetter = parts[0].toUpperCase();
      if (!['A','B','C','D','E','F','G','H','I','J'].includes(groupLetter)) return reply('@' + twitchUsername + ', ugyldig gruppe. Vælg A-J. Eksempel: !avgx A');
      const betAmount = parts.length >= 2 ? parseInt(parts[1]) : session.avgx_min_bet;
      if (isNaN(betAmount) || betAmount <= 0) return reply('@' + twitchUsername + ', ugyldigt credit-beløb. Skriv et tal, f.eks. !avgx A 10');
      if (betAmount < session.avgx_min_bet || betAmount > session.avgx_max_bet) {
        return reply('@' + twitchUsername + ', credits skal være mellem ' + session.avgx_min_bet + '-' + session.avgx_max_bet + '. Eksempel: !avgx A ' + session.avgx_min_bet);
      }
      const { data: existing } = await admin.from('bonus_hunt_avgx_bets').select('id, bet_amount').eq('session_id', session.id).eq('user_id', userId).maybeSingle();
      if (existing) {
        const diff = betAmount - existing.bet_amount;
        if (diff > 0) {
          const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: diff, p_max_spins: 200 });
          if (de || rem === -1) return reply('@' + twitchUsername + ', ikke nok credits.');
          const { error: ue } = await admin.from('bonus_hunt_avgx_bets').update({ group_letter: groupLetter, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: rem + diff }).eq('user_id', userId).eq('date', today); return reply('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else if (diff < 0) {
          const refund = Math.abs(diff);
          const { data: cs } = await admin.from('slot_spins').select('spins_remaining').eq('user_id', userId).eq('date', today).maybeSingle();
          const nb = (cs?.spins_remaining || 0) + refund;
          await admin.from('slot_spins').update({ spins_remaining: nb }).eq('user_id', userId).eq('date', today);
          const { error: ue } = await admin.from('bonus_hunt_avgx_bets').update({ group_letter: groupLetter, bet_amount: betAmount }).eq('id', existing.id);
          if (ue) { await admin.from('slot_spins').update({ spins_remaining: nb - refund }).eq('user_id', userId).eq('date', today); return reply('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        } else {
          await admin.from('bonus_hunt_avgx_bets').update({ group_letter: groupLetter }).eq('id', existing.id);
        }
        return reply('@' + twitchUsername + ', AVG X bet opdateret! Gruppe: ' + groupLetter + ' (' + betAmount + ' credits)');
      } else {
        const { data: rem, error: de } = await admin.rpc('deduct_spin', { p_user_id: userId, p_date: today, p_bet: betAmount, p_max_spins: 200 });
        if (de || rem === -1) return reply('@' + twitchUsername + ', ikke nok credits.');
        const { error: ie } = await admin.from('bonus_hunt_avgx_bets').insert({ session_id: session.id, user_id: userId, group_letter: groupLetter, bet_amount: betAmount });
        if (ie) { await admin.from('slot_spins').update({ spins_remaining: rem + betAmount }).eq('user_id', userId).eq('date', today); return reply('@' + twitchUsername + ', fejl. Credits refunderet.'); }
        return reply('@' + twitchUsername + ', AVG X bet placeret! Gruppe: ' + groupLetter + ' (' + betAmount + ' credits brugt)');
      }
    }

    return reply('Ukendt kommando.');
  } catch (_e) {
    return reply('Der opstod en fejl.');
  }
});