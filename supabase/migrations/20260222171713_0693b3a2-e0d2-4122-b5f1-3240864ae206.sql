
-- Recreate profiles_leaderboard as a SECURITY DEFINER view so all logged-in users can see names
DROP VIEW IF EXISTS public.profiles_leaderboard;

CREATE VIEW public.profiles_leaderboard
WITH (security_invoker = false)
AS
SELECT user_id, display_name, avatar_url
FROM profiles;

-- Grant select to authenticated and anon
GRANT SELECT ON public.profiles_leaderboard TO authenticated, anon;
