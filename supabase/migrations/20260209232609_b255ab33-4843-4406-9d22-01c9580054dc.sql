-- Add game_id column to track which slot machine a player is on
ALTER TABLE public.slot_active_sessions
ADD COLUMN game_id text DEFAULT NULL;