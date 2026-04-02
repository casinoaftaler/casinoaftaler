

# Bulk Import 93 Bonus Hunts with Chronological Renumbering

## What happens

1. **New edge function** `bonus-hunt-bulk-id-import` that accepts an array of API hunt IDs
2. It deduplicates the input list (your list has ~4 duplicates)
3. Checks each ID against existing `api_data->>'id'` in the database — skips any already imported
4. Fetches each hunt from the StreamSystem API to get its data and `createdAt` timestamp
5. Sorts the new hunts by `createdAt` (chronological order)
6. Merges them with ALL existing hunts, then renumbers everything chronologically so every hunt gets the correct sequential number
7. Upserts slot catalog data for each new hunt

## Why renumbering is needed

The current database has hunts 1-9 from March 2026 and hunts 10-181 from Jan 2024-Feb 2026. The new 93 hunts likely fall somewhere in between or before existing ones. A full chronological renumber ensures consistent ordering.

## Safety measures

- Hunts without API data (180, 182-186) will be placed at the end since they have no `createdAt` — preserving their relative order
- No deletes — only updates to `hunt_number` and inserts for new hunts
- Processes in batches of 5 to avoid API rate limits
- Returns a full report of what was imported and how numbering changed

## Technical detail

### New file: `supabase/functions/bonus-hunt-bulk-id-import/index.ts`

```
Input: { huntIds: string[] }
Flow:
  1. Deduplicate input IDs
  2. Query existing api_data->>'id' to find duplicates → skip
  3. Fetch each new hunt from StreamSystem API (batches of 5, 300ms delay)
  4. Filter out hunts with 0 slots
  5. Load all existing archives with their api_data->>'createdAt'
  6. Merge existing + new, sort by createdAt
  7. Assign hunt_number = index + 1
  8. For existing hunts: UPDATE hunt_number if changed
  9. For new hunts: INSERT with buildArchiveRow()
  10. Upsert slot catalog for new hunts
  11. Return summary with duplicates skipped, imported count, renumbered count
```

### Config: `supabase/config.toml`
Add `[functions.bonus-hunt-bulk-id-import]` with `verify_jwt = false`

No frontend changes needed — this will be invoked from the admin panel's existing import flow or directly via curl.

