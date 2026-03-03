

## Plan: Control Bar Text Enhancements + Gevinst/Resterende Repositioning

### 1. Enlarge Credit & Indsats text with black stroke + shadow (`BonanzaControlBar.tsx`)

**Left zone** — increase text sizes and add text stroke + shadow styling:
- "Credit" label: `text-[8px]` → `text-sm`, keep uppercase/tracking
- Credit value: `text-sm` → `text-2xl`
- "Indsats" label: `text-[8px]` → `text-sm`
- Indsats value: `text-sm` → `text-2xl`
- All four elements get `style={{ WebkitTextStroke: "1px black", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}`

### 2. Move Gevinst to right zone of control bar (`BonanzaControlBar.tsx` + `BonanzaSlotGame.tsx`)

- **Remove** Gevinst text from `BonanzaSlotGame.tsx` (lines 880-888)
- **Add** Gevinst display in the **right zone** of `BonanzaControlBar.tsx`, positioned between the `[+]` button and the AutoSpin popover
- Display: vibrant pink "Gevinst" label + win amount, with black stroke + shadow
- The `winAmount` prop already exists on the component

### 3. Resterende spins → bonus only (`BonanzaSlotGame.tsx`)

- **Remove** the always-visible "Resterende spins" showing `spinsRemaining` (lines 889-892)
- **Keep** the existing bonus "Free Spins" display (lines 870-878) but relabel it to "Resterende spins" showing `freeSpinsRemaining`
- Add black stroke + shadow to this text
- Only renders when `isBonusActive` is true

### Files Modified
- `src/components/slots/BonanzaControlBar.tsx` — bigger Credit/Indsats, Gevinst in right zone
- `src/components/slots/BonanzaSlotGame.tsx` — remove Gevinst + Resterende from above bar, relabel bonus display

