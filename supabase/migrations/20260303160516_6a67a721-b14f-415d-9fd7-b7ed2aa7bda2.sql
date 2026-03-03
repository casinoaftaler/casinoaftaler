
-- Add game_id column to slot_spins with a default for existing records
ALTER TABLE public.slot_spins ADD COLUMN game_id text NOT NULL DEFAULT 'book-of-fedesvin';

-- Drop old unique constraint (user_id, date)
ALTER TABLE public.slot_spins DROP CONSTRAINT IF EXISTS slot_spins_user_id_date_key;

-- Create new unique constraint (user_id, date, game_id)
ALTER TABLE public.slot_spins ADD CONSTRAINT slot_spins_user_id_date_game_id_key UNIQUE (user_id, date, game_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_slot_spins_user_date_game ON public.slot_spins (user_id, date, game_id);

-- Update deduct_spin function to accept game_id parameter
CREATE OR REPLACE FUNCTION public.deduct_spin(p_user_id uuid, p_date date, p_bet integer, p_max_spins integer, p_game_id text DEFAULT 'book-of-fedesvin')
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
BEGIN
  -- Try to lock today's existing row first (fast path for subsequent spins)
  SELECT spins_remaining INTO v_remaining
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_date AND game_id = p_game_id
  FOR UPDATE;

  IF NOT FOUND THEN
    -- No record for today+game: check previous day for carry-over
    SELECT spins_remaining INTO v_prev_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date < p_date AND game_id = p_game_id
    ORDER BY date DESC
    LIMIT 1;

    IF v_prev_remaining IS NULL THEN
      -- Brand new user/game, use max_spins
      v_start_value := p_max_spins;
    ELSIF v_prev_remaining >= p_max_spins THEN
      -- Carry over higher balance (gifted/rewarded credits)
      v_start_value := v_prev_remaining;
    ELSE
      -- Reset to daily max
      v_start_value := p_max_spins;
    END IF;

    -- Insert today's record (handle race condition with ON CONFLICT)
    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_date, v_start_value, p_game_id)
    ON CONFLICT (user_id, date, game_id) DO NOTHING;

    -- Re-lock (either our insert or the winner of the race)
    SELECT spins_remaining INTO v_remaining
    FROM slot_spins
    WHERE user_id = p_user_id AND date = p_date AND game_id = p_game_id
    FOR UPDATE;
  END IF;

  -- Check sufficient balance
  IF v_remaining < p_bet THEN
    RETURN -1;
  END IF;

  -- Atomically deduct
  UPDATE slot_spins
  SET spins_remaining = spins_remaining - p_bet
  WHERE user_id = p_user_id AND date = p_date AND game_id = p_game_id
  RETURNING spins_remaining INTO v_remaining;

  RETURN v_remaining;
END;
$function$;
