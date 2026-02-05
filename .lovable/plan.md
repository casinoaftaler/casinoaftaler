
# Always-Visible Slot Machine with Adaptive Title

## Problem Analysis

The current viewport scaling system has a fixed baseline height calculation that includes the title art. On very short screens (like 1366×768 or smaller), even with scaling down to the minimum 0.45, the total content height (title + frame + reels + controls + mobile content) can still exceed the available viewport height, causing scrolling.

**Current height budget includes:**
- Title: ~80-100px
- Frame margins: ~90px top + 90px bottom (180px total on desktop)
- Reels: 3×180 + 2×20 = 580px at full size
- Controls: ~90-100px
- Total baseline: 950px (desktop) / 730px (mobile)

**The issue:** When `availableHeight / baseline` produces a scale factor below 0.45 (the current minimum), the content still overflows. For example:
- 1366×768 screen: Available = 768 - 64 - 16 = 688px
- Required scale for 950px baseline: 688/950 = 0.72 ✓ (works)
- But add frame + extra content: could need 0.5-0.6 which may still overflow with title

## Solution Overview

Create an adaptive system that:
1. **Prioritizes visibility of game + controls** - These must ALWAYS be visible
2. **Progressively hides title** when viewport is too short
3. **Reduces minimum scale** for extreme cases
4. **Uses dynamic height measurement** based on what's actually visible

The title will smoothly fade out and collapse when space is too tight, ensuring the slot machine reels and controls are always 100% visible without scrolling.

## Technical Approach

```text
┌─────────────────────────────────────────────────────────────┐
│                  Adaptive Layout Logic                      │
├─────────────────────────────────────────────────────────────┤
│  1. Calculate available height:                             │
│     availableHeight = 100dvh - header - padding             │
│                                                             │
│  2. Calculate content heights:                              │
│     coreHeight = reels + controls + frame (essential)       │
│     titleHeight = 80-100px (optional)                       │
│                                                             │
│  3. Determine if title should show:                         │
│     showTitle = availableHeight >= coreHeight * 1.15        │
│     (Show title only if there's 15% extra headroom)         │
│                                                             │
│  4. Calculate scale:                                        │
│     baseline = showTitle ? fullBaseline : coreBaseline      │
│     scale = clamp(availableHeight / baseline, 0.35, 1.0)    │
│                                                             │
│  5. Apply smooth transitions for title visibility           │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Step 1: Enhance useViewportScaling Hook

**File:** `src/hooks/useViewportScaling.ts`

Changes:
- Add separate baseline calculations for with/without title
- Add `showTitle` boolean to return value based on available space
- Reduce minimum scale from 0.45 to 0.35 for extreme cases
- Calculate more accurate baselines:

```text
Desktop baselines:
- With title: ~950px (current)
- Without title (core only): ~850px (frame + reels + controls)

Mobile baselines:
- With title: ~730px (current)  
- Without title (core only): ~620px (reels + controls + side content)
```

New return interface:
```typescript
interface ViewportScaling {
  scale: number;
  availableHeight: number;
  shouldScale: boolean;
  isDesktop: boolean;
  showTitle: boolean;  // NEW: Whether to show title art
}
```

### Step 2: Update SlotMachine Page

**File:** `src/pages/SlotMachine.tsx`

Changes:
- Consume the new `showTitle` value from hook
- Conditionally render title with smooth transition (opacity + max-height)
- Apply CSS classes for smooth collapse animation
- Remove title from DOM entirely when hidden (after transition) to save layout space

### Step 3: Add CSS Transitions for Title

**File:** `src/index.css`

Add:
- Smooth opacity and max-height transitions for title collapse
- Utility classes for title visibility states
- GPU-accelerated transitions for smooth animation

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/hooks/useViewportScaling.ts` | Add `showTitle` calculation, reduce MIN_SCALE to 0.35, add core-only baselines |
| `src/pages/SlotMachine.tsx` | Conditional title rendering with smooth transitions |
| `src/index.css` | Add title collapse animation classes |

---

## Scaling Behavior Matrix

