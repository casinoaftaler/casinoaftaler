

## Problem

Pagination without `ORDER BY` causes PostgreSQL to return unpredictable results across page boundaries, leading to missing rows. Two places are affected:

1. **`useSlotCatalogMap()`** in `src/hooks/useSlotCatalog.ts` line 62 -- calls `fetchAllSlotCatalogRows('slot_name, provider')` without passing `orderBy`. Without deterministic ordering, the `.range()` calls can skip rows.

2. **Edge function `fetchExistingSlotNames`** in `supabase/functions/slot-catalog-seed/index.ts` line 38-41 -- queries without `.order()`. Logs confirm only 997 of 1295 rows are fetched, causing the seeder to think ~300 slots don't exist yet but then finding them as "duplicates" and reporting 0 new.

## Plan

### 1. Fix `useSlotCatalogMap` pagination (`src/hooks/useSlotCatalog.ts`)
- Line 62: Add `'slot_name'` as the second argument:
  ```typescript
  const data = await fetchAllSlotCatalogRows<...>('slot_name, provider', 'slot_name');
  ```

### 2. Fix edge function pagination (`supabase/functions/slot-catalog-seed/index.ts`)
- Add `.order('slot_name')` to the query in `fetchExistingSlotNames`:
  ```typescript
  const { data, error } = await supabase
    .from("slot_catalog")
    .select("slot_name")
    .order("slot_name")
    .range(from, from + pageSize - 1);
  ```

### Files to change
- `src/hooks/useSlotCatalog.ts` -- 1 line change
- `supabase/functions/slot-catalog-seed/index.ts` -- 1 line addition

