-- Drop the overly permissive public SELECT policy
DROP POLICY "Profiles are viewable by everyone" ON public.profiles;

-- Create restricted policy: users can view their own profile, admins can view all
CREATE POLICY "Profiles viewable by owner or admin" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR 
  public.has_role(auth.uid(), 'admin')
);