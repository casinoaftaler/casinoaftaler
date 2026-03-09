

## Problems Identified

1. **Duplicate slots**: The AI seeder can create near-duplicate entries (e.g. "Big Bass Secret Of Teh Golden Lake" vs "Big Bass Secret Of The Golden Lake") because `upsert_slot_catalog` matches on exact `LOWER(slot_name)`. Typos from AI = new rows.

2. **Decimal precision**: `highest_x` values like `16.66666666666668x` and `70.71428571428572x` are displayed raw. Need to round to 1 decimal place.

3. **No provider selection in Seed UI**: The "Start Seeding" button seeds all 17 providers at once with no ability to pick individual ones.

4. **`upsert_slot_catalog` counts "updates" as new**: The function always increments `slots_processed` even when the slot already existed, giving misleading results.

## Plan

### 1. Fix decimal display on `/slot-database`
In `src/pages/SlotDatabase.tsx`, format `highest_x` and `highest_win` to max 1 decimal:
- Line 339: `${slot.highest_x}x` → `${Number(slot.highest_x.toFixed(1))}x`
- Line 342: `${slot.highest_win} kr` → `${Number(slot.highest_win.toFixed(1))} kr`

Also fix in admin table (`SlotCatalogAdminSection.tsx` lines 269-270).

### 2. Add provider selection to Seed UI
In `SeedDatabaseSection` (`SlotCatalogAdminSection.tsx`):
- Add state for `selectedProviders: string[]` (default: all)
- Render checkboxes for each provider in `SEED_PROVIDERS`
- "Select All / Deselect All" toggle
- Only seed `selectedProviders` instead of all `SEED_PROVIDERS`
- Update button text to show count: `Start Seeding (X providers)`

### 3. Prevent duplicate slot entries
In the edge function `slot-catalog-seed/index.ts`:
- Before calling AI, fetch existing slot names for the provider from `slot_catalog`
- Pass these names to the AI prompt: "Do NOT include any of these slots that already exist: [list]"
- After AI response, filter out any slots whose `LOWER(name)` already exists in the database
- Track `skipped` count separately from `slots_processed` and return it in results

### 4. Database cleanup: remove existing duplicates
- Run a migration/data query to find near-duplicate slot names and merge them (keep the one with highest `bonus_count`/`highest_x`, delete the other)
- Specifically fix known typos like "Big Bass Secret Of Teh Golden Lake"

### Files to change
- `src/pages/SlotDatabase.tsx` — decimal formatting
- `src/components/admin/SlotCatalogAdminSection.tsx` — provider selection UI + decimal formatting
- `supabase/functions/slot-catalog-seed/index.ts` — pre-check existing slots, filter duplicates
- Data cleanup via insert tool for known duplicates

