-- Create archive table for historical slot statistics
-- This table stores running totals that persist through leaderboard resets

CREATE TABLE public.slot_statistics_archive (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_spins bigint NOT NULL DEFAULT 0,
  total_winnings numeric NOT NULL DEFAULT 0,
  total_bets numeric NOT NULL DEFAULT 0,
  biggest_win numeric NOT NULL DEFAULT 0,
  total_bonuses bigint NOT NULL DEFAULT 0,
  unique_players bigint NOT NULL DEFAULT 0,
  last_reset_at timestamp with time zone,
  reset_count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert initial row (singleton pattern - only one row needed)
INSERT INTO public.slot_statistics_archive (id) 
VALUES ('00000000-0000-0000-0000-000000000001');

-- Enable RLS
ALTER TABLE public.slot_statistics_archive ENABLE ROW LEVEL SECURITY;

-- Only admins can read/update the archive
CREATE POLICY "Admins can view slot statistics archive"
ON public.slot_statistics_archive
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update slot statistics archive"
ON public.slot_statistics_archive
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role needs access for edge function
CREATE POLICY "Service role full access to slot statistics archive"
ON public.slot_statistics_archive
FOR ALL
USING (true)
WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_slot_statistics_archive_updated_at
BEFORE UPDATE ON public.slot_statistics_archive
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();