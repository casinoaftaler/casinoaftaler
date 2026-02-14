
-- Add max_credits column to tournaments
ALTER TABLE public.tournaments ADD COLUMN max_credits integer DEFAULT NULL;

-- Add total_credits_used column to tournament_entries
ALTER TABLE public.tournament_entries ADD COLUMN total_credits_used numeric NOT NULL DEFAULT 0;

-- Replace upsert_tournament_entry to enforce credit limits
CREATE OR REPLACE FUNCTION public.upsert_tournament_entry(
  p_tournament_id uuid,
  p_user_id uuid,
  p_game_id text,
  p_points numeric,
  p_bet integer,
  p_is_bonus boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_multiplier numeric;
  v_max_credits integer;
  v_current_used numeric;
BEGIN
  -- Calculate multiplier
  IF p_bet > 0 THEN
    v_multiplier := p_points / p_bet;
  ELSE
    v_multiplier := 0;
  END IF;

  -- Check credit limit
  SELECT max_credits INTO v_max_credits FROM tournaments WHERE id = p_tournament_id;

  IF v_max_credits IS NOT NULL THEN
    SELECT COALESCE(total_credits_used, 0) INTO v_current_used
    FROM tournament_entries
    WHERE tournament_id = p_tournament_id AND user_id = p_user_id AND game_id = p_game_id;

    -- If user has reached the limit, skip
    IF COALESCE(v_current_used, 0) + p_bet > v_max_credits THEN
      RETURN;
    END IF;
  END IF;

  INSERT INTO tournament_entries (tournament_id, user_id, game_id, total_points, total_spins, biggest_win, biggest_multiplier, total_credits_used, updated_at)
  VALUES (p_tournament_id, p_user_id, p_game_id, p_points, 1, p_points, v_multiplier, p_bet, now())
  ON CONFLICT (tournament_id, user_id, game_id)
  DO UPDATE SET
    total_points = tournament_entries.total_points + EXCLUDED.total_points,
    total_spins = tournament_entries.total_spins + 1,
    biggest_win = GREATEST(tournament_entries.biggest_win, EXCLUDED.biggest_win),
    biggest_multiplier = GREATEST(tournament_entries.biggest_multiplier, EXCLUDED.biggest_multiplier),
    total_credits_used = tournament_entries.total_credits_used + EXCLUDED.total_credits_used,
    updated_at = now();
END;
$function$;
