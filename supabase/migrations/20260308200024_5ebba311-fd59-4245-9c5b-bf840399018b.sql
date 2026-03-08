CREATE POLICY "Admins can manage hunt archives"
ON public.bonus_hunt_archives
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));