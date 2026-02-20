
-- Insert Gates of Fedesvin symbols into slot_symbols
-- Using multiplier_3 = 8-9 match payout, multiplier_4 = 10-11 match payout, multiplier_5 = 12+ match payout
-- multiplier_2 = unused (0) for this game

-- Premium gems (high payouts)
INSERT INTO public.slot_symbols (name, game_id, rarity, weight, bonus_weight, is_scatter, is_wild, multiplier_2, multiplier_3, multiplier_4, multiplier_5, position)
VALUES
  ('Red Gem',    'gates-of-fedesvin', 'premium', 6,  8,  false, false, 0, 10, 25, 50,  1),
  ('Purple Gem', 'gates-of-fedesvin', 'premium', 7,  9,  false, false, 0, 8,  20, 40,  2),
  ('Green Gem',  'gates-of-fedesvin', 'premium', 8,  10, false, false, 0, 5,  15, 30,  3),
  ('Blue Gem',   'gates-of-fedesvin', 'premium', 9,  11, false, false, 0, 4,  10, 25,  4),

-- Common symbols (lower payouts)
  ('Gold Cup',   'gates-of-fedesvin', 'common',  14, 16, false, false, 0, 2,  5,  15,  5),
  ('Gold Ring',  'gates-of-fedesvin', 'common',  16, 18, false, false, 0, 1.5, 4, 12,  6),
  ('Hourglass',  'gates-of-fedesvin', 'common',  18, 20, false, false, 0, 1,  3,  10,  7),
  ('Chalice',    'gates-of-fedesvin', 'common',  20, 22, false, false, 0, 0.8, 2, 8,   8),

-- Scatter (Zeus/Lightning) - 4+ triggers free spins
  ('Zeus',       'gates-of-fedesvin', 'scatter', 3,  4,  true,  false, 0, 3,  5,  100, 9);

-- Insert site settings for Gates of Fedesvin
INSERT INTO public.site_settings (key, value)
VALUES
  ('gates_of_fedesvin_locked', 'false'),
  ('gates_of_fedesvin_background_image', '')
ON CONFLICT (key) DO NOTHING;
