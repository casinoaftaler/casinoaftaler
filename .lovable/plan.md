
## Fix: Expanding Symbol Only Expands When It Creates the Win

### Problem
In bonus rounds, the expanding symbol incorrectly expands even when a different symbol creates the winning combination. For example, if Anubis is the expanding symbol but Pharaoh lands 3-in-a-row, Anubis still expands visually.

### Root Cause
The `checkIfExpandingCreatesPaylineWin` function checks if any payline has 3+ consecutive matching symbols after expansion, but doesn't verify that the **winning symbol is the expanding symbol itself**.

**Current buggy logic (line 108-109):**
```typescript
if (consecutiveMatches >= 3) {
  return true;  // ❌ Returns true for ANY win, not just expanding symbol wins
}
```

### Solution
Update the function to only return `true` when the expanding symbol itself is the base symbol that creates the win.

### Technical Changes

**File: `src/lib/bonusGameLogic.ts`**

Update the `checkIfExpandingCreatesPaylineWin` function to add a check that the winning symbol is the expanding symbol:

```typescript
function checkIfExpandingCreatesPaylineWin(
  grid: string[][],
  reelsWithExpanding: number[],
  expandingSymbol: SlotSymbol,
  symbols: SlotSymbol[]
): boolean {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  
  // Create a hypothetical expanded grid
  const hypotheticalGrid = grid.map(col => [...col]);
  for (const col of reelsWithExpanding) {
    for (let row = 0; row < 3; row++) {
      hypotheticalGrid[col][row] = expandingSymbol.id;
    }
  }
  
  // Check each pay line for wins WITH THE EXPANDING SYMBOL
  for (const linePattern of PAY_LINES) {
    const lineSymbols = linePattern.map((row, col) => {
      const symbolId = hypotheticalGrid[col][row];
      return symbolsById.get(symbolId);
    });
    
    // Only check if the EXPANDING SYMBOL creates a win
    // The first symbol on the line must be the expanding symbol
    // for the expansion to be worthwhile
    if (lineSymbols[0]?.id !== expandingSymbol.id) {
      continue; // Skip - not an expanding symbol win
    }
    
    let consecutiveMatches = 0;
    for (let col = 0; col < 5; col++) {
      const symbol = lineSymbols[col];
      if (!symbol) break;
      
      // Only match if it's the expanding symbol
      if (symbol.id === expandingSymbol.id) {
        consecutiveMatches++;
      } else {
        break;
      }
    }
    
    if (consecutiveMatches >= 3) {
      return true; // ✓ Expanding symbol itself creates a win
    }
  }
  
  return false;
}
```

### Key Logic Change
- **Before**: Check if ANY symbol creates a 3+ match after expansion → triggers expansion
- **After**: Check if the EXPANDING SYMBOL starts the line AND creates a 3+ match → triggers expansion

### Result
The expanding symbol will now only expand when:
1. It appears on 3+ reels (automatic expansion, guaranteed win)
2. It appears on 1-2 reels AND would create a winning line starting with itself

Wins from other symbols (Pharaoh, Anubis, etc.) will no longer incorrectly trigger the expansion animation.
