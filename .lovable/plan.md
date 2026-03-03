

## Plan: Reverse Drop Animation Order (Bottom First)

The current `animationDelay` in `BonanzaColumn.tsx` uses `row * Xms`, so row 0 (top) animates first. To make the bottom symbols land first, reverse the delay calculation.

### Change: `src/components/slots/BonanzaColumn.tsx`

In the `animationDelay` style (around line 113-118), reverse the row order for `bonanza-drop-off` and `bonanza-drop-in`:

- **Drop-off:** Change `row * 40ms` → `(BONANZA_ROWS - 1 - row) * 40ms`
- **Drop-in:** Change `row * 50ms` → `(BONANZA_ROWS - 1 - row) * 50ms`

This makes the bottom row (highest index) start animating first, so bottom symbols drop out and land before top ones.

