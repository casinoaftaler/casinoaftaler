
# Plan: Enhanced Big Win Sound & Retrigger Overlay

## Overview
Implement two improvements to make the slot machine experience more exciting:
1. A special "big win counting sound" that plays during big/mega/epic win celebrations instead of the standard coin counting sound
2. A dramatic visual overlay for bonus retriggers (similar to the initial bonus trigger overlay)

---

## Part 1: Big Win Counting Sound

### Current Behavior
The `playCoinCount()` function plays rapid coin clinks during all win counter animations - the same sound whether it's a 5-point win or a 500-point epic win.

### New Behavior
Add a separate `playBigWinCount()` function that plays a more dramatic, triumphant sound with:
- Deeper, more resonant coin sounds
- Egyptian fanfare elements layered in
- Rising tension/excitement feel
- Larger, more impactful audio presence

### Changes

**File: `src/lib/slotSoundEffects.ts`**
- Add new `playBigWinCount(): () => void` method to the `SlotSoundEffects` class
- Sound design:
  - Deeper coin impacts (lower frequency range)
  - Layered golden chimes ascending in pitch
  - Subtle triumphant brass-like undertones
  - Faster tempo for more excitement

**File: `src/hooks/useAnimatedCounter.ts`**
- Add `isBigWin?: boolean` option to the hook
- When `isBigWin` is true, call `slotSounds.playBigWinCount()` instead of `playCoinCount()`

**File: `src/components/slots/WinCelebration.tsx`**
- Pass `isBigWin` flag to `useAnimatedCounter` based on win multiplier

---

## Part 2: Retrigger Overlay

### Current Behavior
When 3+ scatter symbols appear during bonus free spins (retrigger), only a toast notification appears: "📖 RETRIGGER! +10 Free Spins!"

### New Behavior
Display a dramatic full-screen overlay similar to the initial bonus trigger:
- Book animation
- "RETRIGGER!" text with glow effect
- "+10 FREE SPINS!" message
- Click to dismiss (same as bonus trigger overlay)

### Changes

**File: `src/components/slots/BonusOverlay.tsx`**
- Add a new type: `"retrigger"` alongside existing `"trigger"` and `"complete"`
- Display retrigger-specific content:
  - Book emoji/animation
  - "RETRIGGER!" header
  - "+10 GRATIS SPINS!" message
  - "Klik for at fortsætte" instruction

**File: `src/components/slots/SlotGame.tsx`**
- Add state: `showRetrigger` for the retrigger overlay
- Add state: `retriggerSpins` to track how many spins were added
- When a retrigger occurs:
  - Show the retrigger overlay instead of just a toast
  - Stop autospin (already happening)
  - Wait for user to click before continuing

---

## Technical Details

### New Sound: `playBigWinCount()`
```text
Design elements:
- Base: Deep coin impacts at 60ms intervals (slower, more impactful)
- Layer 1: Ascending golden chimes (Egyptian harp style)
- Layer 2: Subtle triumphant brass-like sustained notes
- Layer 3: Mystical shimmer/sparkle overlay
- Overall: More volume, more drama, more celebration
```

### Retrigger Overlay Content
```text
Visual elements:
- Same modal structure as trigger/complete overlays
- Book emoji with bounce animation
- "RETRIGGER!" in amber/gold with glow
- "+10 GRATIS SPINS!" message
- Current total free spins count
- "Klik for at fortsætte" instruction
```

---

## Files to Modify

| File | Change |
|------|--------|
| `src/lib/slotSoundEffects.ts` | Add `playBigWinCount()` method |
| `src/hooks/useAnimatedCounter.ts` | Add `isBigWin` option to select sound |
| `src/components/slots/WinCelebration.tsx` | Pass `isBigWin` flag to counter hook |
| `src/components/slots/BonusOverlay.tsx` | Add "retrigger" type with appropriate content |
| `src/components/slots/SlotGame.tsx` | Add retrigger overlay state and display logic |
