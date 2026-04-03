
-- Raffles table
CREATE TABLE public.raffles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prize_credits integer NOT NULL DEFAULT 500,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL DEFAULT (now() + interval '30 minutes'),
  winner_id uuid,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.raffles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view raffles"
  ON public.raffles FOR SELECT USING (true);

CREATE POLICY "Admins can manage raffles"
  ON public.raffles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Raffle entries table
CREATE TABLE public.raffle_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raffle_id uuid NOT NULL REFERENCES public.raffles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(raffle_id, user_id)
);

ALTER TABLE public.raffle_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view raffle entries"
  ON public.raffle_entries FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join raffles"
  ON public.raffle_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Enable realtime for raffles
ALTER PUBLICATION supabase_realtime ADD TABLE public.raffles;

-- Index for fast active raffle lookup
CREATE INDEX idx_raffles_status_ends ON public.raffles (status, ends_at);
CREATE INDEX idx_raffle_entries_raffle ON public.raffle_entries (raffle_id);

-- settle_raffle: pick random winner, award credits
CREATE OR REPLACE FUNCTION public.settle_raffle(p_raffle_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_raffle RECORD;
  v_winner_id uuid;
  v_today date := (now() AT TIME ZONE 'Europe/Copenhagen')::date;
BEGIN
  SELECT * INTO v_raffle FROM raffles WHERE id = p_raffle_id FOR UPDATE;

  IF NOT FOUND OR v_raffle.status != 'active' THEN
    RETURN jsonb_build_object('error', 'Raffle not found or already settled');
  END IF;

  -- Pick random winner
  SELECT user_id INTO v_winner_id
  FROM raffle_entries
  WHERE raffle_id = p_raffle_id
  ORDER BY random()
  LIMIT 1;

  IF v_winner_id IS NULL THEN
    -- No entries, just close it
    UPDATE raffles SET status = 'completed' WHERE id = p_raffle_id;
    RETURN jsonb_build_object('settled', true, 'winner', null, 'reason', 'no_entries');
  END IF;

  -- Update raffle with winner
  UPDATE raffles SET status = 'completed', winner_id = v_winner_id WHERE id = p_raffle_id;

  -- Award credits via slot_spins shared pool
  INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
  VALUES (v_winner_id, v_today, v_raffle.prize_credits, 'shared')
  ON CONFLICT (user_id, date, game_id)
  DO UPDATE SET spins_remaining = slot_spins.spins_remaining + v_raffle.prize_credits;

  -- Log the credit allocation
  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (v_winner_id, v_raffle.prize_credits, 'raffle_win', 'Raffle vinder: ' || v_raffle.prize_credits || ' credits');

  RETURN jsonb_build_object('settled', true, 'winner', v_winner_id, 'credits', v_raffle.prize_credits);
END;
$$;

-- ensure_active_raffle: settle expired, create new
CREATE OR REPLACE FUNCTION public.ensure_active_raffle()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_active RECORD;
  v_settled jsonb;
  v_new_id uuid;
BEGIN
  -- Settle any expired active raffles
  FOR v_active IN
    SELECT id FROM raffles WHERE status = 'active' AND ends_at <= now()
  LOOP
    v_settled := settle_raffle(v_active.id);
  END LOOP;

  -- Check if there's a current active raffle
  SELECT id INTO v_active FROM raffles WHERE status = 'active' AND ends_at > now() LIMIT 1;

  IF v_active.id IS NOT NULL THEN
    RETURN jsonb_build_object('active_raffle', v_active.id, 'created', false);
  END IF;

  -- Create new raffle
  INSERT INTO raffles (prize_credits, starts_at, ends_at, status)
  VALUES (500, now(), now() + interval '30 minutes', 'active')
  RETURNING id INTO v_new_id;

  RETURN jsonb_build_object('active_raffle', v_new_id, 'created', true);
END;
$$;
