
-- Update deduct_spin to use a shared game_id for all machines
-- This changes from per-game credits (1000 each) to a shared pool (2000 total)
CREATE OR REPLACE FUNCTION public.deduct_spin(p_user_id uuid, p_date date, p_bet integer, p_max_spins integer, p_game_id text DEFAULT 'shared')
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_remaining int;
  v_inserted boolean := false;
  v_prev_remaining int;
  v_start_value int;
  v_effective_game_id text := 'shared';
BEGIN
  -- Always use 'shared' game_id regardless of what's passed
  -- This ensures all machines share the same credit pool

  -- Try to lock today's existing row first (fast path for subsequent spins)
  SELECT spins_remaining INTO v_remaining
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_date AND game_id = v_effective_game_id
  FOR UPDATE;

  IF NOT FOUND THEN
    -- No record for today: check previous day for carry-over (check shared first, then any game)
    SELECT spins_remaining INTO v_prev_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date < p_date AND game_id = v_effective_game_id
    ORDER BY date DESC
    LIMIT 1;

    IF v_prev_remaining IS NULL THEN
      -- Also check old per-game records for migration: sum up remaining from all games on most recent day
      SELECT SUM(spins_remaining) INTO v_prev_remaining
      FROM slot_spins
      WHERE user_id = p_user_id AND date = (
        SELECT MAX(date) FROM slot_spins WHERE user_id = p_user_id AND date < p_date
      );
    END IF;

    IF v_prev_remaining IS NULL THEN
      v_start_value := p_max_spins;
    ELSIF v_prev_remaining >= p_max_spins THEN
      v_start_value := v_prev_remaining;
    ELSE
      v_start_value := p_max_spins;
    END IF;

    -- Insert today's record
    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_date, v_start_value, v_effective_game_id)
    ON CONFLICT (user_id, date, game_id) DO NOTHING;

    -- Re-lock
    SELECT spins_remaining INTO v_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_date AND game_id = v_effective_game_id
    FOR UPDATE;
  END IF;

  -- Check sufficient balance
  IF v_remaining < p_bet THEN
    RETURN -1;
  END IF;

  -- Atomically deduct
  UPDATE slot_spins
  SET spins_remaining = spins_remaining - p_bet
  WHERE user_id = p_user_id AND date = p_date AND game_id = v_effective_game_id
  RETURNING spins_remaining INTO v_remaining;

  RETURN v_remaining;
END;
$function$;

-- Also update activate_community_spins_safe to use 'shared' game_id and new 2000 cap
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
  v_max_credits integer := 2000;
  v_actual_amount integer;
BEGIN
  IF p_amount <= 0 OR p_amount > 2000 THEN
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

  v_actual_amount := LEAST(p_amount, v_max_credits - v_spins.spins_remaining);
  
  IF v_actual_amount <= 0 THEN
    RETURN jsonb_build_object('error', 'Already at maximum credits (2000)');
  END IF;

  UPDATE community_bonus_spins
  SET total_activated = total_activated + v_actual_amount
  WHERE user_id = p_user_id;

  v_new_balance := v_spins.spins_remaining + v_actual_amount;
  UPDATE slot_spins
  SET spins_remaining = v_new_balance
  WHERE id = v_spins.id;

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, v_actual_amount, 'community_activation', 
    'Community bonus: +' || v_actual_amount || ' credits (fra ' || v_spins.spins_remaining || ' til ' || v_new_balance || ')');

  RETURN jsonb_build_object(
    'success', true,
    'activated', v_actual_amount,
    'newRemaining', (v_bonus.total_earned - v_bonus.total_activated - v_actual_amount),
    'newBalance', v_new_balance
  );
END;
$function$;
