

## Investigation Results

### Issue 1: Bonus Winnings Accumulation
The server-side accumulation is correct - `bonus_winnings` is a running total that adds each spin's win amount. No double-counting occurs in the logic. However, there IS a timing race condition (same root cause as issue 2) where the `BonusStatusBar` "Gevinst" value can update prematurely via a realtime event before the win animation plays.

### Issue 2: Symbol Bar Revealing Next Symbol Early (Root Cause Found)

There is a **race condition** between the Postgres realtime channel and the suppress mechanism:

1. Client sends spin request to server
2. Server processes the spin, writes updated `expanding_symbol_ids` to the database (line 803 in slot-spin edge function), THEN sends the HTTP response
3. Postgres fires a realtime event for the DB write
4. Client receives the HTTP response and calls `suppressRealtimeUpdates()` (line 396 in SlotGame.tsx)

**The problem**: Step 3 (realtime event) can arrive at the client BEFORE step 4 (HTTP response processed). When this happens, the realtime handler in `useBonusGameSync.ts` (line 90-109) processes the event and immediately updates `bonusState.expandingSymbols` with the new symbol. The `BonusSymbolBar` then renders the new symbol as highlighted/active before the `BonusSymbolPicker` roulette animation has even started.

### Fix

**File: `src/hooks/useBonusGameSync.ts`**

Add a secondary guard: suppress realtime updates whenever a bonus spin is in progress, not just after the response arrives. This can be done by exposing `suppressRealtimeUpdates` to be called BEFORE the spin request is sent.

**File: `src/components/slots/SlotGame.tsx`**

Call `suppressRealtimeUpdates()` at the START of the spin handler (before the server call), not after the response arrives. This eliminates the race window entirely.

Specifically:
1. Move the `suppressRealtimeUpdates()` call from line 396 (inside the response handler) to earlier in the spin function -- right before the server call is made, but only for bonus spins (`isBonusSpin`).
2. If the spin fails or no `bonusState` is returned, call `resumeRealtimeUpdates()` in the error/cleanup path.
3. Keep the existing `suppressRealtimeUpdates()` call at line 829 for initial bonus triggers (non-bonus spins that trigger a bonus), since the server doesn't know the expanding symbol IDs yet at that point for non-bonus spins.

### Changes Summary

```text
src/components/slots/SlotGame.tsx
  - Add suppressRealtimeUpdates() call before the server spin request when isBonusSpin=true
  - Add resumeRealtimeUpdates() in the error handler for bonus spins
  - Remove the redundant suppressRealtimeUpdates() at line 396 for bonus spins (keep it for non-bonus trigger case)
```

This is a minimal, targeted fix (~5 lines changed) that closes the race window by ensuring realtime is suppressed before any DB writes occur on the server.
