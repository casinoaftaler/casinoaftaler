
CREATE TABLE public.tournament_credit_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid NOT NULL REFERENCES public.tournaments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  credits_awarded integer NOT NULL DEFAULT 0,
  credits_clawed_back integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(tournament_id, user_id)
);

ALTER TABLE public.tournament_credit_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tournament credit tracking"
  ON public.tournament_credit_tracking FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own credit tracking"
  ON public.tournament_credit_tracking FOR SELECT
  USING (auth.uid() = user_id);
