

## Ensure Leaderboard Resets Properly While Archiving All Data

### Current Behavior
The reset function already archives aggregate stats (total spins, winnings, biggest win, etc.) to `slot_statistics_archive` before deleting `slot_game_results`. This is working correctly.

### Problem Found
After deleting `slot_game_results`, the `slot_leaderboard` materialized view is **not refreshed**. This means the leaderboard UI continues showing old data until the view happens to be refreshed by another mechanism (e.g., a new spin result). Users would see stale leaderboard entries after a reset.

### Fix
Add a call to `refresh_slot_leaderboard()` in the edge function after deleting `slot_game_results`, so the leaderboard view immediately reflects the cleared state.

### Technical Details

**File: `supabase/functions/reset-slot-stats/index.ts`**

After the leaderboard deletion block (around line 166), add an RPC call to refresh the materialized view:

```typescript
// After deleting game results, refresh the materialized view
const { error: refreshError } = await supabase.rpc("refresh_slot_leaderboard");
if (refreshError) {
  console.error("Error refreshing leaderboard view:", refreshError);
  // Non-fatal: view will refresh on next spin anyway
} else {
  console.log("Refreshed slot_leaderboard materialized view");
}
```

This is the only change needed. The archiving logic is already correct and comprehensive.

