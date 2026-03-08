

## Plan: Full Bonus Hunt Import & Dynamic System

### Problem
The system is hardcoded to 3 bonus hunts (`MAX_HUNT_NUMBER = 3`, hardcoded `[1, 2, 3]` filters). The StreamSystem API at `/all/959262659` contains 10 hunt entries that need to be imported, numbered sequentially by date (oldest = #1), with the current 3 hunts becoming the newest numbers.

### API Data Analysis
From the `/all/` endpoint, sorted by `createdAt` ascending:

```text
ID                       | createdAt  | Name              | Casino
YOY4u4z2upD4xuTe84bE     | Feb 27     | Bonus Hunt #4     | Casinoaftaler.dk
tFyDGNHJFz1lA64ZhDD0     | Feb 28     | casinoaftaler.dk  | Spildansknu
6RgX8QdZO7HaCfKrBr08     | Feb 28     | Bonus Hunt #5     | Casinoaftaler.dk
x9AhL8sKg0UtnUIw282J     | Mar 1      | BONUS HUNT #6     | SpildanskNu (not started)
cF1qahF2oGOg5MfyjuYU     | Mar 1      | BONUS HUNT #7     | Spilleautomaten
FCyUbOIOKNHukOddf7k7     | Mar 1      | bonus hunt #6     | spildansknu
GnDyjvFOon828YPh3WOL     | Mar 5      | Bonus Hunt #1     | SpilDanskNu! (current #1)
iKJQa44N50yF9hEYSeV1     | Mar 7      | Bonus Hunt #2     | SpilDanskNu! (current #2)
dr2TyDoPBiiDvXHDjtCw     | Mar 8      | Bonus Hunt #3     | Betinia (current #3)
FXY8qWh2cjTugEYHcVnp     | Mar 8      | Bonus Hunt #3     | Betinia (duplicate?)
```

Some hunts may be empty (no slots). The function will fetch each by ID, filter out empty ones, and number the rest sequentially.

### Implementation Steps

#### 1. New Edge Function: `bonus-hunt-full-import`
**File:** `supabase/functions/bonus-hunt-full-import/index.ts`

- Fetches `/all/959262659` to get all hunt IDs
- Sorts by `createdAt` ascending
- Fetches each hunt's detailed data via `/{huntId}` endpoint
- Filters out hunts with 0 slots
- Clears existing `bonus_hunt_archives` rows
- Numbers valid hunts sequentially #1, #2, ... #N
- Upserts each into `bonus_hunt_archives` with correct `hunt_number`
- Syncs each hunt's slots into `slot_catalog` (using existing `upsert_slot_catalog` RPC)
- Increments `bonus_count` for new slots
- Triggers `slot-catalog-enrich` at end
- Returns summary with mapping of old names → new numbers

#### 2. Remove Hardcoded Hunt Limits
**File:** `src/pages/BonusHunt.tsx`
- Remove `MAX_HUNT_NUMBER = 3` constant
- Use `latestHuntNumber` from database as the dynamic max
- Replace hardcoded `availableHuntNumbers = [3, 2, 1]` with `archivedHuntNumbers` from the database hook
- Determine `isLive` based on whether current hunt equals `latestHuntNumber` (or latest + 1)

**File:** `src/hooks/useBonusHuntSession.ts`
- Remove `.in('hunt_number', [1, 2, 3])` filter from both queries
- Instead, fetch the latest active session without hunt number restrictions

#### 3. Remap Video Registry
**File:** `src/components/bonus-hunt/BonusHuntVideoSection.tsx`

After import completes, the current hunts will be renumbered. The video registry currently maps:
- Hunt 1 → Twitch VOD 2714677621 (Mar 5, current "Bonus Hunt #1")
- Hunt 2 → Twitch VOD 2716498380 (Mar 8, current "Bonus Hunt #2")
- Hunt 3 → Twitch VOD 2705907775 (Feb 23 — predates API data)
- Hunt 4 → Twitch VOD 2708438065 (Feb 26 — predates API data)
- Hunt 5 → Twitch VOD 2710088948 (Feb 28)

Since the exact new numbering depends on how many API hunts have slots (unknown until we fetch each one), I need to ask a clarifying question about the video mapping.

#### 4. Edge Function Config
**File:** `supabase/config.toml` — add `[functions.bonus-hunt-full-import]` with `verify_jwt = false`

---

### Key Question Before Implementation

The video registry (Twitch VODs for hunts 3, 4, 5) contains videos from dates (Feb 23, 26, 28) that predate or partially overlap the API data. After renumbering:
- Should I keep the video registry as-is and remap once we know the final numbering?
- Or should we drop the old video mappings and only keep videos for the current hunts (which will get new numbers)?

Also: Some of the 10 API entries may be test/empty hunts. The import function will automatically skip those. The final numbering will only include hunts that have actual slot data.

