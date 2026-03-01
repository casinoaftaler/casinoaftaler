
-- Insert Fedesvin Bonanza symbols
INSERT INTO slot_symbols (id, game_id, name, position, rarity, weight, bonus_weight, is_scatter, is_wild, multiplier_2, multiplier_3, multiplier_4, multiplier_5)
VALUES
  -- Premium candy symbols
  (gen_random_uuid(), 'fedesvin-bonanza', 'Red Heart', 1, 'premium', 8, 10, false, false, 0, 2, 5, 25),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Purple Square', 2, 'premium', 8, 10, false, false, 0, 2, 5, 25),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Green Hexagon', 3, 'premium', 10, 12, false, false, 0, 1.5, 3, 15),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Blue Oval', 4, 'premium', 10, 12, false, false, 0, 1.5, 3, 15),
  -- Common fruit symbols
  (gen_random_uuid(), 'fedesvin-bonanza', 'Banana', 5, 'common', 18, 20, false, false, 0, 0.5, 1.5, 5),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Watermelon', 6, 'common', 18, 20, false, false, 0, 0.5, 1.5, 5),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Grape', 7, 'common', 20, 22, false, false, 0, 0.4, 1, 3),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Apple', 8, 'common', 20, 22, false, false, 0, 0.4, 1, 3),
  (gen_random_uuid(), 'fedesvin-bonanza', 'Peach', 9, 'common', 22, 24, false, false, 0, 0.3, 0.8, 2),
  -- Scatter (lollipop)
  (gen_random_uuid(), 'fedesvin-bonanza', 'Lollipop', 10, 'scatter', 3, 4, true, false, 0, 3, 5, 100);

-- Site settings for Fedesvin Bonanza
INSERT INTO site_settings (key, value) VALUES ('fedesvin_bonanza_locked', 'true');
INSERT INTO site_settings (key, value) VALUES ('fedesvin_bonanza_background_image', '');
INSERT INTO site_settings (key, value) VALUES ('fedesvin_bonanza_password', 'bonanza2024');
