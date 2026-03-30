
ALTER TABLE public.slot_catalog 
  ADD COLUMN IF NOT EXISTS game_id text,
  ADD COLUMN IF NOT EXISTS max_multiplier numeric,
  ADD COLUMN IF NOT EXISTS game_description text,
  ADD COLUMN IF NOT EXISTS has_buy_feature boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS game_format text;

CREATE INDEX IF NOT EXISTS idx_slot_catalog_game_id ON public.slot_catalog(game_id) WHERE game_id IS NOT NULL;
