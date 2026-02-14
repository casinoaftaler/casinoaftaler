
-- Add bet_amount to slot_bonus_state so we can restore it after refresh
ALTER TABLE public.slot_bonus_state
ADD COLUMN bet_amount numeric NOT NULL DEFAULT 1;
