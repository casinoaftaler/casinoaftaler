-- Add casino_slug to bonus_hunt_sessions so we know which casino each hunt is played at
ALTER TABLE public.bonus_hunt_sessions
ADD COLUMN casino_slug text DEFAULT 'spildansknu';

-- Update existing sessions to SpilDanskNu (the default)
UPDATE public.bonus_hunt_sessions SET casino_slug = 'spildansknu' WHERE casino_slug IS NULL;