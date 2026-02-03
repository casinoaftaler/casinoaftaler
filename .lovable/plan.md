
# Fix Spin Button Spam and Reel Timing Predictability

## Problems Identified

### Problem 1: Spin Button Can Be Spammed
The current spin lock releases after 300ms, but this is too short. Users can rapidly click and break reel 5 timing. The user wants a 500ms delay after:
1. Reel 5 has completely landed
2. Any win animation has been shown

### Problem 2: Reel Slowdown Is Predictable
Tease reels (those that slow down for scatter tension) may start slowing before the previous reel has fully stopped. This makes it possible to predict if a scatter tease will happen by watching reel behavior.

The issue is in the coordination between:
- When a non-tease reel stops
- When the next tease reel should transition from "fake loop" to "active slowdown"

## Solution

### Fix 1: Extend Spin Lock Delay to 500ms

Change the spin lock release timing from 300ms to 500ms after spin completion. Additionally, ensure the lock is only released AFTER win animations complete.

**File: `src/components/slots/SlotGame.tsx`**
- Increase the spin lock release delay from 300ms to 500ms (line 726)
- Add a check to wait for win animation completion before releasing the lock

### Fix 2: Fix Reel Timing to Prevent Prediction

The tease reel should only start its slowdown animation AFTER the previous reel has completely stopped. Currently, the fake loop runs continuously, but the transition to active tease might happen prematurely.

**File: `src/components/slots/SlotReel.tsx`**
- Ensure tease reels maintain constant speed in fake loop until explicitly activated
- Only transition to slowdown when `isActiveTeaseReel` becomes true AND the previous reel has confirmed stopped
- Remove any visual cues that could telegraph the upcoming tease

**Key Changes:**
1. Make fake loop animation speed completely constant (no variation)
2. Only trigger the slowdown transition when `isActiveTeaseReel` prop changes to true
3. Ensure the transition is instantaneous - no "pre-slowdown" hints

## Technical Details

### SlotGame.tsx Changes

```text
Current (line 726-732):
setTimeout(() => {
  spinLockRef.current = false;
  ...
}, 300);

New:
Wait for isWinAnimating to be false, then wait 500ms before releasing lock
```

### SlotReel.tsx Changes

The fake loop animation should:
1. Run at a consistent speed with no variation
2. Only respond to `isActiveTeaseReel` when the previous reel has definitively stopped
3. Have the same visual appearance as a normal spinning reel (no anticipatory glow or slowdown)

## Files Changed

| File | Change |
|------|--------|
| `src/components/slots/SlotGame.tsx` | Increase spin lock delay to 500ms, ensure lock waits for win animation |
| `src/components/slots/SlotReel.tsx` | Make fake loop speed constant, ensure no premature slowdown signals |

## Expected Behavior After Fix

1. **Spin Button**: Cannot be clicked for 500ms after reel 5 lands and any win is displayed
2. **Reel Timing**: All reels spin at identical speeds until their designated stop time - no early slowdown that telegraphs scatter teases
3. **Tease Transition**: Slowdown only begins the exact moment the previous reel fully stops

## Summary

Two targeted fixes to improve game integrity:
1. Longer spin lock (500ms post-completion) prevents button spam that breaks reel 5
2. Consistent reel speeds until explicit activation prevents players from predicting scatter teases
