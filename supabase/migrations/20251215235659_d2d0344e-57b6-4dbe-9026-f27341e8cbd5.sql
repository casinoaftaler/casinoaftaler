-- Add casino_owner to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'casino_owner';

-- Create a view for public casino data that excludes affiliate_url
CREATE OR REPLACE VIEW public.casinos_public AS
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
  position,
  logo_url,
  game_providers,
  created_at,
  updated_at
FROM public.casinos
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.casinos_public TO anon, authenticated;