

# Plan: Fjern Bounce-effekt og Ret Tease-timing

## Oversigt
Tre ændringer til spillemaskinens hjul-animationer:
1. Fjern bounce-effekten når hjul stopper
2. Sørg for at tease-glow først vises EFTER scatter er landet på hjulet
3. Udvid tease-logikken så den også aktiveres hvis 2. scatter lander på hjul 4, med længere fake loop for hjul 5

---

## Ændring 1: Fjern Bounce-effekt

### Fil: `tailwind.config.ts`

Ændr `slot-land` keyframes fra bounce til en simpel landing:

```typescript
// Fra:
'slot-land': {
  '0%': { transform: 'translateY(-8px)', opacity: '0.8' },
  '60%': { transform: 'translateY(3px)' },
  '80%': { transform: 'translateY(-1px)' },
  '100%': { transform: 'translateY(0)', opacity: '1' }
}

// Til:
'slot-land': {
  '0%': { transform: 'translateY(-4px)', opacity: '0.9' },
  '100%': { transform: 'translateY(0)', opacity: '1' }
}
```

---

## Ændring 2: Ret Tease-glow Timing

Problemet: Tease-hjul viser glow-effekt under fake loop FØR scatter-symbolet er landet.

### Fil: `src/components/slots/SlotReel.tsx`

Tilføj en ny prop og logik for at kontrollere hvornår tease-glow vises:

| Ændring | Detaljer |
|---------|----------|
| Ny prop | `scatterLandedOnPreviousReel?: boolean` |
| Logik | Kun vis glow når scatter faktisk er landet på forrige hjul |
| Fake loop | Kører stadig, men UDEN synlig glow indtil forrige hjul stopper |

Opdater glow-betingelsen (linje 357-362):
```tsx
// Fra:
isFakeLooping && !isActiveTeaseReel && spinState === "spinning" && 
"shadow-[0_0_15px...]"

// Til - kun vis glow hvis scatter er landet:
isFakeLooping && !isActiveTeaseReel && spinState === "spinning" && scatterLandedOnPreviousReel &&
"shadow-[0_0_15px...]"
```

### Fil: `src/components/slots/SlotGame.tsx`

Track hvilke hjul har scatter-symboler og om de er landet:
- Tilføj state: `scatterReelsLanded` til at tracke om scatter-hjul er stoppet
- Send `scatterLandedOnPreviousReel` prop til SlotReel baseret på om forrige scatter-hjul er landet

---

## Ændring 3: Udvid Tease-logik for Hjul 4

### Fil: `src/lib/slotGameLogic.ts`

Opdater `getScatterTeaseReels()` funktionen:

```typescript
// Nuværende logik (linje 75-81):
for (let i = 0; i < 5; i++) {
  if (scattersPerReel[i] > 0) {
    scatterCount += scattersPerReel[i];
  }
  // PROBLEM: Tjekker kun i < 3
  if (scatterCount >= 2 && teaseStartReel === -1 && i < 3) {
    teaseStartReel = i + 1;
  }
}

// Ny logik:
for (let i = 0; i < 5; i++) {
  if (scattersPerReel[i] > 0) {
    scatterCount += scattersPerReel[i];
  }
  // Udvid til også at inkludere hjul 4 (i < 4)
  if (scatterCount >= 2 && teaseStartReel === -1 && i < 4) {
    teaseStartReel = i + 1;
  }
}
```

Tilføj også info om hvornår tease starter på sidste hjul for at forlænge fake loop:

```typescript
export function getScatterTeaseReels(grid: string[][], symbols: SlotSymbol[]): {
  reels: number[];
  lateScatter: boolean; // true hvis 2. scatter er på hjul 4
}
```

### Fil: `src/components/slots/SlotReel.tsx`

Tilføj ny prop for forlænget fake loop:

```tsx
interface SlotReelProps {
  // ... eksisterende props
  extendedFakeLoop?: boolean; // Tilføj 2 sekunder til fake loop
}

// I fake loop animation (linje 129):
const loopDuration = extendedFakeLoop ? 2600 : 600; // Forlænget tid
```

### Fil: `src/components/slots/SlotGame.tsx`

Opdater til at bruge den nye return-type fra `getScatterTeaseReels`:

```tsx
const teaseInfo = getScatterTeaseReels(originalGrid, symbols);
setTeaseReels(teaseInfo.reels);
// Gem lateScatter info til brug i SlotReel
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `tailwind.config.ts` | Fjern bounce fra slot-land animation |
| `src/lib/slotGameLogic.ts` | Udvid getScatterTeaseReels til også at inkludere hjul 4 og returnere lateScatter info |
| `src/components/slots/SlotReel.tsx` | Tilføj props for scatter-landed og extended fake loop, ret glow-timing |
| `src/components/slots/SlotGame.tsx` | Track scatter-landings og send nye props til SlotReel |

---

## Tekniske Detaljer

### Tease-flow efter ændringerne:

```text
Scenario A: Scatters på hjul 1 og 2
┌───────────────────────────────────────────────────────┐
│ Hjul 1     Hjul 2     Hjul 3     Hjul 4     Hjul 5    │
│ [SCATTER]  [SCATTER]                                  │
│    ↓ stop     ↓ stop     ↓ fake    ↓ fake    ↓ fake  │
│                           loop      loop      loop    │
│              (scatter    (glow)    (glow)    (glow)   │ ← Glow starter
│               lander)      ↓         ↓         ↓      │   EFTER hjul 2 stop
│                          tease     tease     tease    │
└───────────────────────────────────────────────────────┘

Scenario B: Scatters på hjul 1 og 4
┌───────────────────────────────────────────────────────┐
│ Hjul 1     Hjul 2     Hjul 3     Hjul 4     Hjul 5    │
│ [SCATTER]                        [SCATTER]            │
│    ↓ stop    ↓ stop    ↓ stop      ↓ stop    ↓ fake  │
│                                  (scatter    loop     │
│                                   lander)   +2sek    │ ← Forlænget loop
│                                              (glow)   │ ← Glow starter
│                                              tease    │   EFTER hjul 4 stop
└───────────────────────────────────────────────────────┘
```

### Fake Loop Timing:
- Standard: 600ms per loop-cyklus
- Forlænget (hjul 5 når scatter på hjul 4): 2600ms (+2000ms)

