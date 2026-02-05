-- Add bonus_weight column to slot_symbols table for bonus-specific odds
ALTER TABLE public.slot_symbols
ADD COLUMN bonus_weight numeric NOT NULL DEFAULT 10;

-- Set initial bonus_weight to match current weight for all symbols
UPDATE public.slot_symbols SET bonus_weight = weight;