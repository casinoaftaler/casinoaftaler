
# Unified Slot Machine Scaling - Casino-Style Layout

## Oversigt
Erstat det nuvaerende dobbelte system (responsive Tailwind-klasser + viewport-skalering) med et enkelt, uniformt skaleringsystem. Alle slot-komponenter designes ved en fast base-oplosning og skaleres som en samlet enhed — praecis som en rigtig online casino-spillemaskine.

---

## Problemet i dag

Spillemaskinen bruger to uafhaengige systemer samtidigt:

1. **Responsive Tailwind-klasser** — Symboler skifter stoerrelse ved 6 breakpoints (61px, 71px, 92px, 109px, 133px, 150px). Kontrolpanelet har separate mobile/desktop layouts.
2. **Viewport-skalering** — En CSS `scale()` transform paa hele containeren der yderligere krymper alt.

Disse to systemer arbejder imod hinanden og skaber uforudsigelig skalering, spring ved breakpoint-overgange, og forskellige layouts paa mobil vs desktop.

---

## Loesningen

### Princip: "Design ved fast oplosning, skalér uniformt"

- Design hele spillemaskinen ved en fast base-stoerrelse (symboler = 150px, gaps = 16px)
- Fjern ALLE responsive Tailwind-klasser fra slot-komponenter (ingen sm:, md:, lg: osv.)
- Beregn en enkelt skalerings-faktor: `scale = min(viewportWidth / baseWidth, viewportHeight / baseHeight)`
- Anvend denne scale paa root-containeren via CSS transform
- Centrer horisontalt og vertikalt
- Letterbox hvis noedvendigt (ingen beskæring)

---

## AEndringer

### 1. Ny `useSlotScale` hook (erstatter `useViewportScaling` + `useResponsiveSlotDimensions`)

En simpel hook der:
- Definerer base-oplosning: 1280x720 (reels + controls + bonusbars)
- Lytter paa viewport-stoerrelse (debounced)
- Returnerer `scale = min(availableWidth / 1280, availableHeight / 720)`, clampet til max 1.0
- Tager hoejde for header-hoejde (64px)

### 2. SlotSymbol — fjern responsive klasser

- Erstat `w-[61px] h-[61px] xs:w-[71px] ... xl:w-[150px] xl:h-[150px]` med faste `w-[150px] h-[150px]`
- Erstat responsive billede-stoerrelser med fast `w-[136px] h-[136px]`
- Fjern responsive tekst-stoerrelser

### 3. SlotReel — fjern `useResponsiveSlotDimensions`

- Brug faste vaerdier: `symbolHeight = 150`, `gap = 16`
- Fjern importen af `useResponsiveSlotDimensions`

### 4. SlotGame — fjern `getSymbolDimensions()` og responsive padding

- Brug faste vaerdier for `symbolDimensions` (size: 150, gap: 16)
- Fjern responsive padding-klasser (p-1 xs:p-2 sm:p-4 etc.)
- Brug fast padding

### 5. SlotControlPanel — ét samlet layout

- Fjern den separate mobile-sektion (`flex sm:hidden`)
- Fjern den separate desktop-sektion (`hidden sm:flex`)
- Behold kun ét layout (det nuvaerende desktop-layout) med faste stoerrelser
- Spin-knappen faar fast stoerrelse (f.eks. 112px / w-28 h-28)
- Alle knapper og tekst faar faste stoerrelser

### 6. BetControls, SmallWinBar, AutospinRow, VolumeControl, PayTable — fjern responsive klasser

- Erstat sm:/md:/lg: klasser med faste stoerrelser
- Alle elementer designes til at se godt ud ved base-oplosningen

### 7. BonusStatusBar, BonusSymbolBar — fjern responsive klasser

- Faste stoerrelser paa ikoner, tekst og padding

### 8. SlotMachineFrame — fjern responsive klasser paa fallback-corners

### 9. WinLines — allerede korrekt (bruger beregnede pixel-vaerdier)

