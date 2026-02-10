

## Fix: Rise of Fedesvin Bonus Round Crash

### Root Cause Analysis

I found **3 bugs** causing the reported issue where reels turn off and an error appears after pressing "Start" on the bonus trigger:

---

### Bug 1 (Critical): `winGroups[0]` crash when expansion produces no win groups

**File:** `src/components/slots/SlotGame.tsx` (lines 803-806)

When a bonus spin results in expanded reels (`expandedReels.length > 0`) but the `expandingWinGroups` array is empty (possible when multiplier values produce no qualifying wins), the code enters the `else` branch and tries to access `winGroups[0].wins` -- which is `undefined`, causing a `TypeError`.

This crashes the `onReelStop` handler. The error bubbles up, and the catch block at line 441 sets `isSpinning(false)` (reels turn off) and shows an error toast.

**Fix:** Add a guard before accessing `winGroups[0]`. If `winGroups` is empty but expansion occurred, skip the single-group win animation and just show the expanded grid visually.

---

### Bug 2 (Secondary): `handleBonusEnd` INSERT blocked by security hardening

**File:** `src/components/slots/SlotGame.tsx` (line 465)

After the recent security migration removed INSERT permissions on `slot_game_results` for users, the client-side call in `handleBonusEnd` fails silently. This means bonus completion results are never recorded to the leaderboard.

**Fix:** Move the bonus result recording to the server. When the bonus ends and the client calls `endBonus()` which deletes the `slot_bonus_state` row, the server should handle recording the final bonus result. Alternatively, add a dedicated edge function call for bonus completion, or record it during the last bonus spin in the existing `slot-spin` function.

---

### Bug 3 (Minor): Realtime filter missing `game_id`

**File:** `src/hooks/useBonusGameSync.ts` (line 88)

The realtime subscription filters only by `user_id`, not `game_id`. If a user has active bonuses in both games, realtime events from one game can update the other game's bonus state, causing visual glitches.

**Fix:** The Supabase realtime filter syntax doesn't support multiple column filters directly, so the `game_id` check (already at line 99) is the correct approach. However, the DELETE event handler at line 94 doesn't check `game_id` before resetting state to INITIAL. This means ending a bonus in one game resets the other game's local state.

---

### Implementation Steps

1. **Guard `winGroups[0]` access** in `SlotGame.tsx`:
   - Before the `else` branch (line 803), check `winGroups.length > 0`
   - If empty, still show the expansion animation visually but skip win line display
   - Fall through to normal result handling

2. **Move bonus result recording server-side**:
   - In `slot-spin/index.ts`, detect when `free_spins_remaining` reaches 0 after decrement
   - Record the bonus result using `serviceClient` (which bypasses RLS)
   - Remove the client-side INSERT from `handleBonusEnd`

3. **Fix realtime DELETE handler**:
   - In `useBonusGameSync.ts`, check `payload.old.game_id` before resetting state on DELETE events

### Technical Details

**Bug 1 fix (SlotGame.tsx ~line 803):**
```
// Before:
} else {
  const singleGroupWinKeys = new Set(
    winGroups[0].wins.map(...)
  );

// After:
} else if (winGroups.length > 0) {
  const singleGroupWinKeys = new Set(
    winGroups[0].wins.map(...)
  );
  // ... rest of single-group logic
} else {
  // Expansion happened but no wins -- show expansion visually only
  setExpandedReels(reelsExpanded);
  setShowExpansionDarken(true);
  await new Promise(resolve => setTimeout(resolve, 500));
  setGrid(expandedGrid);
  setNewlyExpandedReels(reelsExpanded);
  slotSounds.playSymbolExpand();
  await new Promise(resolve => setTimeout(resolve, 600));
  setNewlyExpandedReels([]);
  setShowExpansionDarken(false);
  pendingExpandedReelsRef.current = [];
  pendingExpandingWinGroupsRef.current = [];
}
```

**Bug 2 fix (slot-spin/index.ts ~line 793):**
```
// After updating bonus state, check if bonus just ended
if (newFreeSpins <= 0 && newBonusWinnings > 0) {
  // Record bonus result server-side
  await serviceClient.from("slot_game_results").insert({
    user_id: userId,
    bet_amount: bet,
    win_amount: 0,
    is_bonus_triggered: false,
    bonus_win_amount: newBonusWinnings,
    game_id: gameId,
  });
}
```

**Bug 3 fix (useBonusGameSync.ts ~line 94):**
```
if (payload.eventType === "DELETE") {
  const oldData = payload.old as any;
  if (!oldData?.game_id || oldData.game_id === gameId) {
    setBonusState(INITIAL_STATE);
  }
}
```
