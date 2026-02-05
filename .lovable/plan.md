
# Plan: Consolidate Bonus Results for Leaderboard

## Overview
Modify the slot game to record bonus rounds as a single entry instead of per-spin, and exclude free spins from the spin count.

## Current Behavior
- Every spin (including bonus spins) inserts a separate row into `slot_game_results`
- Each row has `win_amount` for that spin, causing leaderboard to update on every bonus spin
- `total_spins` in the leaderboard view counts ALL rows, including bonus spins

## Proposed Changes

### 1. Skip Recording Individual Bonus Spins
**File**: `src/components/slots/SlotGame.tsx` (lines 783-795)

Change the spin result recording logic to:
- Only record results for **regular spins** (not bonus spins)
- Skip the database insert when `isBonusSpin` is true

### 2. Record Bonus Summary at End
**File**: `src/components/slots/SlotGame.tsx` (in `handleBonusEnd` callback, lines 396-405)

When the bonus ends, insert a single summary row:
- `bet_amount`: The bet amount used when bonus was triggered
- `win_amount`: 0 (no line win for this summary row)
- `bonus_win_amount`: Total accumulated bonus winnings
- `is_bonus_triggered`: false (we already counted the trigger on the initial spin)

### 3. Track Bet Amount for Bonus Summary
**File**: `src/components/slots/SlotGame.tsx`

Add state to capture the bet amount when bonus is triggered, so we can use it when recording the final bonus summary.

---

## Technical Details

### SlotGame.tsx Changes

**Add state for bonus bet tracking**:
```typescript
const [bonusBetAmount, setBonusBetAmount] = useState<number>(1);
```

**Modify spin result recording (lines ~783-795)**:
```typescript
// Only record non-bonus spins to database
if (user && !isBonusSpin) {
  supabase.from("slot_game_results").insert({
    user_id: user.id,
    bet_amount: bet,
    win_amount: result.totalWin,
    is_bonus_triggered: result.bonusTriggered,
    bonus_win_amount: 0, // Bonus wins recorded separately at end
  }).then(() => {
    queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
  });
  
  // Capture bet amount when bonus triggers for later
  if (result.bonusTriggered) {
    setBonusBetAmount(bet);
  }
}
```

**Modify handleBonusEnd (lines ~396-405)**:
```typescript
const handleBonusEnd = useCallback(() => {
  if (shouldEndBonus && !isSpinning && !isWinAnimating) {
    const { winnings, spins } = endBonus();
    
    // Record the complete bonus result as a single entry
    if (user && winnings > 0) {
      supabase.from("slot_game_results").insert({
        user_id: user.id,
        bet_amount: bonusBetAmount,
        win_amount: 0,
        is_bonus_triggered: false,
        bonus_win_amount: winnings,
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
      });
    }
    
    setBonusTotalWinnings(winnings);
    setBonusTotalSpinsUsed(spins);
    slotSounds.playBonusWin();
    setShowBonusComplete(true);
  }
}, [shouldEndBonus, isSpinning, isWinAnimating, endBonus, user, bonusBetAmount, queryClient]);
```

---

## Result
- Leaderboard `total_spins` only counts regular spins (one per bonus round, not 10+)
- Bonus winnings appear as one update at the end of the bonus round
- The "biggest multiplier" calculation still works because it uses `(win_amount + bonus_win_amount) / bet_amount`
- Existing leaderboard view requires no changes
