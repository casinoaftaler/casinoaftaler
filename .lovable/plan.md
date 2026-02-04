
# Plan: Forbedret Bonus Trigger Animation & UI Justeringer

## Oversigt

Denne plan implementerer fire hovedændringer:
1. **Tema-konsistens**: Bonus trigger overlay får samme guld/amber tema som BonusStatusBar og kontrol-panelet
2. **Layout-swap**: Bytter positionerne af autospin-kontroller og gevinsttabel-knappen
3. **Auto-spin under bonus**: Bonus spins kører automatisk uden at brugeren skal klikke på spin
4. **Symbol-roulette animation**: Når bonus udløses, vises en spændende animation hvor tilfældige symboler skifter hurtigt før det valgte expanding symbol "lander"

---

## Tekniske Detaljer

### 1. Tema-opdatering af BonusOverlay

**Fil: `src/components/slots/BonusOverlay.tsx`**

Ændrer baggrundsfarver og styling fra `bg-card/90` til det egyptiske guld-tema:
- `bg-gradient-to-b from-amber-950/95 via-amber-900/90 to-amber-950/95` 
- `border-2 border-amber-600/50`
- `shadow-[0_0_40px_rgba(251,191,36,0.4),0_8px_32px_rgba(0,0,0,0.6)]`

---

### 2. Layout-swap i SlotControlPanel

**Fil: `src/components/slots/SlotControlPanel.tsx`**

Bytter om på elementerne i højre panel og autospin-rækken:

**Nuværende layout:**
```text
[Indsats] [SPIN] [Volume | Gevinsttabel]
         [Autospin-kontroller]
```

**Nyt layout:**
```text
[Indsats] [SPIN] [Volume | Autospin]
         [Gevinsttabel-knap]
```

Konkrete ændringer:
- Flytter `AutospinRow` ind i højre panel (ved siden af VolumeControl)
- Flytter `PayTable` til en dedikeret række under kontrolpanelet
- Omdøber rækkefølgen for bedre flow

---

### 3. Auto-spin under Bonus

**Fil: `src/components/slots/SlotGame.tsx`**

Tilføjer automatisk spin-logik når bonus er aktiveret:
- Når `showBonusTrigger` lukkes, starter automatisk spin efter en kort forsinkelse
- Når et bonus-spin afsluttes og der er flere free spins tilbage, startes næste spin automatisk
- Brugeren behøver aldrig at klikke på spin-knappen under bonus

Ny useEffect hook:
```tsx
// Auto-spin during bonus mode
useEffect(() => {
  if (!bonusState.isActive || bonusState.freeSpinsRemaining === 0) return;
  if (isSpinning || isWinAnimating) return;
  if (showBonusTrigger || showBonusComplete || showRetrigger) return;
  
  const timer = setTimeout(() => {
    handleSpin();
  }, 1000);
  
  return () => clearTimeout(timer);
}, [bonusState.isActive, bonusState.freeSpinsRemaining, isSpinning, isWinAnimating, showBonusTrigger, showBonusComplete, showRetrigger]);
```

---

### 4. Symbol-roulette Animation ved Bonus Trigger

**Ny fil: `src/components/slots/BonusSymbolPicker.tsx`**

En ny komponent der viser en spændende "roulette" animation:
- Viser et stort symbol-felt i midten
- Symboler skifter hurtigt (100-150ms) i starten
- Hastigheden aftager gradvist ("ease-out" effekt)
- Efter 3-4 sekunder "lander" det valgte expanding symbol
- Først når symbolet har landet kan brugeren fortsætte

**Props:**
```tsx
interface BonusSymbolPickerProps {
  isVisible: boolean;
  symbols: SlotSymbol[];
  selectedSymbol: SlotSymbol | null;
  onComplete: () => void;
}
```

**Animationsflow:**
1. Fase 1 (0-1.5s): Hurtig skift mellem symboler (100ms interval)
2. Fase 2 (1.5-3s): Langsom nedbremsning (interval øges til 500ms)
3. Fase 3 (3s+): Det valgte symbol lander med en "zoom-bounce" animation
4. "Fortsæt" knap vises først efter symbolet har landed

**Opdateret BonusOverlay:**
- Integrerer BonusSymbolPicker i "trigger" tilstanden
- Fjerner det statiske symbol-display
- Tilføjer `onSymbolPicked` callback der tillader fortsættelse

---

## Ændringsoversigt

| Fil | Ændring |
|-----|---------|
| `src/components/slots/BonusOverlay.tsx` | Nyt guld-tema + symbol-picker integration |
| `src/components/slots/BonusSymbolPicker.tsx` | **Ny fil** - Symbol roulette animation |
| `src/components/slots/SlotControlPanel.tsx` | Swap autospin og gevinsttabel |
| `src/components/slots/SlotGame.tsx` | Auto-spin logik under bonus |
| `src/index.css` | Eventuelt nye keyframe animationer |

---

## Resultat

- Bonus trigger overlay matcher nu det gyldne egyptiske tema
- Gevinsttabel-knappen er mere fremtrædende i sin egen række
- Autospin-kontrollerne er integreret i kontrolpanelet
- Bonus-runder kører automatisk uden brugerinput
- En spændende symbol-roulette animation øger spændingen ved bonus-trigger
