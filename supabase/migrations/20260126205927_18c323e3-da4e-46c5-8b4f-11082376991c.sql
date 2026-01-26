-- Remove the policy that allows anyone to view active casinos directly
-- This exposes affiliate_url which should be protected
DROP POLICY IF EXISTS "Anyone can view active casinos" ON public.casinos;

-- Ensure the casinos_public view doesn't have security_invoker so it can access the underlying table
-- First drop and recreate without security_invoker
DROP VIEW IF EXISTS public.casinos_public;

CREATE VIEW public.casinos_public AS
SELECT 
  id,
  name,
  slug,
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
  logo_url,
  game_providers,
  rating,
  is_active,
  is_recommended,
  position,
  created_at,
  updated_at
FROM public.casinos
WHERE is_active = true;

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.casinos_public TO anon;
GRANT SELECT ON public.casinos_public TO authenticated;