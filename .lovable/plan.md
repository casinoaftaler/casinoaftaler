
# Add Expanding Symbol Animation and Scatter-Style Payout

## Summary
Fix two issues with the bonus game:
1. Add a visual animation that shows the expanding symbol expanding AFTER the reels stop
2. Make expanding symbols pay based on total count across all reels (like scatter pays) rather than requiring consecutive reels from the left

---

## Current Behavior vs Expected

### Animation
- **Current**: The expanded grid is set before showing results, so symbols appear already expanded
- **Expected**: Reels stop with original symbols, then the expanding symbol visually expands to fill the reel with a clear animation sequence

### Payout Logic  
- **Current**: Only pays if expanding symbols appear consecutively starting from reel 1
- **Expected (Book of Ra style)**: Pays based on total number of reels with expanding symbol, regardless of position (e.g., reels 2, 3, 5 = 3-of-a-kind win)

---

## Technical Implementation

### File: `src/components/slots/SlotGame.tsx`

**Change 1: Two-phase grid display**
- Store both `originalGrid` and `expandedGrid` separately
- After spin completes, first show `originalGrid` for ~500ms
- Then animate transition to `expandedGrid` with the expansion effects
- This creates a clear "symbols land → symbols expand" sequence

**Change 2: Add expansion animation timing**
- Delay setting `expandedReels` and `newlyExpandedReels` until after initial result display
- Play expansion sound during this delayed phase
- Update the grid to the expanded version during animation

### File: `src/lib/bonusGameLogic.ts`

**Change 3: Add scatter-style payout calculation for expanding symbols**
- Create new function `calculateExpandingSymbolWins` that pays based on total reel count
- When expanding symbol appears on 3+ reels (regardless of which reels), calculate payout using the symbol's multipliers
- For each payline that could contain the expanding symbol, check all positions rather than just consecutive from left

**Change 4: Update `calculateBonusSpinResult`**
- Include scatter-style expanding symbol wins in addition to standard line wins
- Ensure expanding symbols on non-consecutive reels (e.g., 1, 3, 5) still create valid wins

### Example Scenario
If expanding symbol is "Pharaoh" and appears on reels 1, 3, and 5:
- Before fix: No win (not consecutive from reel 1)
- After fix: 3-of-a-kind win on all 10 paylines (since expanded symbols fill entire reels)

---

## Animation Sequence

```text
Timeline (after reels stop):

0ms     → Show original grid with expanding symbol visible
500ms   → Start expansion animation
         - Play expansion sound
         - Symbol grows to fill entire reel
         - Purple glow effect activates
         - Flash animation plays
1100ms  → Expansion complete
         - Calculate and show wins
         - Display win lines on expanded grid
```

---

## Files to Modify

1. **`src/components/slots/SlotGame.tsx`**
   - Add state for pre-expansion grid display
   - Implement delayed expansion animation sequence
   - Coordinate timing between grid update and visual effects

2. **`src/lib/bonusGameLogic.ts`**
   - Modify `calculateWins` to handle expanding symbol scatter-pay logic
   - When the expanding symbol is present, calculate based on reel count rather than consecutive position
   - Pay on all 10 lines when 3+ reels have the expanding symbol

3. **`src/components/slots/SlotReel.tsx`** (minor)
   - May need adjustment to support showing original symbols first, then transitioning

---

## Edge Cases Handled

- Expanding symbol on only 1-2 reels: No expansion animation, no scatter-style pay
- Expanding symbol on 3+ non-consecutive reels: Full expansion, pays on all lines
- Retrigger during bonus: Animation plays before adding extra spins
- Autospin: Animation still plays but may be slightly faster
