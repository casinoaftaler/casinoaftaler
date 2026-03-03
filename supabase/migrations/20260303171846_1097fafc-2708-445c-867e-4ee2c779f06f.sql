
-- Update claim_profile_section_reward: remove the LEAST cap on credits
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
  -- Validate section
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

  v_new_bonus := COALESCE(v_profile.bonus_spins_permanent, 0) + 5;

  PERFORM set_config('app.allow_profile_update', 'true', true);

  UPDATE profiles
  SET bonus_spins_permanent = v_new_bonus,
      profile_section_completed = CASE WHEN p_section = 'profile' THEN true ELSE profile_section_completed END,
      stats_section_completed = CASE WHEN p_section = 'stats' THEN true ELSE stats_section_completed END,
      favorites_section_completed = CASE WHEN p_section = 'favorites' THEN true ELSE favorites_section_completed END,
      playstyle_section_completed = CASE WHEN p_section = 'playstyle' THEN true ELSE playstyle_section_completed END
  WHERE user_id = p_user_id;

  -- Update today's spins (no cap - unlimited credits allowed)
  SELECT id, spins_remaining INTO v_spins_record
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today
  FOR UPDATE;

  IF FOUND THEN
    UPDATE slot_spins
    SET spins_remaining = v_spins_record.spins_remaining + 5
    WHERE id = v_spins_record.id;
  END IF;

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, 5, 'profile_reward', 'Profil sektion: ' || p_section);

  RETURN jsonb_build_object('success', true, 'newBonusSpins', v_new_bonus);
END;
$function$;

-- Update activate_community_spins_safe: remove credit cap
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

  SELECT id, spins_remaining
  INTO v_spins
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_today, 200, 'shared')
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

  v_new_balance := v_spins.spins_remaining + p_amount;
  UPDATE slot_spins
  SET spins_remaining = v_new_balance
  WHERE id = v_spins.id;

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, p_amount, 'community_activation', 
    'Community bonus: +' || p_amount || ' credits (fra ' || v_spins.spins_remaining || ' til ' || v_new_balance || ')');

  RETURN jsonb_build_object(
    'success', true,
    'activated', p_amount,
    'newRemaining', (v_bonus.total_earned - v_bonus.total_activated - p_amount),
    'newBalance', v_new_balance
  );
END;
$function$;
