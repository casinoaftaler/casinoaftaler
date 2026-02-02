-- Create slot_symbols table for storing symbol data
CREATE TABLE public.slot_symbols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  multiplier_3 INTEGER NOT NULL DEFAULT 5,
  multiplier_4 INTEGER NOT NULL DEFAULT 10,
  multiplier_5 INTEGER NOT NULL DEFAULT 25,
  is_scatter BOOLEAN NOT NULL DEFAULT false,
  is_wild BOOLEAN NOT NULL DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create slot_spins table for daily spin tracking
CREATE TABLE public.slot_spins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  spins_remaining INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create slot_game_results table for recording spins
CREATE TABLE public.slot_game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bet_amount INTEGER NOT NULL DEFAULT 1,
  win_amount INTEGER NOT NULL DEFAULT 0,
  is_bonus_triggered BOOLEAN NOT NULL DEFAULT false,
  bonus_win_amount INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for slot symbols
INSERT INTO storage.buckets (id, name, public) 
VALUES ('slot-symbols', 'slot-symbols', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on all tables
ALTER TABLE public.slot_symbols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slot_spins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slot_game_results ENABLE ROW LEVEL SECURITY;

-- RLS for slot_symbols: Anyone can read symbols
CREATE POLICY "Anyone can view slot symbols"
ON public.slot_symbols FOR SELECT
USING (true);

-- Only admins can manage symbols
CREATE POLICY "Admins can manage slot symbols"
ON public.slot_symbols FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS for slot_spins: Users can only see their own spins
CREATE POLICY "Users can view their own spins"
ON public.slot_spins FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own spin records
CREATE POLICY "Users can insert their own spins"
ON public.slot_spins FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own spin records
CREATE POLICY "Users can update their own spins"
ON public.slot_spins FOR UPDATE
USING (auth.uid() = user_id);

-- RLS for slot_game_results: Users can read their own results
CREATE POLICY "Users can view their own game results"
ON public.slot_game_results FOR SELECT
USING (auth.uid() = user_id);

-- Allow insert via service role (edge function) - public insert for now, edge function will validate
CREATE POLICY "Authenticated users can insert game results"
ON public.slot_game_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Storage policies for slot-symbols bucket
CREATE POLICY "Anyone can view slot symbols images"
ON storage.objects FOR SELECT
USING (bucket_id = 'slot-symbols');

CREATE POLICY "Admins can upload slot symbols"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'slot-symbols' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update slot symbols"
ON storage.objects FOR UPDATE
USING (bucket_id = 'slot-symbols' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete slot symbols"
ON storage.objects FOR DELETE
USING (bucket_id = 'slot-symbols' AND has_role(auth.uid(), 'admin'::app_role));

-- Create leaderboard view for aggregated stats
CREATE OR REPLACE VIEW public.slot_leaderboard AS
SELECT 
  user_id,
  SUM(win_amount) as total_winnings,
  MAX(win_amount) as biggest_win,
  COUNT(*) as total_spins,
  SUM(CASE WHEN created_at::date = CURRENT_DATE THEN win_amount ELSE 0 END) as daily_winnings,
  SUM(CASE WHEN created_at >= date_trunc('week', CURRENT_DATE) THEN win_amount ELSE 0 END) as weekly_winnings
FROM public.slot_game_results
GROUP BY user_id;

-- Seed the slot symbols with default values (images will be generated via AI)
INSERT INTO public.slot_symbols (name, multiplier_3, multiplier_4, multiplier_5, is_scatter, is_wild, position) VALUES
('Pharaoh', 30, 100, 500, false, false, 1),
('Anubis', 20, 60, 200, false, false, 2),
('Horus', 15, 40, 125, false, false, 3),
('Scarab', 10, 30, 100, false, false, 4),
('Isis', 10, 25, 75, false, false, 5),
('Ankh', 5, 15, 50, false, false, 6),
('A', 5, 10, 40, false, false, 7),
('K', 5, 10, 30, false, false, 8),
('Q', 5, 10, 25, false, false, 9),
('Book', 2, 20, 200, true, true, 10);