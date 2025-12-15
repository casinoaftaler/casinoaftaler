-- Drop the security definer view and recreate without security definer
DROP VIEW IF EXISTS public.casinos_public;

-- Recreate view with security invoker (default, no SECURITY DEFINER)
CREATE VIEW public.casinos_public 
WITH (security_invoker = true)
AS
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

-- Add a helper function for casino owners to check their access
CREATE OR REPLACE FUNCTION public.is_casino_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'casino_owner'::app_role
  )
$$;

-- Update the site_settings RLS policy to allow casino owners to manage settings
DROP POLICY IF EXISTS "Casino owners can update site settings" ON public.site_settings;
CREATE POLICY "Casino owners can update site settings"
ON public.site_settings
FOR UPDATE
USING (is_casino_owner(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Casino owners can insert site settings" ON public.site_settings;
CREATE POLICY "Casino owners can insert site settings"
ON public.site_settings
FOR INSERT
WITH CHECK (is_casino_owner(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));

-- Allow casino owners to manage all casinos
DROP POLICY IF EXISTS "Casino owners can insert casinos" ON public.casinos;
CREATE POLICY "Casino owners can insert casinos"
ON public.casinos
FOR INSERT
WITH CHECK (is_casino_owner(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Casino owners can delete casinos" ON public.casinos;
CREATE POLICY "Casino owners can delete casinos"
ON public.casinos
FOR DELETE
USING (is_casino_owner(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));

-- Update existing casino owner update policy to allow all casinos
DROP POLICY IF EXISTS "Casino owners can update their casinos" ON public.casinos;
CREATE POLICY "Casino owners can update all casinos"
ON public.casinos
FOR UPDATE
USING (is_casino_owner(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));

-- Allow casino owners to view all casinos (including affiliate URLs)
DROP POLICY IF EXISTS "Casino owners can view their casinos" ON public.casinos;
CREATE POLICY "Casino owners can view all casinos"
ON public.casinos
FOR SELECT
USING (is_casino_owner(auth.uid()) OR has_role(auth.uid(), 'admin'::app_role));