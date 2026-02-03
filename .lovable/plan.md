

# Plan: Scatter Lyd på Reel 4 for 2. Scatter

## Problem
Lyden afspilles kun på reel 1-3, men hvis den 2. scatter lander på reel 4 (som aktiverer tease mode), skal lyden også afspilles.

---

## Løsning

### Opdater Scatter Lyd Logik i SlotGame.tsx

**Fil:** `src/components/slots/SlotGame.tsx` (linje 468-479)

Tilføj en ekstra betingelse: afspil lyd hvis det er den 2. scatter OG den lander på reel 4.

```typescript
// NUVÆRENDE (linje 469-479):
if (hasScatterOnReel) {
  let scattersLanded = 0;
  for (let r = 0; r <= reelIndex; r++) {
    // ... count scatters
  }
  slotSounds.playScatterLand(scattersLanded);
  // ...
}

// NY LOGIK:
if (hasScatterOnReel) {
  let scattersLanded = 0;
  for (let r = 0; r <= reelIndex; r++) {
    const reelHasScatter = grid?.[r]?.some(symbolId => {
      const symbol = symbols?.find(s => s.id === symbolId);
      return symbol?.is_scatter;
    });
    if (reelHasScatter) scattersLanded++;
  }
  
  // Play sound if:
  // 1. Scatter is on reel 1-3 (index 0-2), OR
  // 2. This is the 2nd scatter AND it's on reel 4 (index 3) - triggers tease mode
  const isOnReels123 = reelIndex <= 2;
  const is2ndScatterOnReel4 = scattersLanded === 2 && reelIndex === 3;
  
  if (isOnReels123 || is2ndScatterOnReel4) {
    slotSounds.playScatterLand(scattersLanded);
  }
  
  // Track ALL scatter reels for glow effect
  setScatterReelsLanded(prev => new Set([...prev, reelIndex]));
}
```

---

## Visuelt Resultat

### Scenarie: Scatter på reel 1, så reel 4
```text
Reel 1 lander:    📖 → 🔊 Lyd (1. scatter på reel 1-3)
                       ❌ Ingen glow endnu
                       
Reel 4 lander:    📖 → 🔊 Lyd (2. scatter = tease mode aktiveret!)
                       ✨ Glow aktiveres på BEGGE scatters
                       ✨ Tease mode starter på reel 5
```

### Scenarie: Første scatter på reel 4
```text
Reel 4 lander:    📖 → 🔇 Ingen lyd (1. scatter på reel 4 = for sent)
                       ❌ Ingen glow
```

### Scenarie: Scatter på reel 4, så reel 5
```text
Reel 4 lander:    📖 → 🔇 Ingen lyd (1. scatter)
Reel 5 lander:    📖 → 🔇 Ingen lyd (reel 5, ikke reel 4)
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Tilføj betingelse for 2. scatter på reel 4 |

