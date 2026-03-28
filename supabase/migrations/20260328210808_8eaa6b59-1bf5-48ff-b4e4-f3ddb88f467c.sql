CREATE POLICY "Anyone can view bonus hit requests"
  ON public.slot_requests FOR SELECT
  TO public
  USING (status = 'bonus_hit');