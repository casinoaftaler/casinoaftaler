-- Add column to track if user has dismissed the profile completion prompt
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_prompt_dismissed boolean NOT NULL DEFAULT false;