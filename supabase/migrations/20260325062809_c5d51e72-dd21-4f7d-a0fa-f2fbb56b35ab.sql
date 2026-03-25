DROP FUNCTION IF EXISTS public.upsert_slot_catalog(text,text,numeric,numeric,numeric);

CREATE FUNCTION public.upsert_slot_catalog(
  p_slot_name text,
  p_provider text,
  p_rtp numeric,
  p_win numeric,
  p_multiplier numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing_id uuid;
  v_normalized text;
BEGIN
  v_normalized := REPLACE(REPLACE(REPLACE(REPLACE(LOWER(p_slot_name), '''', ''), E'\u2019', ''), E'\u2018', ''), '.', '');
  v_normalized := REPLACE(v_normalized, 'teh ', 'the ');

  SELECT id INTO v_existing_id
  FROM slot_catalog
  WHERE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(LOWER(slot_name), '''', ''), E'\u2019', ''), E'\u2018', ''), '.', ''), 'teh ', 'the ')
      = v_normalized
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
      bonus_count = bonus_count + 1,
      updated_at = now()
    WHERE id = v_existing_id;
  ELSE
    INSERT INTO slot_catalog (slot_name, provider, rtp, highest_win, highest_x, bonus_count)
    VALUES (p_slot_name, p_provider, p_rtp, p_win, p_multiplier, 1);
  END IF;
END;
$$;