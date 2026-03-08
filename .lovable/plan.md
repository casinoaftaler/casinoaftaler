

## Plan: Enhanced Bonus Hunt Admin Panel

### Problem
- No way to import individual hunts by StreamSystem ID from the admin UI
- Edit dialog is limited (missing hunt_number, total_slots, opened_slots, VOD link)
- Video registry is hardcoded in `BonusHuntVideoSection.tsx` — cannot be changed from admin
- No sorting/reordering capability

### Solution

#### 1. Database: Add VOD columns to `bonus_hunt_archives`
New columns via migration:
- `twitch_vod_id` (text, nullable) — Twitch video ID
- `vod_date` (text, nullable) — display date like "5. marts 2026"
- `casino_name` (text, nullable) — casino display name for the VOD card

This moves the hardcoded `HUNT_VIDEOS` registry into the database.

#### 2. Expand Edit Dialog in `BonusHuntArchiveAdmin.tsx`
Add fields to the edit form:
- **Hunt Number** (editable — allows reordering)
- **Total Slots** / **Opened Slots**
- **Twitch VOD ID** (text input)
- **VOD Date** (text input)
- **Casino Name** (text input)

#### 3. Add "Import by ID" Section in `BonusHuntArchiveAdmin.tsx`
A small form at the top of the archive tab:
- Text input for StreamSystem Hunt ID (e.g. `GnDyjvFOon828YPh3WOL`)
- Number input for desired Hunt Number
- "Import" button that calls the existing `bonus-hunt-full-import` edge function with a new `{ singleHuntId, huntNumber }` mode
- Or simpler: a new lightweight edge function `bonus-hunt-single-import` that fetches one hunt by ID and inserts it

#### 4. Update Edge Function for Single Import
Modify `bonus-hunt-full-import` to accept optional `{ singleHuntId, huntNumber }` body params. When provided, it imports only that one hunt at the specified number instead of doing a full re-import.

#### 5. Update `BonusHuntVideoSection.tsx` to Read from DB
- Remove the hardcoded `HUNT_VIDEOS` object
- `getHuntVideo()` becomes a hook or accepts archive data as param
- The `BonusHunt.tsx` page already has archive data — pass the VOD fields through

#### 6. Sort Controls
Add column header click-to-sort on the archive table (by hunt_number asc/desc). Simple client-side sort since the dataset is small.

### Files Changed

| File | Change |
|---|---|
| `bonus_hunt_archives` table | Add `twitch_vod_id`, `vod_date`, `casino_name` columns |
| `src/components/admin/BonusHuntArchiveAdmin.tsx` | Expand edit dialog, add import-by-ID form, add sort controls |
| `supabase/functions/bonus-hunt-full-import/index.ts` | Support single-hunt import mode via body params |
| `src/components/bonus-hunt/BonusHuntVideoSection.tsx` | Read VOD data from archive DB instead of hardcoded registry |
| `src/pages/BonusHunt.tsx` | Pass archive VOD data to video section |
| `src/hooks/useBonusHuntData.ts` | Possibly expose archive VOD fields |

### Migration SQL
```sql
ALTER TABLE bonus_hunt_archives
  ADD COLUMN IF NOT EXISTS twitch_vod_id text,
  ADD COLUMN IF NOT EXISTS vod_date text,
  ADD COLUMN IF NOT EXISTS casino_name text;
```

Then seed existing VOD data from the current hardcoded registry via an UPDATE statement.

