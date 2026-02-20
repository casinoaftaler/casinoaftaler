

# Gradual Spin Animation (Left to Right) for Gates of Fedesvin

## Current Behavior
When spinning, the grid simply dims to 80% opacity and shows a centered loading spinner. No visual motion per column.

## Proposed Animation

Each of the 6 columns will animate independently with a staggered delay (left to right):
1. **Spin start**: Columns shuffle/scramble their symbols rapidly, starting from column 0, then column 1 (after ~100ms delay), etc.
2. **While waiting for server response**: Columns cycle through random symbols continuously with a vertical blur effect.
3. **Spin stop**: Once the server result arrives, columns stop one by one from left to right, each column's final symbols dropping into place with a bounce.

### Visual Details
- Each column gets a rapid vertical translate animation (symbols sliding down) during the spin phase
- Stagger delay: ~120ms per column (so column 5 starts ~600ms after column 0)
- Stop sequence: same left-to-right stagger when landing
- Landing bounce: a subtle scale/translateY overshoot on each column stop
- Motion blur: slight CSS blur during fast movement, clearing on stop

## Technical Approach

### File: `src/components/slots/GatesSlotGame.tsx`

1. **New state**: Track per-column spin status with `columnSpinState: ('idle' | 'spinning' | 'stopping' | 'landed')[]` (array of 6)
2. **Spin start sequence**: When `tumblePhase` becomes `'spinning'`, stagger column starts left to right using `setTimeout` with `col * 120ms` delay
3. **Random symbol cycling**: Each spinning column displays rapidly cycling random symbols (using `requestAnimationFrame` or `setInterval` at ~80ms) picked from the symbols pool
4. **Server response handling**: Once `processTumbleSteps` receives data, trigger column stops left to right with stagger delays, setting final symbols per column
5. **Remove the `Loader2` spinner overlay** -- replace with the animated grid

### File: `src/styles/gates-animations.css`

Add new keyframes:
- `gates-column-spin`: Rapid downward translate loop for the cycling effect
- `gates-column-land`: Bounce-in from above when a column stops
- `gates-column-blur`: Motion blur during spin, clearing on stop

### Grid Rendering Changes

Instead of rendering the grid cells directly when spinning, each column will be wrapped in a container that:
- During spin: shows a vertically scrolling strip of random symbols (similar to `SlotReel` but simplified for the grid format)
- On stop: transitions to the final symbol with a drop-bounce animation
- The column wrapper handles its own animation state based on `columnSpinState[col]`

This keeps the existing tumble/win logic untouched -- only the initial spin visual is enhanced.

