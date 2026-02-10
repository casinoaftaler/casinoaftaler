
-- Create slot_requests table
CREATE TABLE public.slot_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  slot_name text NOT NULL,
  provider text NOT NULL,
  is_custom boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  admin_note text,
  credits_awarded integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slot_requests ENABLE ROW LEVEL SECURITY;

-- Users can insert their own requests
CREATE POLICY "Users can insert own requests"
  ON public.slot_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own requests
CREATE POLICY "Users can view own requests"
  ON public.slot_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all requests
CREATE POLICY "Admins can view all requests"
  ON public.slot_requests FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Admins can update all requests
CREATE POLICY "Admins can update all requests"
  ON public.slot_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Admins can delete all requests
CREATE POLICY "Admins can delete all requests"
  ON public.slot_requests FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_slot_requests_updated_at
  BEFORE UPDATE ON public.slot_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
