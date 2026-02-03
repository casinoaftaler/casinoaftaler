
# Tease Mode: Sekventiel Hjul-Bremsning

## Oversigt
Opdater tease-mode adfærden så kun det næste hjul i rækken bremser ned og stopper ad gangen, mens de resterende hjul fortsætter med at spinne i fuld hastighed ("fake loop") indtil det er deres tur.

## Nuværende vs. Ny Adfærd

| Nuværende | Ny |
|-----------|-----|
| Alle tease-hjul bremser langsomt ned sammen | Kun det næste hjul bremser ned |
| Staggered stop baseret på delay | Hvert hjul venter på at det forrige stopper før det begynder at bremse |
| Alle tease-hjul har længere varighed | Kun det aktive hjul har lang varighed, resten looper |

## Implementeringsplan

### 1. Tilføj ny prop til SlotReel: `activeTeaseReel`
- SlotGame skal tracke hvilket tease-hjul der aktuelt er ved at stoppe
- Ny state: `activeTeaseReelIndex` der opdateres når hvert hjul stopper

### 2. Opdater SlotReel Animation Logic
- Tre tilstande for tease-hjul:
  1. **Venter på tur**: Spinner i fake loop (uendeligt loop af tilfældige symboler)
  2. **Aktivt tease**: Bremser langsomt ned over 3 sekunder
  3. **Stoppet**: Viser endelige symboler

### 3. Fake Loop Implementation
- Når et hjul er i tease-mode men ikke er det aktive tease-hjul:
  - Fortsæt med at animere symbolerne i et loop
  - Generer nye tilfældige symboler løbende for at opretholde illusionen
  - Ingen deceleration - konstant høj hastighed

### 4. Sekventiel Stop Mekanisme
- Når et tease-hjul stopper, trigger `onReelStop` callback
- SlotGame bruger dette til at aktivere det næste tease-hjul i rækken
- Det næste hjul begynder så sin 3-sekunders nedbremsning

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotGame.tsx`

**Ny state:**
```typescript
const [activeTeaseReelIndex, setActiveTeaseReelIndex] = useState<number | null>(null);
```

**Opdateret onReelStop callback:**
- Når et ikke-tease hjul stopper: normal adfærd
- Når et tease-hjul stopper: sæt næste tease-hjul som aktivt

**Ny prop til SlotReel:**
```typescript
isActiveTeaseReel={teaseReels.includes(colIndex) && activeTeaseReelIndex === colIndex}
```

### Fil: `src/components/slots/SlotReel.tsx`

**Nye props:**
```typescript
interface SlotReelProps {
  // ... eksisterende props
  isActiveTeaseReel?: boolean;  // Om dette hjul skal bremse ned nu
}
```

**Opdateret animation logik:**

**Fase 1: Fake Loop Mode**
- Når `teaseMode=true` og `isActiveTeaseReel=false`
- Kontinuerlig animation uden slutpunkt
- Bruger CSS animation eller requestAnimationFrame loop
- Konstant offset-cycling gennem symbol-strippen

**Fase 2: Active Tease Mode**
- Når `teaseMode=true` og `isActiveTeaseReel=true`
- Start 3-sekunders nedbremsning med langsom easing
- Brug `baseSpinDuration = 3000` for ekstra dramatik
- Kraftigere deceleration easing: `1 - Math.pow(1 - progress, 5)`

**Fase 3: Stopped**
- Normal stop-animation med bounce
- Trigger `onReelStop` callback

**Loop Animation Implementation:**
```typescript
// I spinning useEffect - når i fake loop mode:
if (teaseMode && !isActiveTeaseReel) {
  // Loop kontinuerligt - reset offset når vi når bunden
  const loopAnimate = (currentTime: number) => {
    // Beregn offset der looper tilbage til start
    const elapsed = (currentTime - startTime) % loopDuration;
    const loopProgress = elapsed / loopDuration;
    const loopOffset = startOffset * (1 - loopProgress);
    setOffset(loopOffset);
    animationRef.current = requestAnimationFrame(loopAnimate);
  };
}
```

### Fil: `src/components/slots/SlotGame.tsx` - Opdateret spin flow

**I handleSpin:**
1. Beregn teaseReels som normalt
2. Første tease-hjul sættes som aktivt når det forrige ikke-tease hjul stopper
3. Opdater activeTeaseReelIndex i onReelStop callback

**Ny callback handler:**
```typescript
const handleReelStop = useCallback((reelIndex: number) => {
  slotSounds.playReelStopSingle(reelIndex);
  
  // Hvis det var et tease-hjul der stoppede
  if (teaseReels.includes(reelIndex)) {
    // Find næste tease-hjul
    const currentTeaseIndex = teaseReels.indexOf(reelIndex);
    if (currentTeaseIndex < teaseReels.length - 1) {
      setActiveTeaseReelIndex(teaseReels[currentTeaseIndex + 1]);
    }
  } else {
    // Tjek om det næste hjul er et tease-hjul
    const nextReel = reelIndex + 1;
    if (teaseReels.includes(nextReel)) {
      setActiveTeaseReelIndex(nextReel);
    }
  }
}, [teaseReels]);
```

---

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotReel.tsx` | Tilføj `isActiveTeaseReel` prop, implementer fake loop animation, opdater tease logic |
| `src/components/slots/SlotGame.tsx` | Tilføj `activeTeaseReelIndex` state, opdater `onReelStop` callback til sekventiel aktivering |

## Test Scenarier
- Spin med 2+ scatters på de første 3 hjul
- Verificer at hjul 1-2 (eller 1-3) stopper normalt
- Verificer at tease-hjul 3-5 fortsætter med at spinne i fuld hastighed
- Verificer at hvert tease-hjul bremser ned individuelt efter det forrige stopper
- Verificer 3-sekunders nedbremsning per tease-hjul
