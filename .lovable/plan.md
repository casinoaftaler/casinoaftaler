
# Add 2-Symbol Wins for Premium Symbols

## Overview
Premium symbols (Pharaoh, Anubis, Horus, Scarab) will be able to trigger wins with just 2 matching symbols in a row, while common symbols still require 3+ matching symbols.

## What Changes

### 1. Database Update
Add a new column for 2-symbol multipliers:

| Column | Type | Default |
|--------|------|---------|
| multiplier_2 | numeric(10,2) | 0 |

### 2. Game Logic Changes
Modify the win detection to check symbol rarity:
- **Premium symbols**: Win with 2, 3, 4, or 5 matching symbols
- **Common symbols**: Win only with 3, 4, or 5 matching symbols
- **Scatter**: Unchanged (pays anywhere with 3+)

### 3. PayTable Display
Update the paytable to show 2× column only for premium symbols:

| Symbol | 2× | 3× | 4× | 5× |
|--------|----|----|----|----|
| Pharaoh | 2× | 25× | 100× | 750× |
| Anubis | 1× | 15× | 75× | 500× |
| ... | | | | |

### 4. Admin Panel
Add a new input field for the 2× multiplier when editing symbols.

## Files Changed

| File | Change |
|------|--------|
| Database migration | Add `multiplier_2` column with default 0 |
| `src/lib/slotGameLogic.ts` | Update `SlotSymbol` interface and `checkLineWin` function |
| `src/lib/bonusGameLogic.ts` | Update `calculateWins` function for bonus spins |
| `src/components/slots/PayTable.tsx` | Add 2× column for premium symbols |
| `src/components/SlotMachineAdminSection.tsx` | Add multiplier_2 input field |
| `src/hooks/useSlotSymbolsAdmin.ts` | Include multiplier_2 in update mutation |

## Technical Details

**Database Migration:**
```sql
ALTER TABLE slot_symbols 
ADD COLUMN multiplier_2 numeric(10,2) DEFAULT 0;

-- Set sensible defaults for premium symbols
UPDATE slot_symbols SET multiplier_2 = 2 WHERE rarity = 'premium';
```

**Updated SlotSymbol Interface:**
```typescript
export interface SlotSymbol {
  id: string;
  name: string;
  image_url: string | null;
  multiplier_2: number;  // New field
  multiplier_3: number;
  multiplier_4: number;
  multiplier_5: number;
  is_scatter: boolean;
  is_wild: boolean;
  position: number;
  rarity: 'premium' | 'common' | 'scatter';
}
```

**Win Detection Logic (checkLineWin):**
```typescript
// Determine minimum required matches based on rarity
const minMatches = baseSymbol.rarity === 'premium' ? 2 : 3;

if (count >= minMatches) {
  let multiplier = 0;
  if (count === 2 && baseSymbol.rarity === 'premium') {
    multiplier = baseSymbol.multiplier_2;
  } else if (count === 3) {
    multiplier = baseSymbol.multiplier_3;
  } else if (count === 4) {
    multiplier = baseSymbol.multiplier_4;
  } else if (count === 5) {
    multiplier = baseSymbol.multiplier_5;
  }
  
  if (multiplier > 0) {
    return { lineIndex, symbolId: baseSymbol.id, count, payout: multiplier * betAmount };
  }
}
```

**PayTable Premium Section:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Symbol</TableHead>
      <TableHead className="text-right">2×</TableHead>
      <TableHead className="text-right">3×</TableHead>
      <TableHead className="text-right">4×</TableHead>
      <TableHead className="text-right">5×</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {premiumSymbols.map(symbol => (
      <TableRow key={symbol.id}>
        <TableCell>...</TableCell>
        <TableCell className="text-right">{formatMultiplier(symbol.multiplier_2)}</TableCell>
        <TableCell className="text-right">{formatMultiplier(symbol.multiplier_3)}</TableCell>
        ...
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Suggested Default Values

| Premium Symbol | 2× | 3× | 4× | 5× |
|----------------|----|----|----|----|
| Pharaoh | 2× | 25× | 100× | 750× |
| Anubis | 1.5× | 15× | 75× | 500× |
| Horus | 1× | 10× | 50× | 250× |
| Scarab | 0.5× | 5× | 25× | 125× |

## Summary

This feature makes premium symbols more valuable and exciting by rewarding players for getting just 2 matching premium symbols on a payline. The balance is maintained by:
- Only premium symbols can win with 2 matches
- 2-symbol multipliers are much lower than 3-symbol multipliers
- Common symbols and scatters work exactly as before
