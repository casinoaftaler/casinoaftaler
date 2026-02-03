

# Plan: Scatter Lyd Kun Med Mindst Én Scatter på Reel 1-3

## Problem
Hvis scatters **kun** lander på reel 4 og 5, skal der hverken afspilles lyd eller vises glow. Lyden skal kun afspilles hvis der er mindst én scatter på reel 1, 2 eller 3.

---

## Nuværende Logik vs. Ønsket Logik

```text
NUVÆRENDE:
- Reel 1-4: Lyd afspilles altid
- Reel 5: Ingen lyd

ØNSKET:
- Reel 1-3: Lyd afspilles altid
- Reel 4: Lyd afspilles KUN hvis der allerede er scatter på reel 1-3
- Reel 5: Ingen lyd
- Glow: Kun når 2+ scatters OG mindst én er på reel 1-3
```

---

## Løsning

### Opdater Scatter Lyd Logik i SlotGame.tsx

**Fil:** `src/components/slots/SlotGame.tsx` (linje 480-486)

```typescript
// NUVÆRENDE:
const isOnReels1234 = reelIndex <= 3;

if (isOnReels1234) {
  slotSounds.playScatterLand(scattersLanded);
}

// NY LOGIK:
// Count scatters specifically on reels 1-3 (index 0-2)
let scattersOnReels123 = 0;
for (let r = 0; r <= Math.min(reelIndex, 2); r++) {
  const reelHasScatter = grid?.[r]?.some(symbolId => {
    const symbol = symbols?.find(s => s.id === symbolId);
    return symbol?.is_scatter;
  });
  if (reelHasScatter) scattersOnReels123++;
}

// Play sound if:
// 1. Scatter is on reel 1-3 (index 0-2), OR
// 2. Scatter is on reel 4 AND there's already a scatter on reel 1-3
const isOnReels123 = reelIndex <= 2;
const isOnReel4WithPriorScatter = reelIndex === 3 && scattersOnReels123 > 0;

if (isOnReels123 || isOnReel4WithPriorScatter) {
  slotSounds.playScatterLand(scattersLanded);
}
```

---

## Visuelt Resultat

### Scenarie: Scatter på reel 1, så reel 4
```text
Reel 1 lander:    📖 → 🔊 Lyd (scatter på reel 1-3)
                       ❌ Ingen glow endnu
                       
Reel 4 lander:    📖 → 🔊 Lyd (reel 4 + prior scatter på reel 1)
                       ✨ Glow aktiveres på BEGGE
```

### Scenarie: Første scatter på reel 4
```text
Reel 4 lander:    📖 → 🔇 Ingen lyd (ingen prior scatter på 1-3)
                       ❌ Ingen glow (kun 1 scatter)
```

### Scenarie: Scatter på reel 4, så reel 5
```text
Reel 4 lander:    📖 → 🔇 Ingen lyd (ingen prior scatter)
Reel 5 lander:    📖 → 🔇 Ingen lyd
                       ❌ Ingen glow (ingen scatter på 1-3)
```

### Scenarie: Scatter på reel 2, så reel 5
```text
Reel 2 lander:    📖 → 🔊 Lyd (scatter på reel 1-3)
Reel 5 lander:    📖 → 🔇 Ingen lyd (reel 5)
                       ✨ Glow aktiveres (har scatter på 1-3)
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Tilføj check for scatters på reel 1-3 før lyd på reel 4 |

---

## Tekniske Detaljer

### Scatter Lyd Regler:
- **Reel 1-3**: Lyd afspilles altid
- **Reel 4**: Lyd afspilles KUN hvis der er mindst én scatter på reel 1-3
- **Reel 5**: Aldrig lyd

### Scatter Glow Regler:
- Glow kræver tease mode (2+ scatters)
- Glow vises på alle landede scatters når tease aktiveres

