
## Make AutoSpinPopover Use Dynamic Slot Theme Colors

The `AutoSpinPopover` component currently has all its colors hardcoded to blue (the Gates/Olympus theme). It needs to accept the `SlotTheme` and use theme-appropriate colors so it matches the Egyptian (amber) theme for Book of Fedesvin, the wizard (purple) theme for Rise of Fedesvin, and the Olympus (blue) theme for Gates of Fedesvin.

### Changes

**1. Add auto-spin theme fields to `SlotTheme` in `src/lib/slotTheme.ts`**

Add 8 new fields to the `SlotTheme` interface for the auto-spin button and popover:
- `autoSpinBtnBg` -- trigger button background (e.g. `bg-amber-800/40`)
- `autoSpinBtnBorder` -- trigger button border (e.g. `border-amber-500/30`)
- `autoSpinBtnText` -- trigger button text color (e.g. `text-amber-300`)
- `autoSpinBtnHoverBg` -- trigger hover bg
- `autoSpinBtnHoverText` -- trigger hover text
- `autoSpinPopoverBg` -- popover background
- `autoSpinPopoverBorder` -- popover border
- `autoSpinCountActiveBg` / `autoSpinCountActiveBorder` / `autoSpinCountActiveText` -- selected count chip
- `autoSpinCountBg` / `autoSpinCountBorder` / `autoSpinCountText` / `autoSpinCountHoverBg` / `autoSpinCountHoverText` -- unselected count chip
- `autoSpinStartBg` / `autoSpinStartHoverBg` / `autoSpinStartBorder` -- START button
- `autoSpinLabelText` -- "Auto Spin" label text

Then populate these for all three themes (egyptianTheme with amber, wizardTheme with purple, olympusTheme with blue -- keeping current blue values).

**2. Update `AutoSpinPopover` in `src/components/slots/AutoSpinPopover.tsx`**

- Add a `theme: SlotTheme` prop (import `SlotTheme` from slotTheme)
- Replace every hardcoded blue class with the corresponding `theme.autoSpin*` field
- The stop button (red) stays unchanged since red is universal for "stop"

**3. Update `GatesControlBar` in `src/components/slots/GatesControlBar.tsx`**

- Pass `theme={theme}` to the `<AutoSpinPopover>` component (theme is already available in this component via `getSlotTheme(gameId)`)

### Technical Details

The mapping from hardcoded to themed classes:

| Current hardcoded | Theme field |
|---|---|
| `bg-blue-800/40` | `theme.autoSpinBtnBg` |
| `border-blue-500/30` | `theme.autoSpinBtnBorder` |
| `text-blue-300` | `theme.autoSpinBtnText` |
| `bg-blue-950/95` | `theme.autoSpinPopoverBg` |
| `bg-blue-500/30 border-blue-400/50 text-blue-200` | active count chip fields |
| `bg-blue-900/40 border-blue-500/20 text-blue-400/70` | inactive count chip fields |
| `bg-blue-600/80` | START button bg |

For the Egyptian theme these become amber equivalents, for the wizard theme purple equivalents, and for Olympus they stay blue (no visual change on Gates).
