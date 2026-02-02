-- Add user_id column to track which user made the click
ALTER TABLE public.click_events
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster user-based queries
CREATE INDEX idx_click_events_user_id ON public.click_events(user_id);