
-- Create batch increment RPC for bonus_count
CREATE OR REPLACE FUNCTION public.increment_slot_bonus_counts(p_slot_names text[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE slot_catalog
  SET bonus_count = bonus_count + 1,
      updated_at = now()
  WHERE slot_name = ANY(p_slot_names);
END;
$function$;
