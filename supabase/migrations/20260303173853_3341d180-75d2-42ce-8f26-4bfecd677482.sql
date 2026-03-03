
-- Revert deduct_spin to use the actual p_game_id parameter instead of forcing 'shared'
CREATE OR REPLACE FUNCTION public.deduct_spin(p_user_id uuid, p_date date, p_bet integer, p_max_spins integer, p_game_id text DEFAULT 'book-of-fedesvin'::text)
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
  -- Use the actual game_id passed in
  SELECT spins_remaining INTO v_remaining
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_date AND game_id = p_game_id
  FOR UPDATE;

  IF NOT FOUND THEN
    SELECT spins_remaining INTO v_prev_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date < p_date AND game_id = p_game_id
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
    VALUES (p_user_id, p_date, v_start_value, p_game_id)
    ON CONFLICT (user_id, date, game_id) DO NOTHING;

    SELECT spins_remaining INTO v_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_date AND game_id = p_game_id
    FOR UPDATE;
  END IF;

  IF v_remaining < p_bet THEN
    RETURN -1;
  END IF;

  UPDATE slot_spins
  SET spins_remaining = spins_remaining - p_bet
  WHERE user_id = p_user_id AND date = p_date AND game_id = p_game_id
  RETURNING spins_remaining INTO v_remaining;

  RETURN v_remaining;
END;
$function$;

-- Revert activate_community_spins_safe to use per-game game_id
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

  -- Add credits to ALL game rows for today (or create book-of-fedesvin as default)
  SELECT id, spins_remaining
  INTO v_spins
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'book-of-fedesvin'
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_today, 100, 'book-of-fedesvin')
    ON CONFLICT (user_id, date, game_id) DO NOTHING;

    SELECT id, spins_remaining
    INTO v_spins
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_today AND game_id = 'book-of-fedesvin'
    FOR UPDATE;
  END IF;

  UPDATE community_bonus_spins
  SET total_activated = total_activated + p_amount
  WHERE user_id = p_user_id;

  -- Update all existing game rows for today
  UPDATE slot_spins
  SET spins_remaining = spins_remaining + p_amount
  WHERE user_id = p_user_id AND date = p_today;

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
