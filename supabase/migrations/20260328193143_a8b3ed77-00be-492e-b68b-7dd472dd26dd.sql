-- Allow moderators to view all slot requests
CREATE POLICY "Moderators can view all requests"
  ON public.slot_requests FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'moderator'::app_role));

-- Allow moderators to update slot requests (change status)
CREATE POLICY "Moderators can update all requests"
  ON public.slot_requests FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'moderator'::app_role));