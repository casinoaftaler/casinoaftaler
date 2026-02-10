
-- Create a log table for all credit allocations
CREATE TABLE public.credit_allocation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL,
  source text NOT NULL, -- 'daily_cron', 'admin_manual', 'profile_reward', 'community_bonus'
  admin_user_id uuid, -- only set for admin_manual
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for fast lookups per user
CREATE INDEX idx_credit_log_user_id ON public.credit_allocation_log(user_id);
CREATE INDEX idx_credit_log_created_at ON public.credit_allocation_log(created_at DESC);

-- Enable RLS
ALTER TABLE public.credit_allocation_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view
CREATE POLICY "Admins can view credit log"
  ON public.credit_allocation_log
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow inserts from authenticated users (for profile rewards) and admins
CREATE POLICY "Authenticated users can insert own credit log"
  ON public.credit_allocation_log
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can insert any credit log"
  ON public.credit_allocation_log
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
