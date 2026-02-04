
# Plan: Fix Slot Control Bar Alignment

## Problem
The left and right panels in the control bar are not aligning properly within their designated boxes:
1. **Left Panel (BetControls)**: The component doesn't fill its container width
2. **Right Panel (Volume+Autospin)**: The AutospinRow content can overflow the container because it has variable-width elements (dropdown selector + button with dynamic text like "STOP (25)")

---

## Solution

### File: `src/components/slots/SlotControlPanel.tsx`

**Change 1: Make BetControls fill its container (line 66)**
Add `w-full` to the wrapper so BetControls stretches to fill the container width consistently.

```tsx
// Before
<div className="order-1 sm:order-1 sm:w-40 md:w-44 lg:w-48">

// After  
<div className="order-1 sm:order-1 w-full sm:w-40 md:w-44 lg:w-48">
```

**Change 2: Fix right panel overflow and improve layout (line 155-156)**
- Add `flex-shrink-0` to prevent the panel from shrinking
- Use `w-full` on mobile for consistency
- Add `overflow-hidden` to prevent content overflow

```tsx
// Before
<div className="flex items-center gap-2 order-3 sm:w-40 md:w-44 lg:w-48 justify-center bg-gradient-to-b...">

// After
<div className="flex items-center gap-2 order-3 w-full sm:w-40 md:w-44 lg:w-48 flex-shrink-0 justify-center bg-gradient-to-b...">
```

### File: `src/components/slots/BetControls.tsx`

**Change: Make component fill container (line 28)**
Add `w-full` so the component stretches to fill whatever container width is given.

```tsx
// Before
<div className="flex flex-col gap-1.5 bg-gradient-to-b from-amber-950/90...">

// After
<div className="flex flex-col gap-1.5 w-full bg-gradient-to-b from-amber-950/90...">
```

### File: `src/components/slots/AutospinRow.tsx`

**Change: Prevent overflow with flex-shrink (line 33)**
Add `flex-shrink-0` to buttons to prevent them from being squished.

```tsx
// Before
<div className="flex items-center justify-center gap-2">

// After
<div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
```

Also reduce button sizes slightly on the autospin buttons to fit better in the container.

---

## Summary

| Component | Issue | Fix |
|-----------|-------|-----|
| SlotControlPanel | Wrapper doesn't enforce width on children | Add `w-full` on mobile, fixed widths on desktop |
| BetControls | Doesn't fill container | Add `w-full` to root element |
| AutospinRow | Content can overflow | Add `flex-wrap` and reduce gaps |

---

## Expected Result
- Both left and right panels will have consistent, matching widths
- Content will properly fill the container boxes
- The spin button will remain perfectly centered
- No overflow or misalignment issues on any screen size
