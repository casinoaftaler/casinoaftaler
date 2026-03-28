

## Problem
All `bonus_hunt_archives` rows have `created_at` set to the bulk-import timestamp (March 28, 2026) instead of the actual hunt date. The homepage community section uses `created_at` to display dates, so all hunts show "28. mar." incorrectly.

## Solution
Run a single SQL migration to update `created_at` from the real timestamp stored in `api_data->>'createdAt'` for all rows where that field exists.

### Step 1 – Database migration
```sql
UPDATE bonus_hunt_archives
SET created_at = to_timestamp((api_data->>'createdAt')::bigint)
WHERE api_data->>'createdAt' IS NOT NULL
  AND created_at != to_timestamp((api_data->>'createdAt')::bigint);
```

This corrects `created_at` for all ~180 rows using the original Unix timestamp from the StreamSystem API data. Hunt #180 (which has no `api_data`) will keep its current timestamp.

### Step 2 – Verify
Confirm the latest hunts now show distinct, correct dates on the homepage.

**No code changes needed** – the UI already reads `created_at` correctly; only the stored data is wrong.

