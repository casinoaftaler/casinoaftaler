
# Replace Fake Loop Spin with Drop-Off / Drop-In Animation

## What Changes
Instead of the current blurry cycling effect when spinning, the Gates of Fedesvin slot will use a two-phase animation:

1. **Drop-off phase**: Current symbols slide down and off the bottom of the grid (staggered per column, left to right)
2. **Empty grid**: Brief pause with an empty grid
3. **Drop-in phase**: New result symbols drop in from the top (staggered per column, left to right, with a bounce landing)

## Technical Details

### 1. New Column Spin States
Add two new states to `ColumnSpinState` in `GatesColumn.tsx`:
- `'dropping-off'` -- current symbols animate downward off-screen
- `'dropping-in'` -- new symbols animate in from above

### 2. CSS Animations (`src/styles/gates-animations.css`)
- **`gates-drop-off`**: Translates symbols downward (e.g. `translateY(120%)`) with opacity fade, duration ~350ms, ease-in
- **`gates-drop-in`**: Starts above (`translateY(-120%)`, opacity 0), lands at rest position with a slight bounce, duration ~400ms, cubic-bezier overshoot
- Remove or keep `gates-column-spinning` / `gates-column-cycle` (no longer used by Gates, but keep if used elsewhere)

### 3. GatesColumn.tsx Changes
- When state is `'dropping-off'`: render the current `finalSymbolIds` symbols wrapped with the drop-off CSS class, staggered per row (`row * 50ms` delay)
- When state is `'dropping-in'`: render the new `finalSymbolIds` (already updated by parent) with the drop-in CSS class, staggered per row (`row * 40ms` delay)
- Remove the `cyclingIds` / `setInterval` random cycling logic (no longer needed)

### 4. GatesSlotGame.tsx Spin Flow Changes
In `handleSpin`, replace the current spin sequence:

**Current flow:**
1. Set columns to `'spinning'` (staggered) -- triggers fast random cycling
2. Wait for server response
3. Set columns to `'landing'` then `'landed'` (staggered)

**New flow:**
1. Set columns to `'dropping-off'` (staggered, ~120ms apart)
2. Wait for all drop-off animations to finish (~350ms + stagger)
3. Fire server request in parallel during drop-off (or await if not yet returned)
4. Set the new grid from server result
5. Set columns to `'dropping-in'` (staggered, ~120ms apart)
6. After drop-in completes, set to `'idle'`

The server request will be fired at the same time as the drop-off starts (in parallel), so there's no added latency -- the new grid will be ready by the time drop-off finishes.
