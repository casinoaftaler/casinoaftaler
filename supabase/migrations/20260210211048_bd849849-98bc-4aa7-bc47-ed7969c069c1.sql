
-- Update the SELECT policy to only show global or user-targeted notifications
DROP POLICY IF EXISTS "Anyone can view notifications" ON public.notifications;

CREATE POLICY "Users can view relevant notifications"
  ON public.notifications
  FOR SELECT
  USING (target_user_id IS NULL OR target_user_id = auth.uid());
