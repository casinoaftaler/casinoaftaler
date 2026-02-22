-- Fix: The SELECT policy is RESTRICTIVE which blocks anon access
-- Drop the restrictive policy and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Free spin campaigns are publicly readable" ON public.free_spin_campaigns;

CREATE POLICY "Free spin campaigns are publicly readable"
ON public.free_spin_campaigns
FOR SELECT
USING (true);
