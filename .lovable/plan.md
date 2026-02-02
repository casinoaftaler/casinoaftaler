
# Plan: Scatter Rarity & Tease System

## Overview
This plan implements two features:
1. **Rarer Scatters**: Reduce the probability of the Book (scatter) symbol appearing
2. **Tease System**: When 2 scatters land on the first reels, the remaining reels slow down to build anticipation

---

## Changes

### 1. Make Scatters More Rare
**File: `src/lib/slotGameLogic.ts`**

Reduce the Book symbol weight from 12 to 5-6 (making it as rare as the Pharaoh, the rarest non-scatter symbol).

```typescript
// Current
'Book': 12, // Scatter/Wild - slightly rarer

// Changed to
'Book': 5,  // Scatter/Wild - very rare
```

---

### 2. Add Scatter Counting Per Reel
**File: `src/lib/slotGameLogic.ts`**

Add a new function to count scatters per column, which will be used to detect "tease" situations:

```typescript
export function countScattersPerReel(grid: string[][], symbols: SlotSymbol[]): number[] {
  const scatterSymbol = symbols.find(s => s.is_scatter);
  if (!scatterSymbol) return [0, 0, 0, 0, 0];
  
  return grid.map(column => 
    column.filter(symbolId => symbolId === scatterSymbol.id).length
  );
}

export function getScatterTeaseReels(grid: string[][], symbols: SlotSymbol[]): number[] {
  const scattersPerReel = countScattersPerReel(grid, symbols);
  
  // Count total scatters in first N reels
  let scatterCount = 0;
  let teaseStartReel = -1;
  
  for (let i = 0; i < 5; i++) {
    if (scattersPerReel[i] > 0) {
      scatterCount += scattersPerReel[i];
    }
    // If we have 2+ scatters in the first 1-3 reels, tease on remaining reels
    if (scatterCount >= 2 && teaseStartReel === -1 && i < 3) {
      teaseStartReel = i + 1; // Tease starts on the next reel
    }
  }
  
  // Return indices of reels that should be teased
  if (teaseStartReel > 0) {
    return Array.from({ length: 5 - teaseStartReel }, (_, i) => teaseStartReel + i);
  }
  return [];
}
```

---

### 3. Pass Tease Information to Reels
**File: `src/components/slots/SlotGame.tsx`**

- After generating the grid but before spinning, calculate which reels should tease
- Pass a `teaseMode` prop to `SlotReel` components

```typescript
// In handleSpin(), after generating the grid:
const teaseReels = getScatterTeaseReels(originalGrid, symbols);

// When rendering SlotReel:
<SlotReel
  key={colIndex}
  symbols={symbols}
  displayedSymbolIds={column}
  isSpinning={isSpinning}
  teaseMode={teaseReels.includes(colIndex)}
  delay={colIndex}
  // ... other props
/>
```

---

### 4. Implement Tease Animation in SlotReel
**File: `src/components/slots/SlotReel.tsx`**

When `teaseMode` is true:
- Increase the spin duration significantly (e.g., 2x-3x longer)
- Use a different easing curve for more dramatic slowdown
- Optionally add visual effects (glow, shake) during tease

```typescript
interface SlotReelProps {
  // ... existing props
  teaseMode?: boolean;  // NEW: Whether this reel should tease (slow reveal)
}

// In the animation logic:
const baseSpinDuration = teaseMode ? 1800 : 1000; // Longer base duration for tease
const reelStopDelay = teaseMode ? delay * 550 : delay * 350; // Slower stagger for tease

// Use different easing for tease - slower deceleration
const easing = teaseMode 
  ? 1 - Math.pow(1 - progress, 4)  // Slower ease out
  : 1 - Math.pow(1 - progress, 2); // Normal ease out
```

---

### 5. Update Spin Duration in SlotGame
**File: `src/components/slots/SlotGame.tsx`**

Account for the longer tease animation when calculating total spin duration:

```typescript
// Calculate total spin duration based on whether we have a tease
const hasTeaseReels = teaseReels.length > 0;
const spinDuration = hasTeaseReels ? 4000 : 2500; // Longer wait for tease spins
```

---

## Technical Details

### Timing Breakdown (Normal Spin)
- Base duration: 1000ms
- Per-reel stagger: 350ms
- Total for 5 reels: 1000 + (4 × 350) = 2400ms

### Timing Breakdown (Tease Spin)
- Base duration: 1800ms (80% longer)
- Per-reel stagger: 550ms (57% longer)
- Total for 5 reels: 1800 + (4 × 550) = 4000ms

### Visual Tease Effects (Optional)
- Amber glow around teasing reels
- Slight "shake" animation when slowing down
- Heartbeat sound effect for tension

---

## Files Modified
1. `src/lib/slotGameLogic.ts` - Scatter weight + helper functions
2. `src/components/slots/SlotReel.tsx` - Tease mode animation
3. `src/components/slots/SlotGame.tsx` - Detect tease & pass props

---

## Result
- Scatter symbols (Book) will appear approximately 2.4x less frequently
- When 2 scatters land in the first 3 reels, the remaining reels will spin noticeably slower, building anticipation for a potential bonus trigger
