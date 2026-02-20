

# Revamped "Big Win" and "Epic Win" Animations for Rise of Fedesvin

## Overview

The current win celebration is fairly basic: falling particles, a gradient text overlay, a screen flash, and a pulsing border. We'll upgrade it with significantly more dramatic, layered effects -- especially for the wizard theme on Rise of Fedesvin.

---

## What Changes

### 1. New CSS Keyframes (slot-animations.css)

Add these new animations:

- **`shockwave`**: A rapidly expanding, fading ring from the center (wizard purple). Creates an "impact" feel on Big/Epic Win entry.
- **`lightning-flash`**: A multi-step full-screen white flash that pulses 2-3 times rapidly. Used for Epic Win only.
- **`text-glow-breathe`**: Continuous breathing glow on the win text (larger shadow pulse). More dramatic than current `glow-pulse`.
- **`orb-float`**: Slower, randomized floating path for background ambient orbs during the celebration hold phase.
- **`ring-expand`**: Concentric rings that expand outward from center, giving a "power burst" effect.
- **`rune-orbit`**: Runes orbiting around the win text in a circular path.

### 2. Revamped WinCelebration.tsx

#### New Particle Types
- **`lightning`** (wizard Epic Win only): Short jagged bolt shapes rendered via CSS clip-path, flashing brightly.
- **`ring`** (wizard Big/Mega/Epic): Expanding concentric circles from center.

#### New Visual Layers (in render order)

1. **Shockwave ring** (Big Win+): A single expanding purple ring on entry, using the `ring-expand` keyframe. Fires once.
2. **Lightning flash overlay** (Epic Win only): Full-screen multi-pulse white/purple flash on entry (replaces the basic single flash).
3. **Ambient orb layer** (Big Win+): 6-10 large, soft-glow orbs floating slowly in the background using `orb-float`. These persist during the entire celebration.
4. **Rune orbit ring** (Mega/Epic): 6-8 runes orbiting the win text in a circle using `rune-orbit`.
5. **Particle burst** (existing, enhanced): 50% more particles for wizard. Epic Win gets a second wave of particles at delay 0.8s.
6. **Win text** (existing, enhanced): Larger font sizes, stronger `text-glow-breathe` animation, and a subtle `scale` bounce loop during the pulse phase.
7. **Vignette overlay** (Big Win+): Dark vignette around edges to focus attention on center. Fades in with the celebration.

#### Enhanced Text Styling (Wizard)
- Epic Win text: 20% larger, pink-to-purple-to-cyan gradient with faster `gradient-shift`.
- Mega Win text: Purple-to-violet gradient with breathing glow shadow.
- The "POINT!" counter gets a subtle scale bounce on each number change.

#### Timing Adjustments
- Epic Win: pulse phase extended from 750ms to 1200ms (more time to appreciate).
- Mega Win: pulse phase extended to 900ms.
- Fade-out uses scale-down + blur for a more cinematic exit.

### 3. Summary of New Effects per Tier

```text
+----------------+-------------+-------------+-------------+
| Effect         | Big Win     | Mega Win    | Epic Win    |
+----------------+-------------+-------------+-------------+
| Shockwave ring | 1 ring      | 2 rings     | 3 rings     |
| Lightning      | --          | --          | 3 bolts     |
| Ambient orbs   | 4 orbs      | 6 orbs      | 10 orbs     |
| Rune orbit     | --          | 6 runes     | 8 runes     |
| Particles      | 52 (1.3x)   | 78 (1.3x)   | 100+ (1.3x) |
| Particle waves | 1           | 1           | 2           |
| Vignette       | light       | medium      | heavy       |
| Text size bump | --          | --          | +20%        |
| Pulse duration | 750ms       | 900ms       | 1200ms      |
| Exit effect    | scale+fade  | scale+fade  | scale+blur  |
+----------------+-------------+-------------+-------------+
```

---

## Technical Details

### Files Modified

1. **`src/styles/slot-animations.css`** -- Add 6 new `@keyframes` declarations (shockwave, lightning-flash, text-glow-breathe, orb-float, ring-expand, rune-orbit).

2. **`src/components/slots/WinCelebration.tsx`** -- Major rework:
   - New particle types in the `Particle` interface (`lightning`, `ring`).
   - New state: `showShockwave`, ambient orbs array.
   - New render layers: shockwave div, ambient orbs, rune orbit container, vignette overlay, enhanced lightning flash.
   - Extended pulse/fade timings for Mega and Epic.
   - Enhanced text styling with stronger gradients and glow for wizard theme.
   - Second particle wave for Epic Win (delayed burst).

### Performance Considerations

- Ambient orbs use CSS-only animations (no JS RAF loop) -- minimal CPU cost.
- Shockwave and lightning are single-fire animations that auto-remove via `onAnimationEnd`.
- Total particle count increase is modest (~30% more for wizard).
- All new effects use `pointer-events-none` and `will-change: transform, opacity` for GPU acceleration.

### No Changes To

- `SlotGame.tsx` (same props interface)
- `useAnimatedCounter.ts` (unchanged)
- `WinDisplay.tsx` (unchanged)
- Backend / Edge Functions (purely visual change)

