
## Fix: Per-Group Win Celebrations and Reel Re-Expansion

### What's Wrong

**Issue 1: No per-group win celebration (big win box)**
Currently, the multi-group expansion loop (lines 828-868) shows paylines per group, but the win celebration (big win box, sounds, particles) only triggers ONCE at the very end (lines 964-986) using the combined `result.totalWin`. Each expanding group's win should trigger its own celebration before moving to the next group.

**Issue 2: Reels can't re-expand with a different symbol**
After group A expands reels [0, 1, 2] with symbol J and then "unexpands" (restores to original grid), group B should be able to expand reel 2 with symbol Merlin. Currently this works at the grid level (the grid IS restored), but visually the expansion animation (`newlyExpandedReels`) and darken states don't fully reset between groups, causing visual glitches.

**Issue 3: Final combined grid shown at the end is unnecessary**
After all individual groups have been shown with their own celebrations, the code sets the combined expanded grid (lines 870-872). This causes all expanded reels to flash again at the end. The combined view should be removed -- each group's individual display IS the presentation.

### Solution

**File: `src/components/slots/SlotGame.tsx`**

1. **Move win celebration logic INTO the per-group loop**: After showing paylines for each group, trigger `setIsWinAnimating(true)` and `setWinAmount(groupWin)` with the appropriate sound (big/medium/small win) based on that group's payout relative to bet. Wait for the celebration to complete before proceeding to the next group.

2. **Wait for WinCelebration to finish**: Use a promise that resolves when `onAnimationComplete` fires. For big wins (10x+), the WinCelebration component handles its own timing. For smaller wins, the 2-second timeout already handles it. The loop needs to `await` this.

3. **Remove the final combined grid display**: After the loop, skip lines 870-872 (don't set `setExpandedReels(reelsExpanded)` and `setGrid(expandedGrid)`). Instead, just restore the original grid and clear state.

4. **Ensure clean reel re-expansion**: Between groups, fully clear `expandedReelSymbolMapRef.current` so the next group's expansion styling starts fresh. Set the per-reel symbol map ONLY for the current group during its expansion.

5. **Skip end-of-spin win celebration for multi-group**: After the loop, set a flag so the general win celebration block (lines 964-986) is skipped -- it was already shown per-group.

### Detailed Changes

**Per-group loop (lines 828-868) becomes:**
```text
for each group in winGroups:
  1. Set expandedReelSymbolMapRef for THIS group's reels only
  2. Darken non-expanded reels
  3. Expand animation (set grid, newlyExpandedReels)
  4. Show paylines (1200ms)
  5. Trigger win celebration for this group's total payout
     - Calculate groupWin = sum of group.wins payouts
     - Play appropriate sound (big/medium/small)
     - setWinAmount(groupWin), setIsWinAnimating(true)
     - Wait for celebration to complete (await promise)
  6. Clear win state, paylines, darken
  7. Restore original grid
  8. Clear expandedReelSymbolMapRef
  9. Brief pause before next group
```

**End-of-spin celebration (lines 964-986):**
- Add a `skipEndCelebration` flag set to `true` after the multi-group loop
- When `skipEndCelebration` is true, skip the sound/animation triggers but still set `lastResult` for the final state

### Technical Detail

A helper function to await the win celebration:
```text
const awaitWinCelebration = (groupWin: number) => {
  return new Promise<void>(resolve => {
    if (groupWin >= bet * 10) {
      // Big win -- WinCelebration handles timing via onAnimationComplete
      // We need a one-time listener approach
      setWinAmount(groupWin);
      setIsWinAnimating(true);
      // The onAnimationComplete callback will resolve this
      winCelebrationResolveRef.current = resolve;
    } else if (groupWin > 0) {
      setWinAmount(groupWin);
      setIsWinAnimating(true);
      setTimeout(() => {
        setIsWinAnimating(false);
        resolve();
      }, 2000);
    } else {
      resolve();
    }
  });
};
```

A new ref `winCelebrationResolveRef` will be used by the `onAnimationComplete` callback in WinCelebration to resolve the awaited promise for big wins.

This ensures each expanding group gets its full celebration (particles, big win box, sound) before the next group starts its expansion.
