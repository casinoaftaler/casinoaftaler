
-- Chat messages table for in-game slot chat
CREATE TABLE public.slot_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  game_id text NOT NULL DEFAULT 'fedesvin-bonanza',
  message text NOT NULL,
  message_type text NOT NULL DEFAULT 'user',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for fast querying by game and time
CREATE INDEX idx_slot_chat_messages_game_created ON public.slot_chat_messages (game_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.slot_chat_messages ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read messages
CREATE POLICY "Anyone can view chat messages"
  ON public.slot_chat_messages FOR SELECT
  TO authenticated
  USING (true);

-- Users can insert their own messages
CREATE POLICY "Users can send chat messages"
  ON public.slot_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can delete any message (moderation)
CREATE POLICY "Admins can delete chat messages"
  ON public.slot_chat_messages FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.slot_chat_messages;
