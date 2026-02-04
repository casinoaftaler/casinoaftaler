
# Plan: Support 2-Match Expansion for Premium Symbols in Bonus Game

## Overview
When the expanding symbol is a **premium** symbol (Pharaoh, Anubis, Horus, Scarab), it should expand even when only 2 of the symbol land on consecutive reels from the left. Currently, expansion only triggers for 3+ matches regardless of rarity.

---

## Technical Details

### File: `src/lib/bonusGameLogic.ts`

#### Change 1: Update `applyExpandingSymbol` function
Add logic to check if the expanding symbol is premium and allow expansion for 2+ reels:

```typescript
// Current: Lines 31-33
if (reelsWithExpanding.length >= 3) {

// Update to:
const minReelsForExpand = expandingSymbol.rarity === 'premium' ? 2 : 3;
if (reelsWithExpanding.length >= minReelsForExpand) {
```

#### Change 2: Update `checkIfExpandingCreatesPaylineWin` function
Pass the expanding symbol's rarity into the payline check and adjust minimum matches:

```typescript
// Current: Lines 107-109
if (consecutiveMatches >= 3) {
  return true;
}

// Update to:
const minMatches = expandingSymbol.rarity === 'premium' ? 2 : 3;
if (consecutiveMatches >= minMatches) {
  return true;
}
```

#### Change 3: Update `calculateWins` function - Scatter-style payout
Handle 2-reel premium expanding wins with the scatter-style payout (pays on all 10 lines):

```typescript
// Current: Lines 203-204
if (expandingSymbol && expandedReels && expandedReels.length >= 3) {

// Update to:
const minReelsForScatterPay = expandingSymbol?.rarity === 'premium' ? 2 : 3;
if (expandingSymbol && expandedReels && expandedReels.length >= minReelsForScatterPay) {
```

Also update the multiplier selection to include `multiplier_2`:

```typescript
// Current: Lines 206-209
let multiplier = 0;
if (reelCount === 3) multiplier = expandingSymbol.multiplier_3;
else if (reelCount === 4) multiplier = expandingSymbol.multiplier_4;
else if (reelCount === 5) multiplier = expandingSymbol.multiplier_5;

// Update to:
let multiplier = 0;
if (reelCount === 2 && expandingSymbol.rarity === 'premium') {
  multiplier = expandingSymbol.multiplier_2;
} else if (reelCount === 3) {
  multiplier = expandingSymbol.multiplier_3;
} else if (reelCount === 4) {
  multiplier = expandingSymbol.multiplier_4;
} else if (reelCount === 5) {
  multiplier = expandingSymbol.multiplier_5;
}
```

#### Change 4: Update `calculateBonusSpinResult` function
Adjust the `hasExpandingWin` check to account for premium 2-reel wins:

```typescript
// Current: Line 143
const hasExpandingWin = expandedReels.length >= 3;

// Update to:
const minReelsForWin = expandingSymbol.rarity === 'premium' ? 2 : 3;
const hasExpandingWin = expandedReels.length >= minReelsForWin;
```

---

## Summary of Changes

| Location | Current Logic | New Logic |
|----------|---------------|-----------|
| Expansion threshold | 3+ reels always | Premium: 2+ reels, Common: 3+ reels |
| Payline win check | 3+ consecutive | Premium: 2+ consecutive, Common: 3+ |
| Scatter-style payout | 3+ reels | Premium: 2+ reels, Common: 3+ reels |
| Multiplier selection | Only 3/4/5 | Includes 2× for premium symbols |

---

## Expected Behavior After Implementation

- **Premium expanding symbol** (e.g., Pharaoh): Expands when landing on 2+ reels from the left, paying on all 10 lines using `multiplier_2`
- **Common expanding symbol** (e.g., K, Q): Still requires 3+ reels to expand (unchanged)
- Maintains consistency with the base game where premium symbols win with 2+ matches
