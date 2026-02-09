-- Allow admins to view all active sessions
CREATE POLICY "Admins can view all sessions"
ON public.slot_active_sessions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));