
# Plan: Fix Reel Width Shift on Landing

## Problem

When a reel transitions from the spinning state to the landed/idle state, there's a slight horizontal shift to the left. This happens because:

1. **During spinning**: The reel container has an explicit inline width: `width: ${symbolHeight}px` (lines 323-326 in SlotReel.tsx)
2. **When landed/idle**: The container switches to a simple flex column with NO explicit width - it just wraps the SlotSymbol components

This causes a layout shift because the two containers have different width behaviors even though the symbols inside are the same size.

## Solution

Add an explicit width to the idle/stopped state container that matches the spinning container width. This ensures consistent sizing across all states.

## Technical Changes

### File: `src/components/slots/SlotReel.tsx`

**Current code (lines 259-260):**
```tsx
if (spinState === "idle" || spinState === "stopped") {
  return (
    <div className="flex flex-col gap-[4px] xs:gap-[6px] sm:gap-[8px] md:gap-[12px] lg:gap-[16px]">
```

**Updated code:**
```tsx
if (spinState === "idle" || spinState === "stopped") {
  const symbolHeight = getSymbolHeight();
  
  return (
    <div 
      className="flex flex-col gap-[4px] xs:gap-[6px] sm:gap-[8px] md:gap-[12px] lg:gap-[16px]"
      style={{ width: `${symbolHeight}px` }}
    >
```

This adds the same width calculation that the spinning state uses, ensuring the container maintains a consistent width during the transition from spinning to stopped/idle.

## Why This Works

- The `getSymbolHeight()` function already exists and returns the correct responsive size based on viewport width
- By using the same width value in both states (spinning and idle), we eliminate the layout shift
- The symbols inside will remain the same size - we're just ensuring their parent container has a consistent width

## Files to Modify

| File | Change |
|------|--------|
| `src/components/slots/SlotReel.tsx` | Add explicit `width` style to the idle/stopped state container |
