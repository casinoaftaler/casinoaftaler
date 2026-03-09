
-- Fix upsert_slot_catalog: new slots get bonus_count = 0 instead of 1
CREATE OR REPLACE FUNCTION public.upsert_slot_catalog(p_slot_name text, p_provider text, p_rtp numeric DEFAULT NULL::numeric, p_win numeric DEFAULT 0, p_multiplier numeric DEFAULT 0)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
DECLARE
  v_existing_id uuid;
BEGIN
  SELECT id INTO v_existing_id
  FROM slot_catalog
  WHERE LOWER(slot_name) = LOWER(p_slot_name)
  LIMIT 1;

  IF v_existing_id IS NOT NULL THEN
    UPDATE slot_catalog SET
      provider = CASE
        WHEN provider IN ('Custom Slot', 'Unknown') AND p_provider NOT IN ('Custom Slot', 'Unknown')
        THEN p_provider
        ELSE provider
      END,
      rtp = COALESCE(rtp, p_rtp),
      highest_win = GREATEST(COALESCE(highest_win, 0), p_win),
      highest_x = GREATEST(COALESCE(highest_x, 0), p_multiplier),
      updated_at = now()
    WHERE id = v_existing_id;
  ELSE
    INSERT INTO slot_catalog (slot_name, provider, rtp, highest_win, highest_x, bonus_count)
    VALUES (p_slot_name, p_provider, p_rtp, p_win, p_multiplier, 0);
  END IF;
END;
$$;

-- Reset bonus_count for slots that never appeared in a bonus hunt
UPDATE slot_catalog
SET bonus_count = 0, updated_at = now()
WHERE COALESCE(highest_win, 0) = 0
  AND COALESCE(highest_x, 0) = 0
  AND bonus_count > 0;
