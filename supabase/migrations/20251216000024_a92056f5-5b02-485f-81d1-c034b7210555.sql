-- Create click events table for tracking affiliate clicks
CREATE TABLE public.click_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  casino_id uuid REFERENCES public.casinos(id) ON DELETE CASCADE,
  casino_slug text NOT NULL,
  casino_name text NOT NULL,
  event_type text NOT NULL DEFAULT 'affiliate_click',
  user_agent text,
  referrer text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;

-- Allow edge functions (service role) to insert
CREATE POLICY "Service role can insert click events"
ON public.click_events
FOR INSERT
WITH CHECK (true);

-- Admins and casino owners can view click events
CREATE POLICY "Admins can view click events"
ON public.click_events
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR is_casino_owner(auth.uid()));

-- Create index for faster queries
CREATE INDEX idx_click_events_casino_id ON public.click_events(casino_id);
CREATE INDEX idx_click_events_created_at ON public.click_events(created_at DESC);