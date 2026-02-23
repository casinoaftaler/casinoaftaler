
-- Add twitch_badges to the profiles_leaderboard view
CREATE OR REPLACE VIEW public.profiles_leaderboard AS
SELECT user_id, display_name, avatar_url, twitch_badges
FROM profiles;
