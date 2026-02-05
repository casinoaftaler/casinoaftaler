
# Plan: Fix Mobile Sound Effects Reliability

## Problem Summary
Sound effects on mobile devices fail to play or are delayed because mobile browsers require audio playback to be initiated directly within a user gesture context. The current implementation breaks this context by:
- Creating new Audio elements inside setTimeout callbacks
- Not preloading all sound files
- Lacking a user gesture "unlock" mechanism for audio

---

## Solution Overview

### Phase 1: Add Audio Unlock on First User Interaction
Create a mechanism to "warm up" audio playback on the first user tap. This establishes audio permission and creates a reusable audio pool.

**Changes to `src/lib/slotSoundEffects.ts`:**
- Add an `unlockAudio()` method that plays silent audio to establish permissions
- Add a method to pre-create a pool of reusable Audio elements
- Track whether audio has been unlocked

### Phase 2: Pre-create and Pool Audio Elements
Instead of creating new Audio elements when sounds need to play, pre-create a pool of elements that can be reused.

**Changes to `src/lib/slotSoundEffects.ts`:**
- Create an audio pool with multiple pre-created Audio elements
- When playing sounds, grab an available element from the pool
- Reset and reuse elements instead of creating new ones

### Phase 3: Preload ALL Custom Sound Files Including Scatters
Currently scatter sounds are not being preloaded. Fix this.

**Changes to `src/lib/slotSoundEffects.ts`:**
- Add scatter sounds to the preloading list
- Add bonus symbol scroll/selected sounds to preloading

### Phase 4: Trigger Audio Unlock on Slot Page Load
Add a click listener that triggers the audio unlock on the user's first interaction.

**Changes to `src/components/slots/SlotGame.tsx`:**
- Call `slotSounds.unlockAudio()` on the first user tap/click
- This ensures audio is unlocked before the user tries to spin

### Phase 5: Use Preloaded Audio for Faster Playback
For custom sounds, clone preloaded audio elements instead of creating new ones.

**Changes to `src/lib/slotSoundEffects.ts`:**
- Update `playCustomSound` to use preloaded elements or clone them
- Ensure proper volume is set before playback

---

## Technical Details

### New `unlockAudio()` Method
```typescript
private audioUnlocked = false;
private audioPool: HTMLAudioElement[] = [];

unlockAudio() {
  if (this.audioUnlocked) return;
  
  // Resume AudioContext if suspended
  if (this.audioContext?.state === 'suspended') {
    this.audioContext.resume();
  }
  
  // Play a silent sound to unlock audio on mobile
  const silentAudio = new Audio();
  silentAudio.volume = 0.001;
  silentAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAgAAABIADw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8P//8AAABQS0RSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMAAT0AALAAAAAFJS2YBCgAAmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJj/4zjAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMABP/wAABpAAAAAAAANIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
  silentAudio.play().then(() => {
    this.audioUnlocked = true;
  }).catch(() => {
    // Ignore errors, we'll try again on next interaction
  });
  
  // Pre-warm the AudioContext
  this.getContext();
}
```

### Updated Preload List
```typescript
const soundKeys: (keyof CustomSoundFiles)[] = [
  'spinSound', 'stopSound', 'smallWinSound', 'mediumWinSound', 
  'bigWinSound', 'bonusTriggerSound', 'bonusWinSound',
  'bonusSymbolScrollSound', 'bonusSymbolSelectedSound',
  'scatterSound1', 'scatterSound2', 'scatterSound3'  // ADD THESE
];
```

### Updated `playCustomSound` Method
```typescript
private playCustomSound(key: keyof CustomSoundFiles, volumeMultiplier: number = 1): boolean {
  if (!this.enabled || !this.effectsEnabled) return false;
  
  // Use preloaded audio element if available (faster on mobile)
  const preloadedAudio = this.customAudioElements.get(key);
  if (preloadedAudio && preloadedAudio.src) {
    // Clone the preloaded audio for overlapping playback
    const audio = preloadedAudio.cloneNode() as HTMLAudioElement;
    audio.volume = this.volume * volumeMultiplier;
    audio.play().catch(() => {});
    return true;
  }
  
  // Fallback: create new audio from URL
  const url = this.customSoundFiles[key];
  if (url) {
    const audio = new Audio(url);
    audio.volume = this.volume * volumeMultiplier;
    audio.play().catch(() => {});
    return true;
  }
  return false;
}
```

### SlotGame Integration
```typescript
// In SlotGame.tsx, add unlock on first interaction
useEffect(() => {
  const handleFirstInteraction = () => {
    slotSounds.unlockAudio();
    // Remove listener after first trigger
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };
  
  document.addEventListener('click', handleFirstInteraction);
  document.addEventListener('touchstart', handleFirstInteraction);
  
  return () => {
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };
}, []);
```

---

## Files to Modify

1. **`src/lib/slotSoundEffects.ts`**
   - Add `audioUnlocked` flag and `unlockAudio()` method
   - Add all sound types to the preload list (including scatter sounds)
   - Update `playCustomSound()` to use cloned preloaded audio
   - Resume AudioContext in unlock method

2. **`src/components/slots/SlotGame.tsx`**
   - Add useEffect to call `unlockAudio()` on first user interaction
   - This ensures audio is primed before user tries to spin

---

## Expected Results
- Sound effects will play reliably on mobile devices
- No more delayed or missing sounds
- Audio will work immediately after the user's first tap
- All custom uploaded sounds (including scatters) will be preloaded for faster playback
