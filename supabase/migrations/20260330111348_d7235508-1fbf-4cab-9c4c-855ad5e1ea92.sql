CREATE OR REPLACE FUNCTION public.classify_slot_archetypes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.slot_catalog
  SET content_archetype = CASE
    WHEN rtp IS NOT NULL AND bonus_count >= 3 AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
      THEN 'stats-heavy'
    WHEN bonus_count >= 1 AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
      THEN 'community-driven'
    WHEN rtp IS NOT NULL
      THEN 'comparison'
    ELSE 'minimal'
  END
  WHERE true;
END;
$function$;