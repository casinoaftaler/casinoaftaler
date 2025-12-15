-- Add game_providers column to casinos table
-- Stores array of objects: [{name: string, logo_url: string}]
ALTER TABLE public.casinos 
ADD COLUMN game_providers jsonb DEFAULT '[]'::jsonb;