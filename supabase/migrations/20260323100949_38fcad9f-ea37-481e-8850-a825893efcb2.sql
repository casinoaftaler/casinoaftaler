CREATE OR REPLACE FUNCTION public.touch_money_pages_on_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only touch pages that ACTUALLY receive new content from bonus hunt activity
  UPDATE page_metadata 
  SET updated_at = now() 
  WHERE path IN ('/', '/bonus-hunt');
  RETURN NEW;
END;
$function$;