
# Fix: Bet Size Resetting During Bonus in Rise of Fedesvin

## Problem
During an active bonus round, win calculations use the `bet` value sent from the client instead of the locked-in bet amount stored in the database. This means if the client's local `bet` state drifts to 1 (e.g., due to a component re-render, race condition, or state reset), all subsequent bonus spin payouts are calculated at bet=1 instead of the original bet.

## Root Cause
The `slot-spin` Edge Function receives `bet` from the request body and uses it directly for all win calculations during bonus spins -- even though the correct bet is already stored in `slot_bonus_state.bet_amount`.

Affected lines in `supabase/functions/slot-spin/index.ts`:
- Line 724: `calculateMultiExpandingBonusWins(..., bet, ...)` (Rise of Fedesvin)
- Line 769: `calculateBonusWins(..., bet, ...)` (Book of Fedesvin)
- Line 776-778: Scatter payout calculations using `bet`
- Line 821: `bet_amount: bet` in final bonus result recording

## Solution
**Server-side fix only** -- override `bet` with the stored `bonusData.bet_amount` at the start of the bonus spin path. This is the authoritative, tamper-proof approach since the database value was set when the bonus was originally triggered.

### Changes

**File: `supabase/functions/slot-spin/index.ts`**

After confirming the bonus state is valid (around line 667), add:

```text
// Use the locked-in bet from bonus trigger, not the client-sent value
bet = Number(bonusData.bet_amount) || bet;
```

This single line ensures:
- All win calculations use the correct bet
- Scatter payouts use the correct bet
- The final bonus result record uses the correct bet
- It's impossible for a client to send a manipulated bet during bonus
- No frontend changes needed

### Why not a frontend fix?
The current frontend restore effect (lines 182-187) is a good safeguard but insufficient alone because:
1. It depends on React state timing
2. A client could theoretically send any bet value
3. The server should be the source of truth for the locked-in bet amount

The frontend restore effect can remain as-is for UI correctness, but the server must enforce the correct bet.

## Files Modified
| File | Change |
|---|---|
| `supabase/functions/slot-spin/index.ts` | Override `bet` with `bonusData.bet_amount` at start of bonus spin path |
