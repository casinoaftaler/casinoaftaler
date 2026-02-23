
## Replace Slot Info Dialog with Inline Popover

Replace the full-screen dialog overlay with a small popover card that appears next to the clicked slot name, matching the dark card design from the reference screenshot.

### Changes

**1. Rewrite `BonusHuntSlotInfoDialog.tsx` -> `BonusHuntSlotPopover.tsx`**

Replace the Dialog-based component with a Popover-based component using the existing `@radix-ui/react-popover`. The popover will:
- Appear anchored next to the slot name that was clicked
- Use a dark background (`bg-[#0a0e1a]`) with a subtle border
- Display the slot name as a bold header
- Show 5 rows with colored icons matching the reference:
  - RTP (pink/red icon) 
  - Volatilitet (blue chart icon)
  - Max Potentiale (orange star icon)
  - Vores Hojeste Gevinst (green icon)
  - Vores Hojeste X (purple icon)
- Each row shows label + value (or dash when no data)
- A "MORE INFO" button at the bottom (placeholder for future use)
- Width ~260px, compact padding

**2. Update `BonusHuntSlotTable.tsx`**

- Remove the Dialog import and the `selectedSlot` state
- Wrap each slot name cell in a `Popover` + `PopoverTrigger` instead of a plain button
- The `PopoverContent` renders the new slot info card inline
- Each row manages its own popover open/close state via Radix

### Technical approach

Instead of a single shared dialog controlled by `selectedSlot` state, each table row will have its own `Popover` wrapping the slot name button. This ensures the popover appears right next to the clicked element without needing position calculations.

### Files to modify
- `src/components/bonus-hunt/BonusHuntSlotInfoDialog.tsx` -- rewrite as popover content component
- `src/components/bonus-hunt/BonusHuntSlotTable.tsx` -- replace dialog usage with inline popovers

### Files to delete
- None (we reuse the existing file)
