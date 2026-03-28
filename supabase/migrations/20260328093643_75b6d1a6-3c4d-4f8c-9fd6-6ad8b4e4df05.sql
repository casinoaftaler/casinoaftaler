-- Step 1: Fix upsert_slot_catalog - remove bonus_count increment
CREATE OR REPLACE FUNCTION public.upsert_slot_catalog(p_slot_name text, p_provider text, p_rtp numeric, p_win numeric, p_multiplier numeric)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
      updated_at = now()
    WHERE id = v_existing_id;
  ELSE
    INSERT INTO slot_catalog (slot_name, provider, rtp, highest_win, highest_x, bonus_count)
    VALUES (p_slot_name, p_provider, p_rtp, p_win, p_multiplier, 0);
  END IF;
END;
$function$;

-- Step 2: Reset all bonus_count to 0
UPDATE slot_catalog SET bonus_count = 0;

-- Step 3: Recalculate bonus_count from actual archive data
WITH slot_appearances AS (
  SELECT DISTINCT
    bha.hunt_number,
    REPLACE(REPLACE(REPLACE(REPLACE(LOWER(slot_elem->>'name'), '''', ''), E'\u2019', ''), E'\u2018', ''), '.', '') AS normalized_name
  FROM bonus_hunt_archives bha,
    jsonb_array_elements(
      CASE 
        WHEN (bha.api_data::jsonb)->'data'->'slots' IS NOT NULL 
        THEN (bha.api_data::jsonb)->'data'->'slots'
        WHEN (bha.api_data::jsonb)->'slots' IS NOT NULL 
        THEN (bha.api_data::jsonb)->'slots'
        ELSE '[]'::jsonb
      END
    ) AS slot_entry,
    LATERAL (SELECT slot_entry->'slot' AS slot_elem) sub
  WHERE bha.total_slots > 0
    AND slot_elem->>'name' IS NOT NULL
),
counts AS (
  SELECT normalized_name, COUNT(DISTINCT hunt_number) AS real_count
  FROM slot_appearances
  GROUP BY normalized_name
)
UPDATE slot_catalog sc
SET bonus_count = c.real_count
FROM counts c
WHERE REPLACE(REPLACE(REPLACE(REPLACE(LOWER(sc.slot_name), '''', ''), E'\u2019', ''), E'\u2018', ''), '.', '') = c.normalized_name;

-- Step 4: Fix stuck active hunts
UPDATE bonus_hunt_archives
SET hunt_status = 'completed'
WHERE hunt_status = 'active'
  AND total_slots > 0
  AND opened_slots >= total_slots;