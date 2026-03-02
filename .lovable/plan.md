
# Floating Tumble Win Numbers

## What it does
After each tumble, a small floating number showing the cluster payout (e.g., "+2.50") will appear over the winning symbols, float upward, and fade out -- similar to damage numbers in video games.

## Plan

### 1. Create a new component: `BonanzaTumbleWinPopup`
- A small overlay that renders absolutely inside the game grid
- Shows the win amount with a float-up + fade-out CSS animation
- Positioned at the center of the winning cluster (average of all winning symbol positions)
- Auto-removes itself after animation completes (~1.2s)

### 2. Add CSS animation to `bonanza-animations.css`
- `bonanza-win-float`: starts at opacity 1, scale 0.8, floats upward ~40px while scaling to 1.0, then fades to opacity 0
- Duration: ~1.2s with ease-out timing

### 3. Wire it into `BonanzaSlotGame.tsx` tumble processing
- Add a state array for active floating win popups: `tumbleWinPopups`
- Each popup has: id, amount, center position (x, y), and a creation timestamp
- In `processTumbleSteps`, when a winning step is found (line ~208), calculate the center of the winning positions and push a new popup entry
- The popup auto-clears after the animation duration
- Popups render inside the grid container as absolute-positioned elements

## Technical Details

### Position calculation
- Each winning position flat index maps to `col` and `row` via `flatToColRow()`
- Pixel x = `SYMBOL_GAP + col * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_WIDTH / 2`
- Pixel y = `SYMBOL_GAP + row * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_HEIGHT / 2`
- Average all winning positions to find center of cluster

### Files to create
- `src/components/slots/BonanzaTumbleWinPopup.tsx` -- the floating number component

### Files to modify
- `src/styles/bonanza-animations.css` -- add `bonanza-win-float` keyframes and class
- `src/components/slots/BonanzaSlotGame.tsx` -- add state for popups, spawn them during tumble processing, render them inside the grid
