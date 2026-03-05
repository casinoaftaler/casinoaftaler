

## Problem Analysis

Three issues found:

### 1. "Arkiv" badge on the active hunt
- `latestHuntNumber` queries `bonus_hunt_archives` for the highest `hunt_number` → returns **6** (stale/deleted archive row)
- `isArchived = currentHuntNumber <= latestHuntNumber` → `1 <= 6` = **true**
- So hunt #1 (the real active hunt) is incorrectly marked as archived
- In `BonusHuntHeroBar`, when `isLive` is false, it always shows "Arkiv" badge — no concept of "active but not live-streaming"

### 2. Deleted hunts in dropdown
- `BonusHuntHeroBar` line 94-95 generates numbers `2..maxHuntNumber` and hardcodes `.filter(num => num !== 6 && num !== 7)` — this is stale logic
- Should only show hunts that actually exist (archived hunts from DB + current active hunt)

### 3. Stale archive row for hunt #6
- Hunt #6 exists in `bonus_hunt_archives` with `total_slots: 1` — this is test/stale data that inflates `latestHuntNumber`

---

## Plan

### Step 1: Clean up stale archive data
- Delete the stale rows (hunt #1 with 0 slots, hunt #6 with 1 slot) from `bonus_hunt_archives` via migration, since they are not real completed hunts

### Step 2: Fix the badge logic in `BonusHuntHeroBar`
- Add a third state: when `!isLive && !isArchived`, show **"Aktiv"** badge (or no badge) instead of "Arkiv"
- Pass `isArchived` as a new prop alongside `isLive`
- Only show "Arkiv" when `isArchived` is true

### Step 3: Fix the dropdown to only show real hunts
- Remove the hardcoded `.filter(num => num !== 6 && num !== 7)`
- Instead of generating sequential numbers, pass a list of available hunt numbers (from archived hunts + current active) as a prop
- In `BonusHunt.tsx`, create a new query hook `useArchivedHuntNumbers()` that fetches just the `hunt_number` column from `bonus_hunt_archives` where `total_slots > 0`
- Build the dropdown items from: `[...archivedNumbers, activeHuntNumber]`

### Step 4: Fix `BonusHuntNavBar` dropdown (same issue)
- Apply the same dropdown fix — remove hardcoded number generation, use real hunt numbers list

### Files to change:
1. **Database migration** — delete stale archive rows
2. **`src/hooks/useBonusHuntData.ts`** — add `useArchivedHuntNumbers()` hook
3. **`src/pages/BonusHunt.tsx`** — fix `isArchived` logic, pass `isArchived` + available hunt numbers to HeroBar
4. **`src/components/bonus-hunt/BonusHuntHeroBar.tsx`** — accept `isArchived` prop, fix badge logic, use real hunt numbers for dropdown
5. **`src/components/bonus-hunt/BonusHuntNavBar.tsx`** — same dropdown fix

