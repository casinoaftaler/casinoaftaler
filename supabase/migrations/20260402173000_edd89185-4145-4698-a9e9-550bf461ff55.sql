INSERT INTO public.slot_bomb_symbols (id, game_id, value, label, image_url, position)
VALUES
  ('orb_2x',   'gates-of-fedesvin', 2,   '2x',   NULL, 1),
  ('orb_3x',   'gates-of-fedesvin', 3,   '3x',   NULL, 2),
  ('orb_5x',   'gates-of-fedesvin', 5,   '5x',   NULL, 3),
  ('orb_10x',  'gates-of-fedesvin', 10,  '10x',  NULL, 4),
  ('orb_15x',  'gates-of-fedesvin', 15,  '15x',  NULL, 5),
  ('orb_25x',  'gates-of-fedesvin', 25,  '25x',  NULL, 6),
  ('orb_50x',  'gates-of-fedesvin', 50,  '50x',  NULL, 7),
  ('orb_100x', 'gates-of-fedesvin', 100, '100x', NULL, 8)
ON CONFLICT (id) DO NOTHING;