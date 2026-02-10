

## Fix: Random Win Lines Appearing After Expansion Animations

### Problem

After the sequential expanding symbol animations finish in Rise of Fedesvin (the multi-group loop), the code unconditionally falls through to `setLastResult(result)` on line 809, which sets the **full server result** with **all wins** (including the ones already shown per-group). Then on line 885, `setShowWinLines(true)` is called, causing all win lines to briefly flash on the grid -- appearing as random, unexpected symbol connections.

### Root Cause

Lines 809 and 885-887 in `SlotGame.tsx` don't account for the fact that wins were already displayed during the per-group expansion loop. They re-show everything.

### Fix

After the multi-group expansion block completes (line 776), filter the result to only contain **connecting wins** (non-expanding wins) that weren't already shown. If all wins were expanding wins (which is the common case), set `lastResult` to a version with an empty wins array so no win lines are drawn.

### Technical Changes

**File**: `src/components/slots/SlotGame.tsx`

1. After the multi-group `for` loop ends (around line 776), compute remaining wins that weren't part of any expansion group:

```typescript
// After multi-group loop (line 776), before falling through to line 809:
// Filter out wins already shown during expansion groups
const allExpandingWinKeys = new Set(
  winGroups.flatMap(g => g.wins.map((w: any) => `${w.lineIndex}-${w.symbolId}`))
);
const remainingWins = result.wins.filter(
  (w: any) => !allExpandingWinKeys.has(`${w.lineIndex}-${w.symbolId}`)
);
// Replace result.wins reference for the rest of the handler
const filteredResult = {
  ...result,
  wins: remainingWins,
  totalWin: result.totalWin, // keep total for celebration
};
```

2. Use `filteredResult` instead of `result` when setting `lastResult` on line 809, so only un-shown wins (if any) get win lines.

3. Similarly for the single-group path (lines 780-806), after showing the group's wins, clear the result wins before falling through.

4. The win amount celebration (lines 856-883) should still use the **original** `result.totalWin` for the final total display -- only the win lines should be filtered.

### Summary

One targeted change in `SlotGame.tsx` (~10 lines modified) to prevent already-displayed expansion wins from re-appearing as win lines at the end of the expansion sequence.

