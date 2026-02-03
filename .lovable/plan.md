

# Sequential Reel Stopping with Constant Speed Fake Loop

## Current Behavior

Currently, the slot machine uses two different modes:

1. **Normal Reels**: Each reel starts spinning at the same time, then slows down with a staggered delay (`delay * 350ms`) - so reel 1 stops first, then reel 2, etc.

2. **Tease Reels** (for scatter tension): Tease reels run in a "fake loop" at constant speed until they become "active", then they slow down over 3 seconds.

The problem is that in both modes, reels don't wait for the **previous reel to fully land** before starting their slowdown. They use time-based delays which can cause:
- Reels to start slowing before the previous one has stopped
- Predictable timing that players can exploit to anticipate scatter teases

## Requested Behavior

When you hit spin:
1. All reels spin at **constant speed** (fake loop) simultaneously
2. Reel 1 slows down and lands first
3. **Only after** reel 1 has completely landed, reel 2 starts slowing
4. **Only after** reel 2 has completely landed, reel 3 starts slowing
5. And so on for reels 4 and 5

This creates a satisfying cascade effect where each reel definitively stops before the next begins its landing sequence.

## Solution Overview

### Changes to SlotReel.tsx

1. **All reels start in fake loop mode** (not just tease reels)
2. **Remove time-based delays** - reels no longer use `delay * 350` calculation
3. **Add new prop `shouldSlowDown`** - a boolean that tells the reel when to transition from fake loop to slowdown
4. When `shouldSlowDown` becomes true, the reel exits the fake loop and begins its landing animation
5. Constant speed fake loop for all reels while waiting

### Changes to SlotGame.tsx

1. **Track which reel should slow down** using a new state `activeSlowdownReel` (starts at 0)
2. **Reel 0 starts slowing immediately** after a brief initial spin delay (e.g., 500ms)
3. **When `onReelStop` fires for reel N**, set `activeSlowdownReel` to N+1
4. This creates the sequential cascade: reel 1 stops → reel 2 slows → reel 2 stops → reel 3 slows → etc.

### Additional Fix: Spin Lock Timing

As noted in the previous plan, extend the spin lock to 500ms after reel 5 lands and wait for win animation to complete.

## Technical Details

### SlotReel.tsx Changes

```text
New prop:
- shouldSlowDown: boolean (replaces the time-based delay logic)

Logic changes:
1. ALL reels start in fake loop mode when isSpinning becomes true
2. Fake loop runs at constant speed (no variation, no easing)
3. When shouldSlowDown becomes true:
   - Exit fake loop
   - Begin slowdown animation (1.5s with easeOutQuad)
   - Call onReelStop when complete
4. Tease reels still get longer slowdown (3s) for scatter anticipation
```

### SlotGame.tsx Changes

```text
New state:
- activeSlowdownReel: number (which reel should currently slow down, starts at -1)

Logic:
1. When spin starts, set activeSlowdownReel to -1
2. After 500ms initial spin, set activeSlowdownReel to 0 (reel 1 starts slowing)
3. In onReelStop callback:
   - When reel N stops, set activeSlowdownReel to N + 1
   - This triggers the next reel to slow down
4. Pass shouldSlowDown={activeSlowdownReel === colIndex} to each SlotReel
```

### Spin Lock Fix

```text
Current: 300ms delay after all reels stop
New: 500ms delay AFTER win animation completes

Logic:
1. Track when isWinAnimating becomes false
2. Only then start the 500ms countdown
3. For no-win spins, apply 500ms delay immediately after reels stop
```

## Files Changed

| File | Change |
|------|--------|
| `src/components/slots/SlotReel.tsx` | Add `shouldSlowDown` prop, all reels start in fake loop, transition on prop change |
| `src/components/slots/SlotGame.tsx` | Add `activeSlowdownReel` state, sequential activation logic, improved spin lock timing |

## Expected Behavior After Changes

1. **Press Spin**: All 5 reels start spinning at the same constant speed
2. **After ~500ms**: Reel 1 begins slowing down
3. **Reel 1 lands**: Sound plays, reel 2 immediately begins slowing
4. **Reel 2 lands**: Sound plays, reel 3 immediately begins slowing
5. **...continues through reel 5**
6. **Reel 5 lands**: Win/loss processed, spin button locked for 500ms (longer if win animation plays)
7. **Spin button unlocked**: Player can spin again

## Tease Mode Integration

The tease logic for scatter tension will still work:
- Tease reels (those after 2 scatters) get a longer slowdown duration (3 seconds instead of 1.5 seconds)
- The glow effects and sounds remain the same
- But tease reels still wait for the previous reel to land before starting their slowdown

## Summary

This implementation creates a clean, sequential reel-stopping animation where:
- All reels spin at identical constant speeds
- Each reel waits for the previous to fully stop
- No timing-based predictions are possible
- The spin button is properly locked to prevent spam

