
# Plan: Win Lines Sequencing & Leaderboard Bonus Multiplier

## Summary

Two fixes requested:
1. **Win Lines Sequencing**: Show connecting wins first, add 300ms delay, then show expanding symbol wins after expansion
2. **Bonus Multiplier on Leaderboard**: Verify bonus spins correctly update the biggest multiplier

---

## Analysis

### Issue 1: Win Lines Sequencing

**Current behavior (lines 729-779 in SlotGame.tsx):**
1. Connecting wins are calculated and shown
2. Win lines are hidden after 1000ms
3. Expansion animation happens
4. Final result (with expanding wins) is set
5. Win lines are shown for expanding wins

**Problem:** 
- No explicit 300ms delay between connecting wins display and expansion start
- The win lines for connecting wins are cleared BEFORE expansion, but expanding wins are shown at the end

**Fix:**
Add a 300ms delay after hiding connecting win lines before starting the expansion animation.

### Issue 2: Bonus Multiplier Tracking

**Current behavior:**
- Each bonus spin is recorded to `slot_game_results` with `bet_amount` and `win_amount`
- The leaderboard view calculates `biggest_multiplier = max(win_amount / bet_amount)` from ALL records
- This already includes bonus spins

**Verification from database:**
- Bonus spins ARE being recorded (e.g., win_amount: 5.00, bet_amount: 1 = 5x multiplier)
- The view already picks up max multiplier from all spins

**Conclusion:** The bonus multiplier tracking is already working correctly. A 20x bonus win would be recorded as `win_amount: 20, bet_amount: 1` and the view would calculate `biggest_multiplier = 20`.

---

## Implementation

### File: `src/components/slots/SlotGame.tsx`

**Location: Lines 755-775**

Modify the bonus expansion sequence to:
1. Show connecting wins for 1000ms (already done)
2. Hide connecting win lines
3. **Add 300ms delay** (NEW)
4. Start expansion darkening and animation
5. After expansion completes, show win lines for expanding wins

```text
Current flow:
- Show connecting wins -> wait 1000ms -> hide wins -> darken -> expand

New flow:
- Show connecting wins -> wait 1000ms -> hide wins -> wait 300ms -> darken -> expand -> show expanding wins
```

**Code change (pseudocode):**
```typescript
// Wait for user to see connecting wins
await new Promise(resolve => setTimeout(resolve, 1000));

// Clear connecting wins display before expansion
setShowWinLines(false);

// ADD: Wait 300ms before starting expansion
await new Promise(resolve => setTimeout(resolve, 300));

// Continue with expansion...
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/slots/SlotGame.tsx` | Add 300ms delay between connecting wins and expansion |

---

## Notes

- The bonus multiplier tracking is already working as designed - each bonus spin is recorded individually with its win and bet amounts, and the view correctly calculates the max multiplier across all spins
- The 300ms delay gives visual clarity between the two win phases
- Win lines for expanding symbols are already shown at the end of the expansion sequence (line 877-879)
