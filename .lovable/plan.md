

# Move Scatter Glow From Cell to Image

## Problem
The scatter tease/pulse glow currently uses `box-shadow` on the rectangular cell container. Since symbols are PNGs with transparent backgrounds, the glow appears as a rectangle around the cell rather than conforming to the image shape.

## Solution
Change the scatter animations from `box-shadow` (on the cell) to `filter: drop-shadow()` (on the `<img>` element inside the cell). This makes the glow follow the actual alpha contour of the symbol image.

## Changes

### 1. Update CSS animations (`src/styles/bonanza-animations.css`)

Replace `box-shadow` with `filter: drop-shadow()` for all three scatter animation classes:

- **`bonanza-scatter-tease`**: Change from `box-shadow: 0 0 10px/25px` to `filter: drop-shadow(0 0 10px/25px)`
- **`bonanza-scatter-tease-intense`**: Same treatment, remove the `border-color` override
- **`bonanza-scatter-trigger-pulse`**: Change from `box-shadow` to `filter: drop-shadow()`, keep the `transform: scale()` on the cell

### 2. Move scatter animation classes to the image element (`src/components/slots/BonanzaColumn.tsx`)

Currently the scatter classes are applied to the cell `<div>`. Move them to the inner `<img>` element instead, so the `filter: drop-shadow` targets the image directly.

- Remove `scatter-pulse`, `scatter-tease`, `scatter-tease-intense` from the cell div's `className`
- Add a variable (e.g. `isScatterAnim`) based on `cellAnim`
- Apply the appropriate class to the `<img>` tag inside the symbol rendering block

### Technical Details

**`src/styles/bonanza-animations.css`** -- Replace box-shadow with drop-shadow:
```css
@keyframes bonanza-scatter-tease {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.4)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.7)); transform: scale(1.05); }
}

@keyframes bonanza-scatter-pulse {
  0% { filter: drop-shadow(0 0 0 rgba(168, 85, 247, 0)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.6)); transform: scale(1.15); }
  100% { filter: drop-shadow(0 0 0 rgba(168, 85, 247, 0)); transform: scale(1); }
}
```

**`src/components/slots/BonanzaColumn.tsx`** -- Move classes from cell to img:
- Determine scatter animation class from `cellAnim`
- Remove scatter classes from the cell div
- Apply them to `<img>` elements in the symbol rendering sections

