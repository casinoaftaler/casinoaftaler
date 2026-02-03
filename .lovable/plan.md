
# Fix Tease-Mode Gevinst-Timing og Badge-Placering

## Oversigt
Rettelse af to problemer med gevinstvisning:
1. Gevinster vises før tease-spin er færdig
2. Point-badges vises ved det sidste matchende symbol i stedet for i enden af linjen

## Problem 1: Gevinst vises for tidligt under tease

**Nuværende adfærd:**
- SpinGame bruger en fast timeout (4000ms) til at vente på spin-animation
- Men tease-hjul har 3000ms nedbremsning HVER, og de er sekventielle
- Med 3 tease-hjul (hjul 3, 4, 5) kan den samlede tid være op til 9+ sekunder
- Resultatet sættes og gevinster vises før alle hjul er stoppet

**Løsning:**
- Tilføj en `allReelsStopped` callback-mekanisme i SlotGame
- Track hvilke hjul der er stoppet via en ref
- Først når alle 5 hjul har kaldt `onReelStop`, vises gevinsten
- Fjern den faste spinDuration timeout og brug i stedet callback-baseret flow

## Problem 2: Point-badge placering

**Nuværende adfærd (WinLines.tsx linje 191-193):**
```typescript
const lastCol = win.count - 1;  // Placeres ved sidste matchende symbol
const center = getSymbolCenter(lastCol, pattern[lastCol]);
```

**Ønsket adfærd:**
- Point-badge skal altid være i slutningen af linjen (position 4, dvs. 5. hjul)
- Uanset om gevinsten er 3, 4 eller 5 matchende symboler

**Løsning:**
```typescript
const lastCol = 4;  // Altid position 4 (5. hjul / ende af linjen)
const center = getSymbolCenter(lastCol, pattern[lastCol]);
```

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotGame.tsx`

**Tilføj state til at tracke stoppede hjul:**
```typescript
const stoppedReelsRef = useRef<Set<number>>(new Set());
const [allReelsStopped, setAllReelsStopped] = useState(false);
```

**Opdater handleSpin flow:**
1. Reset `stoppedReelsRef` og `allReelsStopped` ved spin start
2. Fjern den faste `spinDuration` timeout der venter på animation
3. Brug en `useEffect` der lytter på `allReelsStopped` for at fortsætte flowet

**Opdater onReelStop callback:**
```typescript
onReelStop={(reelIndex) => {
  slotSounds.playReelStopSingle(reelIndex);
  
  // Track stopped reel
  stoppedReelsRef.current.add(reelIndex);
  
  // Check if all 5 reels have stopped
  if (stoppedReelsRef.current.size === 5) {
    setAllReelsStopped(true);
  }
  
  // Handle tease activation (eksisterende logik)
  ...
}}
```

**Nyt useEffect for gevinst-visning:**
```typescript
useEffect(() => {
  if (allReelsStopped && pendingResultRef.current) {
    // Nu er alle hjul stoppet - vis resultatet
    setLastResult(pendingResultRef.current);
    setShowWinLines(true);
    // ... resten af gevinst-håndtering
  }
}, [allReelsStopped]);
```

### Fil: `src/components/slots/WinLines.tsx`

**Opdater badge-placering (linje 191-193):**

Nuværende:
```typescript
const lastCol = win.count - 1;
const center = getSymbolCenter(lastCol, pattern[lastCol]);
```

Ny:
```typescript
const lastCol = 4;  // Altid i enden af linjen (5. hjul)
const center = getSymbolCenter(lastCol, pattern[lastCol]);
```

---

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Tilføj reel-stop tracking, fjern fast spinDuration, brug callback-baseret flow for gevinst-visning |
| `src/components/slots/WinLines.tsx` | Flyt point-badge til slutningen af linjen (position 4) |

## Test Scenarier
1. Spin med tease-mode (2+ scatters) - verificer at gevinst først vises når ALLE hjul er stoppet
2. Spin med 3-symbol gevinst - verificer at badge vises ved 5. hjul, ikke ved 3. hjul
3. Spin med 4-symbol gevinst - verificer at badge vises ved 5. hjul, ikke ved 4. hjul
4. Spin med 5-symbol gevinst - verificer at badge vises ved 5. hjul (uændret)
5. Normal spin uden tease - verificer at timing stadig fungerer korrekt
