
# Plan: Fix Mobile Sound Effects & Page Exit Behavior

## Problem Summary

### Issue 1: Custom Sound Effects Not Playing on Mobile
The current implementation has several issues causing sound failures on mobile:

1. **`playCustomSound()` creates cloned audio elements** - While cloning is faster than creating new elements, cloned elements don't inherit the preloaded buffer on all mobile browsers
2. **Missing `load()` call on clones** - Mobile browsers require explicit loading before playback
3. **Some sound methods create new `Audio()` objects outside user gesture** - For example, `playBonusSymbolScroll()` at line 1430 creates a `new Audio()` which loses user gesture context
4. **AudioContext may suspend after inactivity** - Mobile browsers aggressively suspend AudioContext when the page is backgrounded

### Issue 2: Music Continues When Exiting Browser on Mobile
Currently:
- The only cleanup is in `SlotGame.tsx` `useEffect` return function
- No handling for `visibilitychange` event (browser going to background)
- No redirect to home page when user backgrounds the app

---

## Solution Overview

### Phase 1: Add Visibility Change Detection
Detect when the user minimizes the browser, switches tabs, or closes the browser on mobile. Use the `visibilitychange` event which is the most reliable across mobile browsers.

**Changes to `src/pages/SlotMachine.tsx`:**
- Add a `useEffect` that listens for `visibilitychange`
- When `document.visibilityState === 'hidden'`:
  - Stop all music via `slotSounds.stopMusic()`
  - Navigate to home page (`/`)
- Use `react-router-dom`'s `useNavigate` hook

### Phase 2: Fix Custom Sound Playback Reliability
Improve the `playCustomSound()` method to work reliably on mobile.

**Changes to `src/lib/slotSoundEffects.ts`:**
1. **Use pre-warmed audio pool** - Instead of cloning, use a pool of reusable HTMLAudioElement instances
2. **Add `playWithPreloadedAudio()` helper** - Centralized method that properly handles mobile quirks
3. **Resume AudioContext before each sound** - Ensure context isn't suspended
4. **Fix `playBonusSymbolScroll()`** - Use preloaded audio instead of creating new Audio()

### Phase 3: Add Audio Resume on Visibility Return
When the user returns to the page, resume the AudioContext if it was suspended.

**Changes to `src/lib/slotSoundEffects.ts`:**
- Add `handleVisibilityChange()` method
- Resume AudioContext when page becomes visible
- **Don't** auto-restart music (user navigated away)

---

## Technical Implementation

### File 1: `src/pages/SlotMachine.tsx`

Add visibility change handling with navigation:

```typescript
import { useNavigate } from "react-router-dom";

// Inside component:
const navigate = useNavigate();

// New useEffect for visibility change
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Stop music when app is backgrounded
      slotSounds.stopMusic();
      // Navigate to home page
      navigate('/');
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [navigate]);
```

### File 2: `src/lib/slotSoundEffects.ts`

**Add audio pool for reliable mobile playback:**

```typescript
// New properties
private audioPool: Map<string, HTMLAudioElement[]> = new Map();
private POOL_SIZE = 3; // Number of audio elements per sound

// Initialize pool when custom sounds are set
private initAudioPool() {
  this.audioPool.clear();
  
  const soundKeys: (keyof CustomSoundFiles)[] = [
    'spinSound', 'stopSound', 'smallWinSound', 'mediumWinSound', 
    'bigWinSound', 'bonusTriggerSound', 'bonusWinSound',
    'bonusSymbolScrollSound', 'bonusSymbolSelectedSound',
    'scatterSound1', 'scatterSound2', 'scatterSound3'
  ];
  
  soundKeys.forEach(key => {
    const url = this.customSoundFiles[key];
    if (url) {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < this.POOL_SIZE; i++) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.load(); // Force buffer loading
        pool.push(audio);
      }
      this.audioPool.set(key, pool);
    }
  });
}
```

**Improved `playCustomSound()` using pool:**

```typescript
private playCustomSound(key: keyof CustomSoundFiles, volumeMultiplier: number = 1): boolean {
  if (!this.enabled || !this.effectsEnabled) return false;
  
  // Ensure AudioContext is active
  this.ensureAudioContextActive();
  
  // Get audio from pool
  const pool = this.audioPool.get(key);
  if (pool && pool.length > 0) {
    // Find an available (not playing) audio element
    const audio = pool.find(a => a.paused || a.ended) || pool[0];
    
    // Reset and play
    audio.currentTime = 0;
    audio.volume = this.volume * volumeMultiplier;
    
    // Use play promise for reliability
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: try with a fresh element
        this.playFallbackAudio(key, volumeMultiplier);
      });
    }
    return true;
  }
  
  return false;
}

private ensureAudioContextActive() {
  if (this.audioContext?.state === 'suspended') {
    this.audioContext.resume().catch(() => {});
  }
}

private playFallbackAudio(key: keyof CustomSoundFiles, volumeMultiplier: number) {
  const url = this.customSoundFiles[key];
  if (url) {
    const audio = new Audio(url);
    audio.volume = this.volume * volumeMultiplier;
    audio.play().catch(() => {});
  }
}
```

**Update `preloadCustomAudio()` to use pool:**

```typescript
private preloadCustomAudio() {
  // Clear existing
  this.customAudioElements.forEach(audio => {
    audio.pause();
    audio.src = '';
  });
  this.customAudioElements.clear();
  
  // Initialize the audio pool (new)
  this.initAudioPool();
  
  // ... rest of existing code for background music
}
```

**Fix `playBonusSymbolScroll()` to use pool:**

```typescript
playBonusSymbolScroll(): () => void {
  if (!this.canPlayBonusSound()) return () => {};
  
  // Use pooled audio for custom sound
  const pool = this.audioPool.get('bonusSymbolScrollSound');
  if (pool && pool.length > 0) {
    const audio = pool[0];
    audio.currentTime = 0;
    audio.volume = this.volume;
    audio.loop = true;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    };
  }
  
  // Fallback to synthesized (existing code)
  // ...
}
```

---

## Files to Modify

1. **`src/pages/SlotMachine.tsx`**
   - Add `useNavigate` import
   - Add `visibilitychange` event listener in useEffect
   - Stop music and redirect to `/` when page becomes hidden

2. **`src/lib/slotSoundEffects.ts`**
   - Add audio pool (`audioPool` Map and `POOL_SIZE`)
   - Add `initAudioPool()` method
   - Add `ensureAudioContextActive()` helper
   - Add `playFallbackAudio()` fallback method
   - Update `preloadCustomAudio()` to initialize pool
   - Update `playCustomSound()` to use pool with retry logic
   - Update `playBonusSymbolScroll()` to use pooled audio

---

## Expected Results

After these changes:

| Behavior | Before | After |
|----------|--------|-------|
| Custom sounds on mobile | Often fail/delayed | Play reliably from pre-loaded pool |
| Exit browser on mobile | Music continues playing | Music stops, redirects to home |
| Switch apps on mobile | Audio may break | AudioContext resumed on return |
| Background tab | No handling | Stops music, redirects home |

---

## Mobile Audio Best Practices Applied

1. **Audio Element Pool** - Pre-create multiple audio elements per sound to avoid new Audio() in timeouts
2. **Explicit `load()` calls** - Force browsers to buffer audio data
3. **AudioContext resume** - Always check and resume before playback
4. **Visibility API** - Proper handling of app background/foreground states
5. **Fallback chain** - Pool → Fresh Audio → Synthesized, ensuring something plays
