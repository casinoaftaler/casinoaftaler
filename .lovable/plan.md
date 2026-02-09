

## Theme All Remaining Amber Colors for Rise of Fedesvin + Enhanced VFX

### Problem
Multiple components still use hardcoded amber/gold colors that don't switch to the wizard purple theme for Rise of Fedesvin:
- **SlotReel.tsx** - amber background during spin, amber glow during fake loop and tease
- **SlotSymbol.tsx** - amber borders, shadows, and glow effects for winning, expanded, teasing, and scatter-celebrating states
- **WinDisplay.tsx** - amber gradient background and text (no gameId prop at all)
- **SpinsRemaining.tsx** - amber gradient background and text (no gameId prop)
- **SlotGame.tsx** - amber reel divider color between columns

Additionally, the particle/VFX system in WinCelebration could use more wizard-themed variety.

### Files to Change (6 files)

---

**1. `src/components/slots/SlotSymbol.tsx`**
- Add `gameId` prop to the interface
- Replace all hardcoded amber references with conditional wizard/egyptian colors:
  - `isWinning`: border from `border-amber-400` to `border-purple-400`, shadow from gold rgba to purple rgba, bg from `bg-amber-900/30` to `bg-purple-900/30`
  - `isExpanded`: border from `border-amber-400/50` to `border-purple-400/50`
  - `isTeasing`: border from `border-amber-400` to `border-purple-400`
  - `isScatterCelebrating`: border and boxShadow from gold to purple
  - Winning glow overlay: `bg-amber-400/20` to `bg-purple-400/20`
  - Expanded glow overlay: same
  - Expansion burst shine: `amber-500/0 via amber-400/50` to `purple-500/0 via purple-400/50`
  - Expand ring: `border-amber-300` to `border-purple-300`

**2. `src/components/slots/SlotReel.tsx`**
- Add `gameId` prop to the interface
- Replace:
  - Spinning background: `bg-amber-950/50` to conditional `bg-purple-950/50`
  - Fake loop scatter glow: gold rgba shadows to purple rgba
  - Active tease glow: gold rgba shadows to purple rgba

**3. `src/components/slots/WinDisplay.tsx`**
- Add `gameId` prop
- Use `getSlotTheme()` or conditional classes:
  - Background gradient: `from-amber-500/30 to-amber-600/30` to `from-purple-500/30 to-purple-600/30`
  - Border: `border-amber-500/50` to `border-purple-500/50`
  - Icon/text color: `text-amber-500` to `text-purple-500`

**4. `src/components/slots/SpinsRemaining.tsx`**
- Add `gameId` prop
- Replace:
  - Background gradient: `from-amber-500/20 to-amber-600/20` to `from-purple-500/20 to-purple-600/20`
  - Border: `border-amber-500/30` to `border-purple-500/30`
  - Icon/text: `text-amber-500` to `text-purple-500`

**5. `src/components/slots/SlotGame.tsx`**
- Pass `gameId` to `SlotReel`, `SlotSymbol` (via SlotReel), `WinDisplay`, and `SpinsRemaining`
- Reel divider: change `bg-amber-950/70` to conditional `bg-purple-950/70`

**6. `src/components/slots/WinCelebration.tsx`**
- Add new particle types for wizard theme: `"orb"` and `"rune"` alongside existing coin/sparkle/star
- Wizard orbs: glowing purple spheres with inner light animation
- Wizard runes: magical rune characters (e.g. runic unicode chars like `᛭`, `ᚹ`, `ᛟ`) with purple glow
- Increase particle count for wizard theme (30% more particles)
- Add a secondary wave of rising particles from the bottom (magical energy rising effect) for big wins

### Prop Passing Chain
SlotGame passes `gameId` to:
- SlotReel (new prop) which passes it to SlotSymbol (new prop)
- WinDisplay (new prop)
- SpinsRemaining (new prop)
- WinCelebration (already done)
- WinLines (already done)
