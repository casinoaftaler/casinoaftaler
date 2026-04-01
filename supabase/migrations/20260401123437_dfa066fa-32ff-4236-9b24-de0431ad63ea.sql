
-- Allow users to delete their own conversations
CREATE POLICY "Users can delete own conversations"
  ON public.support_conversations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to update their own conversations (e.g. close)
CREATE POLICY "Users can update own conversations"
  ON public.support_conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
