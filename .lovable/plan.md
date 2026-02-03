
# Plan: Løs "Flash" af Spin-Resultat i Auto-Spin

## Problemet

Når auto-spin er aktivt, vises det endelige spin-resultat kortvarigt (et split-sekund) før animationen starter. Dette sker fordi:

1. `setGrid(originalGrid)` kaldes **før** `setIsSpinning(true)`
2. React opdaterer state asynkront - så der er et øjeblik hvor den nye grid er sat, men `isSpinning` stadig er `false`
3. `SlotReel` i "idle" tilstand renderer `displayedSymbolIds` direkte (det endelige resultat)
4. Brugeren ser derfor resultatet før hjulene begynder at spinne

```text
Timing problem:
setGrid(newOutcome)  →  [FLASH: outcome visible]  →  setIsSpinning(true)  →  Animation starts
```

---

## Løsningen

Adskil "visuel grid" fra "spin-outcome grid" så SlotReel altid viser den forrige tilstand under idle, mens den nye outcome kun bruges til at bygge reel-strip under animation.

### Tilgang: Batch State Updates + Delayed Grid Display

**Ændringer i `src/components/slots/SlotGame.tsx`:**

1. **Tilføj en `pendingGrid` ref** der holder den næste outcome grid
2. **Behold den gamle grid synlig** indtil spinning faktisk starter
3. **Brug `flushSync`** eller batch state updates korrekt så `isSpinning` og `grid` opdateres atomisk

```tsx
// Ny ref til at holde pending grid
const pendingGridRef = useRef<string[][] | null>(null);

// I handleSpin():
// GEM outcome i ref FØRST (vises ikke endnu)
pendingGridRef.current = originalGrid;

// Start spinning FØRST - grid opdateres først når SlotReel læser den
setIsSpinning(true);

// DEREFTER opdater grid (vil blive læst af SlotReel efter spinning er sat)
// Men vent til næste tick så React kan batch disse
requestAnimationFrame(() => {
  setGrid(originalGrid);
});
```

**Alternativ (renere):** Brug React 18's automatic batching:

```tsx
// Wrap i startTransition eller brug flushSync for at sikre atomisk opdatering
import { flushSync } from 'react-dom';

// I handleSpin:
flushSync(() => {
  setIsSpinning(true);
});
// Nu er isSpinning garanteret true før vi sætter grid
setGrid(originalGrid);
```

---

## Implementation

### Fil: `src/components/slots/SlotGame.tsx`

**Ændring 1: Tilføj import**
```tsx
import { flushSync } from 'react-dom';
```

**Ændring 2: Opdater handleSpin rækkefølge**

I `handleSpin()` funktionen, ændr fra:
```tsx
// NUVÆRENDE (problematisk):
setGrid(originalGrid);           // ← Grid sat først
// ... andre state updates
setIsSpinning(true);             // ← Spinning sat bagefter
```

Til:
```tsx
// NY (korrekt):
// Sæt isSpinning FØRST så SlotReel ved den skal spinne
flushSync(() => {
  setIsSpinning(true);
});

// NU kan vi sikkert opdatere grid - SlotReel vil ikke vise den i idle
setGrid(originalGrid);
```

**Ændring 3: Alternativ - Brug displayedGrid state**

En mere robust løsning er at have to separate grids:
```tsx
const [displayedGrid, setDisplayedGrid] = useState<string[][] | null>(null); // Hvad der VISES i idle
const [targetGrid, setTargetGrid] = useState<string[][] | null>(null); // Hvad hjulene lander på

// I SlotReel: Brug displayedGrid når idle, targetGrid til reel strip
```

---

## Valgt Løsning: flushSync Approach

Den simpleste og mest direkte løsning er at bruge `flushSync` til at sikre `isSpinning` er sat før grid opdateres:

| Linje | Nuværende | Ny |
|-------|-----------|-----|
| ~202-220 | `setGrid()` før `setIsSpinning()` | `flushSync(() => setIsSpinning(true))` før `setGrid()` |

---

## Teknisk Forklaring

**Hvorfor flushSync virker:**
- `flushSync` tvinger React til at flushe state updates synkront
- Når vi wrapper `setIsSpinning(true)` i `flushSync`, er DOM opdateret med `isSpinning=true` før næste linje kører
- Når `setGrid()` så kører, vil SlotReel allerede være i "spinning" mode og ikke vise idle-tilstand

**Performance:**
- `flushSync` kan påvirke performance ved at forhindre batching
- I dette tilfælde er det kun ét state-kald, så impact er minimal
- Alternativer som `requestAnimationFrame` eller `useLayoutEffect` er mere komplekse

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Import `flushSync`, omrokér state updates i `handleSpin()` |

---

## Test

Efter implementering:
1. Aktiver auto-spin
2. Observer at der ikke længere er et "flash" af resultatet før spin-animation starter
3. Verificer at normal spin stadig fungerer korrekt
4. Verificer at bonus-spins stadig fungerer korrekt
