
-- Create user_bans table
CREATE TABLE public.user_bans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  banned_by uuid NOT NULL,
  reason text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_bans ENABLE ROW LEVEL SECURITY;

-- Admins can manage bans
CREATE POLICY "Admins can manage bans"
ON public.user_bans
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Users can check if they are banned (needed for client-side enforcement)
CREATE POLICY "Users can view own ban status"
ON public.user_bans
FOR SELECT
USING (auth.uid() = user_id);
