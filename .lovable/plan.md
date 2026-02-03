
# Scatter Tease Glow Not Working - Bug Fix Plan

## Problem Identified
When 2 scatters have landed, the scatter symbols don't glow because the `isTeasing` prop is **always hardcoded to `false`** in `SlotReel.tsx`, despite the parent component (`SlotGame.tsx`) correctly calculating and passing the necessary information.

## Root Cause Analysis
```text
SlotGame.tsx                           SlotReel.tsx                        SlotSymbol.tsx
+---------------------------+          +---------------------------+       +------------------+
| Calculates:               |          | Receives props but        |       | Shows glow when: |
| - scatterReelsLanded      | -------> | NEVER USES THEM:          | ----> | isTeasing=true   |
| - globalTeaseActive       |          | - globalTeaseActive       |       | AND              |
| - hasLandedScatter        |          | - hasLandedScatter        |       | symbol.is_scatter|
+---------------------------+          | Always passes:            |       +------------------+
                                       | isTeasing={false}         |
                                       +---------------------------+
```

## Solution

### 1. Update Idle/Stopped State Render (SlotReel.tsx lines 305-338)
When a reel has stopped but tease mode is still globally active, we need to show the scatter glow on landed scatter symbols.

**Current code:**
```tsx
<SlotSymbol
  symbol={symbol}
  ...
  isTeasing={false}  // Always false
/>
```

**Fixed code:**
```tsx
<SlotSymbol
  symbol={symbol}
  ...
  isTeasing={globalTeaseActive && hasLandedScatter && symbol.is_scatter}
/>
```

### 2. Update Spinning State Render (SlotReel.tsx lines 388-395)
During spinning, the blur makes individual symbols invisible anyway, but for consistency we should handle this case too. However, since the reels are blurred during spinning, this is less critical. The main issue is the idle/stopped state.

**The scatter glow should show when:**
- `globalTeaseActive` is true (tease reels are still spinning)
- `hasLandedScatter` is true (this reel has a scatter and is one of the landed ones)
- The symbol is a scatter

### Technical Changes

| File | Location | Change |
|------|----------|--------|
| `src/components/slots/SlotReel.tsx` | Lines 324-333 (idle/stopped render) | Pass calculated `isTeasing` based on `globalTeaseActive`, `hasLandedScatter`, and whether the symbol is a scatter |

### Implementation Details

The fix is straightforward - we need to calculate and pass the `isTeasing` prop correctly:

```tsx
// In the idle/stopped render section (around line 325)
<SlotSymbol
  symbol={symbol}
  isWinning={winningPositions.includes(rowIndex)}
  isSpinning={false}
  isExpanded={symbolIsExpanded}
  isNewlyExpanded={symbolIsNewlyExpanded}
  hasLanded={spinState === "stopped"}
  isTeasing={globalTeaseActive && hasLandedScatter && symbol.is_scatter}
/>
```

This ensures:
- Scatter symbols glow only when global tease is active (other reels still teasing)
- Only on reels that have a landed scatter (tracked via `hasLandedScatter`)
- Only if the specific symbol being rendered is a scatter
- The glow stops when all reels have stopped (`globalTeaseActive` becomes false)
