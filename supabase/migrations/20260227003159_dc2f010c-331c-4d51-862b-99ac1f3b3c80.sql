
-- 1. Add bonus_count column
ALTER TABLE public.slot_catalog ADD COLUMN IF NOT EXISTS bonus_count integer NOT NULL DEFAULT 0;

-- 2. Fix existing lowercase slot names with initcap (one-time fix)
UPDATE public.slot_catalog
SET slot_name = initcap(slot_name)
WHERE slot_name = lower(slot_name)
  AND slot_name != initcap(slot_name);

-- 3. Replace the upsert_slot_catalog RPC to handle title-case + bonus_count
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
    bonus_count = slot_catalog.bonus_count + 1,
    updated_at = now();
END;
$function$;
