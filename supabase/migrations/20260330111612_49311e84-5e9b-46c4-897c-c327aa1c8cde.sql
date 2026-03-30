CREATE OR REPLACE FUNCTION public.classify_slot_archetypes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.slot_catalog
  SET content_archetype = 'stats-heavy'
  WHERE rtp IS NOT NULL
    AND bonus_count >= 3
    AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0);

  UPDATE public.slot_catalog
  SET content_archetype = 'community-driven'
  WHERE bonus_count >= 1
    AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
    AND NOT (
      rtp IS NOT NULL
      AND bonus_count >= 3
      AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
    );

  UPDATE public.slot_catalog
  SET content_archetype = 'comparison'
  WHERE rtp IS NOT NULL
    AND NOT (
      rtp IS NOT NULL
      AND bonus_count >= 3
      AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
    )
    AND NOT (
      bonus_count >= 1
      AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
    );

  UPDATE public.slot_catalog
  SET content_archetype = 'minimal'
  WHERE NOT (
      rtp IS NOT NULL
      AND bonus_count >= 3
      AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
    )
    AND NOT (
      bonus_count >= 1
      AND (COALESCE(highest_x, 0) > 0 OR COALESCE(highest_win, 0) > 0)
    )
    AND NOT (rtp IS NOT NULL);
END;
$function$;