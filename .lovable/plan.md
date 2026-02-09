

## Theme Rise of Fedesvin: Win Lines, Win Celebrations, and Particles

### Problem
The WinLines, WinCelebration, and WinDisplay components all use hardcoded Egyptian gold/amber colors regardless of which slot game is active. On Rise of Fedesvin, these should use the purple/blue wizard theme instead.

### Changes Required

**1. `src/components/slots/WinLines.tsx`**
- Add `gameId` prop to the component interface
- Create a second color palette for wizard theme (purple/violet/blue shades)
- Select the color palette based on `gameId`
- Update the inner core line color from gold (`#FFFACD`) to a light lavender for wizard theme

**2. `src/components/slots/WinCelebration.tsx`**
- Add `gameId` prop to the component interface
- Create wizard-themed `COLORS` array using purple/violet hues instead of gold
- Theme the Big Win overlay: border color, shadow color, gradient text colors, glow effects
- Theme the screen flash effect (purple radial gradient instead of gold)
- Theme the pulsing border glow (purple instead of gold)
- Update emoji decorations for Epic/Mega/Big win labels (e.g. use crystal ball, lightning, stars instead of fire/diamond/star)

**3. `src/components/slots/WinDisplay.tsx`**
- Add `gameId` prop
- Use `getSlotTheme()` to pick accent colors instead of hardcoded `amber-500`

**4. `src/components/slots/SlotGame.tsx`**
- Pass `gameId` to `<WinCelebration>` and `<WinLines>` components (currently not passed)
- Pass `gameId` to `<WinDisplay>` if used

### Technical Details

**Wizard line colors (replacing gold):**
```
"#A855F7" - Purple 500
"#9333EA" - Purple 600
"#7C3AED" - Violet 500
"#8B5CF6" - Violet 400
"#C084FC" - Purple 300
"#A78BFA" - Violet 400
"#6D28D9" - Purple 700
"#B57BFF" - Custom light purple
"#7E57C2" - Deep violet
"#9F7AEA" - Soft violet
```

**Wizard core line color:** `#E9D5FF` (purple-200) instead of `#FFFACD`

**Wizard celebration particle colors:**
```
"hsl(270, 80%, 60%)"  - Purple
"hsl(260, 90%, 55%)"  - Deep purple
"hsl(280, 70%, 65%)"  - Light purple
"hsl(250, 75%, 60%)"  - Violet
```

**Wizard big win overlay theming:**
- Border: `border-purple-500/40` instead of `border-amber-500/40`
- Shadow: purple glow instead of gold glow
- Text gradients: purple-to-violet instead of gold-to-orange
- Epic win emojis: "lightning bolt EPIC WIN! lightning bolt" / "crystal ball MEGA WIN! crystal ball" / "star BIG WIN! star"
- Flash effect: purple radial gradient instead of gold
- Border glow: purple box-shadow instead of gold

**Files modified:** 4 files
- `src/components/slots/WinLines.tsx`
- `src/components/slots/WinCelebration.tsx`
- `src/components/slots/WinDisplay.tsx`
- `src/components/slots/SlotGame.tsx`

