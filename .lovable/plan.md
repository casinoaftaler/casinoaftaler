

## Analysis: Bonus Hunt System Fix

### Problem
The system has **two blockers** preventing it from working:

1. **Proxy Edge Function** (`bonus-hunt-proxy/index.ts`, line 13): `BLOCKED_HUNTS = new Set([6, 7])` — the current active hunt (#6 or #7) is blocked from being archived and from triggering slot catalog sync.

2. **Auto-settle Edge Function** (`bonus-hunt-auto-settle/index.ts`, line 10): Same `BLOCKED_HUNTS = new Set([6, 7])` — prevents settlement from archiving the hunt snapshot.

3. **Bulk import Edge Function** (`bonus-hunt-bulk-import/index.ts`, line 11): Same block list.

The frontend hook (`useBonusHuntData.ts`, line 39) already has an **empty** `BLOCKED_HUNTS` set, so no frontend changes needed.

### What the system already does (once unblocked)
The architecture is already correct:
- **Live hunt**: Proxy fetches from StreamSystem API → displays on Bonus Hunt page
- **Archiving**: Proxy upserts the full API snapshot into `bonus_hunt_archives` on every fetch (if not blocked)
- **Slot catalog sync**: `syncSlotCatalog()` upserts each slot's name/provider into `slot_catalog` via `upsert_slot_catalog` RPC
- **Enrichment**: After slot sync, `slot-catalog-enrich` is triggered to fill missing RTP/volatility/max_potential via AI
- **bonus_count**: `increment_slot_bonus_counts` only fires for `isNewHunt` (first archive), preventing inflation from polling
- **Archive page**: Reads from `bonus_hunt_archives` table
- **Slot Database page**: Reads from `slot_catalog` table

### Plan (3 files, same change)

1. **`supabase/functions/bonus-hunt-proxy/index.ts`** — Change line 13:
   - `const BLOCKED_HUNTS = new Set([6, 7]);` → `const BLOCKED_HUNTS = new Set<number>();`

2. **`supabase/functions/bonus-hunt-auto-settle/index.ts`** — Change line 10:
   - `const BLOCKED_HUNTS = new Set([6, 7]);` → `const BLOCKED_HUNTS = new Set<number>();`

3. **`supabase/functions/bonus-hunt-bulk-import/index.ts`** — Change line 11:
   - `const BLOCKED_HUNTS = new Set([6, 7]);` → `const BLOCKED_HUNTS = new Set<number>();`

### Result
Once unblocked, the next time the Bonus Hunt page loads:
- The proxy will fetch the active hunt from StreamSystem
- It will archive the snapshot to `bonus_hunt_archives`
- New slots will be added to `slot_catalog` with name + provider
- The Archive page will show the hunt
- The Slot Database will reflect updated data
- When the hunt completes, auto-settle will persist the final snapshot permanently

