

# Fix Tease Mode Darkening Logic

## The Issue

The darkening effect during tease mode has two problems:
1. It activates when the 1st scatter lands, but should activate when the 2nd scatter lands (on reels 2-4)
2. It currently skips entire reels that have scatters, but non-scatter symbols on those reels should also be darkened

## The Fix

Change how `isDarkenedForTease` is calculated in `SlotGame.tsx`:

**Current (broken):**
```typescript
isDarkenedForTease={scatterReelsLanded.size >= 1 && !scatterReelsLanded.has(colIndex)}
```

**Fixed:**
```typescript
isDarkenedForTease={scatterReelsLanded.size >= 2 && isSpinning}
```

This means:
- Darkening activates only after 2+ scatters have landed
- All reels receive the darkening flag (including reels with scatters)
- The SlotReel already handles darkening individual symbols - it uses `isDarkenedForTease && !symbol.is_scatter`, so scatter symbols stay bright automatically
- Only active during spinning

## File to Modify

**`src/components/slots/SlotGame.tsx`** (line ~827)

Change the prop from:
```typescript
isDarkenedForTease={scatterReelsLanded.size >= 1 && !scatterReelsLanded.has(colIndex)}
```

To:
```typescript
isDarkenedForTease={scatterReelsLanded.size >= 2 && isSpinning}
```

## Visual Result

```text
After 2nd scatter lands (tease activated):
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ DIM     │  🌟     │ DIM     │ ???     │ ???     │
│ DIM     │ DIM     │ DIM     │ ???     │ ???     │
│ DIM     │ DIM     │  🌟     │ ???     │ ???     │
└─────────┴─────────┴─────────┴─────────┴─────────┘
   R1        R2        R3        R4        R5
         (Only scatters glow, ALL other symbols dim)
```

Note: Even reels 2 and 3 that have scatters will have their non-scatter symbols darkened.

