CREATE POLICY "Admins can create conversations for users"
ON public.support_conversations
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));