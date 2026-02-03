-- Add weight column to slot_symbols table for admin-configurable odds
ALTER TABLE slot_symbols 
  ADD COLUMN weight numeric(10,2) NOT NULL DEFAULT 10;

-- Set initial weights based on current SYMBOL_WEIGHTS configuration
UPDATE slot_symbols SET weight = 2 WHERE name = 'Pharaoh';
UPDATE slot_symbols SET weight = 4 WHERE name = 'Anubis';
UPDATE slot_symbols SET weight = 6 WHERE name = 'Horus';
UPDATE slot_symbols SET weight = 8 WHERE name = 'Scarab';
UPDATE slot_symbols SET weight = 45 WHERE name = 'A';
UPDATE slot_symbols SET weight = 50 WHERE name = 'K';
UPDATE slot_symbols SET weight = 60 WHERE name = 'Q';
UPDATE slot_symbols SET weight = 70 WHERE name = 'J';
UPDATE slot_symbols SET weight = 70 WHERE name = '10';
UPDATE slot_symbols SET weight = 1 WHERE name ILIKE '%book%' OR is_scatter = true;