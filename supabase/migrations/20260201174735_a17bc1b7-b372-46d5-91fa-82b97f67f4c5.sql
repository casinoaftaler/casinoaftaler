-- Add SELECT policy for admins to view click analytics
CREATE POLICY "Admins can view click events" 
ON public.click_events 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));