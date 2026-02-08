-- Add badge columns to profiles table for caching Twitch badge data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS twitch_badges jsonb DEFAULT NULL,
ADD COLUMN IF NOT EXISTS twitch_badges_updated_at timestamp with time zone DEFAULT NULL,
ADD COLUMN IF NOT EXISTS twitch_follow_date timestamp with time zone DEFAULT NULL;

-- Add broadcaster_id to site_settings if not exists
INSERT INTO public.site_settings (key, value)
VALUES ('twitch_broadcaster_id', NULL)
ON CONFLICT (key) DO NOTHING;

-- Add index for badge queries
CREATE INDEX IF NOT EXISTS idx_profiles_twitch_badges_updated 
ON public.profiles (twitch_badges_updated_at) 
WHERE twitch_badges IS NOT NULL;

-- Comment for documentation
COMMENT ON COLUMN public.profiles.twitch_badges IS 'Cached Twitch badges: {is_moderator, is_vip, is_subscriber, is_follower, follow_duration_days}';
COMMENT ON COLUMN public.profiles.twitch_badges_updated_at IS 'Last time Twitch badges were refreshed from API';
COMMENT ON COLUMN public.profiles.twitch_follow_date IS 'Date user started following the channel';