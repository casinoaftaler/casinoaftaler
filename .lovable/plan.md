
# Null Safety Checks for Slot Game Logic

## Problem
Both `slotGameLogic.ts` and `bonusGameLogic.ts` use non-null assertions (`!`) when retrieving symbols from a Map. If a symbol ID in the grid doesn't exist in the symbols array (due to database changes, stale data, or race conditions), the code will crash when trying to access properties on `undefined`.

## Affected Locations

### 1. `src/lib/slotGameLogic.ts`
**Line 183** - `checkLineWin` function:
```typescript
const lineSymbolData = lineSymbols.map(id => symbolsById.get(id)!);
```
- Later accesses `lineSymbolData[i].id`, `lineSymbolData[i].is_wild`, etc.
- Will crash if any symbol ID is not found in the Map

### 2. `src/lib/bonusGameLogic.ts`
**Line 232** - `calculateWins` function:
```typescript
const lineSymbolData = lineSymbols.map(id => symbolsById.get(id)!);
```
- Later accesses `lineSymbolData[0].is_scatter`, `current.id`, `baseSymbol.multiplier_3`, etc.
- Will crash if any symbol ID is not found in the Map

## Solution

### Approach: Filter out invalid symbols and skip lines with missing data

Rather than crashing, we'll:
1. Filter out any `undefined` values when mapping symbol IDs to symbol data
2. Return early (skip the line) if we don't have all 5 symbols resolved
3. Add console warnings in development to help debug data mismatches

---

## Implementation Details

### Changes to `slotGameLogic.ts`

**`checkLineWin` function (lines 172-217):**
```typescript
export function checkLineWin(
  grid: string[][],
  linePattern: number[],
  symbols: SlotSymbol[],
  betAmount: number
): LineWin | null {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const wildSymbol = symbols.find(s => s.is_wild);
  
  // Get symbols on this line
  const lineSymbols = linePattern.map((row, col) => grid[col][row]);
  const lineSymbolData = lineSymbols.map(id => symbolsById.get(id));
  
  // Safety check: if any symbol is missing, skip this line
  if (lineSymbolData.some(s => !s)) {
    console.warn('[SlotGame] Missing symbol data for line, skipping win check');
    return null;
  }
  
  // Now we know all symbols exist, cast to non-null array
  const validSymbols = lineSymbolData as SlotSymbol[];
  
  // Find the first non-wild symbol (or wild if all wilds)
  let baseSymbol = validSymbols.find(s => !s.is_wild) || validSymbols[0];
  
  // Count consecutive matching symbols from left
  let count = 0;
  for (let i = 0; i < 5; i++) {
    const current = validSymbols[i];
    if (current.id === baseSymbol.id || current.is_wild || baseSymbol.is_wild) {
      count++;
      if (baseSymbol.is_wild && !current.is_wild) {
        baseSymbol = current;
      }
    } else {
      break;
    }
  }
  
  // ... rest unchanged
}
```

### Changes to `bonusGameLogic.ts`

**`calculateWins` function (lines 191-275):**
```typescript
function calculateWins(
  grid: string[][],
  symbols: SlotSymbol[],
  betAmount: number,
  expandingSymbol?: SlotSymbol,
  expandedReels?: number[],
  hasExpandingWin?: boolean
): LineWin[] {
  const wins: LineWin[] = [];
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  
  // ... expanding symbol win logic unchanged ...
  
  // Standard win calculation (consecutive from left)
  for (let lineIndex = 0; lineIndex < PAY_LINES.length; lineIndex++) {
    const linePattern = PAY_LINES[lineIndex];
    const lineSymbols = linePattern.map((row, col) => grid[col][row]);
    const lineSymbolData = lineSymbols.map(id => symbolsById.get(id));
    
    // Safety check: if any symbol is missing, skip this line
    if (lineSymbolData.some(s => !s)) {
      console.warn('[BonusGame] Missing symbol data for line, skipping win check');
      continue;
    }
    
    // Now we know all symbols exist
    const validSymbols = lineSymbolData as SlotSymbol[];
    
    // Find the first non-scatter symbol as base
    let baseSymbol = validSymbols[0];
    if (allowWildSubstitution && baseSymbol.is_scatter) {
      const nonScatter = validSymbols.find(s => !s.is_scatter);
      if (nonScatter) {
        baseSymbol = nonScatter;
      }
    }
    
    // Count consecutive matching symbols from left
    let count = 0;
    for (let i = 0; i < 5; i++) {
      const current = validSymbols[i];
      const isMatch = current.id === baseSymbol.id || 
        (allowWildSubstitution && current.is_scatter);
      
      if (isMatch) {
        count++;
      } else {
        break;
      }
    }
    
    // ... rest unchanged
  }
  
  return wins;
}
```

---

## Summary of Changes

| File | Function | Change |
|------|----------|--------|
| `slotGameLogic.ts` | `checkLineWin` | Add null check before processing line, return `null` if symbols missing |
| `bonusGameLogic.ts` | `calculateWins` | Add null check before processing line, `continue` to skip if symbols missing |

## Benefits
- **Prevents crashes**: Game continues running even if symbol data is inconsistent
- **Graceful degradation**: Missing symbols result in no win for that line (rather than crash)
- **Debugging support**: Console warnings help identify data sync issues during development
- **Type safety**: Proper TypeScript narrowing after the null check
