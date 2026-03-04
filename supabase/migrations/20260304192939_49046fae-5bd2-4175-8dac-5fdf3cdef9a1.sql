-- Add reactions column to slot_chat_messages
ALTER TABLE public.slot_chat_messages 
  ADD COLUMN IF NOT EXISTS reactions JSONB DEFAULT '{}'::jsonb;

-- Allow authenticated users to update reactions on chat messages (for adding reactions)
CREATE POLICY "Authenticated users can update reactions" ON public.slot_chat_messages
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
