

# Plan: Fix Orb Flickering, Scatter Glow, and Win Highlight in Gates of Fedesvin

## Problems Identified

1. **Orb (bomb) flickering on wins**: When a win occurs, bomb symbols flicker because the `cellAnim` state transitions cause the bomb render condition to fail momentarily — the bomb rendering block excludes many states (`removing`, `exploding`, etc.) but doesn't account for `winning` properly, causing re-renders that flash the symbol.

2. **Scatter glow around box, not image**: The `gates-scatter-trigger-pulse`, `gates-scatter-tease`, and `gates-scatter-tease-intense` classes are applied to the **container div** (which is a rectangle), so `box-shadow` glows around the box. Need to move these to the `<img>` element and use `drop-shadow` filter (like Bonanza does).

3. **Win highlight around box, not image**: `gates-win-highlight` and `gates-gold-highlight` are applied to the container div. The animation uses `filter: drop-shadow(...)` but also `box-shadow` in bonus mode. Need to apply the glow on the `<img>` element instead (matching Bonanza's `bonanza-candy-highlight-img` pattern).

## Changes

### 1. `src/components/slots/GatesColumn.tsx` — Move highlight/scatter classes to `<img>`

- Remove `gates-win-highlight`, `gates-gold-highlight`, `gates-scatter-trigger-pulse`, `gates-scatter-tease`, `gates-scatter-tease-intense` from the container div
- Add these as classes on the `<img>` element instead (same pattern as Bonanza's `bonanza-candy-highlight-img` and `scatterAnimClass`)
- Keep container div clean with just layout and drop/fill animations
- For bomb symbols: also apply win highlight to the bomb `<img>` when winning

### 2. `src/styles/gates-animations.css` — Convert box-based glow to filter-based

- Update `gates-win-highlight` keyframes: remove `box-shadow`, use only `filter: drop-shadow(...)` (alpha-aware glow around actual symbol shape)
- Update `gates-gold-highlight` similarly
- Remove the `::after` pseudo-element from `gates-scatter-trigger-pulse` (it draws a rectangular ring)
- Ensure scatter pulse uses `filter: drop-shadow(...)` only

### 3. `src/styles/gates-intensity.css` — Fix scatter tease animations

- Remove `box-shadow` from `gates-scatter-tease-glow` and `gates-scatter-tease-glow-intense` keyframes
- Use only `filter: drop-shadow(...)` for alpha-aware glow

### 4. `src/styles/gates-bonus-intensity.css` — Fix bonus win highlight

- Remove `box-shadow` from `[data-bonus="true"] .gates-win-highlight` override
- Use `filter` only

## Technical Notes

- The key insight from Bonanza: glow classes go on the `<img>` element, not the container div. `drop-shadow()` CSS filter respects alpha channels, while `box-shadow` always draws around the bounding box.
- Bomb flickering is caused by state transitions — ensuring bombs stay visible during `winning` state by not hiding them.

