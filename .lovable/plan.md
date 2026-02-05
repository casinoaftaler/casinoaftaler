
# Plan: Fix Music Playback and Password Gate Order

## Problem Summary
1. **Music continues playing when leaving slot page**: The background music starts on the intro screen but only stops when `SlotGame` unmounts. If users navigate away during loading/intro, music keeps playing on other pages.

2. **Password gate appears after loading/intro**: Currently, all users see the loading screen (2.5s) and intro screen before the password gate or login prompt appears.

## Solution

### 1. Add Global Music Cleanup on Route Change

Create a cleanup effect in the main `SlotMachine` page component that stops music whenever the component unmounts (i.e., when leaving the route).

**File: `src/pages/SlotMachine.tsx`**

Add a `useEffect` cleanup hook at the top level of the component:

```typescript
import { slotSounds } from "@/lib/slotSoundEffects";

// Add near other effects
useEffect(() => {
  // Cleanup: Stop all music when leaving the slot machine page
  return () => {
    slotSounds.stopMusic();
  };
}, []);
```

This ensures that whenever the user navigates away from `/community/slots` (during loading, intro, game, or any state), the music stops.

### 2. Reorder Rendering Logic - Show Password Gate First

Change the conditional rendering order in `SlotMachine.tsx` to check access/auth BEFORE showing loading/intro screens.

**New rendering order:**

1. First check if still loading auth/access data - show a simple loading state
2. Show password gate if locked and no access (before loading/intro)
3. Show login prompt if not logged in (before loading/intro)  
4. Show session gate if blocked by another device
5. THEN show loading screen and intro screen for authenticated users with access
6. Finally show the game

**File: `src/pages/SlotMachine.tsx`**

```typescript
export default function SlotMachine() {
  // ... existing hooks ...
  
  // Add music cleanup on unmount
  useEffect(() => {
    return () => {
      slotSounds.stopMusic();
    };
  }, []);

  // NEW ORDER: Check access FIRST before loading/intro screens
  
  // 1. Show loading while checking auth and access
  if (loading || accessLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        {/* Background and loading spinner */}
      </div>
    );
  }

  // 2. Show password gate if locked (before loading/intro)
  if (isLocked && !hasAccess) {
    return (
      <SlotPageLockGate 
        backgroundImage={backgroundImage}
        onVerify={verifyPassword}
        error={error}
      />
    );
  }

  // 3. Show login prompt if not logged in (before loading/intro)
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] relative">
        {/* Login prompt UI */}
      </div>
    );
  }

  // 4. Show session gate if blocked by another device
  if (sessionLoading) {
    return (/* Loading state */);
  }
  
  if (isBlockedByOtherDevice) {
    return (
      <SlotSessionGate ... />
    );
  }

  // 5. NOW show loading/intro for authenticated users with access
  if (loadingPhase === 'loading') {
    return <SlotLoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (loadingPhase === 'intro') {
    return <SlotIntroScreen onStart={handleIntroComplete} />;
  }

  // 6. Show the game
  return (/* Main game UI */);
}
```

---

## Technical Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/SlotMachine.tsx` | Add music cleanup effect; Reorder conditional rendering |

### Key Changes

1. Import `slotSounds` at the top of `SlotMachine.tsx`
2. Add `useEffect` cleanup hook that calls `slotSounds.stopMusic()` on unmount
3. Move the password gate check (`isLocked && !hasAccess`) BEFORE the loading phase checks
4. Move the not-logged-in check (`!user`) BEFORE the loading phase checks
5. Keep session checks after auth is confirmed but before loading/intro

### Behavior After Changes

- Navigating away from slot page at ANY point stops the music
- Non-logged-in users see the login prompt immediately (no loading/intro)
- Users without password access see the password gate immediately (no loading/intro)
- Only authenticated users with access see the loading and intro screens
- The cinematic loading/intro experience is preserved for users who can actually play
