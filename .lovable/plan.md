

## Fix: Clear Tease Darkening Before Expansion Animation

### Problem
When a bonus spin has both a tease (2+ scatters) AND an expanding win, the tease darkening (`isDarkenedForTease`) stays active during the expansion animation. This is because `scatterReelsLanded` is never cleared after the reels stop -- it persists until the next spin starts. Since the expansion animation runs while `isSpinning` is still `true`, the condition `scatterReelsLanded.size >= 2 && isSpinning` remains true, causing all non-scatter symbols to stay darkened even during expansion.

The same issue occurs with retriggers: 3 scatters land, scatter celebration plays, then expansion starts -- but tease darkening is still active.

### Solution

**File: `src/components/slots/SlotGame.tsx`**

1. **Clear `scatterReelsLanded` before expansion starts** (around line 798, before the expansion block):
   - Add `setScatterReelsLanded(new Set())` right before the expansion animation sequence begins
   - This ensures tease darkening is removed before expansion darkening takes over

2. **Also clear it before showing connecting wins** -- if there are connecting wins shown before expansion, tease darkening should already be gone at that point too

The payline + expansion darkening flow already works correctly (from the previous fix). The `showExpansionDarken` state properly controls darkening during payline display within expansion. This fix only addresses the tease darkening bleeding into the expansion phase.

### Technical Detail

The single change is inserting `setScatterReelsLanded(new Set())` at line 798, just before the expansion animation block:

```text
// Clear tease darkening before expansion begins
setScatterReelsLanded(new Set());

if (isBonusSpin && reelsExpanded.length > 0 && expandedGrid) {
  ...
}
```

This ensures:
- Tease darkening clears immediately when reels finish stopping
- Expansion darkening takes over cleanly via `showExpansionDarken`
- Paylines remain visible with darkened non-expanded reels (unchanged)
- After expansion completes, all reels return to normal brightness (unchanged)

