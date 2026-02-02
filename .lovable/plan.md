

# Plan: Make Video Playback Bigger on Highlights Page

## Overview
Increase the size of video cards on the Highlights page by reducing the number of columns in the grid layout, giving each video more screen real estate.

## Changes Required

### File: src/pages/Highlights.tsx

Update the grid layout to show fewer columns, making each video card larger:

**Current layout:**
- Mobile: 1 column
- Tablet (md): 2 columns  
- Desktop (lg): 3 columns

**New layout:**
- Mobile: 1 column
- Desktop (lg): 2 columns

This change will make each video approximately 50% larger on desktop screens.

**Code changes:**

1. **Line 47** (loading skeleton grid):
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

2. **Line 81** (main highlights grid):
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

Also increasing the gap from `gap-6` to `gap-8` for better spacing between larger cards.

## Visual Result
- Videos will be significantly larger and easier to watch
- Better viewing experience especially on desktop monitors
- Maintains single column on mobile for optimal mobile viewing
- More breathing room between video cards

