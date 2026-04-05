CREATE OR REPLACE FUNCTION public.get_pending_queue_positions()
RETURNS TABLE(request_id uuid, queue_position integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id AS request_id, ROW_NUMBER() OVER (ORDER BY created_at ASC)::integer AS queue_position
  FROM public.slot_requests
  WHERE status = 'pending'
$$;