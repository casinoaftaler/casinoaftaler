-- Delete old gates bomb symbols
DELETE FROM slot_bomb_symbols WHERE game_id = 'gates-of-fedesvin';

-- Insert new 16 orb symbols
INSERT INTO slot_bomb_symbols (id, game_id, value, label, image_url, position) VALUES
  ('gates-orb-2x', 'gates-of-fedesvin', 2, '2x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-2x.png', 1),
  ('gates-orb-3x', 'gates-of-fedesvin', 3, '3x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-3x.png', 2),
  ('gates-orb-4x', 'gates-of-fedesvin', 4, '4x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-4x.png', 3),
  ('gates-orb-5x', 'gates-of-fedesvin', 5, '5x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-5x.png', 4),
  ('gates-orb-6x', 'gates-of-fedesvin', 6, '6x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-6x.png', 5),
  ('gates-orb-8x', 'gates-of-fedesvin', 8, '8x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-8x.png', 6),
  ('gates-orb-10x', 'gates-of-fedesvin', 10, '10x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-10x.png', 7),
  ('gates-orb-12x', 'gates-of-fedesvin', 12, '12x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-12x.png', 8),
  ('gates-orb-15x', 'gates-of-fedesvin', 15, '15x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-15x.png', 9),
  ('gates-orb-20x', 'gates-of-fedesvin', 20, '20x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-20x.png', 10),
  ('gates-orb-25x', 'gates-of-fedesvin', 25, '25x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-25x.png', 11),
  ('gates-orb-50x', 'gates-of-fedesvin', 50, '50x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-50x.png', 12),
  ('gates-orb-100x', 'gates-of-fedesvin', 100, '100x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-100x.png', 13),
  ('gates-orb-250x', 'gates-of-fedesvin', 250, '250x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-250x.png', 14),
  ('gates-orb-500x', 'gates-of-fedesvin', 500, '500x', 'https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-symbols/gates/orb-500x.png', 15);

-- Update site_settings for gates multiplier values and weights
INSERT INTO site_settings (key, value) VALUES
  ('gates_multiplier_values', '2,3,4,5,6,8,10,12,15,20,25,50,100,250,500'),
  ('gates_multiplier_weights', '5000,3000,2000,1500,1200,1000,800,700,600,500,400,350,250,100,50')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;