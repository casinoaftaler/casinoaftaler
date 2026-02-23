

## Unified Control Bar for All Slot Games

Replace the current `SlotControlPanel` used by Book of Fedesvin and Rise of Fedesvin with the compact, horizontal `GatesControlBar` layout that Gates of Fedesvin already uses.

### What Changes

**1. SlotGame.tsx** (used by Book of Fedesvin and Rise of Fedesvin)
- Replace the `SlotControlPanel` import with `GatesControlBar`
- Swap the component in the render, passing the same props
- Remove the themed wrapper `<div>` around it (the GatesControlBar has its own styling built in)

**2. GatesControlBar.tsx** — Theme Support
- Currently the GatesControlBar has hardcoded blue/slate colors (designed for Gates only)
- Update it to use the existing `getSlotTheme(gameId)` system so it picks up the correct colors per game:
  - Book of Fedesvin: amber/gold Egyptian theme
  - Rise of Fedesvin: purple/violet wizard theme
  - Gates of Fedesvin: blue/slate Olympus theme (current default)
- This affects: panel gradient, borders, text colors, spin button gradient/shadow, bet button colors, and credit display colors

**3. GatesControlBar.tsx** — PayTable Routing
- The bar currently always renders `GatesPayTable`. Update to conditionally render:
  - `PayTable` for book-of-fedesvin and rise-of-fedesvin
  - `GatesPayTable` for gates-of-fedesvin

**4. SlotControlPanel.tsx** — Cleanup (optional)
- This component will no longer be imported anywhere and can be removed, along with `BetControls.tsx`, `AutospinRow.tsx`, and `SmallWinBar.tsx` if they are not used elsewhere

### Technical Details

The `GatesControlBar` and `SlotControlPanel` share the exact same prop interface, so no changes are needed in the parent `SlotGame.tsx` beyond swapping the component name and removing the wrapper div.

Theme integration will use the existing `getSlotTheme(gameId)` function which already defines colors for all three games. The GatesControlBar's hardcoded Tailwind classes (e.g. `from-blue-950/90`, `text-blue-400`, `border-blue-500/25`) will be replaced with theme-derived values.

