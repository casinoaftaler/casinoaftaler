-- Allow admins to view all slot spins
CREATE POLICY "Admins can view all spins"
ON public.slot_spins
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update any user's spins
CREATE POLICY "Admins can update any spins"
ON public.slot_spins
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to insert spins for any user
CREATE POLICY "Admins can insert spins for any user"
ON public.slot_spins
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));