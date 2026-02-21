

# Global Visual Intensity States for Gates of Fedesvin (Base Game)

Create a dynamic visual intensity system that drives lightning, glow, audio ambience, and camera motion through 4 escalating states, making each spin feel like a dramatic arc from calm to climax.

---

## Overview

A new `VisualIntensityState` system will wrap the game grid and respond to game phase changes (idle, spinning, winning, climax). Each state controls CSS custom properties that drive lightning frequency, ambient glow brightness, grid frame glow, screen shake, and audio ambience layers -- all through a single `data-intensity` attribute on the game wrapper.

```text
Idle (calm) --> Spin (energy rising) --> Win/Tumble (escalation) --> Climax (peak) --> Reset to Idle
```

---

## State Definitions

| State | Trigger | Lightning | Glow | Camera | Audio Layer |
|-------|---------|-----------|------|--------|-------------|
| **idle** | No spin active | Flicker every 6-10s | Low purple/blue ambient | None | Wind ambience |
| **spin** | Spin button pressed | Frequent flashes | +15% brightness | None | Whoosh + increased thunder |
| **win** | Win detected, tumbles 1-2 | +20% brightness, crackle flashes | Gold glow around grid | Minimal shake | Crackle + impact sounds |
| **climax** | Tumble chain 3+ or big multiplier | Constant storm, bright flashes | Intense gold + blue | Shake + 3% zoom | Deep thunder + bass |

---

## Implementation Plan

### 1. New file: `src/hooks/useGatesIntensity.ts`

A custom hook that derives the current intensity state from existing game state variables:

- `tumblePhase` (idle, spinning, showing-wins, tumbling)
- `tumbleChainLength` (number of consecutive winning tumbles)
- `screenShake` (none, normal, intense)
- `winAmount` and `bet` (for win tier calculation)

Returns: `{ intensityState: 'idle' | 'spin' | 'win' | 'climax', chainLevel: number }`

Logic:
- `tumblePhase === 'idle'` --> `idle`
- `tumblePhase === 'spinning'` --> `spin`
- `tumblePhase === 'showing-wins' || 'tumbling'` with `chainLength < 3` --> `win`
- `chainLength >= 3` OR `winAmount >= bet * 20` --> `climax`

### 2. New CSS: `src/styles/gates-intensity.css`

CSS custom properties driven by `data-intensity` attribute on game wrapper:

```css
[data-intensity="idle"]   { --lightning-opacity: 0; --ambient-glow: 0.2; --grid-glow: 0.1; }
[data-intensity="spin"]   { --lightning-opacity: 0.15; --ambient-glow: 0.35; --grid-glow: 0.2; }
[data-intensity="win"]    { --lightning-opacity: 0.3; --ambient-glow: 0.5; --grid-glow: 0.4; }
[data-intensity="climax"] { --lightning-opacity: 0.6; --ambient-glow: 0.7; --grid-glow: 0.6; }
```

Includes:
- **Ambient lightning overlay**: A `::before` pseudo-element on the game wrapper with random flicker animation, opacity driven by `--lightning-opacity`.
- **Grid frame glow**: `box-shadow` on the grid container scaling with `--grid-glow`.
- **Background glow pulse**: Radial gradient overlay scaling with `--ambient-glow`.
- **Camera zoom**: `transform: scale(1.03)` applied at climax via `data-intensity="climax"`.
- **Idle sparkle**: A subtle random sparkle animation on grid cells every ~5s (CSS-only, via `nth-child` stagger).
- **Spin-press button animation**: Scale 0.92 -> 1.0 with gold flash (200ms).

Keyframes added:
- `gates-ambient-lightning-flicker` (random opacity pulses)
- `gates-idle-sparkle` (subtle shimmer on random symbols)
- `gates-grid-glow-pulse` (golden glow on grid border)
- `gates-spin-press` (button press feedback)
- `gates-climax-zoom` (subtle 3% zoom in)

### 3. Update: `src/components/slots/GatesSlotGame.tsx`

