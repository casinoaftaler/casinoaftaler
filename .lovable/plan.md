
# Make Symbol Images Bigger Without Enlarging the Grid

## Problem
Currently, the admin sliders for "Symbol Bredde" and "Symbol Hojde" control the **cell size** (the box each symbol sits in). Making the cell bigger makes the entire grid bigger. The symbol images use `w-full h-full object-contain`, so they always fill exactly their cell -- no more, no less.

You want to scale just the **images themselves** beyond the cell boundary, so they visually overlap without changing the grid layout.

## Solution
Add a new **Symbol Scale** slider (separate from width/height) that applies a CSS `transform: scale(...)` to the images. The cell stays the same size, but the image renders larger and overflows visually.

## Changes

### 1. Add `bonanza_symbol_scale` setting
- Add a new key `bonanza_symbol_scale` to the settings keys list
- Default value: `100` (percent, meaning 1:1 with cell)
- Admin slider range: `80%` to `160%`, step `5`

### 2. Admin panel slider (BonanzaGameSettingsAdmin.tsx)
- Add a new "Symbol Skalering" slider beneath the existing width/height sliders
- Shows the current percentage value (e.g. "120%")

### 3. Read the setting in BonanzaSlotGame.tsx
- Read `bonanza_symbol_scale` from `siteSettings`, default to `100`
- Pass it as a new `symbolScale` prop to each `BonanzaColumn`

### 4. Apply scale in BonanzaColumn.tsx
- Accept new `symbolScale` prop (number, percentage)
- On every `<img>` tag for symbols and bombs, apply `style={{ transform: scale(X) }}` where X = symbolScale / 100
- The cell div already toggles between `overflow-hidden` and `overflow-visible` for animations -- during idle state it clips. We will need to **always allow overflow-visible** on cells so the scaled images can visually overlap their neighbors, or alternatively use `overflow: clip` only on the column wrapper (not individual cells)

### 5. Overflow handling
- Remove `overflow-hidden` from individual cells so scaled images can bleed over
- Keep `overflow-hidden` on the **column container** to prevent images from escaping the entire grid area
- This preserves existing animation overflow behavior (tumbles, drops already use `overflow-visible`)

## Technical Details

### Files to modify:
1. **`src/components/slots/BonanzaGameSettingsAdmin.tsx`** -- add `symbolScale` to form, defaults, settings keys, save/load logic, and a new slider UI
2. **`src/components/slots/BonanzaSlotGame.tsx`** -- read `bonanza_symbol_scale` from site settings, pass as prop
3. **`src/components/slots/BonanzaColumn.tsx`** -- accept `symbolScale` prop, apply `transform: scale()` to all `<img>` elements, adjust overflow rules on cells
