

# Plan: Scatter Land Lyd og Bonus End Timing Fix

## Problem 1: Scatter Land Lyd
Når et scatter-symbol lander under tease mode, skal der afspilles en progressiv lydeffekt der bygger op spændingen.

## Problem 2: Bonus End Screen Overlapper med Win
Når bonus slutter, vises bonus completion screen samtidig med win-animationen. Vi skal vente på at win-visningen er færdig før bonus end screen popper op.

---

## Løsning

### 1. Tilføj Scatter Land Lyd i `slotSoundEffects.ts`

Opret en ny `playScatterLand(scatterCount: number)` metode der afspiller en progressiv lyd baseret på hvor mange scatters der er landet (1, 2, eller 3+):

```typescript
playScatterLand(scatterNumber: number) {
  // scatterNumber: 1 = første scatter, 2 = anden scatter, 3 = tredje scatter
  // Progressiv lyd: starter lavt og bygger op til en kraftigere lyd for hver scatter
  
  // 1. scatter: Kort mystisk "ding" med gylden klang
  // 2. scatter: Længere, mere intens lyd med stigende pitch
  // 3. scatter: Kraftig triumferende lyd (bonus trigger-lignende)
}
```

**Lyddesign:**
- **1. Scatter**: Mystisk klang (ca. 0.3s), lavt volumen, gylden tone
- **2. Scatter**: Mere intens, stigende sweep, længere varighed (ca. 0.5s)
- **3. Scatter**: Kraftig, næsten som en mini bonus-trigger, med sparkles

### 2. Kald Lydeffekten fra SlotGame.tsx

Opdater `onReelStop` callback til at detektere når en scatter lander:

```typescript
onReelStop={async (reelIndex) => {
  slotSounds.playReelStopSingle(reelIndex);
  
  // Check if this reel has a scatter symbol
  const hasScatterOnReel = grid?.[reelIndex]?.some(symbolId => {
    const symbol = symbols.find(s => s.id === symbolId);
    return symbol?.is_scatter;
  });
  
  // Play scatter land sound if this reel has a scatter
  if (hasScatterOnReel) {
    // Count how many scatters have landed so far
    const scattersLandedSoFar = countScattersLandedUpToReel(reelIndex);
    slotSounds.playScatterLand(scattersLandedSoFar);
  }
  
  // ... rest of existing code
}
```

### 3. Fix Bonus End Timing i SlotGame.tsx

Ændr `handleBonusEnd` logikken til at vente på win-animation:

**Før (linje 277-290):**
```typescript
const handleBonusEnd = useCallback(() => {
  if (shouldEndBonus && !isSpinning) {
    const { winnings, spins } = endBonus();
    // ... shows immediately
  }
}, [shouldEndBonus, isSpinning, endBonus]);

if (shouldEndBonus && !isSpinning && !showBonusComplete) {
  handleBonusEnd();
}
```

**Efter:**
```typescript
const handleBonusEnd = useCallback(() => {
  if (shouldEndBonus && !isSpinning && !isWinAnimating) {
    // Only show when win animation is complete
    const { winnings, spins } = endBonus();
    setBonusTotalWinnings(winnings);
    setBonusTotalSpinsUsed(spins);
    setShowBonusComplete(true);
  }
}, [shouldEndBonus, isSpinning, isWinAnimating, endBonus]);

// Trigger check when conditions change
useEffect(() => {
  if (shouldEndBonus && !isSpinning && !isWinAnimating && !showBonusComplete) {
    handleBonusEnd();
  }
}, [shouldEndBonus, isSpinning, isWinAnimating, showBonusComplete, handleBonusEnd]);
```

---

## Visuelt Resultat

### Scatter Land Lyd Progression:
```text
┌─────────────────────────────────────────────────────┐
│  Scatter #1 lander                                  │
│  🔊 "ding" - mystisk gylden klang (0.3s)           │
├─────────────────────────────────────────────────────┤
│  Scatter #2 lander                                  │
│  🔊🔊 Stigende sweep + sparkles (0.5s)              │
├─────────────────────────────────────────────────────┤
│  Scatter #3 lander                                  │
│  🔊🔊🔊 Triumferende burst + kraftig glow (0.6s)    │
│  → Bonus trigger lyd afspilles separat bagefter    │
└─────────────────────────────────────────────────────┘
```

### Bonus End Timing Fix:
```text
BEFORE (overlapping):
┌─────────────────────────────────────────────────────┐
│ ┌─────────────────┐  ┌─────────────────────────┐   │
│ │  WIN: 500 pts   │  │    TILLYKKE!           │   │
│ │  (counting...)  │  │    Total: 2500         │   │
│ └─────────────────┘  └─────────────────────────┘   │
│        ↑ Both showing at the same time ↑          │
└─────────────────────────────────────────────────────┘

AFTER (sequential):
┌─────────────────────────────────────────────────────┐
│  Step 1: Win display counts up                      │
│  ┌─────────────────┐                               │
│  │  WIN: 500 pts   │  ← Counter animation          │
│  └─────────────────┘                               │
├─────────────────────────────────────────────────────┤
│  Step 2: After win animation completes              │
│                     ┌─────────────────────────┐     │
│                     │    TILLYKKE!           │     │
│                     │    Total: 2500         │     │
│                     └─────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/lib/slotSoundEffects.ts` | Tilføj `playScatterLand(scatterNumber)` metode |
| `src/components/slots/SlotGame.tsx` | Kald scatter lyd i `onReelStop`, fix bonus end timing |

---

## Tekniske Detaljer

### Scatter Land Lyd Design:
- **Frekvenser**: Starter på 400Hz (1. scatter), stigende til 800Hz (2.) og 1200Hz (3.)
- **Varighed**: 0.3s → 0.5s → 0.6s (progressiv længere)
- **Volumen**: Gradvist stigende for hver scatter
- **Ekstra effekter**: 
  - 2. scatter: Tilføjer sparkle-lyde
  - 3. scatter: Tilføjer power sweep + mystisk chord

### Bonus End Timing:
- Tilføjer `!isWinAnimating` som condition
- Konverterer inline check til `useEffect` for proper reaktivitet
- Win animation varer typisk 2000ms for store gevinster

