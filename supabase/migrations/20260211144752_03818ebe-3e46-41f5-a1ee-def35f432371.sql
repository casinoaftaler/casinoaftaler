-- Fix 1: Change default spins_remaining from 100 to 200
ALTER TABLE public.slot_spins ALTER COLUMN spins_remaining SET DEFAULT 200;