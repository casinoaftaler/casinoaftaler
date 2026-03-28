CREATE OR REPLACE FUNCTION public.get_admin_users_with_email()
 RETURNS TABLE(id uuid, user_id uuid, role text, created_at timestamp with time zone, email text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT 
    ur.id,
    ur.user_id,
    ur.role::text,
    ur.created_at,
    au.email
  FROM public.user_roles ur
  JOIN auth.users au ON au.id = ur.user_id
  WHERE ur.role IN ('admin', 'moderator')
  ORDER BY ur.created_at DESC;
$$;