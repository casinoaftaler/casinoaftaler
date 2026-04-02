

# Fix Book of Fedesvin & Rise of Fedesvin Mobile Layout

## Problem
Both games use a fixed 1200px layout with `transform: scale()` on mobile, which shrinks everything and leaves large dead space below the game. Fedesvin Bonanza instead uses native responsive sizing where symbols dynamically fill the viewport width.

## Approach
Mirror the Bonanza pattern: add `isMobile` prop to `SlotGame`, dynamically calculate symbol dimensions based on viewport width, and update both page files to use the same mobile wrapper as Bonanza.

## Changes

### 1. `src/components/slots/SlotGame.tsx` — Add responsive mobile support
- Add `isMobile` prop to `SlotGameProps`
- Calculate `mobileSymbolSize` from viewport width: `Math.floor((viewportWidth - totalGaps - padding) / 5)` (5 reels)
- Use mobile size for `SYMBOL_SIZE` when `isMobile` is true
- Scale `SYMBOL_GAP` proportionally on mobile
- Pass mobile dimensions down to `SlotReel`, `WinLines`, `SlotMachineFrame`, `SlotIdleEffects`, `SlotAmbientLight`

### 2. `src/components/slots/SlotReel.tsx` — Accept dynamic dimensions
- Add optional `symbolHeight` and `symbolGap` props (currently uses hardcoded constants)
- Use passed values when provided, fall back to existing constants

### 3. `src/components/slots/WinLines.tsx` — Accept dynamic dimensions
- Already accepts `symbolSize` and `gap` props — no changes needed

### 4. `src/components/slots/SlotMachineFrame.tsx` — Compact frame on mobile
- Add `isMobile` prop to reduce padding/frame size on small screens

### 5. `src/pages/SlotMachine.tsx` — Update mobile wrapper
- Replace `transform: scale()` mobile block with Bonanza-style native layout:
  ```jsx
  <div className="flex-1 flex flex-col overflow-hidden">
    <div className="w-full px-1">
      <SlotPageLayout sidePanel={null}>
        <SlotGame isMobile />
      </SlotPageLayout>
    </div>
  </div>
  ```

### 6. `src/pages/RiseOfFedesvin.tsx` — Same mobile wrapper update
- Identical change as SlotMachine.tsx, passing `isMobile` and `gameId={GAME_ID}`

### 7. `src/components/slots/BonanzaControlBar.tsx` — Already supports `isMobile`
- No changes needed; `SlotGame` already uses this control bar

## Technical Detail
The key calculation (matching Bonanza's approach):
```ts
const mobileSymbolSize = useMemo(() => {
  if (!isMobile) return 150;
  const viewportWidth = window.innerWidth;
  const totalGaps = 6 * mobileGap; // 5 reels + dividers
  const framePadding = 56; // frame + inner padding
  return Math.floor((viewportWidth - totalGaps - framePadding) / 5);
}, [isMobile]);
```

This ensures the game fills the mobile viewport width natively — no CSS transform scaling, no dead space.

