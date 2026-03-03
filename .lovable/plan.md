

# Redesign: Bonanza Bonus Entry Sequence

## Problem
The current bonus intro uses basic Tailwind utility classes (animate-pulse, animate-ping, animate-bounce) and emoji icons, which looks amateur. It needs a cinematic, polished feel matching the candy/Fedesvin Bonanza theme.

## New Approach: Particle Explosion + Cinematic Reveal

Instead of layered div transitions, we'll build a **canvas-based particle burst** combined with CSS keyframe-driven cinematic text reveals. The sequence will feel like a premium slot game bonus trigger.

### Phase Timeline (total ~5s)

| Time | Phase | Visual |
|------|-------|--------|
| 0-300ms | **flash** | Quick white-to-pink screen flash (screen shake via CSS) |
| 300-1200ms | **explosion** | Canvas particle burst — hundreds of pink/gold/fuchsia particles explode outward from center, then fade |
| 1200-2000ms | **vignette** | Screen darkens with a radial vignette, deep fuchsia/purple gradient fades in |
| 2000-3500ms | **reveal** | "FREE SPINS" text scales up from 0 with a gold metallic gradient + glow. Spin count does a rapid drum-roll count-up. Subtitle fades in with delay |
| 3500-5000ms | **hold + done** | Hold the final frame, then call onComplete |

### Key Visual Improvements

1. **Canvas particle system** — ~120 particles with physics (velocity, gravity, fade, size decay). Colors: pink, fuchsia, gold, white. Creates an explosive, celebratory feel impossible with CSS alone.
2. **Screen shake** — A brief CSS transform shake on the entire overlay during the flash phase for impact.
3. **Metallic text effect** — The "FREE SPINS" title uses a CSS `background-image` with a sweeping linear-gradient animation (gold shimmer moving across text) instead of a static gradient.
4. **Radial light burst** — A pulsing radial gradient behind the text creating a volumetric light source effect.
5. **No emojis** — Replace the lollipop emoji with a styled SVG star/burst shape or pure CSS radial burst.
6. **Drum-roll counter** — The number counter gets a slight vertical oscillation during count-up, settling when it reaches the final number.

### Technical Details

**Files to modify:**
- `src/components/slots/BonanzaBonusEntrySequence.tsx` — Complete rewrite with canvas + refined phases
- `src/styles/slot-animations.css` — Add new keyframes: `bonanza-screen-shake`, `bonanza-title-scale-in`, `bonanza-gold-sweep`, `bonanza-counter-drum`

**Canvas particle system (inline in component):**
- Uses `useRef` for canvas + `requestAnimationFrame` loop
- Particles spawned at center with random velocity vectors
- Each particle: `{ x, y, vx, vy, size, color, alpha, decay }`
- Renders during explosion phase only, cleanup on unmount
- Canvas is transparent overlay — background layers render beneath

**CSS keyframes to add:**
- `bonanza-screen-shake`: rapid translateX/Y jitter over 300ms
- `bonanza-title-scale-in`: scale(0) + blur(10px) to scale(1) + blur(0) with overshoot via cubic-bezier
- `bonanza-gold-sweep`: background-position shift for the metallic text shimmer (loops once)
- `bonanza-counter-drum`: subtle translateY oscillation during count-up

**Component interface stays the same** — `isActive`, `freeSpinsAwarded`, `onComplete` — so no changes needed in `BonanzaSlotGame.tsx`.

