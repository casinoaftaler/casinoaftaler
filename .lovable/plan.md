
# Plan: Fix Bonus Game Mechanics and Win Line Display

## Overview
This plan addresses three issues with the slot machine bonus game and win visualization.

## Issues to Fix

### 1. Scatter as Wild in Bonus (Only Without Expanding Win)
Currently, during bonus rounds, the scatter/Book symbol doesn't act as a wild. It should substitute for other symbols ONLY when there isn't an expanding symbol win on that spin.

**File:** `src/lib/bonusGameLogic.ts`

**Changes:**
- Modify `calculateWins` function to accept a new parameter `hasExpandingWin`
- When `hasExpandingWin` is false, allow scatter/wild substitution (same logic as normal game)
- When `hasExpandingWin` is true, keep current behavior (no wild substitution)
- Update `calculateBonusSpinResult` to determine if an expanding win occurred and pass that to `calculateWins`

### 2. Only Expanded Reels Should Animate
When an expanding win occurs, only the reels that contain the expanding symbol should show the winning animation. Other reels should remain static.

**File:** `src/components/slots/SlotGame.tsx`

**Changes:**
- Modify `getWinningPositions` function to check if we have an expanding win
- If there's an expanding win (`expandedReels.length > 0`), only return winning positions for reels that are in the `expandedReels` array
- Other reels won't get the pulsing/glowing animation

### 3. Win Lines Show Complete Payline (All 5 Positions)
Currently, win lines only draw up to the winning symbol count (3, 4, or 5). They should always show the entire line across all 5 reels.

**File:** `src/components/slots/WinLines.tsx`

**Changes:**
- Modify `generateLinePath` function to always draw all 5 positions
- Remove the `count` parameter limitation and always iterate through all 5 columns
- The line will show the full payline shape regardless of how many symbols matched

## Technical Details

### bonusGameLogic.ts Changes

```typescript
// Updated function signature
function calculateWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol?: SlotSymbol,
  expandedReels?: number[],
  hasExpandingWin?: boolean  // NEW parameter
): LineWin[]

// In calculateBonusSpinResult:
// Check if expanding win happened first
const hasExpandingWin = expandedReels.length >= 3;

// Pass to calculateWins - wild substitution only when no expanding win
const wins = calculateWins(
  expandedGrid, 
  symbols, 
  betAmount, 
  expandingSymbol, 
  expandedReels,
  hasExpandingWin
);
```

### SlotGame.tsx Changes

```typescript
const getWinningPositions = (reelIndex: number): number[] => {
  if (!lastResult || lastResult.wins.length === 0) return [];
  
  // If we have an expanding win, only show animation on expanded reels
  if (expandedReels.length > 0 && !expandedReels.includes(reelIndex)) {
    return []; // Don't highlight non-expanded reels
  }
  
  const positions: number[] = [];
  for (const win of lastResult.wins) {
    const linePattern = PAY_LINES[win.lineIndex];
    if (reelIndex < win.count) {
      positions.push(linePattern[reelIndex]);
    }
  }
  return [...new Set(positions)];
};
```

### WinLines.tsx Changes

```typescript
// In generateLinePath function
const generateLinePath = (lineIndex: number, count: number) => {
  const pattern = PAY_LINES[lineIndex];
  const points: { x: number; y: number }[] = [];

  // Always draw the full line (all 5 positions)
  for (let col = 0; col < 5; col++) {
    const row = pattern[col];
    points.push(getSymbolCenter(col, row));
  }
  // ... rest remains the same
};
```

## Expected Behavior After Changes

| Scenario | Before | After |
|----------|--------|-------|
| Bonus spin with expanding symbol on 3+ reels | All winning reels animate | Only expanded reels animate |
| Bonus spin without expanding win | Wild doesn't substitute | Scatter acts as wild for line wins |
| Any winning line | Shows partial line (3-5 symbols) | Shows complete line (all 5 positions) |

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/bonusGameLogic.ts` | Add wild substitution when no expanding win |
| `src/components/slots/SlotGame.tsx` | Filter winning positions to only expanded reels |
| `src/components/slots/WinLines.tsx` | Draw complete 5-position paylines |
