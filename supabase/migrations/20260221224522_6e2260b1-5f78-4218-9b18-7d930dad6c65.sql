
-- Create table for admin-configurable multiplier symbols
CREATE TABLE public.slot_multiplier_symbols (
  id text PRIMARY KEY,
  value integer NOT NULL,
  label text NOT NULL,
  image_url text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slot_multiplier_symbols ENABLE ROW LEVEL SECURITY;

-- Anyone can read (needed for game rendering)
CREATE POLICY "Anyone can view multiplier symbols"
  ON public.slot_multiplier_symbols FOR SELECT
  USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage multiplier symbols"
  ON public.slot_multiplier_symbols FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed with the 8 default multiplier symbols
INSERT INTO public.slot_multiplier_symbols (id, value, label, position) VALUES
  ('mult_2x',   2,   '2x',   0),
  ('mult_3x',   3,   '3x',   1),
  ('mult_5x',   5,   '5x',   2),
  ('mult_10x',  10,  '10x',  3),
  ('mult_15x',  15,  '15x',  4),
  ('mult_25x',  25,  '25x',  5),
  ('mult_50x',  50,  '50x',  6),
  ('mult_100x', 100, '100x', 7);
