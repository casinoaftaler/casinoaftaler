

# Plan: Remove Home Page Redirect on Browser Exit

## Summary

Remove the visibility change feature that redirects users to the home page when they exit or background the browser from the slot machine page. The music stop behavior will be kept (handled elsewhere in cleanup), but the navigation redirect will be removed.

## Changes

### File: `src/pages/SlotMachine.tsx`

**Remove the visibility change useEffect (lines 50-66)**

The entire `useEffect` block that handles `visibilitychange` will be removed:

```typescript
// DELETE THIS BLOCK (lines 50-66):
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      slotSounds.stopMusic();
      navigate('/');
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [navigate]);
```

**Clean up unused import**

Since `useNavigate` is no longer needed after removing this feature, it can be removed from the imports:

```typescript
// Before
import { useNavigate } from "react-router-dom";

// After - remove useNavigate, keep Link
// (useNavigate import line removed entirely)
```

**Remove the navigate variable**

```typescript
// DELETE THIS LINE (line 26):
const navigate = useNavigate();
```

## Result

After these changes:
- Users can background/exit the browser and return to the slot machine page without being redirected
- Music cleanup still happens via the existing cleanup effect (line ~81: `return () => { slotSounds.stopMusic(); }`)
- The slot machine will remain on the same screen when the user returns

