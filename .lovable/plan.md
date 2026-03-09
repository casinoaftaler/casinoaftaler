

## Problem

There are 8 pairs of near-duplicate slots in the database where the only difference is apostrophes (`'` / `'`), typos like "Teh" vs "The", or missing punctuation. Examples:
- "Jammin' Jars" vs "Jammin Jars"
- "Big Bass Secret Of Teh Golden Lake" vs "Big Bass Secret Of The Golden Lake"
- "Santa's Great Gifts" vs "Santas Great Gifts"
- "Stack 'Em" vs "Stack Em"

The current `upsert_slot_catalog` function matches on exact `LOWER(slot_name)`, so these variants slip through as separate entries.

## Plan

### 1. Clean up existing duplicates (data fix)

Merge 8 duplicate pairs, keeping the version with the correct name and combining stats (take `GREATEST` of highest_win/highest_x, `SUM` of bonus_count). Delete the duplicate row.

Pairs to merge (keep → delete):
| Keep | Delete |
|------|--------|
| Jammin' Jars | Jammin Jars |
| Jammin' Jars 2 | Jammin Jars 2 |
| Big Bass Secret Of The Golden Lake | Big Bass Secret Of Teh Golden Lake |
| Beat the Beast: Griffin's Gold | Beat the Beast: Griffins Gold |
| Dragon's Fire Megaways | Dragons Fire Megaways |
| Santa's Great Gifts | Santas Great Gifts |
| Stack 'Em | Stack Em |
| Stick 'Em | Stick Em |

For each pair: UPDATE the keeper with `GREATEST(highest_win)`, `GREATEST(highest_x)`, `SUM(bonus_count)`, then DELETE the duplicate.

### 2. Improve deduplication in the edge function

Update `slot-catalog-seed/index.ts` to normalize slot names before comparing against existing database entries. Normalization: lowercase, strip all apostrophes/special quotes, replace common typos ("teh " → "the ").

```typescript
function normalizeSlotName(name: string): string {
  return name.toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/\bteh\b/g, 'the')
    .trim();
}
```

Apply this normalization when:
- Building the `existingNames` set from database
- Filtering AI results against existing names

### 3. Improve the `upsert_slot_catalog` database function

Update the SQL function to use the same normalization when looking up existing slots:

```sql
SELECT id INTO v_existing_id
FROM slot_catalog
WHERE REPLACE(REPLACE(REPLACE(LOWER(slot_name), '''', ''), E'\u2019', ''), 'teh ', 'the ')
    = REPLACE(REPLACE(REPLACE(LOWER(p_slot_name), '''', ''), E'\u2019', ''), 'teh ', 'the ')
LIMIT 1;
```

### Files to change
- **Data cleanup** via insert tool (UPDATE + DELETE for 8 pairs)
- **`supabase/functions/slot-catalog-seed/index.ts`** — add `normalizeSlotName` helper, use in filtering
- **Database migration** — update `upsert_slot_catalog` function with normalized matching

