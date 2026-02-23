

## Auto-populate and Auto-update Slot Catalog

### What this does

1. **Backfill from Bonus Hunt #2** -- Extract all 32 slots from the archived hunt data and insert them into the slot catalog with their provider names, RTP, and win/multiplier records.

2. **Auto-sync on every hunt** -- Update the `bonus-hunt-proxy` edge function so that every time it fetches hunt data, it automatically upserts slots into `slot_catalog`, updating `highest_win` and `highest_x` only when new records are beaten. This means the catalog grows automatically as new bonus hunts happen.

3. **Auto-sync on settlement** -- Update the `bonus-hunt-auto-settle` edge function to also sync slot data when a hunt completes, ensuring all final results are captured.

All slots will immediately appear in the admin panel's "Slot Katalog" tab where you can manually edit RTP, volatility, max potential, and other fields.

---

### Technical Details

**Step 1: Backfill Bonus Hunt #2 data (database insert)**

Parse the 32 slots from the archived API data and insert them into `slot_catalog` using `ON CONFLICT (slot_name) DO UPDATE` to set `highest_win` and `highest_x` only if the new values are higher. Provider names from the API (including "Custom Slot" entries that have provider overrides) will be used. RTP data available from the API will also be included.

Slots from Hunt #2:
- Sweet Bonanza 1000 (Custom Slot, win: 43, x: 43)
- Sweet Bonanza (Pragmatic Play, RTP: 96.48, win: 20, x: 20)
- Rise of Merlin (Play'n Go, RTP: 96.58, win: 155, x: 155)
- Book of Dead (Play'n Go, RTP: 96.21, win: 27, x: 27)
- Starlight Princess 1000 (Pragmatic Play, win: 790, x: 395) -- highest win in the hunt
- ...and 27 more slots

**Step 2: Update `bonus-hunt-proxy` edge function**

Add a slot catalog sync step after the existing archive upsert logic. For each slot in the hunt data:
- Extract `slot.name`, `slot.provider`, `slot.rtp` from the API response
- Calculate multiplier as `win / bet` (when played)
- Check `bonus_hunt_provider_overrides` table for provider name corrections
- Upsert into `slot_catalog` using SQL: only update `highest_win` if new win is higher, only update `highest_x` if new multiplier is higher
- Provider and RTP are set on insert but not overwritten on update (so admin edits are preserved)

**Step 3: Update `bonus-hunt-auto-settle` edge function**

Add the same slot catalog sync logic when a hunt is auto-settled, ensuring completed hunts always update the catalog with final results.

### Files to modify
- `supabase/functions/bonus-hunt-proxy/index.ts` -- add slot catalog sync after archive upsert
- `supabase/functions/bonus-hunt-auto-settle/index.ts` -- add slot catalog sync when hunt completes

### Data operation
- Insert ~32 slots from Bonus Hunt #2 into `slot_catalog` via the database insert tool

