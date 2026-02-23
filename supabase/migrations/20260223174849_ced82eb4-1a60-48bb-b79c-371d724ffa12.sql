
CREATE OR REPLACE FUNCTION public.upsert_slot_catalog(
  p_slot_name text,
  p_provider text,
  p_rtp numeric DEFAULT NULL,
  p_win numeric DEFAULT 0,
  p_multiplier numeric DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO slot_catalog (slot_name, provider, rtp, highest_win, highest_x)
  VALUES (p_slot_name, p_provider, p_rtp, p_win, p_multiplier)
  ON CONFLICT (slot_name) DO UPDATE SET
    highest_win = GREATEST(COALESCE(slot_catalog.highest_win, 0), EXCLUDED.highest_win),
    highest_x = GREATEST(COALESCE(slot_catalog.highest_x, 0), EXCLUDED.highest_x),
    updated_at = now();
END;
$$;
