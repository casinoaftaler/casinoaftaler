CREATE POLICY "Admins can delete support conversations"
ON public.support_conversations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));