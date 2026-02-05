

# Plan: Fix Auto-Spin Stopping Randomly in Base Game

## Problem Summary

The auto-spin feature in the base game randomly stops spinning before completing all auto-spins. The user enables auto-spin, but after a few spins it just stops without showing the "Autospin afsluttet" toast.

---

## Root Cause Analysis

The autospin logic in `SlotGame.tsx` (lines 428-464) has a race condition bug:

### Issue 1: Effect Cleanup Cancels Scheduled Spins

```typescript
useEffect(() => {
  // ... schedule next spin
  autoSpinTimeoutRef.current = setTimeout(() => {
    handleSpin();
  }, baseDelay);

  return () => {
    if (autoSpinTimeoutRef.current) {
      clearTimeout(autoSpinTimeoutRef.current);  // Cancels pending spin!
    }
  };
}, [isAutoSpinning, isSpinning, isWinAnimating, winAmount, canSpin, ...]);
```

**Problem**: When ANY dependency changes (like `winAmount` going from 0 → 150 → 0, or `canSpin` changing), the effect cleanup runs FIRST, canceling the scheduled timeout, then the effect runs again. If conditions aren't exactly right at that moment, no new timeout gets scheduled.

### Issue 2: State Transition Timing

The sequence of state changes after a spin completes:
1. `isSpinning` → `false`
2. `winAmount` → value (or 0)
3. `isWinAnimating` → `true` (if win) then → `false` (after 2 seconds)
4. `isSpinLocked` → `false` (after delay)

Each state change can trigger effect re-runs, and if the timing is unlucky, the autospin timeout gets canceled and never rescheduled.

### Issue 3: `isSpinLocked` Not in Dependencies

The effect doesn't watch `isSpinLocked`, but `handleSpin` checks it. So when the effect schedules `handleSpin()`, if `isSpinLocked` is still `true`, the spin is silently rejected.

---

## Solution

### Approach: Use a Stable Timer Pattern with Ref

Instead of relying on useEffect cleanup, use a ref-based pattern that only schedules a new spin when one isn't already scheduled. This prevents the cleanup/reschedule race condition.

### Changes to `src/components/slots/SlotGame.tsx`

**1. Add a tracking ref for scheduled autospin:**

```typescript
const autoSpinScheduledRef = useRef(false);
```

**2. Rewrite autospin effect with stable scheduling:**

```typescript
// Autospin effect - trigger next spin after current one completes
useEffect(() => {
  // Don't do anything if autospin is off or explicitly stopped
  if (!isAutoSpinning || shouldStopAutoSpinRef.current) {
    autoSpinScheduledRef.current = false;
    return;
  }
  
  // Can't schedule while spinning or animating
  if (isSpinning || isWinAnimating || isSpinLocked) return;
  
  // Don't schedule if overlays are showing
  if (showBonusTrigger || showBonusComplete || showRetrigger) return;
  
  // Skip if in bonus mode (handled by separate effect)
  if (bonusState.isActive) return;
  
  // Check if we can spin
  if (!canSpin) {
    stopAutoSpin();
    return;
  }
  
  // If already scheduled, don't double-schedule
  if (autoSpinScheduledRef.current) return;
  
  // Mark as scheduled
  autoSpinScheduledRef.current = true;
  
  // Schedule next spin
  const delay = 1000; // Fixed delay for consistency
  autoSpinTimeoutRef.current = setTimeout(() => {
    autoSpinScheduledRef.current = false;
    if (!shouldStopAutoSpinRef.current && isAutoSpinning) {
      handleSpinRef.current();
    }
  }, delay);
  
  // NO cleanup function - let the timeout fire naturally
  // The ref pattern prevents double-scheduling
}, [
  isAutoSpinning, 
  isSpinning, 
  isWinAnimating, 
  isSpinLocked,  // Add this - critical!
  canSpin, 
  showBonusTrigger, 
  showBonusComplete, 
  showRetrigger,
  bonusState.isActive
]);
```

**3. Reset the scheduled ref when autospin stops:**

Update `stopAutoSpin`:
```typescript
const stopAutoSpin = useCallback(() => {
  setIsAutoSpinning(false);
  setAutoSpinsRemaining(null);
  shouldStopAutoSpinRef.current = true;
  autoSpinScheduledRef.current = false;  // Add this
  if (autoSpinTimeoutRef.current) {
    clearTimeout(autoSpinTimeoutRef.current);
    autoSpinTimeoutRef.current = null;
  }
}, []);
```

**4. Reset scheduled ref on spin start:**

At the start of `handleSpin`:
```typescript
const handleSpin = async () => {
  // Reset autospin scheduled flag since we're spinning now
  autoSpinScheduledRef.current = false;
  
  // ... rest of function
};
```

**5. Use handleSpinRef pattern (already exists):**

The code already has `handleSpinRef` (line 468-469) for the bonus autospin. We'll use the same pattern for base game autospin to avoid stale closure issues.

---

## Key Improvements

| Before | After |
|--------|-------|
| Effect cleanup cancels pending timeouts | No cleanup - ref prevents double-scheduling |
| State changes cause timeout cancelation | Stable scheduling ignores intermediate state changes |
| `isSpinLocked` not watched | Added to dependencies |
| Race condition between state updates | Ref-based pattern is race-condition free |
| Different delays based on win amount | Consistent 1s delay for predictability |

---

## Files to Modify

1. **`src/components/slots/SlotGame.tsx`**
   - Add `autoSpinScheduledRef` ref
   - Rewrite autospin effect without cleanup function
   - Add `isSpinLocked` to dependency array
   - Update `stopAutoSpin` to reset scheduled ref
   - Update `handleSpin` to reset scheduled ref
   - Use `handleSpinRef.current()` instead of `handleSpin()` in timeout

---

## Expected Result

After these changes:
- Auto-spin will reliably fire every spin until the count is exhausted
- No more random stopping mid-auto-spin sequence
- Consistent 1-second delay between spins for predictable experience
- Properly waits for spin lock to release before attempting next spin

