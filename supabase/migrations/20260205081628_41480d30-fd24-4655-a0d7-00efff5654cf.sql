-- Allow public users to SELECT active casinos (needed for the casinos_public view)
CREATE POLICY "Anyone can view active casinos"
ON public.casinos
FOR SELECT
USING (is_active = true);