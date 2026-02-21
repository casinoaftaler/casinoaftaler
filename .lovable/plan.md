

## Redesign Gates of Fedesvin Control Bar

### Current Problem
The control bar has too many separate boxes (Volume, BetControls, Spin button, AutospinRow, PayTable) all in a row, making it look cramped and cluttered. The autospin section takes up a lot of space with its dropdown + button combo.

### Desired Layout (based on reference image)
A single, clean horizontal bar with these elements inline from left to right:

**Left side:** PayTable button (rules) | Volume button  
**Center-left:** Credits display (spins remaining)  
**Center:** Bet display with +/- controls  
**Center-right:** (space)  
**Right:** Spin button (circular, with auto-spin count shown inside when active)

The auto-spin becomes a single button that opens a small popover/overlay where you pick the count and start. While auto-spinning, the spin button itself shows remaining spins.

### Technical Changes

**1. New component: `GatesControlBar.tsx`**
A Gates-specific control bar replacing `SlotControlPanel` for this game. Layout:
- Single horizontal bar with `bg-gradient-to-b from-blue-950/90 to-slate-950/90` and rounded corners
- Left cluster: PayTable icon button + Volume icon button (compact, no labels)
- Center-left: Credits counter showing `spinsRemaining / maxSpins`
- Center: Bet section - label "BET", value with +/- buttons
- Right: Circular spin button (~64-72px) that shows:
  - "SPIN" normally
  - Spinning animation during spin
  - "FREE" during bonus
  - Auto-spin remaining count (e.g. "23") when auto-spinning
  - "INGEN SPINS" when out of credits

**2. New component: `AutoSpinPopover.tsx`**
A small popover triggered by a turbo/auto button next to the spin button:
- Shows count options (10, 25, 50, 100, Infinite) as selectable chips/buttons
- "START" button to begin auto-spinning
- When auto-spinning, the same button shows "STOP" with remaining count

**3. Update `GatesSlotGame.tsx`**
- Replace `SlotControlPanel` usage with the new `GatesControlBar` component
- Remove the `max-w-[700px]` constraint
- Pass all existing props to the new component

**4. Keep `SlotControlPanel` unchanged**
The existing panel continues to work for "Book of Fedesvin" and other games.

### Layout Sketch

```text
+------------------------------------------------------------------------+
| [i] [Vol]  |  Credits: 87/100  |  BET  [-] 5 [+]  |  [Auto] [SPIN]  |
+------------------------------------------------------------------------+
```

During auto-spin, the spin button shows the remaining count inside it. During bonus, credits section is hidden and the spin button shows "FREE".

### Files to Create/Modify
- **Create:** `src/components/slots/GatesControlBar.tsx` - new clean horizontal bar
- **Create:** `src/components/slots/AutoSpinPopover.tsx` - popover for auto-spin config
- **Modify:** `src/components/slots/GatesSlotGame.tsx` - swap control panel component
