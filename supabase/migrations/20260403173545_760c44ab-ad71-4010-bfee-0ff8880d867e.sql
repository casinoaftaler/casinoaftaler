CREATE OR REPLACE FUNCTION public.get_user_slot_request_stats(target_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'bonus_hits', COUNT(*) FILTER (WHERE status = 'bonus_hit'),
    'no_bonus', COUNT(*) FILTER (WHERE status = 'no_bonus'),
    'total', COUNT(*),
    'pending', COUNT(*) FILTER (WHERE status = 'pending')
  )
  FROM public.slot_requests
  WHERE user_id = target_user_id
$$;