

## Fix: Multi-Expanding Symbol Logic in Rise of Fedesvin

### Problems Identified

There are **two server-side bugs** and **one client-side issue** causing the broken behavior when multiple expanding symbols land on the same spin.

---

### Bug 1: Shared Reel Conflict Resolution Destroys Wins (Server)

**File:** `supabase/functions/slot-spin/index.ts` -- `applyMultiExpandingSymbols()`

When two expanding symbols share a reel (e.g., J on reels 1,3,5 and Phoenix on reels 1,3), the function picks a single "winner" per reel based on highest `multiplier_5`. The losing symbol loses that reel entirely, potentially dropping below its minimum reel count and producing no win at all.

**Example:** J (common, needs 3 reels) is on reels 1,3,5. Phoenix (premium, needs 2 reels) is on reels 1,3. If Phoenix has a higher `multiplier_5`, it takes reels 1 and 3, leaving J with only reel 5 -- no win. If J wins, Phoenix gets 0 reels -- no win either.

**Fix:** Each expanding symbol should be evaluated independently against its own reels. Instead of a single `expandedGrid` with conflict resolution, the server should:

1. Calculate each symbol's reels independently (no conflict resolution)
2. Calculate wins for each symbol group independently on its own partially-expanded grid
3. Return all win groups to the client for sequential animation

The `expandedGrid` sent to the client should remain the merged/conflict-resolved version for final display, but win calculation must happen per-group on per-group grids.

---

### Bug 2: `processedLines` Prevents Second Group From Winning (Server)

**File:** `supabase/functions/slot-spin/index.ts` -- `calculateMultiExpandingBonusWins()`

The function uses a `processedLines` Set. When the first symbol group claims all 10 pay lines (which expanding wins always do -- they pay on ALL lines), the second group gets zero wins because every line is already in `processedLines`.

**Fix:** Remove the `processedLines` guard for expanding symbol wins. Each expanding symbol group should independently calculate its wins on all 10 lines. The groups don't compete for lines -- they each represent a separate expansion sequence with its own payout.

---

### Bug 3: Client End-of-Spin Total Win Display After Multi-Group (Client)

**File:** `src/components/slots/SlotGame.tsx` (lines 853-876)

After the multi-group loop finishes (with `skipEndCelebrationRef.current = true`), the code at line 855 sets `setWinAmount(result.totalWin)` which shows the server's total. However, since Bug 1 and 2 cause incorrect server totals, this displays wrong numbers. Additionally, after multi-group celebration, the end-of-spin code still tries to play win sounds and show celebration again based on `result.totalWin`, which can produce a "weird calculation" display.

**Fix:** After fixing Bugs 1 and 2, the server total will be correct. The client code already handles multi-group celebration sequentially and skips the end celebration, so this should work correctly once the server data is fixed.

---

### Implementation Plan

#### Server Changes (`supabase/functions/slot-spin/index.ts`)

1. **Refactor `applyMultiExpandingSymbols`** to still produce a merged expandedGrid (for display), but also return each symbol's independent reel list without conflict resolution.

2. **Refactor `calculateMultiExpandingBonusWins`**:
   - Remove `processedLines` tracking
   - Calculate wins per expanding symbol group independently, each on its own partial grid
   - Each group pays on all 10 lines independently based on its own reel count

3. **Update win group building** (lines 730-757): Use the independent per-symbol reel lists (not the conflict-resolved ones) when building `expandingWinGroups`.

#### Client Changes (`src/components/slots/SlotGame.tsx`)

4. **Update multi-group animation loop** (lines 700-776): Ensure each group's `partialGrid` is built from the original grid using that group's independent reels, not from the conflict-resolved data. The existing code already does this correctly at line 714-719, so no change needed here once the server sends correct per-group reels.

### Technical Details

The key insight is that in Rise of Fedesvin, each expanding symbol group should be treated as an independent expansion event:

```text
Spin lands: J on reels 1,3,5 -- Phoenix on reels 1,3

Group 1 (J): Expand reels 1,3,5 with J -> 3-of-a-kind on all 10 lines
Group 2 (Phoenix): Expand reels 1,3 with Phoenix -> 2-of-a-kind on all 10 lines (if premium)

Sequential animation:
  1. Darken -> Expand J on reels 1,3,5 -> Show J paylines -> Celebrate J win -> Unexpand
  2. Darken -> Expand Phoenix on reels 1,3 -> Show Phoenix paylines -> Celebrate Phoenix win -> Unexpand
  3. Continue to next spin
```

The merged `expandedGrid` (with conflict resolution for shared reels) is only used as a visual fallback if the client doesn't support sequential animation. Win calculation must always use independent per-symbol grids.

