
# Fix 3rd Scatter Sound + Add Bonus Trigger Visual Effects

## Overview

This plan addresses three issues:
1. The 3rd scatter sound doesn't play when the 3rd scatter lands on reel 5
2. There should be a 1-second delay after spin ends before the bonus trigger screen appears
3. Scatter symbols (3+) should pulse and have a glowing flash effect before the bonus screen appears

## What Will Change

### Issue 1: 3rd Scatter Sound Not Playing

**Problem**: The current logic only plays scatter sounds on reels 1-4. If the 3rd scatter lands on reel 5 (index 4), no sound plays.

**Solution**: Update the scatter sound condition to also play on reel 5 when there are already 2+ scatters on previous reels.

### Issue 2: 1-Second Delay Before Bonus Screen

**Problem**: The bonus trigger screen appears immediately (or 500ms after win animation). This doesn't give users time to appreciate the scatter symbols that triggered the bonus.

**Solution**: Increase the delay before bonus overlay to 1 second, and add a dedicated "scatter celebration" phase during this delay.

### Issue 3: Scatter Pulse + Glow Effect

**Problem**: Scatter symbols don't have a special visual effect before the bonus screen appears.

**Solution**: Add a new "scatter celebration" animation state that:
- Triggers when 3+ scatters land (bonus triggered)
- Makes scatter symbols pulse and glow for 1 second
- Automatically ends and shows the bonus overlay

---

## Technical Details

### Files to Modify

**1. `src/components/slots/SlotGame.tsx`**

**Fix scatter sound on reel 5** (around line 620-629):
```typescript
// Current code (broken):
const isOnReels123 = reelIndex <= 2;
const isOnReel4WithPriorScatter = reelIndex === 3 && scattersOnReels123 > 0;

if (isOnReels123 || isOnReel4WithPriorScatter) {
  slotSounds.playScatterLand(scattersLanded);
}

// Fixed code:
const isOnReels123 = reelIndex <= 2;
const isOnReel4WithPriorScatter = reelIndex === 3 && scattersOnReels123 > 0;
const isOnReel5WithPriorScatters = reelIndex === 4 && scattersLanded >= 3;

if (isOnReels123 || isOnReel4WithPriorScatter || isOnReel5WithPriorScatters) {
  slotSounds.playScatterLand(scattersLanded);
}
```

**Add scatter celebration state**:
```typescript
// New state
const [showScatterCelebration, setShowScatterCelebration] = useState(false);
const [scatterPositions, setScatterPositions] = useState<{reel: number, row: number}[]>([]);
```

**Update bonus trigger logic** (around line 700-732):
- When `result.bonusTriggered` is true and it's NOT a bonus spin (i.e., initial bonus trigger):
  1. Calculate all scatter positions on the grid
  2. Set `showScatterCelebration = true` 
  3. Start a 1-second timer
  4. After 1 second, set `showScatterCelebration = false` and show the bonus overlay

**Pass scatter celebration state to SlotReel**:
```typescript
<SlotReel
  // ... existing props
  isScatterCelebrating={showScatterCelebration}
/>
```

**2. `src/components/slots/SlotReel.tsx`**

**Add new prop**:
```typescript
interface SlotReelProps {
  // ... existing props
  isScatterCelebrating?: boolean;
}
```

**Pass to SlotSymbol**:
```typescript
<SlotSymbol
  symbol={symbol}
  // ... existing props
  isScatterCelebrating={isScatterCelebrating && symbol.is_scatter}
/>
```

**3. `src/components/slots/SlotSymbol.tsx`**

**Add new prop and animation**:
```typescript
interface SlotSymbolProps {
  // ... existing props
  isScatterCelebrating?: boolean;
}
```

**Apply animation class**:
```typescript
<div
  className={cn(
    // ... existing classes
    // Scatter celebration - pulse and glow before bonus screen
    isScatterCelebrating && symbol.is_scatter && 
      "animate-[scatter-celebration_0.4s_ease-in-out_infinite] border-amber-400"
  )}
  style={isScatterCelebrating && symbol.is_scatter ? {
    boxShadow: '0 0 30px rgba(251,191,36,0.8), 0 0 60px rgba(251,191,36,0.4)'
  } : undefined}
>
```

**4. `tailwind.config.ts`**

**Add new keyframe animation**:
```typescript
keyframes: {
  // ... existing keyframes
  'scatter-celebration': {
    '0%, 100%': { 
      transform: 'scale(1)',
      filter: 'brightness(1)'
    },
    '50%': { 
      transform: 'scale(1.1)',
      filter: 'brightness(1.4)'
    }
  }
}

animation: {
  // ... existing animations
  'scatter-celebration': 'scatter-celebration 0.4s ease-in-out infinite'
}
```

### Flow Diagram

```text
Spin Ends (3+ Scatters)
        │
        ▼
┌─────────────────────┐
│ Play 3rd Scatter    │ ◄── FIXED: Now plays on reel 5
│ Sound (if on R5)    │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ Set showScatter-    │
│ Celebration = true  │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ Scatter symbols     │ ◄── NEW: Pulse + glow effect
│ animate for 1 sec   │
└─────────────────────┘
        │
        ▼ (after 1000ms)
┌─────────────────────┐
│ Set showScatter-    │
│ Celebration = false │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ Show Bonus Trigger  │
│ Overlay (symbol     │
│ picker)             │
└─────────────────────┘
```

### Summary of Changes

| File | Change |
|------|--------|
| `SlotGame.tsx` | Fix scatter sound condition for reel 5, add scatter celebration state, add 1s delay before bonus overlay |
| `SlotReel.tsx` | Pass `isScatterCelebrating` prop to SlotSymbol |
| `SlotSymbol.tsx` | Add `isScatterCelebrating` prop with pulse/glow animation |
| `tailwind.config.ts` | Add `scatter-celebration` keyframe animation |