- Import `useGatesIntensity` hook.
- Derive `intensityState` from current game state.
- Add `data-intensity={intensityState}` to the outermost game wrapper div.
- Add ambient lightning overlay div (always rendered, opacity driven by CSS variable).
- Add ambient glow background div (purple/blue radial gradient, opacity driven by intensity).
- Update grid container to use dynamic `box-shadow` via CSS variable for grid frame glow.
- On climax state: apply `gates-climax-zoom` class to grid for subtle 3% scale.
- Update column stop logic: add `gates-column-stop-impact` class per column with stagger delay (0/70/140/210/280/350ms) and quick flash overlay (80ms) after final column lands.
- On spin button press: add momentary `gates-spin-press` class (200ms).

### 4. Update: `src/components/slots/GatesSlotGame.tsx` - Tumble orchestration timing

Adjust the `processTumbleSteps` timings per the spec:

| Phase | Current | New (base) |
|-------|---------|------------|
| Step 1: Highlight | 1200ms | 300ms |
| Step 2: Explosion | 500ms | 300ms |
| Step 3: Gravity drop | 500ms | 400ms |
| Step 4: New symbols fill | 200ms pause | 300ms + 200ms pause |

Chain escalation logic (already partially exists):
- `chainLength >= 3`: Apply `gates-climax-zoom` (3% zoom), play deeper thunder
- `chainLength >= 4`: Enable slow-motion (150ms added to each phase), add lightning strike flash

### 5. Update: `src/styles/gates-animations.css`

- Add `gates-column-stop-impact` keyframe (brief golden flash pulse on column stop).
- Add `gates-reel-stop-flash` (white overlay 80ms after final reel stops).
- Update `gates-intensity-high` to scale with chain level (more intense glow at higher chains).

### 6. Update: `src/lib/slotSoundEffects.ts`

Add new ambient/intensity-driven methods:

- `playColumnStop()`: Soft thud/impact sound per column landing (staggered).
- `playDeepThunder()`: Deeper bass thunder for climax state (chain 3+).
- `playWindAmbience()` / `stopWindAmbience()`: Ambient wind loop (low volume, continuous during idle).

These use the existing Web Audio API oscillator pattern. Wind ambience uses filtered white noise. Thunder uses low-frequency oscillator bursts.

### 7. Update: `src/components/slots/GatesColumn.tsx`

- Add `gates-column-stop-impact` class when `spinState === 'landing'` (replaces generic `gates-symbol-land`).
- Each column gets staggered stop delay already handled by parent; the CSS class just adds the visual impact pulse.

### 8. No-win reset behavior

In `GatesSlotGame.tsx`, after columns land and no win is detected:
- Wait 400ms pause.
- Intensity state automatically returns to `idle` (driven by `tumblePhase === 'idle'`).
- All visual effects (glow, lightning, shake) smoothly transition back via CSS transitions (500ms ease-out).

---

## Files to Create

1. `src/hooks/useGatesIntensity.ts` -- Intensity state derivation hook
2. `src/styles/gates-intensity.css` -- All intensity-driven CSS variables, keyframes, and utility classes

## Files to Modify

3. `src/components/slots/GatesSlotGame.tsx` -- Wire intensity state, add ambient overlays, update timings
4. `src/styles/gates-animations.css` -- Column stop impact, reel flash keyframes
5. `src/lib/slotSoundEffects.ts` -- Column stop, deep thunder, wind ambience sounds
6. `src/components/slots/GatesColumn.tsx` -- Column stop impact class
7. `src/pages/GatesOfFedesvin.tsx` -- Import `gates-intensity.css`

---

## Technical Notes

- All intensity transitions use CSS `transition` properties (300-500ms) for smooth state changes, not JavaScript animation loops.
- The `data-intensity` attribute pattern avoids prop drilling and keeps the CSS self-contained.
- Wind ambience audio is a filtered white noise node that runs continuously at low volume; it's started/stopped based on the intensity hook lifecycle.
- The climax zoom uses `transform-origin: center` to scale from the grid center.
- Column stop stagger (0/70/140/210/280/350ms) is applied via `animationDelay` inline styles, matching the existing pattern in the codebase.

