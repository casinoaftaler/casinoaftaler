

# Global Bonus Rule for Gates of Fedesvin

Add a comprehensive bonus-mode visual system that makes free spins feel darker, more electric, and escalating -- intensity does NOT fully reset between spins.

---

## Architecture

The existing `useGatesIntensity` hook and `data-intensity` CSS system will be extended with a new **bonus dimension**. A `data-bonus` attribute on the game wrapper enables bonus-specific CSS overrides, while a new `bonusIntensityFloor` concept prevents intensity from dropping below "win" level between bonus spins.

```text
Base Game:  idle -> spin -> win -> climax -> idle (full reset)
Bonus Mode: idle -> spin -> win -> climax -> win (floor, never drops to idle)
            Each spin escalates further based on cumulative multiplier + spin count
```

---

## Files to Create

### 1. `src/styles/gates-bonus-intensity.css`
Bonus-specific CSS overrides layered on top of the existing intensity system:

- **`[data-bonus="true"]` overrides**: Darker background tones, stronger lightning, brighter grid glow at every state
- **Bonus idle floor**: `[data-bonus="true"][data-intensity="idle"]` gets win-level values instead of true idle (lightning stays at 0.25, glow at 0.4)
- **Bonus grid styling**: Purple-tinted border, stronger box-shadow, electric arc animations on grid edges
- **Bonus spin button**: Purple-gold gradient glow with electric spark pseudo-elements
- **Bonus multiplier counter glow**: Scales glow intensity with `data-mult-tier` attribute (low/mid/high/extreme)
- **Bonus column stop**: Stronger impact with purple lightning spark instead of golden flash
- **Bonus tumble escalation**: Each chain level gets progressively more intense highlights/particles via CSS
- **Bonus last-spin indicator**: Red-gold pulsing glow on the free spins counter when `data-last-spin="true"`
- **Retrigger peak**: Instant storm peak animation class

### 2. No new hooks needed
Extend `useGatesIntensity` inline to accept `isBonusActive` and `cumulativeMultiplier`.

---

## Files to Modify

### 3. `src/hooks/useGatesIntensity.ts`
- Add `isBonusActive: boolean` and `cumulativeMultiplier: number` to params
- New return field: `bonusIntensityTier: 'low' | 'mid' | 'high' | 'extreme'` based on cumulative multiplier value
- In bonus mode: intensity floor is `'win'` instead of `'idle'` when `tumblePhase === 'idle'`
- Climax triggers earlier in bonus (chain >= 2 instead of 3, or winAmount >= bet * 10 instead of 20)

### 4. `src/components/slots/GatesSlotGame.tsx`
- Add `data-bonus={isBonusActive ? "true" : "false"}` to game wrapper div
- Add `data-mult-tier={bonusIntensityTier}` for multiplier counter glow scaling
- Add `data-last-spin={isBonusActive && freeSpinsRemaining === 1 ? "true" : "false"}` for last-spin visual
- **Bonus auto-spin delay**: Reduce pause between bonus spins from 1200ms to 500ms (spec says 500ms)
- **Bonus tumble escalation**: Apply stronger screen shake earlier in bonus (chain >= 2 instead of >= 3)
- **Bonus column stop**: Play stronger impact sound in bonus via a new `playBonusColumnStop()` call
- **Bonus multiplier collection**: Add thunder boom + screen pulse on multiplier collection in bonus (existing flow, add `setScreenShake('normal')` and `setShowLightningFlash(true)` around multiplier fly phase)
- **Bonus end sequence**: After `showBonusComplete` is set, set intensity to climax briefly before the overlay takes over
- **Retrigger visual**: When retrigger detected, briefly set intensity to climax + screen shake before showing retrigger overlay

### 5. `src/styles/gates-intensity.css`
- No changes needed; bonus overrides go in the new file

### 6. `src/lib/slotSoundEffects.ts`
Add bonus-specific sound methods:
- `playBonusColumnStop()`: Heavier thud with electric crackle overtone
- `playBonusThunderCrack()`: Sharp thunder crack for final column in bonus
- `playMultiplierSlam()`: Deep bass boom when multiplier hits the counter
- `playBonusWinSwell()`: Orchestral/choir swell for large bonus wins (ascending chord)

### 7. `src/components/slots/BonusEntrySequence.tsx`
- Add Phase 1 (Freeze 200ms): Grid freeze visual (already handled by spin lock)
- Enhance Phase 2 (Lightning): Stronger flash, screen shake class on mount
- Add Phase 3 (Environment Shift): Transition background darker, show multiplier counter reset
- Keep existing spins-reveal phase but add "FREE SPINS AWARDED" gold animated text

### 8. `src/components/slots/GatesBonusEndOverlay.tsx`
- Add storm peak phase before count-up (Zeus lightning pose, bright flash)
- Add calm transition phase (storm reduces, clouds lighten)
- Enhance count-up with win-tier-based effects:
  - Small: fast gold count
  - Medium: thunder flash every 0.5s
  - Large: camera shake + lightning during count
  - Very large: storm chaos + bright flashes
- Add final thunder hit at end of count

### 9. `src/components/slots/GatesZeusCharacter.tsx`
- Accept new prop `isBonusActive: boolean`
- In bonus idle: Zeus floats slightly higher (translate-y offset)
- In bonus mode: Eyes glow brighter at all states, lightning crackle is constant (not random interval)
- Bonus climax: More dramatic arm raise animation

### 10. `src/pages/GatesOfFedesvin.tsx`
- Add `import "@/styles/gates-bonus-intensity.css";`

---

## Detailed Bonus Behavior Changes

### Between Free Spins (the key differentiator)
- Storm does NOT fully calm: `useGatesIntensity` returns `'win'` as floor instead of `'idle'` when bonus is active and `tumblePhase === 'idle'`
- Multiplier counter stays glowing via CSS `[data-bonus="true"] .bonus-multiplier-counter`
- Zeus remains energized via `isBonusActive` prop
- Auto-spin delay reduced to 500ms

### Bonus Tumble Escalation (stronger than base)
- First tumble: Brighter highlights (CSS override for `[data-bonus="true"] .gates-win-highlight`)
- Second tumble: Lightning flash behind Zeus, camera shake begins
- Third tumble: Zeus aggressive pose, grid bright pulse
- Fourth+: 150ms slow-motion (already exists at chain 4), heavy thunder, screen glow pulses

### Multiplier Collection in Bonus (enhanced)
- On landing: Purple lightning burst (additional CSS class `gates-bonus-mult-landing`)
- On collection: Existing fly animation + new `playMultiplierSlam()` sound + screen pulse + counter flash white on impact
- Storm intensifies after each collected multiplier (driven by `bonusIntensityTier` scaling)

### Last Free Spin
- Free spin counter pulses red-gold via `data-last-spin="true"` CSS
- Storm slightly intensifies
- Zeus animation more dramatic

---

## Technical Notes

- All bonus overrides use CSS specificity via `[data-bonus="true"]` selector, layered on top of existing intensity system -- no base game changes needed
- The `bonusIntensityTier` (low/mid/high/extreme) is derived from cumulative multiplier: 0-10x = low, 11-25x = mid, 26-50x = high, 51+ = extreme
- Bonus auto-spin 500ms delay replaces the current 1200ms in the `finally` block of `handleSpin`
- Sound methods follow existing Web Audio API oscillator pattern in `slotSoundEffects.ts`

