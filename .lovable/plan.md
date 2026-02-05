
# Viewport-Aware Responsive Slot Machine Layout

## Problem Summary
The slot machine currently uses fixed pixel dimensions based on screen width breakpoints. On 24" monitors and laptops with lower vertical resolutions, the entire game area doesn't fit within the visible viewport, requiring users to scroll to see all controls.

## Solution Overview
Implement a viewport-height-aware scaling system that dynamically calculates the maximum scale factor to fit the entire slot machine within the available vertical space, while maintaining the original visual proportions and aspect ratio.

## Technical Approach

### Strategy: CSS Transform Scale with Viewport Constraints
Rather than recalculating individual pixel values, we'll:
1. Keep the existing "xl" (desktop) dimensions as the baseline design
2. Calculate a scale factor based on available viewport height
3. Apply CSS `transform: scale()` to the entire game container
4. Use `transform-origin: top center` to maintain proper positioning

This approach:
- Preserves all existing animations (they work with transforms)
- Maintains visual proportions perfectly
- Requires minimal code changes
- Is smooth and performant (GPU-accelerated)

### Height Budget Analysis

Available height: `100vh - header (64px) - safety margin (16px)`

Components to fit (at xl breakpoint):
- Title image: ~120px
- Slot reels (3 rows): 3 × 150px + 2 × 16px = 482px
- Frame padding: ~90px (top) + 90px (bottom) = 180px
- Control panel: ~130px
- Bonus status bar: ~40px
- **Total: ~950px** at xl baseline

For a 24" monitor (1920×1080): Available = 1080 - 64 - 16 = 1000px (barely fits)
For a 14" laptop (1920×1080 scaled): Often only 800-900px effective viewport height

---

## Implementation Plan

### 1. Create New Hook: `useViewportScaling`

**File:** `src/hooks/useViewportScaling.ts`

This hook will:
- Calculate available viewport height
- Determine optimal scale factor to fit content
- Return scale value and transformed dimensions
- Listen for resize events with debouncing

```text
Calculation Logic:
┌─────────────────────────────────────────┐
│            Available Height             │
│    = window.innerHeight - 64px          │
├─────────────────────────────────────────┤
│            Baseline Height              │
│    = Title + Frame + Reels + Controls   │
│    ≈ 950px (at xl breakpoint)           │
├─────────────────────────────────────────┤
│            Scale Factor                 │
│    = min(1, availableHeight / baseline) │
│    Clamped: min 0.5, max 1.0            │
└─────────────────────────────────────────┘
```

### 2. Update SlotMachine.tsx Page

**File:** `src/pages/SlotMachine.tsx`

Changes:
- Import and use `useViewportScaling` hook
- Wrap the main game area in a scaled container
- Add `overflow-hidden` to prevent content bleeding
- Use `transform: scale()` with `transform-origin: top center`
- Add `height: calc(100vh - 4rem)` to constrain the game area

### 3. Update SlotGame.tsx Component

**File:** `src/components/slots/SlotGame.tsx`

Changes:
- Accept optional `scale` prop for viewport-aware scaling
- Apply scale transform to the outermost container
- Adjust negative margins on control panel to work with scaling
- Remove or reduce existing viewport-based margins that conflict

### 4. Update useResponsiveSlotDimensions Hook

**File:** `src/hooks/useResponsiveSlotDimensions.ts`

Enhance to:
- Add viewport height awareness
- Calculate and return a recommended scale factor
- Export both raw dimensions and scaled dimensions

### 5. Minor CSS Adjustments

**File:** `src/index.css`

Add utility class for scaled containers:
- Ensure transitions remain smooth during scaling
- Add will-change hint for transform performance

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useViewportScaling.ts` | **NEW** - Viewport-aware scale calculation hook |
| `src/pages/SlotMachine.tsx` | Add viewport constraints and scaling wrapper |
| `src/components/slots/SlotGame.tsx` | Accept scale prop, adjust container styling |
| `src/hooks/useResponsiveSlotDimensions.ts` | Add height-aware scale factor |
| `src/index.css` | Add transform performance utilities |

---

## Scale Factor Behavior

| Screen Height | Available | Scale | Result |
|--------------|-----------|-------|--------|
| 1080px (27" 1080p) | 1016px | 1.0 | Full size |
| 900px (24" or laptop) | 836px | 0.88 | Slightly reduced |
| 768px (tablet) | 704px | 0.74 | Noticeably smaller |
| 650px (small laptop) | 586px | 0.62 | Compact but usable |

---

## Key Design Decisions

1. **Scale the entire game container** rather than individual symbols
   - Simpler implementation
   - Perfect aspect ratio preservation
   - All animations continue to work

2. **Use CSS transforms** instead of recalculating pixel values
   - GPU-accelerated
   - Smooth resize transitions
   - No layout recalculations

3. **Maintain minimum scale of 0.5**
   - Below this, symbols become too small to see clearly
   - Protects usability on very small viewports

4. **Transform origin: top center**
   - Keeps title and reels positioned at the top
   - Natural visual hierarchy preserved

---

## Animation & Interaction Preservation

All existing features will continue to work:
- Reel spinning animations (CSS transforms stack correctly)
- Win celebrations and particle effects
- Bonus overlays and modals
- Touch/click interactions (hit areas scale proportionally)
- Keyboard shortcuts (spacebar to spin)

---

## Mobile Considerations

On mobile devices (< 640px width), the existing width-based breakpoint system already provides smaller symbols. The viewport height scaling will complement this by ensuring vertical fit as well, creating a truly responsive experience across all device form factors.
