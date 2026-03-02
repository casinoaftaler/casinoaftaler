
-- Create slot_bomb_symbols table for admin-manageable bomb icons
CREATE TABLE public.slot_bomb_symbols (
  id text PRIMARY KEY,
  game_id text NOT NULL DEFAULT 'fedesvin-bonanza',
  value integer NOT NULL,
  label text NOT NULL,
  image_url text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slot_bomb_symbols ENABLE ROW LEVEL SECURITY;

-- Anyone can read bomb symbols
CREATE POLICY "Anyone can view bomb symbols"
  ON public.slot_bomb_symbols
  FOR SELECT
  USING (true);

-- Admins can manage bomb symbols
CREATE POLICY "Admins can manage bomb symbols"
  ON public.slot_bomb_symbols
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed 8 bomb symbol rows
INSERT INTO public.slot_bomb_symbols (id, game_id, value, label, position) VALUES
  ('bomb_2x', 'fedesvin-bonanza', 2, '2x', 1),
  ('bomb_3x', 'fedesvin-bonanza', 3, '3x', 2),
  ('bomb_5x', 'fedesvin-bonanza', 5, '5x', 3),
  ('bomb_10x', 'fedesvin-bonanza', 10, '10x', 4),
  ('bomb_15x', 'fedesvin-bonanza', 15, '15x', 5),
  ('bomb_25x', 'fedesvin-bonanza', 25, '25x', 6),
  ('bomb_50x', 'fedesvin-bonanza', 50, '50x', 7),
  ('bomb_100x', 'fedesvin-bonanza', 100, '100x', 8);
