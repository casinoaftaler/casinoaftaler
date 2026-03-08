

## Investigation Results & Fix Plan

### Bug 1: Auto-spin blocked after bonus retrigger

**Root cause**: When a retrigger occurs during bonus with auto-spin active, `spinLockRef.current` is never released.

The flow:
1. Retrigger detected → `showRetriggerRef.current = true` (line 712)
2. If deferred via `pendingBonusActionRef`: the win animation completes, calls `action()` (line 1041), and comment says "spinLock is released inside retrigger handler" (line 1042)
3. But `handleRetriggerComplete` (line 829-837) **never sets `spinLockRef.current = false`**
4. Auto-spin fires → `handleSpin()` → blocked by `spinLockRef.current` check on line 557

**Fix**: Add `spinLockRef.current = false;` to `handleRetriggerComplete` before the auto-spin scheduling (around line 831).

### Bug 2: Auto-spin continues without enough credits

**Root cause**: The auto-spin continuation logic in the `finally` block (lines 807-821) schedules the next `handleSpin()` without checking if the user has enough credits. `handleSpin` does check `hasEnoughSpins(bet)` at line 561 and silently returns, but by then:
- The spin attempt is visible to the user
- The server call may fire and return an error
- The error toast "Der opstod en fejl" is shown

**Fix**: Add a credit check before scheduling the next auto-spin in the `finally` block. If `!hasEnoughSpins(bet)`, call `stopAutoSpin()` and return instead of scheduling.

### Files to modify

**`src/components/slots/BonanzaSlotGame.tsx`** — two targeted fixes:

1. **Line ~831**: In `handleRetriggerComplete`, add `spinLockRef.current = false;` before the auto-spin resume logic
2. **Lines ~807-821**: In the `finally` block's base-game auto-spin branch, add a `hasEnoughSpins(bet)` check. If insufficient credits → `stopAutoSpin()` and skip scheduling

