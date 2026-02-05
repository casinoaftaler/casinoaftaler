
# Plan: Add Scatter Celebration Sound Effect

## Overview
Add a new sound effect that plays during the scatter celebration phase - the 1.5-second delay with pulsing/glowing scatter symbols that occurs between landing 3+ scatters and the bonus overlay appearing.

## Current Flow
1. 3+ scatters land → individual scatter sounds play (scatterSound1, 2, 3)
2. **Scatter celebration phase** (1.5 seconds of pulsing animation) → **NO SOUND currently**
3. Bonus overlay appears → bonusTriggerSound plays

## Changes Required

### 1. Database/Settings
Add new sound file setting key:
- `slot_sound_file_scatter_celebration` - URL for custom scatter celebration sound

### 2. Sound Files Hook (useSlotSoundFiles.ts)
- Add `scatterCelebrationSound` to the `SlotSoundFiles` interface
- Add key to `SOUND_KEYS` and `SLOT_SOUND_SETTING_KEYS`

### 3. Sound Effects Library (slotSoundEffects.ts)
- Add `scatterCelebrationSound` to `CustomSoundFiles` interface
- Add to preload list for audio pooling
- Create `playScatterCelebration()` method with synthesized fallback (dramatic build-up sound)

### 4. Sound Loader Hook (useSlotSoundLoader.ts)
- Map the new sound file to the sound effects class

### 5. SlotGame Component
- Call `slotSounds.playScatterCelebration()` when `showScatterCelebration` becomes true

### 6. Admin UI (SlotSoundFilesSection.tsx)
- Add upload option under "Bonus Lyde" section:
  - Label: "Scatter Celebration"
  - Description: "Afspilles under scatter celebration (pulserende symboler) før bonus-skærmen vises."

## Technical Details

### Synthesized Fallback Sound
Create an Egyptian-themed celebration sound:
- Rising magical chime sequence
- Mystical shimmering effect
- ~1.5 seconds duration (matches celebration phase length)

### Files to Modify
1. `src/hooks/useSlotSoundFiles.ts` - Add new sound file key
2. `src/hooks/useSlotSoundLoader.ts` - Map new sound
3. `src/lib/slotSoundEffects.ts` - Add interface, preload, and playback method
4. `src/components/slots/SlotGame.tsx` - Trigger sound on celebration
5. `src/components/slots/SlotSoundFilesSection.tsx` - Add admin upload option
