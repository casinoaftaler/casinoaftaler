
-- Step 1: Merge duplicates - for each group of duplicates by LOWER(slot_name),
-- keep the row with the most data (highest bonus_count) and merge stats into it
DO $$
DECLARE
  rec RECORD;
  keep_id uuid;
  delete_ids uuid[];
BEGIN
  FOR rec IN
    SELECT LOWER(slot_name) as norm, array_agg(id ORDER BY bonus_count DESC, created_at ASC) as ids
    FROM slot_catalog
    GROUP BY LOWER(slot_name)
    HAVING COUNT(*) > 1
  LOOP
    keep_id := rec.ids[1];
    delete_ids := rec.ids[2:];

    -- Merge stats from duplicates into the keeper
    UPDATE slot_catalog SET
      highest_win = GREATEST(
        COALESCE(slot_catalog.highest_win, 0),
        COALESCE((SELECT MAX(highest_win) FROM slot_catalog WHERE id = ANY(delete_ids)), 0)
      ),
      highest_x = GREATEST(
        COALESCE(slot_catalog.highest_x, 0),
        COALESCE((SELECT MAX(highest_x) FROM slot_catalog WHERE id = ANY(delete_ids)), 0)
      ),
      bonus_count = slot_catalog.bonus_count + COALESCE((SELECT SUM(bonus_count) FROM slot_catalog WHERE id = ANY(delete_ids)), 0),
      rtp = COALESCE(slot_catalog.rtp, (SELECT rtp FROM slot_catalog WHERE id = ANY(delete_ids) AND rtp IS NOT NULL LIMIT 1)),
      volatility = COALESCE(slot_catalog.volatility, (SELECT volatility FROM slot_catalog WHERE id = ANY(delete_ids) AND volatility IS NOT NULL LIMIT 1)),
      max_potential = COALESCE(slot_catalog.max_potential, (SELECT max_potential FROM slot_catalog WHERE id = ANY(delete_ids) AND max_potential IS NOT NULL LIMIT 1)),
      provider = CASE
        WHEN slot_catalog.provider IN ('Unknown', 'Custom Slot') THEN
          COALESCE((SELECT provider FROM slot_catalog WHERE id = ANY(delete_ids) AND provider NOT IN ('Unknown', 'Custom Slot') LIMIT 1), slot_catalog.provider)
        ELSE slot_catalog.provider
      END,
      updated_at = now()
    WHERE id = keep_id;

    -- Delete the duplicates
    DELETE FROM slot_catalog WHERE id = ANY(delete_ids);
  END LOOP;
END $$;

-- Step 2: Create a unique index on LOWER(slot_name) to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_slot_catalog_slot_name_lower ON slot_catalog (LOWER(slot_name));

-- Step 3: Drop the old unique constraint on slot_name if it exists
ALTER TABLE slot_catalog DROP CONSTRAINT IF EXISTS slot_catalog_slot_name_key;

-- Step 4: Update the upsert function to match case-insensitively
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
SET search_path = public
AS $$
DECLARE
  v_existing_id uuid;
BEGIN
  -- Find existing row by case-insensitive match
  SELECT id INTO v_existing_id
  FROM slot_catalog
  WHERE LOWER(slot_name) = LOWER(p_slot_name)
  LIMIT 1;

  IF v_existing_id IS NOT NULL THEN
    -- Update existing row
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
    -- Insert new row
    INSERT INTO slot_catalog (slot_name, provider, rtp, highest_win, highest_x, bonus_count)
    VALUES (p_slot_name, p_provider, p_rtp, p_win, p_multiplier, 1);
  END IF;
END;
$$;
