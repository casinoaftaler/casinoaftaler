
# Remake Big Win / Epic Win Celebration Screen

## Problem
The current win celebration animations are too brief and get cut short by the next spin starting. The counter counts up quickly, does a short pulse, then fades — not giving the player time to appreciate big wins. The next spin also fires on a fixed timeout (500ms bonus / 1500ms auto-spin) without waiting for the celebration to finish.

## Solution

### 1. Increase celebration durations significantly in WinCelebration.tsx

**Counter duration** (how long the number counts up):
- Big Win (10x+): 2200ms -> 3500ms
- Mega Win (50x+): 2800ms -> 5000ms  
- Epic Win (100x+): 3500ms -> 7000ms

**Pulse/hold duration** (how long it stays on screen after counting):
- Big Win: 1800ms -> 3000ms
- Mega Win: 2200ms -> 4500ms
- Epic Win: 3000ms -> 6000ms

**Fade-out duration** (exit transition):
- Big Win: 400ms -> 800ms
- Mega Win: 450ms -> 1000ms
- Epic Win: 1000ms -> 1500ms

### 2. Block next spin until animation completes in BonanzaSlotGame.tsx

Currently the spin function fires on a timer without checking `isWinAnimating`. Changes:
- Add a ref to track when the win animation finishes
- In the `finally` block of `handleSpin`, check if win animation is still playing before scheduling the next auto-spin
- Use the `onAnimationComplete` callback to trigger the next auto-spin/bonus-spin instead of a fixed timer
- This ensures players see the full celebration before the game continues

### 3. Add a "click to skip" interaction

For manual play (non-auto-spin), allow clicking anywhere on the celebration overlay to skip to the end immediately, so players who don't want to wait can dismiss it.

## Technical Details

**Files to modify:**

1. **`src/components/slots/WinCelebration.tsx`**
   - Increase `pulseDuration`, `counterDuration`, and fade timings
   - Add `pointerEvents: auto` and an `onClick` handler for skip-to-end functionality
   - Make the overlay a proper blocking layer during big wins

2. **`src/components/slots/BonanzaSlotGame.tsx`**
   - Modify the `finally` block in `handleSpin` to not schedule next spin while `isWinAnimating` is true
   - Add an effect that watches for `isWinAnimating` transitioning to `false` and then schedules the next auto/bonus spin
   - This ensures the celebration plays fully before continuing

The total visible time for an Epic Win will go from roughly 5-6 seconds to approximately 15 seconds, making it a proper cinematic moment.
