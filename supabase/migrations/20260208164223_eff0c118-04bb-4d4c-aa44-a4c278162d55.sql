-- Add playback_type column to community_clips table
-- 'embed' for Twitch/YouTube clips that can be embedded
-- 'external' for non-embeddable links that open in new tab
ALTER TABLE public.community_clips
ADD COLUMN IF NOT EXISTS playback_type TEXT DEFAULT 'embed' CHECK (playback_type IN ('embed', 'external'));