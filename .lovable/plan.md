
# Make Slot Frame Smaller on Mobile

## The Problem

The slot machine frame uses the same size (set in admin panel, default 90px) on all devices. On mobile screens, this creates an oversized frame that takes up too much space relative to the slot machine content.

## Solution

Apply responsive scaling to the frame size based on screen width. The admin-configured size will be treated as the desktop size, and smaller screens will use proportionally reduced sizes.

## Responsive Scaling Strategy

| Screen Size | Breakpoint | Scale Factor | Example (if admin sets 90px) |
|-------------|------------|--------------|------------------------------|
| Extra Small | < 400px | 35% | 32px |
| Mobile | < 640px | 45% | 40px |
| Small | < 768px | 60% | 54px |
| Medium | < 1024px | 80% | 72px |
| Large+ | >= 1024px | 100% | 90px (full size) |

## Changes Required

### 1. Update SlotMachineFrame Component

Add responsive scaling logic using window width detection:

```text
src/components/slots/SlotMachineFrame.tsx
```

- Add a state for the effective frame size based on screen width
- Listen for resize events to update the size dynamically
- Apply the scaled frame size to all frame-related styles

### 2. Key Changes

**Before:**
- `frameSize` is a fixed value from settings (e.g., 90px)
- All margins and positioning use this single value

**After:**
- `effectiveFrameSize` is calculated based on screen width
- Mobile screens get a significantly smaller frame
- The transition is smooth across breakpoints

## Technical Details

The component will:
1. Read the admin-configured `slot_frame_size` as the base (desktop) size
2. Calculate an `effectiveFrameSize` based on current window width
3. Apply this scaled size to:
   - Container margins (top, left, right, bottom)
   - Frame image positioning (top, left, right, bottom offsets)
   - Content padding (p-2 on mobile vs p-4/p-6/p-8 on larger screens)

## Files Changed

| File | Change |
|------|--------|
| `src/components/slots/SlotMachineFrame.tsx` | Add responsive frame size calculation with resize listener |

## User Experience

- Admin-configured frame size remains the "desktop" reference size
- Mobile users see a proportionally smaller frame that fits their screen
- Frame automatically adjusts when rotating device or resizing browser
- No changes needed to the admin panel

## Summary

A single component update adds responsive frame sizing. The frame will automatically scale down on mobile devices while keeping the full size on desktop, making the slot machine look properly proportioned on all screen sizes.
