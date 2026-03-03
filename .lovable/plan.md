

# Add Symbol Drop-In Sound Effect for Fedesvin Bonanza

## Overview
Add a new candy-themed sound effect that plays when new symbols drop into the grid after a tumble (cluster win removal). Currently there is no audio feedback for this moment -- symbols silently fall into place.

## Changes Required

### 1. Add `symbolDropInSound` to the sound file system

**`src/hooks/useSlotSoundFiles.ts`**
- Add `symbolDropInSound: string | null` to the `SlotSoundFiles` interface
- Add `symbolDropInSound: "symbol_drop_in"` to the `SOUND_SUFFIXES` map

### 2. Add candy-themed prompt to the sound generator

**`supabase/functions/generate-game-sounds/index.ts`**
- Add a `symbolDropInSound` entry to `BONANZA_SOUNDS` with a candy-themed prompt like:
  *"Cascading gummy bears and jellybeans tumbling down with soft bouncy plops, bubbly candy rain landing on glass, sweet sugar crystals tinkling as they settle"*
- Duration: ~1.5 seconds
- Also add a Gates equivalent to `GATES_SOUNDS` for consistency

### 3. Wire the sound into the game loop

**`src/hooks/useSlotSoundLoader.ts`**
- Pass `soundFiles.symbolDropInSound` through to the `CustomSoundFiles` object

**`src/lib/slotSoundEffects.ts`** (or equivalent singleton)
- Add `symbolDropInSound` to the `CustomSoundFiles` interface and playback method

**`src/components/slots/BonanzaSlotGame.tsx`**
- In the tumble loop, when column spin states are set to `'dropping-in'`, trigger the drop-in sound effect

### 4. Add to batch generator and admin upload UI

**`src/components/slots/BatchSoundGenerator.tsx`**
- Add `{ key: "symbolDropInSound", label: "Symbol Drop-In", icon: "🍬" }` to `SOUND_TYPES`

**`src/components/slots/SlotSoundFilesSection.tsx`**
- Add an upload slot for the new sound file

### 5. Add to loading screen preloader

**`src/components/slots/SlotLoadingScreen.tsx`**
- Include `symbolDropInSound` in the sound URLs array so it preloads during the loading screen

## Technical Notes
- The sound key in `site_settings` will be `fedesvin_bonanza_sound_file_symbol_drop_in`
- The edge function must be redeployed after adding the new sound definition
- The sound plays once per tumble drop-in phase (not per column), keeping it clean