### 10. Page-filer (SlotMachine.tsx, RiseOfFedesvin.tsx) — brug ny hook

- Erstat `useViewportScaling` med `useSlotScale`
- Anvend scale paa root slot-container
- Bevar mobil-sidepaneler (leaderboard/promo) UDENFOR den skalerede container
- Centrer vertikalt og horisontalt med flexbox

### 11. Slet `useResponsiveSlotDimensions.ts` og `useViewportScaling.ts`

- Begge erstattes af den nye `useSlotScale` hook

---

## Teknisk sektion

### Ny hook: `src/hooks/useSlotScale.ts`
```typescript
// Base resolution the slot is designed at
const BASE_WIDTH = 1280;
const BASE_HEIGHT = 720;
const HEADER_HEIGHT = 64;

export function useSlotScale() {
  // Listen to viewport size (debounced)
  // availableWidth = window.innerWidth
  // availableHeight = window.innerHeight - HEADER_HEIGHT
  // scale = Math.min(availableWidth / BASE_WIDTH, availableHeight / BASE_HEIGHT, 1.0)
  // return { scale, shouldScale: scale < 1 }
}
```

### SlotSymbol faste stoerrelser
```
// Container: w-[150px] h-[150px]
// Image: w-[136px] h-[136px]
// Ingen breakpoint-klasser
```

### SlotReel faste vaerdier
```
// symbolHeight = 150, gap = 16
// viewportHeight = 3 * 150 + 2 * 16 = 482px
// viewportWidth = 150px (en enkelt reel)
```

### SlotControlPanel — ét layout
```
// Fjern: <div className="flex sm:hidden ..."> (hele mobile-sektionen)
// Fjern: <div className="hidden sm:flex ..."> (hidden-klassen)
// Behold desktop-layoutet med faste stoerrelser
```

### Skalerings-container (page-niveau)
```
<div className="flex-1 flex items-center justify-center overflow-hidden">
  <div style={{
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    width: `${BASE_WIDTH}px`,  // Fast bredde
  }}>
    <SlotGame />
  </div>
</div>
```

### Filer der aendres
- Opret: `src/hooks/useSlotScale.ts`
- Slet: `src/hooks/useViewportScaling.ts`
- Slet: `src/hooks/useResponsiveSlotDimensions.ts`
- AEndr: `src/components/slots/SlotSymbol.tsx` (fjern responsive klasser)
- AEndr: `src/components/slots/SlotReel.tsx` (faste dimensioner)
- AEndr: `src/components/slots/SlotGame.tsx` (fjern responsive padding + getSymbolDimensions)
- AEndr: `src/components/slots/SlotControlPanel.tsx` (ét layout)
- AEndr: `src/components/slots/BetControls.tsx` (faste stoerrelser)
- AEndr: `src/components/slots/SmallWinBar.tsx` (faste stoerrelser)
- AEndr: `src/components/slots/AutospinRow.tsx` (faste stoerrelser)
- AEndr: `src/components/slots/BonusStatusBar.tsx` (faste stoerrelser)
- AEndr: `src/components/slots/BonusSymbolBar.tsx` (faste stoerrelser)
- AEndr: `src/components/slots/SlotMachineFrame.tsx` (fjern responsive corners)
- AEndr: `src/components/slots/SpinsRemaining.tsx` (faste stoerrelser)
- AEndr: `src/pages/SlotMachine.tsx` (brug useSlotScale)
- AEndr: `src/pages/RiseOfFedesvin.tsx` (brug useSlotScale)
- AEndr: `src/index.css` (opdater .slot-viewport-container)

### Hvad der IKKE roeres
- Spillogik, server-spin, bonus-mekanik — alt game logic forbliver uaendret
- Lyd-system forbliver uaendret
- Side-paneler (leaderboard, promo) forbliver udenfor skaleret container
- WinCelebration, BonusOverlay — forbliver uaendrede (de er allerede overlay-baserede)
- WinLines — allerede pixel-baseret, opdateres blot til faste vaerdier
