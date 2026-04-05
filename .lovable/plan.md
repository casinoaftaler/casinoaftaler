

## Plan: Total Multiplier Orb Above "Køb Bonus" Button

### What we're building
A decorative orb/emblem component (inspired by the uploaded image — golden wings, lightning bolt, circular frame) that displays the cumulative bonus multiplier. This replaces the current "Multiplier" text in the control bar. The orb sits directly above the "Køb Bonus" button in the side panel area.

### Steps

1. **Generate the orb image asset**
   - Use AI image generation (Gemini) to create a transparent PNG of the orb frame (golden wings + lightning bolt circle, similar to the uploaded reference). The multiplier text will be overlaid via CSS, so the image should have an empty/dark center.
   - Save to `src/assets/slots/gates/multiplier-orb.png`.

2. **Create `GatesMultiplierOrb` component**
   - New file: `src/components/slots/GatesMultiplierOrb.tsx`
   - Props: `multiplierValue: number`, `isActive: boolean` (bonus active), `isMobile?: boolean`
   - Renders the orb image with "TOTAL MULTIPLIER" label above and `x{value}` centered over the orb
   - Only visible when `isActive` (bonus mode)
   - Styled with glow/pulse animation when multiplier increases

3. **Update `BonanzaSidePanels` to accept an optional header slot**
   - Add an optional `headerContent?: React.ReactNode` prop
   - Render it above the "Køb Bonus" button in vertical layout (desktop)
   - In horizontal layout (mobile), render it inline or to the left

4. **Update `GatesSlotGame.tsx`**
   - Pass `cumulativeMultiplier` and `runningMultiplier` to the side panel area via the new `GatesMultiplierOrb` component
   - Wire it into both desktop (above "Køb Bonus" in the side panel) and mobile layouts

5. **Remove multiplier from `BonanzaControlBar`**
   - Remove the `gates-of-fedesvin` multiplier block (lines 318-325 in BonanzaControlBar.tsx) that currently shows "Multiplier" and the x value
   - Keep the "Tumble Win" display

### Files changed
- `src/assets/slots/gates/multiplier-orb.png` (new — generated)
- `src/components/slots/GatesMultiplierOrb.tsx` (new)
- `src/components/slots/BonanzaSidePanels.tsx` (add `headerContent` prop)
- `src/components/slots/GatesSlotGame.tsx` (wire orb component, pass to side panels)
- `src/components/slots/BonanzaControlBar.tsx` (remove multiplier section for gates)

