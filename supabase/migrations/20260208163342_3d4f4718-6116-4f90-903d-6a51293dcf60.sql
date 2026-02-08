-- Add columns to track manual review requirement and original URL
ALTER TABLE public.community_clips
ADD COLUMN IF NOT EXISTS requires_manual_review BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS original_url TEXT,
ADD COLUMN IF NOT EXISTS validation_notes TEXT;