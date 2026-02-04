
# Permanent Small Win Bar with Overlap Positioning

## Changes Overview
1. **Always visible** - Remove show/hide logic, bar displays constantly showing current win amount (or 0)
2. **Narrower width** - Reduce horizontal padding and use a more compact layout
3. **Darker background** - Darken the amber gradient while keeping amber accents
4. **Overlapping position** - Use negative margin or absolute positioning to overlap the bottom of the slot frame

## Technical Changes

### File: `src/components/slots/SmallWinBar.tsx`
**Simplify component to always render:**
- Remove all visibility state management (`isVisible`, `isFadingOut`, refs)
- Remove the conditional return (`if (!isVisible) return null`)
- Keep the counter animation for when amounts change
- Update styling:
  - Reduce padding from `px-6 py-2` to `px-4 py-1.5`
  - Darker background: `from-amber-900/60 to-amber-950/70` instead of `from-amber-500/20 to-amber-600/20`
  - Keep amber text and icon colors
  - Add `backdrop-blur-sm` for depth

### File: `src/components/slots/SlotGame.tsx`
**Adjust positioning:**
- Wrap SmallWinBar in a relative container with negative top margin (`-mt-4` or similar) to overlap the frame bottom
- Add `z-10` to ensure it sits above the frame
- Simplify props - just pass `amount={winAmount}` since it's always visible

## Visual Result
```text
┌─────────────────────────────────┐
│      [Slot Machine Reels]       │
│                                 │
└────────────┬─────────┬──────────┘
             │ 🪙 125  │  ← Overlaps bottom, narrower, darker amber
             └─────────┘
   [Bet] [Auto] [SPIN] [Volume]
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/slots/SmallWinBar.tsx` | Remove visibility logic, narrower + darker styling |
| `src/components/slots/SlotGame.tsx` | Add negative margin for overlap, simplify props |
