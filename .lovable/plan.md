

## Plan: Bonanza Control Bar Restructure

### Changes Overview

**1. Remove "Hold space for turbo spin" text** (`BonanzaControlBar.tsx`)
- Delete the turbo hint overlay (lines 114-122)

**2. Add spacebar-to-spin + prevent scroll** (`BonanzaSlotGame.tsx`)
- Add a `useEffect` with `keydown`/`keyup` listener for Space key
- Call `e.preventDefault()` to block page scrolling
- Trigger `handleSpin()` on Space press

**3. Replace Gevinst bar with inline text** (`BonanzaSlotGame.tsx`, lines 856-892)
- Remove the rounded box/card container
- Replace with vibrant pink text: "Gevinst" label + win amount, no background/border
- Below it, add "Resterende spins: {spinsRemaining}" text line
- Keep bonus free spins display logic

**4. Restructure bet controls around spin button** (`BonanzaControlBar.tsx`)
- Current: `[-] [BET VALUE] [+] [SPIN]`
- New: `[-] [SPIN] [+]` — remove the bet value display from center zone
- Minus button left of spin, plus button right of spin

### Files Modified
- `src/components/slots/BonanzaControlBar.tsx` — remove turbo text, restructure center zone
- `src/components/slots/BonanzaSlotGame.tsx` — spacebar handler, replace gevinst bar with text

