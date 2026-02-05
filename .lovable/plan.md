
# Fully Responsive Viewport-Aware Slot Machine Layout

## Problem Analysis

The current implementation has a viewport scaling hook (`useViewportScaling.ts`) but it's not working optimally because:

1. **Baseline height is fixed at 950px** - This doesn't account for different content configurations (with/without frame, different symbol sizes)
2. **Scaling is only applied when scale < 1** - This means on larger screens (ultrawide, 27"+) the game stays at fixed size rather than filling available space
3. **Mobile content below game breaks scaling** - On mobile/tablet, the side content (promo slider, leaderboard) is rendered below the game outside the scaled container, which can still cause scrolling
4. **Frame margins add unpredictable height** - The `SlotMachineFrame` adds dynamic margins based on frame size, which aren't factored into height calculations
5. **Symbol sizes are width-based only** - The `useResponsiveSlotDimensions` hook only considers width breakpoints, not available height

## Solution Overview

Create a robust viewport-aware scaling system that:
1. Calculates the actual content height dynamically
2. Scales the entire game container (including mobile content) to fit within `100dvh - header`
3. Works across all resolutions: 1366×768, 1440×900, 1680×1050, 1920×1080, 2560×1440, ultrawide
4. Uses `dvh` (dynamic viewport height) for better mobile compatibility
5. Preserves all animations, interactions, and clickable areas

## Technical Approach

### Strategy: Enhanced CSS Transform Scaling with Dynamic Height Measurement

```text
┌─────────────────────────────────────────────────────────────┐
│                    Calculation Flow                         │
├─────────────────────────────────────────────────────────────┤
│  1. Measure available viewport height:                      │
│     availableHeight = 100dvh - headerHeight - padding       │
│                                                             │
│  2. Calculate content height at base scale:                 │
│     baseContentHeight = title + frame + reels + controls    │
│     (Different calculations for mobile vs desktop)          │
│                                                             │
│  3. Calculate scale factor:                                 │
│     scale = availableHeight / baseContentHeight             │
│     scale = clamp(scale, 0.45, 1.2)                         │
│                                                             │
│  4. Apply transform: scale(scaleFactor)                     │
│     transform-origin: top center                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Enhance useViewportScaling Hook

**File:** `src/hooks/useViewportScaling.ts`

Major improvements:
- Use both `innerHeight` and `innerWidth` for responsive calculations
- Add breakpoint-aware baseline heights (different for desktop vs mobile)
- Use `dvh` units for better mobile browser support
- Add upscaling capability (scale > 1.0) for larger screens
- Account for frame margins in height calculations
- Debounced resize with immediate first calculation

```text
Desktop (xl+): Baseline ~950px
- Title: 100px
- Frame: 180px (90 top + 90 bottom)
- Reels: 3×180 + 2×20 = 580px
- Controls: 90px

Mobile (<xl): Baseline ~700px (estimated)
- Title: 80px
- Reels (smaller): 3×96 + 2×8 = 304px
- Controls: 80px
- Mobile side content: ~200px
```

### Phase 2: Update SlotMachine.tsx Page Layout

**File:** `src/pages/SlotMachine.tsx`

Changes:
- Wrap entire game content (including mobile side content) in scaled container
- Use `100dvh` instead of `100vh` for better mobile compatibility
- Add `overflow-hidden` container with proper flex centering
- Apply `transform: scale()` with smooth transitions
- Add container height tracking for dynamic scaling

### Phase 3: Refine SlotPageLayout Component

**File:** `src/components/slots/SlotPageLayout.tsx`

Changes:
- Add layout measurement capabilities
- Ensure side panel doesn't affect center calculation
- Add prop for scale factor to pass to children if needed
- Improve mobile stacking behavior within scaled container

### Phase 4: Update SlotGame Component

**File:** `src/components/slots/SlotGame.tsx`

Changes:
- Remove any conflicting fixed heights
- Ensure control panel uses relative sizing
- Make sure bonus overlays scale correctly
- Verify win celebrations work at all scales

### Phase 5: CSS Enhancements

**File:** `src/index.css`

Add:
- Smooth scaling transitions
- GPU acceleration hints for transforms
- Container queries as fallback/enhancement
- Dynamic viewport unit support

---

## Files to Modify

| File | Type | Changes |
|------|------|---------|
| `src/hooks/useViewportScaling.ts` | EDIT | Complete rewrite with dynamic calculations, upscaling support |
| `src/pages/SlotMachine.tsx` | EDIT | Restructure layout with full-content scaling |
| `src/components/slots/SlotPageLayout.tsx` | EDIT | Improve measurement and mobile handling |
| `src/components/slots/SlotGame.tsx` | EDIT | Remove fixed heights, ensure relative sizing |
| `src/index.css` | EDIT | Add scaling utilities and transitions |

---

## Scaling Behavior by Resolution

| Resolution | Viewport Height | Available | Scale | Result |
|------------|----------------|-----------|-------|--------|
| 1366×768 (Laptop) | 768px | 688px | 0.72 | Compact, no scroll |
| 1440×900 (MacBook 13") | 900px | 820px | 0.86 | Slight shrink |
| 1680×1050 (22") | 1050px | 970px | 1.0 | Full size |
| 1920×1080 (24") | 1080px | 1000px | 1.0 | Full size |
| 2560×1440 (27") | 1440px | 1360px | 1.0 | Full size (capped) |
| 3440×1440 (Ultrawide) | 1440px | 1360px | 1.0 | Full size (capped) |

---

## Key Design Decisions

### 1. Dynamic Baseline Calculation
Instead of a fixed 950px baseline, calculate based on actual component sizes at the current breakpoint. This ensures accurate scaling for both desktop and mobile layouts.

### 2. Scale Range: 0.45 to 1.0
- **Minimum 0.45**: Below this, symbols become too small to read. For very small viewports, we accept some scrolling rather than unusable UI.
- **Maximum 1.0**: Don't upscale beyond designed size to prevent pixelation and maintain crisp visuals. The 27" experience at 1080p is the "ideal" baseline.

### 3. Transform Origin: Top Center
Keeps the title and game header visible at all scales. Users see the top of the game first.

### 4. dvh Units
Using `dvh` (dynamic viewport height) instead of `vh` for the container. This accounts for mobile browser chrome (address bar, navigation) that changes the actual visible height.

### 5. All Content Scaled Together
The mobile side content (leaderboard, promo slider) must be inside the scaled container to prevent overflow. This means the scale factor accounts for this additional content on mobile.

---

## Animation Preservation

All existing animations will continue to work:
- **CSS transforms stack** - Scaling a spinning reel still spins correctly
- **Keyframe animations** - All @keyframes work within scaled containers
- **Win celebrations** - Particles and effects scale proportionally
- **Bonus overlays** - Full-screen overlays work outside the scaled container

---

## Click Area Preservation

CSS `transform: scale()` automatically adjusts hit testing:
- All buttons remain clickable at their scaled positions
- No pointer-events adjustments needed
- Touch targets scale proportionally (may become smaller, but still accurate)

---

## Performance Considerations

1. **GPU Acceleration**: `transform` is hardware-accelerated
2. **Single transform**: One scale transform on container, not multiple
3. **Debounced resize**: 100ms debounce prevents excessive recalculations
4. **No layout thrashing**: Transform doesn't trigger layout recalculations
5. **will-change hint**: Applied to scaled container for browser optimization

---

## Mobile-Specific Handling

On mobile (<xl breakpoints):
- Include leaderboard and promo slider in height calculation
- Account for potential navigation bar space
- Use more aggressive scaling if needed (0.45 minimum)
- Ensure touch targets remain at least 44×44px effective size

---

## Testing Recommendations

After implementation, verify on:
1. **1366×768** - Common laptop resolution, should fit without scroll
2. **1440×900** - MacBook Pro 13", should scale to ~0.86
3. **1920×1080** - Standard desktop, should be full size
4. **2560×1440** - 27" monitor, full size
5. **Ultrawide (3440×1440)** - Should be centered and full size
6. **iPhone (390×844)** - Mobile should fit without scroll
7. **iPad (1024×1366)** - Tablet should fit without scroll

