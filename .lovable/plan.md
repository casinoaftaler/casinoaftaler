
# Add Darkening Effects for Tease Mode and Bonus Expansion

## Overview

This plan adds two visual darkening effects to make scatter symbols and expanding symbols stand out more:
1. **Tease Mode**: When scatters are teasing (building anticipation), all non-scatter symbols get darkened
2. **Bonus Expansion**: When symbols expand during bonus mode, non-expanded reels get darkened

## What Will Change

### Effect 1: Darken Non-Scatter Symbols During Tease

When the game is in tease mode (a scatter has landed and more reels are spinning with potential scatters), all symbols that are NOT scatters will be visually darkened. This makes the scatter symbols "pop" and creates more excitement.

### Effect 2: Darken Non-Expanded Reels During Bonus

When the expanding symbol animation plays during bonus spins, reels that don't contain the expanding symbol will be darkened. This focuses attention on the dramatic expansion effect.

---

## Technical Details

### Files to Modify

**1. `src/components/slots/SlotGame.tsx`**

Add new state to track when darkening should be active, and pass props to SlotReel:

```typescript
// Track if we should darken non-scatter symbols (during tease)
const shouldDarkenForTease = teaseReels.length > 0 && scatterReelsLanded.size >= 1 && isSpinning;

// Track if we should darken non-expanded reels (during bonus expansion)
const [showExpansionDarken, setShowExpansionDarken] = useState(false);
```

Update expansion animation to enable darkening:
```typescript
// In the bonus expansion handling section:
if (isBonusSpin && reelsExpanded.length > 0 && expandedGrid) {
  setShowExpansionDarken(true); // Enable darkening
  await new Promise(resolve => setTimeout(resolve, 500));
  // ... existing expansion code ...
  await new Promise(resolve => setTimeout(resolve, 600));
  setNewlyExpandedReels([]);
  setShowExpansionDarken(false); // Disable darkening after animation
}
```

Pass new props to SlotReel:
```typescript
<SlotReel
  // ... existing props
  isDarkenedForTease={shouldDarkenForTease && !teaseReels.includes(colIndex)}
  isDarkenedForExpansion={showExpansionDarken && !expandedReels.includes(colIndex)}
/>
```

**2. `src/components/slots/SlotReel.tsx`**

Add new props to the interface:
```typescript
interface SlotReelProps {
  // ... existing props
  isDarkenedForTease?: boolean;
  isDarkenedForExpansion?: boolean;
}
```

Apply darkening to the reel container:
```typescript
// For idle/stopped state (around line 263-266):
<div 
  className={cn(
    "flex flex-col gap-[4px] xs:gap-[6px] sm:gap-[8px] md:gap-[12px] lg:gap-[16px]",
    // Darken entire reel during tease or expansion
    (isDarkenedForTease || isDarkenedForExpansion) && "opacity-40"
  )}
  style={{ 
    width: `${symbolHeight}px`,
    // Add grayscale filter for stronger effect
    filter: (isDarkenedForTease || isDarkenedForExpansion) ? 'brightness(0.5)' : undefined,
    transition: 'filter 0.3s ease, opacity 0.3s ease'
  }}
>
```

Pass darkening flag to individual symbols:
```typescript
<SlotSymbol
  symbol={symbol}
  // ... existing props
  isDarkened={isDarkenedForTease && !symbol.is_scatter}
/>
```

**3. `src/components/slots/SlotSymbol.tsx`**

Add prop for individual symbol darkening:
```typescript
interface SlotSymbolProps {
  // ... existing props
  isDarkened?: boolean;  // Darken this symbol (for non-scatters during tease)
}
```

Apply visual effect:
```typescript
<div
  className={cn(
    // ... existing classes
    // Darken non-scatter symbols during tease mode
    isDarkened && "opacity-40"
  )}
  style={{
    // ... existing styles
    filter: isDarkened ? 'brightness(0.5) grayscale(30%)' : isScatterCelebrating ? undefined : undefined,
    transition: 'filter 0.3s ease, opacity 0.3s ease'
  }}
>
```

---

## Visual Flow

```text
TEASE MODE:
┌─────┬─────┬─────┬─────┬─────┐
│ DIM │ 🌟  │ DIM │ ??? │ ??? │
│ DIM │ DIM │ DIM │ ??? │ ??? │
│ DIM │ DIM │ 🌟  │ ??? │ ??? │
└─────┴─────┴─────┴─────┴─────┘
  R1    R2    R3    R4    R5
       (Scatters glow, everything else dims)

BONUS EXPANSION:
┌─────┬─────┬─────┬─────┬─────┐
│ DIM │ ⭐  │ DIM │ ⭐  │ DIM │
│ DIM │ ⭐  │ DIM │ ⭐  │ DIM │
│ DIM │ ⭐  │ DIM │ ⭐  │ DIM │
└─────┴─────┴─────┴─────┴─────┘
  R1    R2    R3    R4    R5
    (Expanded reels highlighted, others dimmed)
```

---

## Summary of Changes

| File | Change |
|------|--------|
| `SlotGame.tsx` | Add `shouldDarkenForTease` calculation, `showExpansionDarken` state, pass new props to SlotReel |
| `SlotReel.tsx` | Add `isDarkenedForTease` and `isDarkenedForExpansion` props, apply opacity/filter to container and individual symbols |
| `SlotSymbol.tsx` | Add `isDarkened` prop with brightness/grayscale filter |

This creates a clear visual hierarchy where:
- During tease: Scatter symbols are bright and glowing, everything else is dimmed
- During expansion: Expanded reels are vibrant, non-expanded reels are dimmed
