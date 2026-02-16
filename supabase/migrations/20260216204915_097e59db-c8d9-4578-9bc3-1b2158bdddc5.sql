
-- Add bonus spins column for Spin the Reel
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS spin_reel_extra_spins integer NOT NULL DEFAULT 0;
