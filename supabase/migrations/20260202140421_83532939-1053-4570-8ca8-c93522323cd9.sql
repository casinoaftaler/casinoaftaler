-- Add is_hot column to casinos table
ALTER TABLE public.casinos ADD COLUMN is_hot boolean NOT NULL DEFAULT false;

-- Update the public view to include is_hot
DROP VIEW IF EXISTS public.casinos_public;
CREATE VIEW public.casinos_public AS
SELECT 
  id,
  name,
  slug,
  rating,
  bonus_title,
  bonus_amount,
  bonus_type,
  wagering_requirements,
  validity,
  min_deposit,
  payout_time,
  free_spins,
  features,
  pros,
  cons,
  description,
  is_active,
  is_recommended,
  is_hot,
  position,
  logo_url,
  game_providers,
  created_at,
  updated_at
FROM public.casinos
WHERE is_active = true;