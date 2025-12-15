-- Create casino_owners table to link users to casinos they own
CREATE TABLE public.casino_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  casino_id uuid NOT NULL REFERENCES public.casinos(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, casino_id)
);

-- Enable RLS
ALTER TABLE public.casino_owners ENABLE ROW LEVEL SECURITY;

-- RLS policies for casino_owners table
CREATE POLICY "Admins can manage casino owners"
ON public.casino_owners
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own casino assignments"
ON public.casino_owners
FOR SELECT
USING (auth.uid() = user_id);

-- Update casinos RLS to allow casino owners to view their casinos
CREATE POLICY "Casino owners can view their casinos"
ON public.casinos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.casino_owners
    WHERE casino_owners.casino_id = casinos.id
    AND casino_owners.user_id = auth.uid()
  )
);

-- Allow casino owners to update their casinos
CREATE POLICY "Casino owners can update their casinos"
ON public.casinos
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.casino_owners
    WHERE casino_owners.casino_id = casinos.id
    AND casino_owners.user_id = auth.uid()
  )
);