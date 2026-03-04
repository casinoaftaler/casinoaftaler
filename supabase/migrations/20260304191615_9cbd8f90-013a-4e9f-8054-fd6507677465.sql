
-- Chat timeouts table
CREATE TABLE public.chat_timeouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  timed_out_by UUID NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_timeouts ENABLE ROW LEVEL SECURITY;

-- Anyone can check if they're timed out
CREATE POLICY "Anyone can view chat timeouts" ON public.chat_timeouts
  FOR SELECT USING (true);

-- Admins can manage timeouts
CREATE POLICY "Admins can manage chat timeouts" ON public.chat_timeouts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Chat bans table (separate from user_bans which is site-wide)
CREATE TABLE public.chat_bans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  banned_by UUID NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_bans ENABLE ROW LEVEL SECURITY;

-- Anyone can check if they're banned from chat
CREATE POLICY "Anyone can view chat bans" ON public.chat_bans
  FOR SELECT USING (true);

-- Admins can manage chat bans
CREATE POLICY "Admins can manage chat bans" ON public.chat_bans
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Also allow specific users (Fedesvinsejer, Kevinsylence) to delete chat messages
-- This is already handled by admin role check, so we need to ensure these users have admin role
