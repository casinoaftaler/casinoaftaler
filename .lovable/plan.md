
# Fix: Expanding Symbol Should NOT Act as Wild in Bonus Game

## Problem
In the bonus game, the win calculation still treats symbols with `is_wild: true` as substitutes for other symbols. This means if the "Book" symbol (which is both scatter and wild) appears, it incorrectly substitutes for other symbols when calculating line wins.

The expanding symbol should only pay based on its OWN multipliers when it expands - it should not act as a wild that can substitute for other symbols.

## Current Behavior
- When calculating wins in bonus mode, symbols marked as `is_wild` can substitute for any other symbol
- This creates incorrect payouts where the expanding symbol is treated like a wildcard

## Expected Behavior
- In bonus mode, the expanding symbol should ONLY match with itself
- Standard wilds should NOT substitute for other symbols during bonus spins
- Expanding symbols pay on all 10 lines when they expand to 3+ reels, using their own symbol multipliers

## Solution

### File: `src/lib/bonusGameLogic.ts`

**Change 1: Update `checkIfExpandingCreatesPaylineWin` function (lines 94-112)**
Remove the wild substitution logic. A match should only occur when:
- Symbol IDs are identical, OR
- The current symbol IS the expanding symbol

**Change 2: Update `calculateWins` function (lines 243-257)**
In the standard win calculation section, remove the wild substitution logic. Matches should only be:
- Exact symbol ID matches (no wild substitution)
- This ensures expanding symbols only pay when they actually match

### Specific Code Changes

**In `checkIfExpandingCreatesPaylineWin`:**
```typescript
// Before (line 99-101):
const isMatch = 
  symbol.id === baseSymbol?.id || 
  symbol.is_wild;

// After:
const isMatch = symbol.id === baseSymbol?.id;
```

**In `calculateWins`:**
```typescript
// Before (line 245-247):
const isMatch = 
  current.id === baseSymbol.id || 
  current.is_wild;

// After:
const isMatch = current.id === baseSymbol.id;
```

Also remove the logic that updates the base symbol when starting with a wild (lines 251-254), since we no longer have wild substitution in bonus mode.

## Why This Works
- The expanding symbol win calculation (lines 207-225) is already correct - it pays based on the expanding symbol's own multipliers on all 10 lines
- By removing wild substitution from the standard line calculation, we ensure no symbol can act as a wildcard in bonus mode
- Example: If "A" is the expanding symbol and appears on reels 1, 3, 5, it will expand and pay the "A" multiplier × 10 lines

## Technical Details
- Lines 94-112: Remove `symbol.is_wild` from match condition
- Lines 233-254: Remove wild symbol handling entirely from bonus standard wins
- Lines 251-254: Remove base symbol update logic for wilds
