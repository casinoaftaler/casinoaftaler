

# Plan: Lazy Load Slot Machine for Better Website Performance

## Problem Summary
Currently, when users visit any page on the website (like the homepage `/`), the following slot machine resources are loaded immediately:

1. **JavaScript code**: The entire `SlotMachine.tsx` page and all its 29+ component dependencies (`SlotGame.tsx`, `SlotReel.tsx`, etc.) are bundled into the main bundle
2. **Sound effects library**: The 2500+ line `slotSoundEffects.ts` is loaded on every page
3. **Game logic**: `slotGameLogic.ts`, `bonusGameLogic.ts`, etc.
4. **Static assets**: Default slot images imported at the top of files (via `import from "@/assets/slots/..."`)
5. **Hooks**: Multiple slot-specific hooks like `useSlotSymbols`, `useSlotSpins`, `useBonusGame`, etc.

This unnecessarily bloats the initial bundle size and slows down page load for users who never visit the slot machine.

---

## Solution: React Lazy Loading + Code Splitting

### Phase 1: Lazy Load the SlotMachine Page

Use React's `lazy()` and `Suspense` to dynamically import the slot machine page only when the user navigates to `/community/slots`.

**Changes to `src/App.tsx`:**
- Replace the static import `import SlotMachine from "./pages/SlotMachine"` with a lazy import
- Wrap the lazy-loaded component in a `Suspense` boundary with a loading fallback

```typescript
// Before
import SlotMachine from "./pages/SlotMachine";

// After
const SlotMachine = lazy(() => import("./pages/SlotMachine"));
```

### Phase 2: Create a Lightweight Loading Fallback

Create a simple loading fallback component that doesn't import any slot-related assets. This ensures users see a loading indicator while the slot machine code downloads.

**New file: `src/components/slots/SlotPageLoading.tsx`**
- A minimal loading spinner/skeleton with Egyptian styling
- Uses only basic UI components (no slot-specific imports)
- Displays "Loading..." text in Danish

### Phase 3: Verify Asset Isolation

Ensure no slot-related static assets are imported in shared components that load on all pages. Current analysis shows:
- `src/pages/SlotMachine.tsx` imports 3 slot assets directly
- `src/components/slots/SlotLoadingScreen.tsx` imports 2 slot assets
- `src/components/slots/SlotIntroScreen.tsx` imports 2 slot assets

All these are already within the slot machine page hierarchy, so they will be code-split automatically when we lazy load `SlotMachine.tsx`.

---

## Technical Implementation

### File Changes

**1. `src/App.tsx`** - Add lazy loading

```typescript
import { lazy, Suspense } from "react";

// Static imports for main pages (always loaded)
import Index from "./pages/Index";
import CasinoDetail from "./pages/CasinoDetail";
// ... other frequently used pages

// Lazy import for slot machine (only loaded when needed)
const SlotMachine = lazy(() => import("./pages/SlotMachine"));

// In routes:
<Route 
  path="/community/slots" 
  element={
    <Suspense fallback={<SlotPageLoading />}>
      <SlotMachine />
    </Suspense>
  } 
/>
```

**2. `src/components/slots/SlotPageLoading.tsx`** - New minimal loading component

```typescript
export function SlotPageLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-amber-950 via-stone-950 to-black">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full" />
        <p className="text-amber-500/80 text-lg">Indlæser spillemaskine...</p>
      </div>
    </div>
  );
}
```

---

## What This Achieves

| Before | After |
|--------|-------|
| All slot code loaded on every page | Slot code only loads on `/community/slots` |
| ~2500+ lines of sound effects in main bundle | Sound effects in separate chunk |
| Slot assets (images, hooks, game logic) in main bundle | All slot-related code in dedicated chunk |
| Slower initial page load | Faster initial page load for non-slot pages |

---

## Bundle Impact Estimate

**Code moved to lazy chunk:**
- `SlotMachine.tsx` + 29 slot components
- `slotSoundEffects.ts` (2500+ lines)
- `slotGameLogic.ts` + `bonusGameLogic.ts` + `slotRTPCalculation.ts`
- 7+ slot-specific hooks
- Static slot assets (images)

This will significantly reduce the main bundle size and improve First Contentful Paint (FCP) for users visiting non-slot pages.

---

## Files to Modify

1. **`src/App.tsx`** - Add lazy import and Suspense wrapper for SlotMachine
2. **`src/components/slots/SlotPageLoading.tsx`** (NEW) - Lightweight loading fallback

