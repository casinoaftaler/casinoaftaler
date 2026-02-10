

## Fix: Reel 5 Missing Blink Effect During Expansion

### Problem
When symbols expand in Rise of Fedesvin, all expanded reels should show the blink/win effect. However, reel 5 (index 4) sometimes doesn't blink because of how `getWinningPositions` calculates which positions to highlight.

The function at line 609 uses `reelIndex < win.count` to determine if a reel should show winning positions. For a win line with `count: 4`, reel 5 is excluded even though it's expanded with the same winning symbol.

### Fix

**File: `src/components/slots/SlotGame.tsx`** (lines 599-614)

Update `getWinningPositions` so that when expanded reels are active and the current reel is one of them, all 3 row positions (0, 1, 2) are returned -- since the entire reel is filled with the expanding symbol. The `win.count` check should only apply to non-expanded reels.

```
getWinningPositions(reelIndex):
  if no wins -> return empty
  if expandedReels active and reel NOT in expandedReels -> return empty
  if expandedReels active and reel IS in expandedReels -> return [0, 1, 2]
  else (normal non-expanded wins) -> use existing win.count logic
```

This is a single function change (~3 lines added) that ensures all expanded reels get the full blink treatment.
