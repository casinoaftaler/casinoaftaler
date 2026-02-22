
-- Archive table for bonus hunt data from StreamSystem API
CREATE TABLE public.bonus_hunt_archives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hunt_number INTEGER NOT NULL UNIQUE,
  api_data JSONB NOT NULL,
  hunt_name TEXT,
  hunt_status TEXT DEFAULT 'active',
  total_slots INTEGER DEFAULT 0,
  opened_slots INTEGER DEFAULT 0,
  start_balance NUMERIC DEFAULT 0,
  end_balance NUMERIC,
  average_x NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast lookup by hunt_number
CREATE INDEX idx_bonus_hunt_archives_hunt_number ON public.bonus_hunt_archives (hunt_number);

-- Enable RLS
ALTER TABLE public.bonus_hunt_archives ENABLE ROW LEVEL SECURITY;

-- Anyone can view archives
CREATE POLICY "Anyone can view hunt archives"
  ON public.bonus_hunt_archives FOR SELECT
  USING (true);

-- Only service role (edge functions) can insert/update
CREATE POLICY "Service role can manage archives"
  ON public.bonus_hunt_archives FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER update_bonus_hunt_archives_updated_at
  BEFORE UPDATE ON public.bonus_hunt_archives
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
