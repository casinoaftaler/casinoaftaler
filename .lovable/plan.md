

## Remove Box Styling from Bonanza Grid Symbols

**Problem**: Each symbol cell in the Bonanza grid has a visible background (`bg-pink-950/30`) and border (`border border-pink-400/10`) that makes the symbols look boxed-in.

**Solution**: Remove the default background and border from each cell container, keeping only the dynamic animation classes that apply highlights during wins, explosions, etc.

### Changes

**File: `src/components/slots/BonanzaColumn.tsx` (line 74)**

Remove `"bg-pink-950/30 border border-pink-400/10"` from the cell's className. The cell will be transparent by default, and the animation classes (e.g., `bonanza-candy-highlight`, `bonanza-symbol-explode`) will still apply their own styling when active.

### Technical Detail

- Only the static/idle styling is removed -- all animation-driven classes (`bonanza-candy-highlight`, `bonanza-drop-off`, `bonanza-gravity-bounce`, etc.) remain untouched and will continue to work during tumbles and wins.
- The `rounded-lg` class stays for clipping during overflow-hidden states.
- No other files need changes; GatesColumn uses its own blue-themed styling which isn't part of this request.

