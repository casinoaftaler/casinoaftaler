
-- Atomic spin deduction RPC: initializes today's record if needed (with carry-over),
-- then deducts the bet in a single transaction with row-level locking.
-- Returns new spins_remaining, or -1 if insufficient spins.
CREATE OR REPLACE FUNCTION public.deduct_spin(
  p_user_id uuid,
  p_date date,
  p_bet int,
  p_max_spins int
) RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_remaining int;
  v_inserted boolean := false;
  v_prev_remaining int;
  v_start_value int;
BEGIN
  -- Try to lock today's existing row first (fast path for subsequent spins)
  SELECT spins_remaining INTO v_remaining
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_date
  FOR UPDATE;

  IF NOT FOUND THEN
    -- No record for today: check previous day for carry-over
    SELECT spins_remaining INTO v_prev_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date < p_date
    ORDER BY date DESC
    LIMIT 1;

    IF v_prev_remaining IS NULL THEN
      -- Brand new user, use max_spins
      v_start_value := p_max_spins;
    ELSIF v_prev_remaining >= p_max_spins THEN
      -- Carry over higher balance (gifted/rewarded credits)
      v_start_value := v_prev_remaining;
    ELSE
      -- Reset to daily max
      v_start_value := p_max_spins;
    END IF;

    -- Insert today's record (handle race condition with ON CONFLICT)
    INSERT INTO slot_spins (user_id, date, spins_remaining)
    VALUES (p_user_id, p_date, v_start_value)
    ON CONFLICT (user_id, date) DO NOTHING;

    -- Re-lock (either our insert or the winner of the race)
    SELECT spins_remaining INTO v_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_date
    FOR UPDATE;
  END IF;

  -- Check sufficient balance
  IF v_remaining < p_bet THEN
    RETURN -1;
  END IF;

  -- Atomically deduct
  UPDATE slot_spins
  SET spins_remaining = spins_remaining - p_bet
  WHERE user_id = p_user_id AND date = p_date
  RETURNING spins_remaining INTO v_remaining;

  RETURN v_remaining;
END;
$$;
