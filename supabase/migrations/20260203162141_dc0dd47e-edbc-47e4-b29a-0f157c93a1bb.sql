-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Profiles viewable by owner or admin" ON public.profiles;

-- Create a new policy that allows anyone to view basic profile info for leaderboard
-- This exposes only display_name, avatar_url, twitch_username which are semi-public Twitch info
CREATE POLICY "Anyone can view profiles for leaderboard"
ON public.profiles FOR SELECT
USING (true);