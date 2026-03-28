-- Recalculate all slot_catalog bonus_count, highest_win, highest_x from actual archive data
UPDATE slot_catalog SET bonus_count = 0;

WITH slot_appearances AS (
  SELECT DISTINCT
    bha.hunt_number,
    REPLACE(REPLACE(REPLACE(REPLACE(LOWER(COALESCE(slot_elem->>'name', '')), '''', ''), E'\u2019', ''), E'\u2018', ''), '.', '') AS normalized_name,
    COALESCE((slot_entry->>'win')::numeric, 0) AS win,
    CASE WHEN COALESCE((slot_entry->>'bet')::numeric, 0) > 0 
      THEN COALESCE((slot_entry->>'win')::numeric, 0) / (slot_entry->>'bet')::numeric 
      ELSE 0 END AS multiplier
  FROM bonus_hunt_archives bha,
    LATERAL jsonb_array_elements(
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
    AND slot_elem->>'name' != ''
),
agg AS (
  SELECT 
    normalized_name,
    COUNT(DISTINCT hunt_number) AS real_count,
    MAX(win) AS best_win,
    MAX(multiplier) AS best_x
  FROM slot_appearances
  GROUP BY normalized_name
)
UPDATE slot_catalog sc
SET 
  bonus_count = a.real_count,
  highest_win = GREATEST(COALESCE(sc.highest_win, 0), a.best_win),
  highest_x = GREATEST(COALESCE(sc.highest_x, 0), a.best_x)
FROM agg a
WHERE REPLACE(REPLACE(REPLACE(REPLACE(LOWER(sc.slot_name), '''', ''), E'\u2019', ''), E'\u2018', ''), '.', '') = a.normalized_name;