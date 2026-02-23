
-- 1. Update the upsert_slot_catalog function to also update provider and rtp
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
$$;

-- 2. Fix existing "Custom Slot" entries using provider_overrides data
UPDATE slot_catalog sc
SET provider = po.provider_override, updated_at = now()
FROM bonus_hunt_provider_overrides po
WHERE sc.slot_name = po.slot_name
  AND sc.provider IN ('Custom Slot', 'Unknown');