| Screen Size | Available | Scale | Title | Result |
|-------------|-----------|-------|-------|--------|
| 1920×1080 | 1000px | 1.0 | ✓ Show | Full experience |
| 1680×1050 | 970px | 1.0 | ✓ Show | Full experience |
| 1440×900 | 820px | 0.86 | ✓ Show | Slight shrink |
| 1366×768 | 688px | 0.72 | ✗ Hide | Core fits perfectly |
| 1280×720 | 640px | 0.67 | ✗ Hide | Compact but usable |
| 1024×768 | 688px | 0.72 | ✗ Hide | Tablet landscape |
| Mobile 390×844 | 764px | ~0.95 | ✓ Show | Near full |
| Mobile 375×667 | 587px | ~0.78 | ✗ Hide | Compact |
| Small 320×568 | 488px | ~0.56 | ✗ Hide | Very compact |

---

## Code Changes Summary

### useViewportScaling.ts

```typescript
// New constants
const BASELINE_DESKTOP_WITH_TITLE = 950;
const BASELINE_DESKTOP_CORE = 850;  // Without title
const BASELINE_MOBILE_WITH_TITLE = 730;
const BASELINE_MOBILE_CORE = 620;   // Without title

const MIN_SCALE = 0.35;  // Reduced from 0.45
const TITLE_HEADROOM_FACTOR = 1.12; // Need 12% extra to show title

// New calculation logic
const coreBaseline = isDesktop ? BASELINE_DESKTOP_CORE : BASELINE_MOBILE_CORE;
const fullBaseline = isDesktop ? BASELINE_DESKTOP_WITH_TITLE : BASELINE_MOBILE_WITH_TITLE;

// Show title only if we have enough headroom above core requirements
const coreScale = availableHeight / coreBaseline;
const showTitle = coreScale >= TITLE_HEADROOM_FACTOR;

// Use appropriate baseline for final scale calculation
const baseline = showTitle ? fullBaseline : coreBaseline;
const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, availableHeight / baseline));
```

### SlotMachine.tsx

```tsx
const { scale, shouldScale, showTitle } = useViewportScaling();

// In render:
{showTitle && (
  <div className="slot-title-container">
    <img src={titleImage} ... />
  </div>
)}
```

### index.css

```css
/* Title container with smooth collapse */
.slot-title-container {
  transition: opacity 0.3s ease-out, max-height 0.3s ease-out;
  overflow: hidden;
}

.slot-title-hidden {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}
```

---

## Key Design Decisions

### 1. Title is Sacrificed First
The title art is decorative and non-essential for gameplay. Hiding it ensures the actual game (reels) and controls (spin button, bet) are always accessible.

### 2. Headroom Factor (1.12)
We only show the title if there's at least 12% extra space after fitting the core game. This prevents the title from flickering in/out on borderline heights.

### 3. Minimum Scale Reduced to 0.35
On extremely small viewports (like embedded widgets or very old small monitors), allowing scale to go to 0.35 ensures the game still fits. At 0.35 scale:
- Desktop 950px → 332px effective
- This is very small but still functional

### 4. Smooth Transitions
The title doesn't just pop in/out - it smoothly fades and collapses. This prevents jarring layout shifts during window resize.

### 5. No Scrolling Ever
With this system, the slot machine + controls will ALWAYS fit in view. The only thing that may be hidden is the decorative title.

---

## Mobile Considerations

On mobile, the side content (leaderboard, promo slider) appears below the game. The mobile baseline accounts for this:
- Core: 620px = Reels (320) + Controls (80) + Side content (220)
- With title: 730px = Core + Title (80) + spacing

If viewport is too short, title hides first. If still too short, scaling goes down to 0.35 minimum.

---

## Testing Recommendations

After implementation, test on:
1. **1366×768** - Common laptop, title should hide, game fits
2. **1280×720** - HD, title should hide, game fits
3. **1920×1080** - Standard, full experience with title
4. **Resize browser** - Title should smoothly appear/disappear
5. **Mobile devices** - Various heights, verify no scrolling
6. **DevTools device mode** - Test all standard device presets
