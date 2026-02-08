-- Create audit log table for tracking admin point changes
CREATE TABLE public.slot_points_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL,
  target_user_id uuid NOT NULL,
  action_type text NOT NULL CHECK (action_type IN ('edit', 'reset')),
  previous_points numeric NOT NULL DEFAULT 0,
  new_points numeric NOT NULL DEFAULT 0,
  reason text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slot_points_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view and insert audit logs
CREATE POLICY "Admins can view audit logs"
ON public.slot_points_audit_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert audit logs"
ON public.slot_points_audit_log
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add index for efficient queries
CREATE INDEX idx_slot_points_audit_target_user ON public.slot_points_audit_log(target_user_id);
CREATE INDEX idx_slot_points_audit_created ON public.slot_points_audit_log(created_at DESC);