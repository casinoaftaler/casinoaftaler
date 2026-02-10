
CREATE OR REPLACE FUNCTION public.increment_redeem_code_uses(code_id_input uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  UPDATE redeem_codes
  SET times_used = times_used + 1
  WHERE id = code_id_input;
$$;
