-- Add categories column to community_clips table
-- Stores array of category slugs: 'big_win', 'funny'
ALTER TABLE public.community_clips
ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}'::TEXT[];