

# Fix: Slot Database Bonus Count, Hunt Stats & Active Hunt Status

## Root Cause Analysis

### Issue 1: `bonus_count` is massively inflated (e.g. Le Bandit = 715, should be ~50-80)
The `upsert_slot_catalog` RPC function increments `bonus_count + 1` on **every call**. The proxy calls `syncSlotCatalog` on every live fetch (every 30 seconds) AND on archived hunt requests. So each slot's `bonus_count` gets incremented hundreds of times instead of once per hunt. The `isNewHunt` guard only controls the separate `increment_slot_bonus_counts` call, but `upsert_slot_catalog` itself always does `+1`.

**Fix:** Remove the `bonus_count = bonus_count + 1` from the `upsert_slot_catalog` RPC. Only `increment_slot_bonus_counts` (called once per new hunt with `isNewHunt` guard) should manage `bonus_count`. Then recalculate all `bonus_count` values from actual archive data.

### Issue 2: "Bonus Hunt Tests" stat shows ~22,000 instead of ~124
The Slot Database page sums all `bonus_count` across slots: `slots.reduce((sum, s) => sum + s.bonus_count, 0)`. Since each slot's `bonus_count` is inflated, the total is ~22,000. Once bonus_count is fixed, this label should show actual hunt count from `bonus_hunt_archives` instead of summing slot counts (which counts slot appearances, not unique hunts).

**Fix:** Replace `totalHunts` with a direct count from `bonus_hunt_archives` (or use `useDocumentedHuntCount()` which already exists).

### Issue 3: 6 hunts marked "active" instead of max 1
Hunts 3, 116, 122, 124, 125, 126 are all marked `hunt_status = 'active'` in `bonus_hunt_archives` despite all bonuses being opened (`opened_slots = total_slots`). The proxy sets `hunt_status: huntData.played ? 'completed' : 'active'` based on the StreamSystem API's `played` flag, which may not reflect completion correctly. Hunts where `opened_slots >= total_slots` should be "completed".

**Fix:** Update the proxy to also mark hunts as completed when `opened_slots >= total_slots`. Run a data fix to mark the 6 stuck hunts as completed.

## Implementation Steps

### Step 1: Fix `upsert_slot_catalog` RPC (migration)
Remove `bonus_count = bonus_count + 1` from the function. The `increment_slot_bonus_counts` RPC (called separately with `isNewHunt` guard) is the only correct place to increment.

```sql
-- In the UPDATE branch, change:
--   bonus_count = bonus_count + 1,
-- to:
--   (remove the bonus_count line entirely)

-- In the INSERT branch, keep bonus_count = 1 (first appearance)
-- BUT actually this should also be 0, since increment_slot_bonus_counts handles it
```

### Step 2: Recalculate all `bonus_count` from archive data (migration)
Count actual slot appearances across all archived hunts and reset `bonus_count` accordingly.

```sql
-- Reset all to 0 first
UPDATE slot_catalog SET bonus_count = 0;

-- Then count actual appearances from archive api_data
-- For each archive row, extract slot names and increment
```

This requires a one-time script that parses `api_data` JSON from `bonus_hunt_archives` to count real slot appearances.

### Step 3: Fix "Bonus Hunt Tests" stat in SlotDatabase.tsx
Replace `slots.reduce((sum, s) => sum + s.bonus_count, 0)` with the actual hunt count from `bonus_hunt_archives`. Use the existing `useDocumentedHuntCount()` hook.

### Step 4: Fix stuck active hunts (data fix)
Update hunts where `opened_slots >= total_slots AND hunt_status = 'active'` to `'completed'`.

### Step 5: Fix proxy hunt_status logic
Update the proxy to set `hunt_status = 'completed'` when `opened_slots >= total_slots`, regardless of the API's `played` flag.

### Step 6: Fix `useBonusHuntData.ts` latest hunt number query
The `fetchLatestHuntNumber` function filters `neq('hunt_status', 'active')` which is correct, but with stuck active hunts it was returning wrong numbers. Fixing the data (Step 4) resolves this.

## Files Changed

| File | Change |
|------|--------|
| Migration SQL | Fix `upsert_slot_catalog` RPC, recalculate `bonus_count`, fix stuck hunts |
| `src/pages/SlotDatabase.tsx` | Use `useDocumentedHuntCount()` for "Bonus Hunt Tests" stat |
| `supabase/functions/bonus-hunt-proxy/index.ts` | Fix `hunt_status` logic to check `opened_slots >= total_slots` |

