
-- 1. Update deduct_spin to always use game_id = 'shared'
CREATE OR REPLACE FUNCTION public.deduct_spin(p_user_id uuid, p_date date, p_bet integer, p_max_spins integer, p_game_id text DEFAULT 'shared'::text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_remaining int;
  v_prev_remaining int;
  v_start_value int;
BEGIN
  -- Always use 'shared' regardless of what p_game_id is passed
  SELECT spins_remaining INTO v_remaining
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_date AND game_id = 'shared'
  FOR UPDATE;

  IF NOT FOUND THEN
    SELECT spins_remaining INTO v_prev_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date < p_date AND game_id = 'shared'
    ORDER BY date DESC
    LIMIT 1;

    IF v_prev_remaining IS NULL THEN
      v_start_value := p_max_spins;
    ELSIF v_prev_remaining >= p_max_spins THEN
      v_start_value := v_prev_remaining;
    ELSE
      v_start_value := p_max_spins;
    END IF;

    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_date, v_start_value, 'shared')
    ON CONFLICT (user_id, date, game_id) DO NOTHING;

    SELECT spins_remaining INTO v_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_date AND game_id = 'shared'
    FOR UPDATE;
  END IF;

  IF v_remaining < p_bet THEN
    RETURN -1;
  END IF;

  UPDATE slot_spins
  SET spins_remaining = spins_remaining - p_bet
  WHERE user_id = p_user_id AND date = p_date AND game_id = 'shared'
  RETURNING spins_remaining INTO v_remaining;

  RETURN v_remaining;
END;
$function$;

-- 2. Update claim_profile_section_reward to award 50 credits instead of 5, using game_id = 'shared'
CREATE OR REPLACE FUNCTION public.claim_profile_section_reward(p_user_id uuid, p_section text, p_today date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_profile RECORD;
  v_completed_col text;
  v_new_bonus int;
  v_spins_record RECORD;
BEGIN
  IF p_section NOT IN ('profile', 'stats', 'favorites', 'playstyle') THEN
    RETURN jsonb_build_object('error', 'Invalid section');
  END IF;

  PERFORM pg_advisory_xact_lock(
    hashtext('profile_reward'),
    hashtext(p_user_id::text || '_' || p_section)
  );

  v_completed_col := p_section || '_section_completed';

  SELECT bonus_spins_permanent,
         profile_section_completed,
         stats_section_completed,
         favorites_section_completed,
         playstyle_section_completed
  INTO v_profile
  FROM profiles
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Profile not found');
  END IF;

  IF (v_completed_col = 'profile_section_completed' AND v_profile.profile_section_completed) OR
     (v_completed_col = 'stats_section_completed' AND v_profile.stats_section_completed) OR
     (v_completed_col = 'favorites_section_completed' AND v_profile.favorites_section_completed) OR
     (v_completed_col = 'playstyle_section_completed' AND v_profile.playstyle_section_completed) THEN
    RETURN jsonb_build_object('error', 'Section already completed');
  END IF;

  v_new_bonus := COALESCE(v_profile.bonus_spins_permanent, 0) + 50;

  PERFORM set_config('app.allow_profile_update', 'true', true);

  UPDATE profiles
  SET bonus_spins_permanent = v_new_bonus,
      profile_section_completed = CASE WHEN p_section = 'profile' THEN true ELSE profile_section_completed END,
      stats_section_completed = CASE WHEN p_section = 'stats' THEN true ELSE stats_section_completed END,
      favorites_section_completed = CASE WHEN p_section = 'favorites' THEN true ELSE favorites_section_completed END,
      playstyle_section_completed = CASE WHEN p_section = 'playstyle' THEN true ELSE playstyle_section_completed END
  WHERE user_id = p_user_id;

  -- Update today's shared spins
  SELECT id, spins_remaining INTO v_spins_record
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
  FOR UPDATE;

  IF FOUND THEN
    UPDATE slot_spins
    SET spins_remaining = v_spins_record.spins_remaining + 50
    WHERE id = v_spins_record.id;
  END IF;

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, 50, 'profile_reward', 'Profil sektion: ' || p_section);

  RETURN jsonb_build_object('success', true, 'newBonusSpins', v_new_bonus);
END;
$function$;

-- 3. Update activate_community_spins_safe to use game_id = 'shared'
CREATE OR REPLACE FUNCTION public.activate_community_spins_safe(p_user_id uuid, p_amount integer, p_today date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_bonus RECORD;
  v_remaining integer;
  v_spins RECORD;
  v_new_balance integer;
BEGIN
  IF p_amount <= 0 THEN
    RETURN jsonb_build_object('error', 'Invalid amount');
  END IF;

  SELECT total_earned, total_activated
  INTO v_bonus
  FROM community_bonus_spins
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'No community bonus spins found');
  END IF;

  v_remaining := v_bonus.total_earned - v_bonus.total_activated;

  IF p_amount > v_remaining THEN
    RETURN jsonb_build_object('error', 'Not enough spins. Available: ' || v_remaining);
  END IF;

  -- Use shared game_id
  SELECT id, spins_remaining
  INTO v_spins
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_today, 0, 'shared')
    ON CONFLICT (user_id, date, game_id) DO NOTHING;

    SELECT id, spins_remaining
    INTO v_spins
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
    FOR UPDATE;
  END IF;

  UPDATE community_bonus_spins
  SET total_activated = total_activated + p_amount
  WHERE user_id = p_user_id;

  -- Only update the shared row
  UPDATE slot_spins
  SET spins_remaining = spins_remaining + p_amount
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared';

  v_new_balance := v_spins.spins_remaining + p_amount;

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, p_amount, 'community_activation', 
    'Community bonus: +' || p_amount || ' credits');

  RETURN jsonb_build_object(
    'success', true,
    'activated', p_amount,
    'newRemaining', (v_bonus.total_earned - v_bonus.total_activated - p_amount),
    'newBalance', v_new_balance
  );
END;
$function$;

-- 4. Update reward_community_bonus_spins trigger to award 500 instead of 50
CREATE OR REPLACE FUNCTION public.reward_community_bonus_spins()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_record community_bonus_spins%ROWTYPE;
BEGIN
  IF NEW.status = 'approved' AND (OLD.status IS DISTINCT FROM 'approved') THEN
    INSERT INTO community_bonus_spins (user_id)
      VALUES (NEW.user_id)
      ON CONFLICT (user_id) DO NOTHING;

    SELECT * INTO v_record
      FROM community_bonus_spins
      WHERE user_id = NEW.user_id
      FOR UPDATE;

    IF v_record.rewarded_clips_count < 5 THEN
      UPDATE community_bonus_spins
        SET total_earned = total_earned + 500,
            rewarded_clips_count = rewarded_clips_count + 1
        WHERE user_id = NEW.user_id;

      INSERT INTO community_bonus_spins_log (user_id, clip_id, event_type, amount)
        VALUES (NEW.user_id, NEW.id, 'reward', 500);
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- 5. Update site_settings daily spins to 2000
UPDATE site_settings SET value = '2000' WHERE key = 'slot_daily_spins';
