-- Add multiplier_2 column for 2-symbol wins
ALTER TABLE slot_symbols 
ADD COLUMN multiplier_2 numeric(10,2) DEFAULT 0;

-- Set sensible defaults for premium symbols
UPDATE slot_symbols SET multiplier_2 = 2 WHERE rarity = 'premium' AND name = 'Pharaoh';
UPDATE slot_symbols SET multiplier_2 = 1.5 WHERE rarity = 'premium' AND name = 'Anubis';
UPDATE slot_symbols SET multiplier_2 = 1 WHERE rarity = 'premium' AND name = 'Horus';
UPDATE slot_symbols SET multiplier_2 = 0.5 WHERE rarity = 'premium' AND name = 'Scarab';