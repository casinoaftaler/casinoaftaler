

# Bonanza Tumble Win Bar + Multiplier Collision Effect

## What the user wants

Based on the reference image and description:

1. **Tumble Win bar on top of the grid** — a pink/purple gradient banner showing "TUMBLE WIN" with the win amount and multiplier (e.g. `$0.50 x 10`), styled like the Sweet Bonanza reference
2. **Collision effect** — when all multiplier bombs have been processed, the tumble win amount and multiplier visually "collide" (fly toward each other), merge, and then reveal the final multiplied win
3. **Free Spins counter moved** — move it from the top bonus bar down next to "Gevinst" in the bottom bar

## Current state

- The bonus bar at the top (lines 639-675) shows Free Spins, Tumble Win, Multiplier, and Total as separate sections
- The bottom "Gevinst" bar (lines 828-860) shows total winnings and a small tumble indicator
- Floating `BonanzaTumbleWinPopup` shows per-cluster wins on the grid
- The tumble win bar at the top is a dark panel — not the candy-style banner from the reference

## Changes

### 1. New `BonanzaTumbleWinBar` component
Create `src/components/slots/BonanzaTumbleWinBar.tsx`:
- A horizontal banner that overlays the top of the grid (absolute positioned inside the grid container)
- Purple/pink gradient background with rounded ends, matching the reference image
- Shows "TUMBLE WIN" label centered above the amount
- Displays: `{tumbleWin} x {multiplier}` inside the bar
- Only visible when `runningWin > 0` during tumble phases
- Has a "collision" phase: when bombs are done processing, the win and multiplier text fly toward center, flash, and the bar shows the final multiplied result
- Animate in with scale + fade, animate out similarly

### 2. Collision animation
- After `processTumbleSteps` finishes bomb explosions and all multipliers are tallied, set a `collisionPhase` state
- In `BonanzaTumbleWinBar`: when `collisionPhase` is active, the left side (win amount) slides right and the right side (multiplier) slides left, they meet in the center with a flash/glow effect, then the bar displays the final total win
- CSS keyframes: `bonanza-collide-left` (translateX toward center), `bonanza-collide-right` (translateX toward center), `bonanza-collide-flash` (scale + glow burst)

### 3. Remove top bonus bar, move Free Spins to bottom
- Remove the large bonus bar at the top of the game (lines 639-675)
- In the bottom "Gevinst" bar (lines 828-860), add a "Free Spins" section next to Gevinst when `isBonusActive` is true, showing `{freeSpinsRemaining} / {totalFreeSpins}`

### 4. Update `BonanzaSlotGame.tsx`
- Add `collisionPhase` state (`'idle' | 'colliding' | 'resolved'`)
- After bomb processing in `processTumbleSteps`, set `collisionPhase` to `'colliding'`, wait ~800ms, then set to `'resolved'`
- Pass `runningWin`, `runningMultiplier`, `collisionPhase` to the new `BonanzaTumbleWinBar`
- Place `BonanzaTumbleWinBar` inside the grid container (absolute, top, full width)
- Add Free Spins display in the bottom Gevinst bar

### 5. CSS additions in `bonanza-animations.css`
- `bonanza-collide-left`: `translateX(30%)` with ease-in
- `bonanza-collide-right`: `translateX(-30%)` with ease-in  
- `bonanza-collide-flash`: scale(1.3) → scale(1) with bright glow
- `bonanza-tumble-bar-in`: scale + fade entrance

## Files to modify

| File | Change |
|------|--------|
| `src/components/slots/BonanzaTumbleWinBar.tsx` | **New** — tumble win banner with collision effect |
| `src/components/slots/BonanzaSlotGame.tsx` | Remove top bonus bar, add collision state, place tumble bar on grid, move free spins to bottom bar |
| `src/styles/bonanza-animations.css` | Add collision + tumble bar keyframes |

