
-- Add target_user_id to notifications to scope them to specific users
-- NULL means global (visible to all), a value means only that user sees it
ALTER TABLE public.notifications ADD COLUMN target_user_id UUID DEFAULT NULL;

-- Create index for efficient filtering
CREATE INDEX idx_notifications_target_user_id ON public.notifications (target_user_id);
