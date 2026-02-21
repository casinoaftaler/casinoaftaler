

# Enhanced Win Animation Sequence for Gates of Fedesvin

Upgrade the tumble animation pipeline from the current simple highlight-and-remove flow to a dramatic 4-step cinematic sequence with gold glows, spark explosions, gravity drops, and lightning trail fills.

---

## Current vs. New Animation Flow

```text
CURRENT:
  Winning cells glow (gates-win-highlight) -> Remove (scale to 0) -> Gravity drop + Fill

NEW (4 Steps):
  Step 1: Gold Highlight (pulsing aura + electric outline)
  Step 2: Explosion (burst into sparks, dissolve outward)
  Step 3: Gravity Drop (remaining symbols fall with bounce + clack sound)
  Step 4: New Symbols (fall from above with lightning trails + landing flash)
```

---

## Changes

### 1. New CSS Animations (gates-animations.css)

Add new keyframes and utility classes:

- **`gates-win-gold-highlight`** -- Replaces existing highlight with brighter gold glow, pulsing aura, and electric outline (via `::after` pseudo-element with animated border). Background lightning slightly brighter during this phase.
- **`gates-symbol-explode`** -- New explosion animation: symbol scales up, emits sparks (radial gradient burst), then fragments dissolve outward with opacity fade. More dramatic than the current simple `tumble-remove`.
- **`gates-gravity-bounce`** -- Enhanced gravity drop with a more pronounced bounce on landing and a slight squash effect.
- **`gates-fill-lightning-trail`** -- New symbols fall in with a lightning streak trail (blue/white drop-shadow trail) and a bright flash on landing (brightness spike at the end of the animation).

### 2. New Cell Animation States (GatesColumn.tsx)

Add new `CellAnimState` values:
- `'exploding'` -- Maps to the new `gates-symbol-explode` class (replaces `'removing'` for this game)

Update the cell className mapping to use the new animation classes, and add a `::before` spark particle pseudo-element for the exploding state.

### 3. Updated Tumble Orchestration (GatesSlotGame.tsx)

Modify the tumble step loop timing:

- **Step 1 (Highlight)**: Keep the existing `'winning'` state but increase hold time slightly (1200ms base, 1600ms slow-motion) to let the gold glow + electric outline breathe.
- **Step 2 (Explosion)**: Use new `'exploding'` state instead of `'removing'`. Increase removal animation time (500ms base, 800ms slow-motion). Play a crackling sound effect.
- **Step 3 (Gravity Drop)**: Add a short pause (150ms) after explosion before gravity starts. Play a "clack" impact sound when symbols land. Use enhanced bounce animation.
- **Step 4 (New Symbols Fill)**: Use the new lightning-trail fill animation. Add a brief flash overlay when new symbols land. Add a slight pause (200ms) after fill before checking next tumble.

### 4. Sound Effects (slotSoundEffects or useSpinSounds)

Add two new sound triggers using the existing Web Audio oscillator system:
- **`playCrackle()`** -- Short crackling/electric burst sound (white noise + high frequency oscillators) played during symbol explosion.
- **`playClack()`** -- Short percussive impact sound (low frequency thud) played when gravity-dropping symbols land.

---

## Technical Details

### New CSS Keyframes

**Gold highlight with electric outline:**
- Brighter gold glow (`drop-shadow` with `rgba(250, 204, 21, 0.9)`)
- Scale pulse between 1.0 and 1.1
- `::after` pseudo-element with animated dashed border that rotates

**Explosion:**
- 0-20%: Scale up to 1.3, brightness to 2.5
- 20-60%: Radial burst (box-shadow expands), fragments scatter (opacity fades)
- 60-100%: Scale to 0, full transparency
- Duration: 500ms

**Lightning trail fill:**
- Symbols enter from `translateY(-150%)` with bright blue `drop-shadow` trail
- At 70% mark: flash of white (brightness(3)) simulating landing flash
- Then settle with standard bounce
- Duration: 550ms

### Orchestration Timing (base / slow-motion)

| Phase | Base | Slow Motion |
|-------|------|-------------|
| Step 1: Gold highlight hold | 1200ms | 1600ms |
| Step 2: Explosion duration | 500ms | 800ms |
| Pause after explosion | 150ms | 250ms |
| Step 3: Gravity drop | 500ms | 700ms |
| Step 4: Fill with trails | 550ms | 800ms |
| Post-fill pause | 200ms | 300ms |

### Files Modified

1. **`src/styles/gates-animations.css`** -- New keyframes + utility classes
2. **`src/components/slots/GatesColumn.tsx`** -- New `'exploding'` state, updated class mappings, pseudo-element for sparks
3. **`src/components/slots/GatesSlotGame.tsx`** -- Updated tumble loop timing and state transitions
4. **`src/lib/slotSoundEffects.ts`** -- New `playCrackle()` and `playClack()` methods (or equivalent in existing sound system)

