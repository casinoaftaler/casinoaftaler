
-- Atomic function to activate community bonus spins with row locking and credit cap
CREATE OR REPLACE FUNCTION public.activate_community_spins_safe(
  p_user_id uuid,
  p_amount integer,
  p_today date
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_bonus RECORD;
  v_remaining integer;
  v_spins RECORD;
  v_new_balance integer;
  v_max_credits integer := 1000;
  v_actual_amount integer;
BEGIN
  -- Validate amount
  IF p_amount <= 0 OR p_amount > 1000 THEN
    RETURN jsonb_build_object('error', 'Invalid amount');
  END IF;

  -- Lock the community bonus row to prevent concurrent activations
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

  -- Lock today's spins row (or create if missing)
  SELECT id, spins_remaining
  INTO v_spins
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today
  FOR UPDATE;

  IF NOT FOUND THEN
    -- Create today's record
    INSERT INTO slot_spins (user_id, date, spins_remaining)
    VALUES (p_user_id, p_today, 200)
    ON CONFLICT (user_id, date) DO NOTHING;

    SELECT id, spins_remaining
    INTO v_spins
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_today
    FOR UPDATE;
  END IF;

  -- Calculate actual amount considering credit cap
  v_actual_amount := LEAST(p_amount, v_max_credits - v_spins.spins_remaining);
  
  -- Don't go negative
  IF v_actual_amount <= 0 THEN
    RETURN jsonb_build_object('error', 'Already at maximum credits (1000)');
  END IF;

  -- Update community bonus spins (deduct full requested amount from pool)
  UPDATE community_bonus_spins
  SET total_activated = total_activated + v_actual_amount
  WHERE user_id = p_user_id;

  -- Update today's credits (capped)
  v_new_balance := v_spins.spins_remaining + v_actual_amount;
  UPDATE slot_spins
  SET spins_remaining = v_new_balance
  WHERE id = v_spins.id;

  -- Log
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
$$;
