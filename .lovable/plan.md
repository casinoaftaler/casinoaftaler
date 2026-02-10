

## Fix: Connecting Wins Show Before Expansion (Single-Group Path)

### Current Behavior

The **multi-group** path (2+ expanding symbols) already correctly shows connecting wins first (lines 686-698), then expands each group sequentially. No change needed there.

The **single-group** path (1 expanding symbol) has a bug: after showing connecting wins first (lines 690-698), it then expands the reels and shows `result` (ALL wins, including the connecting wins again) at line 791. This means connecting wins display **twice** -- once before and once after expansion.

### Fix

**File: `src/components/slots/SlotGame.tsx`** (lines 780-802)

In the single-group `else` branch, after expansion, only show the **expanding wins** (from the win group), not the full `result` which includes connecting wins:

```text
BEFORE (line 791):
  setLastResult(result);  // Shows ALL wins including connecting wins again

AFTER:
  const singleGroup = winGroups[0];
  const groupWin = singleGroup.wins.reduce((sum, w) => sum + w.payout, 0);
  if (singleGroup.wins.length > 0) {
    setLastResult({ ...result, wins: singleGroup.wins, totalWin: groupWin });
  }
```

This ensures:
1. Connecting (non-expanding) wins show first before any expansion
2. After expansion animation, only the expanding symbol's wins and paylines are displayed
3. No duplicate win line display

### Summary

- **Multi-group path**: Already correct, no changes needed
- **Single-group path**: Filter to only show expanding wins after expansion, not all wins

Only one file changes: `src/components/slots/SlotGame.tsx`, lines 791-797.

