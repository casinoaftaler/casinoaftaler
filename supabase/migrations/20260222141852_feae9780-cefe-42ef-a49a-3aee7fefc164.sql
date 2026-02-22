
-- Bonus Hunt Sessions table
CREATE TABLE public.bonus_hunt_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  streamsystem_hunt_id text NOT NULL,
  hunt_number integer NOT NULL,
  status text NOT NULL DEFAULT 'upcoming',
  gtw_betting_open boolean NOT NULL DEFAULT false,
  avgx_betting_open boolean NOT NULL DEFAULT false,
  gtw_min_bet integer NOT NULL DEFAULT 1,
  gtw_max_bet integer NOT NULL DEFAULT 50,
  avgx_min_bet integer NOT NULL DEFAULT 1,
  avgx_max_bet integer NOT NULL DEFAULT 50,
  gtw_prizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  end_balance numeric,
  average_x numeric,
  winning_group text,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.bonus_hunt_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can view sessions
CREATE POLICY "Anyone can view bonus hunt sessions"
ON public.bonus_hunt_sessions FOR SELECT
USING (true);

-- Admin full CRUD
CREATE POLICY "Admins can manage bonus hunt sessions"
ON public.bonus_hunt_sessions FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE TRIGGER update_bonus_hunt_sessions_updated_at
BEFORE UPDATE ON public.bonus_hunt_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- GTW Bets table
CREATE TABLE public.bonus_hunt_gtw_bets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.bonus_hunt_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  guess_amount numeric NOT NULL,
  bet_amount integer NOT NULL,
  difference numeric,
  rank integer,
  prize_points integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(session_id, user_id)
);

ALTER TABLE public.bonus_hunt_gtw_bets ENABLE ROW LEVEL SECURITY;

-- Anyone can view GTW bets
CREATE POLICY "Anyone can view GTW bets"
ON public.bonus_hunt_gtw_bets FOR SELECT
USING (true);

-- Authenticated users can insert own bets
CREATE POLICY "Users can insert own GTW bets"
ON public.bonus_hunt_gtw_bets FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all GTW bets (for settlement)
CREATE POLICY "Admins can manage GTW bets"
ON public.bonus_hunt_gtw_bets FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- AVG X Bets table
CREATE TABLE public.bonus_hunt_avgx_bets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.bonus_hunt_sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  group_letter text NOT NULL,
  bet_amount integer NOT NULL,
  winnings integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(session_id, user_id)
);

ALTER TABLE public.bonus_hunt_avgx_bets ENABLE ROW LEVEL SECURITY;

-- Anyone can view AVG X bets
CREATE POLICY "Anyone can view AVG X bets"
ON public.bonus_hunt_avgx_bets FOR SELECT
USING (true);

-- Authenticated users can insert own bets
CREATE POLICY "Users can insert own AVG X bets"
ON public.bonus_hunt_avgx_bets FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can manage all AVG X bets (for settlement)
CREATE POLICY "Admins can manage AVG X bets"
ON public.bonus_hunt_avgx_bets FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
