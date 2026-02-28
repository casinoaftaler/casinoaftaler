
-- Fix upsert_slot_catalog: don't increment bonus_count on every update
-- Only set bonus_count = 1 on INSERT (first appearance)
CREATE OR REPLACE FUNCTION public.upsert_slot_catalog(p_slot_name text, p_provider text, p_rtp numeric DEFAULT NULL::numeric, p_win numeric DEFAULT 0, p_multiplier numeric DEFAULT 0)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO slot_catalog (slot_name, provider, rtp, highest_win, highest_x, bonus_count)
  VALUES (initcap(p_slot_name), p_provider, p_rtp, p_win, p_multiplier, 1)
  ON CONFLICT (slot_name) DO UPDATE SET
    provider = CASE
      WHEN slot_catalog.provider IN ('Custom Slot', 'Unknown')
        AND EXCLUDED.provider NOT IN ('Custom Slot', 'Unknown')
      THEN EXCLUDED.provider
      ELSE slot_catalog.provider
    END,
    rtp = COALESCE(slot_catalog.rtp, EXCLUDED.rtp),
    highest_win = GREATEST(COALESCE(slot_catalog.highest_win, 0), EXCLUDED.highest_win),
    highest_x = GREATEST(COALESCE(slot_catalog.highest_x, 0), EXCLUDED.highest_x),
    updated_at = now();
END;
$function$;

-- Reset all bonus_count to 0 (will be recalculated)
UPDATE slot_catalog SET bonus_count = 0;
