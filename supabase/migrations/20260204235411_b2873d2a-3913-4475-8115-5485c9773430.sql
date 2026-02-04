-- Step 1: Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view profiles for leaderboard" ON public.profiles;

-- Step 2: Create a more restrictive policy - users can only view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Step 3: Add policy for admins to view all profiles (for TwitchUsersSection)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Step 4: Create a public view that only exposes leaderboard-necessary fields
-- This view uses security_invoker=false to bypass RLS and only exposes safe fields
CREATE OR REPLACE VIEW public.profiles_leaderboard
WITH (security_invoker = false)
AS
SELECT 
  user_id,
  display_name,
  avatar_url
FROM public.profiles;

-- Step 5: Grant SELECT on the view to authenticated and anon users
GRANT SELECT ON public.profiles_leaderboard TO authenticated;
GRANT SELECT ON public.profiles_leaderboard TO anon;