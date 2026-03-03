

# Bomb Fracture Explosion Effect

Replace the current bomb explosion (simple scale-down + fade) with a CSS-based fracture effect that splits the bomb image into fragments that fly outward, rotate, and fade -- making it look like the bomb actually shatters.

## Approach

Use a dedicated React component (`BombFractureExplosion`) that renders the bomb image clipped into a grid of fragments (e.g., 4x4 = 16 pieces). Each fragment uses `clip-path: inset(...)` to show only its portion of the original image, then animates outward in a random direction with rotation and fade-out.

This is a pure CSS + React solution -- no canvas or external libraries needed.

## Changes

### 1. Create `src/components/slots/BombFractureExplosion.tsx`

A new component that:
- Takes the bomb image URL (or fallback emoji) and cell dimensions
- Renders 16 overlapping `<div>` fragments, each with `clip-path: inset(...)` showing a 25% x 25% slice of the bomb image
- Each fragment gets a unique CSS custom property for its outward direction (`--frag-tx`, `--frag-ty`, `--frag-rot`)
- Fragments near edges fly outward from center; corner pieces go diagonally
- All fragments share one `@keyframes` animation but with slight random delays

### 2. Update `src/styles/bonanza-animations.css`

Add a new keyframes animation:

```text
@keyframes bonanza-bomb-fracture {
  0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--frag-tx), var(--frag-ty)) rotate(var(--frag-rot)); opacity: 0; }
}
```

Remove the old `bonanza-bomb-activate` animation (or keep it as fallback).

### 3. Update `BonanzaColumn.tsx`

- Import `BombFractureExplosion`
- In the `bomb-activate` cell animation state, render `<BombFractureExplosion>` instead of the current simple image with `bonanza-bomb-activate` class
- The fracture component receives the bomb image URL from `bombSymbolsMap` and the cell dimensions

### 4. Timing

The fracture animation runs ~0.6s (matching the current `bomb-activate` duration) so no changes needed to the game logic timing in `BonanzaSlotGame.tsx`.

## Technical Details

The fragment grid approach:
- 4 columns x 4 rows = 16 fragments
- Each fragment is absolutely positioned over the full cell
- `clip-path: inset(top right bottom left)` isolates each piece
- Direction vectors are calculated based on each fragment's position relative to center
- Edge fragments fly further; center fragments fly less
- Each fragment gets a small random rotation (between -180deg and 180deg)
- Staggered `animation-delay` (0-80ms range) for a natural shatter feel

