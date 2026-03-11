

## Fix: Trailing spaces breaking bonus_count backfill

### Problem
The previous backfill SQL didn't `trim()` slot names from the archive JSON. Many slot names in `api_data` have trailing spaces (e.g., `"Wanted Dead or a Wild "` instead of `"Wanted Dead or a Wild"`), causing ~17 slots with actual hunt data to show `bonus_count = 0`.

### Solution
Run a corrected backfill query that adds `trim()` to both the archive name normalization AND the catalog name comparison. This is a data-only fix — no code changes needed.

### SQL to execute
```sql
WITH hunt_slot_counts AS (
  SELECT 
    lower(trim(replace(replace(replace(
      s->'slot'->>'name', '''', ''), E'\u2019', ''), E'\u2018', ''))) as norm_name,
    count(DISTINCT a.hunt_number) as real_count
  FROM bonus_hunt_archives a,
       jsonb_array_elements(a.api_data->'slots') s
  WHERE a.total_slots > 0
    AND s->'slot'->>'name' IS NOT NULL
  GROUP BY 1
)
UPDATE slot_catalog sc
SET bonus_count = hsc.real_count,
    updated_at = now()
FROM hunt_slot_counts hsc
WHERE lower(trim(replace(replace(replace(
  sc.slot_name, '''', ''), E'\u2019', ''), E'\u2018', ''))) = hsc.norm_name
  AND sc.bonus_count IS DISTINCT FROM hsc.real_count;
```

### Expected result
- `Wanted Dead Or A Wild`: 0 → correct count
- `The count`, `Superstar Sevens`, `Tombstone Rip`, etc.: 0 → correct counts
- All ~17 affected slots fixed

