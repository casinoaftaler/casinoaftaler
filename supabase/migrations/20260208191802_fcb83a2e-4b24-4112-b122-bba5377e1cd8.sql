
-- ============================================
-- Fase 1: Tilføj game_id til relevante tabeller
-- ============================================

-- 1. slot_symbols: Tilføj game_id kolonne
ALTER TABLE public.slot_symbols 
ADD COLUMN game_id text NOT NULL DEFAULT 'book-of-fedesvin';

-- 2. slot_bonus_state: Tilføj game_id + multi-expanding arrays
ALTER TABLE public.slot_bonus_state 
ADD COLUMN game_id text NOT NULL DEFAULT 'book-of-fedesvin';

ALTER TABLE public.slot_bonus_state 
ADD COLUMN expanding_symbol_ids uuid[] DEFAULT '{}';

ALTER TABLE public.slot_bonus_state 
ADD COLUMN expanding_symbol_names text[] DEFAULT '{}';

-- 3. slot_game_results: Tilføj game_id kolonne
ALTER TABLE public.slot_game_results 
ADD COLUMN game_id text NOT NULL DEFAULT 'book-of-fedesvin';

-- 4. Index for hurtigere queries med game_id
CREATE INDEX idx_slot_symbols_game_id ON public.slot_symbols (game_id);
CREATE INDEX idx_slot_bonus_state_game_id ON public.slot_bonus_state (game_id);
CREATE INDEX idx_slot_game_results_game_id ON public.slot_game_results (game_id);

-- ============================================
-- Indsæt Rise of Fedesvin symboler (Merlin-tema)
-- ============================================

-- Premium symboler
INSERT INTO public.slot_symbols (name, rarity, weight, bonus_weight, multiplier_2, multiplier_3, multiplier_4, multiplier_5, is_scatter, is_wild, position, game_id)
VALUES
  ('Merlin', 'premium', 20, 25, 2, 25, 100, 500, false, false, 1, 'rise-of-fedesvin'),
  ('Dragon', 'premium', 25, 30, 1.5, 20, 75, 400, false, false, 2, 'rise-of-fedesvin'),
  ('Phoenix', 'premium', 30, 35, 1, 15, 50, 250, false, false, 3, 'rise-of-fedesvin'),
  ('Crystal Ball', 'premium', 30, 35, 1, 15, 50, 250, false, false, 4, 'rise-of-fedesvin');

-- Common symboler (kort med magisk tema)
INSERT INTO public.slot_symbols (name, rarity, weight, bonus_weight, multiplier_2, multiplier_3, multiplier_4, multiplier_5, is_scatter, is_wild, position, game_id)
VALUES
  ('A', 'common', 55, 55, 0, 5, 25, 100, false, false, 5, 'rise-of-fedesvin'),
  ('K', 'common', 55, 55, 0, 5, 25, 100, false, false, 6, 'rise-of-fedesvin'),
  ('Q', 'common', 60, 60, 0, 5, 20, 75, false, false, 7, 'rise-of-fedesvin'),
  ('J', 'common', 60, 60, 0, 5, 20, 75, false, false, 8, 'rise-of-fedesvin'),
  ('10', 'common', 65, 65, 0, 5, 15, 50, false, false, 9, 'rise-of-fedesvin');

-- Scatter/Wild symbol
INSERT INTO public.slot_symbols (name, rarity, weight, bonus_weight, multiplier_2, multiplier_3, multiplier_4, multiplier_5, is_scatter, is_wild, position, game_id)
VALUES
  ('Spell Book', 'scatter', 20, 25, 0, 2, 20, 200, true, true, 10, 'rise-of-fedesvin');
