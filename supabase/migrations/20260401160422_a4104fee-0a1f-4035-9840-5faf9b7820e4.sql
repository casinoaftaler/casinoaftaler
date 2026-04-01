
CREATE TABLE public.chat_broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.chat_broadcast_dismissals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id uuid REFERENCES public.chat_broadcasts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  dismissed_at timestamptz DEFAULT now(),
  UNIQUE(broadcast_id, user_id)
);

ALTER TABLE public.chat_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_broadcast_dismissals ENABLE ROW LEVEL SECURITY;

-- Admins can insert broadcasts
CREATE POLICY "Admins can insert broadcasts"
ON public.chat_broadcasts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- All authenticated users can read broadcasts
CREATE POLICY "Authenticated users can read broadcasts"
ON public.chat_broadcasts FOR SELECT TO authenticated
USING (true);

-- Users can insert their own dismissals
CREATE POLICY "Users can insert own dismissals"
ON public.chat_broadcast_dismissals FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can read their own dismissals
CREATE POLICY "Users can read own dismissals"
ON public.chat_broadcast_dismissals FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Enable realtime for broadcasts
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_broadcasts;
