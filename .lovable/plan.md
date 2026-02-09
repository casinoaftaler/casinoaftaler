

## Fix: Mobile Layout Shift During Bonus on Rise of Fedesvin

### Problem
When the bonus round activates on Rise of Fedesvin, the **BonusStatusBar** and **BonusSymbolBar** appear between the slot reels and the control panel. This pushes content upward in the scaled viewport container, causing the slot machine reels to become partially or fully invisible on mobile.

### Solution
Reserve a fixed height for the bonus bars area so the layout doesn't shift when they appear/disappear. This way:
- The slot machine stays in place at all times
- The control panel stays in a consistent position
- When bonus bars appear, they fill the already-reserved space

### Technical Changes

**`src/components/slots/SlotGame.tsx`** (lines ~988-1008):
- Wrap the BonusStatusBar + BonusSymbolBar section in a container with a fixed `min-height` that matches the combined height of both bars when visible
- Use `min-h-0` when not in a Rise of Fedesvin bonus context, and a fixed `min-h-[...px]` when in Rise of Fedesvin game mode (since only this game has the BonusSymbolBar)
- The bars will render inside this reserved space, preventing any layout shift
- For non-Rise games (Book of Fedesvin), only BonusStatusBar needs space reserved, which is smaller

Specifically:
1. The `<div className="max-w-fit mx-auto mb-2 sm:mb-3 space-y-2">` container (line 990) will get a conditional `min-h` class based on `gameId`
2. For `rise-of-fedesvin`: reserve approximately `min-h-[88px] sm:min-h-[100px]` to accommodate both BonusStatusBar (~48px) and BonusSymbolBar (~48px) plus spacing
3. For other games: reserve `min-h-[48px] sm:min-h-[56px]` for just the BonusStatusBar
4. When bonus is not active, the container still takes up this space but remains empty, keeping layout stable

This approach ensures zero layout shift while keeping the visual appearance identical when bonus bars are shown.

