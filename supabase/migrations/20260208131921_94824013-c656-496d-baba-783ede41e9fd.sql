-- Create notifications table for global notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_notifications table for tracking read status per user
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  notification_id UUID NOT NULL REFERENCES public.notifications(id) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, notification_id)
);

-- Enable RLS on both tables
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Anyone can view notifications"
  ON public.notifications FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage notifications"
  ON public.notifications FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- User notifications policies
CREATE POLICY "Users can view their own notification status"
  ON public.user_notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification status"
  ON public.user_notifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification status"
  ON public.user_notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notification status"
  ON public.user_notifications FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_user_notifications_user_id ON public.user_notifications(user_id);
CREATE INDEX idx_user_notifications_notification_id ON public.user_notifications(notification_id);
CREATE INDEX idx_user_notifications_is_read ON public.user_notifications(user_id, is_read);