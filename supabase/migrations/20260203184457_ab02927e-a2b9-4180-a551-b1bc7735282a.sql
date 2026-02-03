-- Tilføj rarity kolonne til slot_symbols
ALTER TABLE slot_symbols 
ADD COLUMN rarity text NOT NULL DEFAULT 'common' 
CHECK (rarity IN ('premium', 'common', 'scatter'));

-- Opdater eksisterende symboler med deres rarity
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Pharaoh';
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Anubis';
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Horus';
UPDATE slot_symbols SET rarity = 'premium' WHERE name = 'Scarab';
UPDATE slot_symbols SET rarity = 'scatter' WHERE is_scatter = true;