-- Fix: Remove overly permissive service role policy and replace with proper admin-only policies
DROP POLICY IF EXISTS "Service role full access to slot statistics archive" ON public.slot_statistics_archive;

-- Edge functions use service role key which bypasses RLS, so we don't need a special policy
-- The admin policies are sufficient for frontend access