
# Add Small Win Display Bar

## Overview
Add a centered win bar that appears for small wins (below big win threshold) underneath the slot machine frame but above the control row. It will display the win amount with the existing count-up animation.

## What Qualifies as a "Small Win"
Based on the current implementation in `WinCelebration.tsx`:
- **Big Win**: >= 10x bet multiplier (shows overlay)
- **Small Win**: < 10x bet multiplier (currently only shows particles, no amount display)

The new bar will show for all wins where `winAmount > 0` and `winMultiplier < 10`.

## Technical Implementation

### Create New Component: `SmallWinBar.tsx`
A compact, centered bar that:
- Shows win amount with counting animation (using existing `useAnimatedCounter`)
- Has amber/golden theme matching the slot machine
- Appears with a subtle fade-in animation
- Disappears after the count animation completes

**Component props:**
```typescript
interface SmallWinBarProps {
  amount: number;
  isActive: boolean;
  onAnimationComplete?: () => void;
}
```

### Modify `SlotGame.tsx`
1. Import the new `SmallWinBar` component
2. Add it between the `SlotMachineFrame` closing div and the controls row
3. Pass `winAmount`, determine visibility based on:
   - `winAmount > 0`
   - `isWinAnimating === true`  
   - Win is NOT a big win (multiplier < 10)

### Layout Position
```text
┌─────────────────────────────────┐
│      [Slot Machine Reels]       │
└─────────────────────────────────┘
         ┌─────────────┐
         │ 💰 125      │  ← New SmallWinBar (centered)
         └─────────────┘
   [Bet] [Auto] [SPIN] [Volume]   ← Existing controls
```

## Files to Create/Modify

| File | Changes |
|------|---------|
| `src/components/slots/SmallWinBar.tsx` | **New** - Compact centered win display with counting animation |
| `src/components/slots/SlotGame.tsx` | Add SmallWinBar between frame and controls, pass win state |

## Component Design

```text
┌─────────────────────────────────────────┐
│     🪙  125                             │
│  (amber gradient bg, rounded, centered) │
└─────────────────────────────────────────┘
```

- Background: Semi-transparent amber gradient (`from-amber-500/20 to-amber-600/20`)
- Border: Golden border (`border-amber-500/40`)
- Icon: Coins icon in amber
- Text: Bold amber text with count-up animation
- Animation: Fade-in on appear, fade-out after counting completes
- Size: Compact width, centered horizontally, small vertical margin

## Expected Behavior

1. Player spins and lands a small win (e.g., 3x bet = 15 points)
2. Win lines display on reels
3. SmallWinBar fades in below the slot machine
4. Counter animates from 0 → 15
5. Bar holds for 500ms after counting completes
6. Bar fades out
7. Next spin can begin (autospin waits for this)
