
-- Add last_spin_at to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_spin_at timestamp with time zone;

-- Create spin_history table
CREATE TABLE public.spin_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  twitch_id text,
  reward_type text NOT NULL CHECK (reward_type IN ('points', 'spins', 'none')),
  reward_value integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.spin_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own spin history
CREATE POLICY "Users can view own spin history"
ON public.spin_history
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all spin history
CREATE POLICY "Admins can view all spin history"
ON public.spin_history
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- No direct inserts from client (only via edge function with service role)

-- Create index for cooldown lookups
CREATE INDEX idx_spin_history_user_created ON public.spin_history (user_id, created_at DESC);
