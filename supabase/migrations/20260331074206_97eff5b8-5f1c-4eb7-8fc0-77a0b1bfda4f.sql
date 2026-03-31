
CREATE OR REPLACE FUNCTION public.update_mission_streak(p_user_id uuid, p_today date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_streak RECORD;
  v_completed_today integer;
  v_rewards jsonb := '[]'::jsonb;
  v_bonus integer;
  v_spins RECORD;
BEGIN
  SELECT COUNT(*) INTO v_completed_today
  FROM daily_dwell_rewards
  WHERE user_id = p_user_id AND reward_date = p_today;

  IF v_completed_today < 6 THEN
    RETURN jsonb_build_object('streak_updated', false, 'completed_today', v_completed_today);
  END IF;

  INSERT INTO mission_streaks (user_id, current_streak, last_completed_date)
  VALUES (p_user_id, 0, NULL)
  ON CONFLICT (user_id) DO NOTHING;

  SELECT * INTO v_streak
  FROM mission_streaks
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF v_streak.last_completed_date = p_today THEN
    RETURN jsonb_build_object(
      'streak_updated', false,
      'current_streak', v_streak.current_streak,
      'longest_streak', v_streak.longest_streak
    );
  END IF;

  IF v_streak.last_completed_date = p_today - 1 OR v_streak.last_completed_date IS NULL THEN
    UPDATE mission_streaks
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_completed_date = p_today,
        updated_at = now()
    WHERE user_id = p_user_id
    RETURNING * INTO v_streak;
  ELSE
    UPDATE mission_streaks
    SET current_streak = 1,
        last_completed_date = p_today,
        streak_3_claimed = false,
        streak_7_claimed = false,
        streak_30_claimed = false,
        updated_at = now()
    WHERE user_id = p_user_id
    RETURNING * INTO v_streak;
  END IF;

  -- 3-day streak: 2000 credits
  IF v_streak.current_streak >= 3 AND NOT v_streak.streak_3_claimed THEN
    v_bonus := 2000;
    UPDATE mission_streaks SET streak_3_claimed = true WHERE user_id = p_user_id;
    
    SELECT id, spins_remaining INTO v_spins
    FROM slot_spins WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
    FOR UPDATE;
    
    IF FOUND THEN
      UPDATE slot_spins SET spins_remaining = spins_remaining + v_bonus WHERE id = v_spins.id;
    ELSE
      INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
      VALUES (p_user_id, p_today, v_bonus, 'shared')
      ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + v_bonus;
    END IF;
    
    INSERT INTO credit_allocation_log (user_id, amount, source, note)
    VALUES (p_user_id, v_bonus, 'streak_bonus', '3-dags streak bonus');
    
    v_rewards := v_rewards || jsonb_build_object('type', '3-day', 'credits', v_bonus);
  END IF;

  -- 7-day streak: 5000 credits
  IF v_streak.current_streak >= 7 AND NOT v_streak.streak_7_claimed THEN
    v_bonus := 5000;
    UPDATE mission_streaks SET streak_7_claimed = true WHERE user_id = p_user_id;
    
    SELECT id, spins_remaining INTO v_spins
    FROM slot_spins WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
    FOR UPDATE;

    IF FOUND THEN
      UPDATE slot_spins SET spins_remaining = spins_remaining + v_bonus WHERE id = v_spins.id;
    ELSE
      INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
      VALUES (p_user_id, p_today, v_bonus, 'shared')
      ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + v_bonus;
    END IF;
    
    INSERT INTO credit_allocation_log (user_id, amount, source, note)
    VALUES (p_user_id, v_bonus, 'streak_bonus', '7-dags streak bonus');
    
    v_rewards := v_rewards || jsonb_build_object('type', '7-day', 'credits', v_bonus);
  END IF;

  -- 30-day streak: 10000 credits
  IF v_streak.current_streak >= 30 AND NOT v_streak.streak_30_claimed THEN
    v_bonus := 10000;
    UPDATE mission_streaks SET streak_30_claimed = true WHERE user_id = p_user_id;
    
    SELECT id, spins_remaining INTO v_spins
    FROM slot_spins WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
    FOR UPDATE;

    IF FOUND THEN
      UPDATE slot_spins SET spins_remaining = spins_remaining + v_bonus WHERE id = v_spins.id;
    ELSE
      INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
      VALUES (p_user_id, p_today, v_bonus, 'shared')
      ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + v_bonus;
    END IF;
    
    INSERT INTO credit_allocation_log (user_id, amount, source, note)
    VALUES (p_user_id, v_bonus, 'streak_bonus', '30-dags streak bonus');
    
    v_rewards := v_rewards || jsonb_build_object('type', '30-day', 'credits', v_bonus);
  END IF;

  RETURN jsonb_build_object(
    'streak_updated', true,
    'current_streak', v_streak.current_streak,
    'longest_streak', v_streak.longest_streak,
    'rewards', v_rewards
  );
END;
$function$;
