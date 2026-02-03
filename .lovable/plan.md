

# Plan: Add Rounded Edges to Slot Symbols

## Overview
Add rounded corners to the symbol images so they have softer, more polished edges that match the overall slot machine aesthetic.

## Current State
- The container already has `rounded-lg` (8px border-radius)
- The image inside does **not** have any border-radius, so it appears with sharp edges
- The container has `overflow-hidden` which will clip the image to the container's rounded corners

## Solution
Add `rounded-lg` class to the `<img>` element so the symbol images themselves have rounded corners. This creates a more polished look where the image edges match the container.

## Changes

**File:** `src/components/slots/SlotSymbol.tsx`

Add `rounded-lg` to the image className (line 38):

```tsx
// Before
"w-[52px] h-[52px] xs:w-[64px] xs:h-[64px] ... object-cover transition-transform duration-300"

// After
"w-[52px] h-[52px] xs:w-[64px] xs:h-[64px] ... object-cover rounded-lg transition-transform duration-300"
```

This applies an 8px border-radius to all symbol images, creating smooth rounded corners.

## Files to Modify

| File | Change |
|------|--------|
| `src/components/slots/SlotSymbol.tsx` | Add `rounded-lg` to image element |

