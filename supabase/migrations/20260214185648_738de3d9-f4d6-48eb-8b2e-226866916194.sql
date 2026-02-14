
-- Create tournaments table
CREATE TABLE public.tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  game_ids text[] NOT NULL DEFAULT '{}',
  separate_leaderboards boolean NOT NULL DEFAULT false,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'upcoming',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage tournaments"
  ON public.tournaments FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Authenticated users can read
CREATE POLICY "Authenticated users can view tournaments"
  ON public.tournaments FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Create tournament_entries table
CREATE TABLE public.tournament_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  game_id text NOT NULL,
  total_points numeric NOT NULL DEFAULT 0,
  total_spins integer NOT NULL DEFAULT 0,
  biggest_win numeric NOT NULL DEFAULT 0,
  biggest_multiplier numeric NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tournament_id, user_id, game_id)
);

-- Enable RLS
ALTER TABLE public.tournament_entries ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read
CREATE POLICY "Authenticated users can view tournament entries"
  ON public.tournament_entries FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Admins can manage (for cleanup)
CREATE POLICY "Admins can manage tournament entries"
  ON public.tournament_entries FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create the upsert RPC function
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
SET search_path = public
AS $$
DECLARE
  v_multiplier numeric;
BEGIN
  -- Calculate multiplier
  IF p_bet > 0 THEN
    v_multiplier := p_points / p_bet;
  ELSE
    v_multiplier := 0;
  END IF;

  INSERT INTO tournament_entries (tournament_id, user_id, game_id, total_points, total_spins, biggest_win, biggest_multiplier, updated_at)
  VALUES (p_tournament_id, p_user_id, p_game_id, p_points, 1, p_points, v_multiplier, now())
  ON CONFLICT (tournament_id, user_id, game_id)
  DO UPDATE SET
    total_points = tournament_entries.total_points + EXCLUDED.total_points,
    total_spins = tournament_entries.total_spins + 1,
    biggest_win = GREATEST(tournament_entries.biggest_win, EXCLUDED.biggest_win),
    biggest_multiplier = GREATEST(tournament_entries.biggest_multiplier, EXCLUDED.biggest_multiplier),
    updated_at = now();
END;
$$;
