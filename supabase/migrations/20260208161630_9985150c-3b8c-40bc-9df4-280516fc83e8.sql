-- Create enum for clip status
CREATE TYPE public.clip_status AS ENUM ('pending', 'approved', 'rejected');

-- Create community_clips table for user-submitted video clips
CREATE TABLE public.community_clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  platform TEXT NOT NULL DEFAULT 'unknown',
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  status clip_status NOT NULL DEFAULT 'pending',
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community_clip_likes table (one like per user per clip)
CREATE TABLE public.community_clip_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clip_id UUID NOT NULL REFERENCES public.community_clips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(clip_id, user_id)
);

-- Create community_clip_comments table
CREATE TABLE public.community_clip_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clip_id UUID NOT NULL REFERENCES public.community_clips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.community_clips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_clip_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_clip_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_clips

-- Anyone can view approved clips
CREATE POLICY "Anyone can view approved clips"
ON public.community_clips
FOR SELECT
USING (status = 'approved');

-- Users can view their own clips (any status)
CREATE POLICY "Users can view their own clips"
ON public.community_clips
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all clips
CREATE POLICY "Admins can view all clips"
ON public.community_clips
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Authenticated users can submit clips
CREATE POLICY "Authenticated users can submit clips"
ON public.community_clips
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can update any clip (for approval/rejection)
CREATE POLICY "Admins can update clips"
ON public.community_clips
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete clips
CREATE POLICY "Admins can delete clips"
ON public.community_clips
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for community_clip_likes

-- Anyone can view likes on approved clips
CREATE POLICY "Anyone can view likes"
ON public.community_clip_likes
FOR SELECT
USING (true);

-- Authenticated users can like approved clips
CREATE POLICY "Users can like clips"
ON public.community_clip_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove their own likes
CREATE POLICY "Users can remove their likes"
ON public.community_clip_likes
FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for community_clip_comments

-- Anyone can view comments on approved clips
CREATE POLICY "Anyone can view comments"
ON public.community_clip_comments
FOR SELECT
USING (true);

-- Authenticated users can add comments
CREATE POLICY "Users can add comments"
ON public.community_clip_comments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update their comments"
ON public.community_clip_comments
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete their comments"
ON public.community_clip_comments
FOR DELETE
USING (auth.uid() = user_id);

-- Admins can delete any comment
CREATE POLICY "Admins can delete comments"
ON public.community_clip_comments
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on community_clips
CREATE TRIGGER update_community_clips_updated_at
BEFORE UPDATE ON public.community_clips
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updated_at on community_clip_comments
CREATE TRIGGER update_community_clip_comments_updated_at
BEFORE UPDATE ON public.community_clip_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_community_clips_status ON public.community_clips(status);
CREATE INDEX idx_community_clips_user_id ON public.community_clips(user_id);
CREATE INDEX idx_community_clips_created_at ON public.community_clips(created_at DESC);
CREATE INDEX idx_community_clip_likes_clip_id ON public.community_clip_likes(clip_id);
CREATE INDEX idx_community_clip_comments_clip_id ON public.community_clip_comments(clip_id);