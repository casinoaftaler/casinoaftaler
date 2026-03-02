
-- Create monthly_tournament_archives table
CREATE TABLE public.monthly_tournament_archives (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month date NOT NULL,
  category text NOT NULL,
  winner_user_id uuid NOT NULL,
  winner_display_name text NOT NULL,
  winner_avatar_url text,
  winning_value numeric NOT NULL DEFAULT 0,
  top_entries jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Unique constraint: one winner per category per month
ALTER TABLE public.monthly_tournament_archives
  ADD CONSTRAINT unique_month_category UNIQUE (month, category);

-- Index for fast lookups
CREATE INDEX idx_monthly_tournament_archives_month ON public.monthly_tournament_archives (month DESC);

-- Enable RLS
ALTER TABLE public.monthly_tournament_archives ENABLE ROW LEVEL SECURITY;

-- Anyone can read archives
CREATE POLICY "Anyone can view tournament archives"
ON public.monthly_tournament_archives
FOR SELECT
USING (true);

-- Only service_role can insert/update/delete
CREATE POLICY "Service role can manage archives"
ON public.monthly_tournament_archives
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
