

# Plan: Scatter Lyd på Reel 1-4

## Problem
Lyden afspilles kun på reel 1-3 + reel 4 (kun hvis det er 2. scatter). Brugeren ønsker at lyden skal afspilles på reel 1, 2, 3 **og** 4 generelt (ikke kun for 2. scatter på reel 4).

---

## Nuværende Logik vs. Ønsket Logik

```text
NUVÆRENDE:
- Reel 1-3: Lyd afspilles altid
- Reel 4: Lyd afspilles KUN hvis det er 2. scatter
- Reel 5: Ingen lyd

ØNSKET:
- Reel 1-4: Lyd afspilles altid
- Reel 5: Ingen lyd
- Glow: Kun når 2+ scatters (tease mode)
```

---

## Løsning

### Opdater Scatter Lyd Logik i SlotGame.tsx

**Fil:** `src/components/slots/SlotGame.tsx` (linje 480-488)

Ændre betingelsen fra `reelIndex <= 2` til `reelIndex <= 3`:

```typescript
// NUVÆRENDE (linje 480-488):
// Play sound if:
// 1. Scatter is on reel 1-3 (index 0-2), OR
// 2. This is the 2nd scatter AND it's on reel 4 (index 3) - triggers tease mode
const isOnReels123 = reelIndex <= 2;
const is2ndScatterOnReel4 = scattersLanded === 2 && reelIndex === 3;

if (isOnReels123 || is2ndScatterOnReel4) {
  slotSounds.playScatterLand(scattersLanded);
}

// NY LOGIK:
// Play sound if scatter is on reel 1-4 (index 0-3)
// Reel 5 is too late for sound
const isOnReels1234 = reelIndex <= 3;

if (isOnReels1234) {
  slotSounds.playScatterLand(scattersLanded);
}
```

---

## Visuelt Resultat

### Scenarie: Scatter på reel 1, så reel 4
```text
Reel 1 lander:    📖 → 🔊 Lyd (1. scatter på reel 1-4)
                       ❌ Ingen glow endnu
                       
Reel 4 lander:    📖 → 🔊 Lyd (2. scatter på reel 1-4)
                       ✨ Glow aktiveres på BEGGE scatters
                       ✨ Tease mode starter på reel 5
```

### Scenarie: Første scatter på reel 4
```text
Reel 4 lander:    📖 → 🔊 Lyd (1. scatter på reel 1-4)
                       ❌ Ingen glow (kun 1 scatter)
```

### Scenarie: Scatter på reel 4, så reel 5
```text
Reel 4 lander:    📖 → 🔊 Lyd (1. scatter på reel 1-4)
                       ❌ Ingen glow endnu
                       
Reel 5 lander:    📖 → 🔇 Ingen lyd (reel 5 er uden for 1-4)
                       ✨ Glow aktiveres på BEGGE scatters
```

### Scenarie: Første scatter på reel 5
```text
Reel 5 lander:    📖 → 🔇 Ingen lyd
                       ❌ Ingen glow (kun 1 scatter)
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Ændre `reelIndex <= 2` til `reelIndex <= 3` og fjern den separate 2. scatter betingelse |

---

## Tekniske Detaljer

### Scatter Lyd Regler:
- Lyd afspilles hvis scatter lander på reel 1, 2, 3, eller 4 (index 0-3)
- Progressiv lyd tæller alle scatters op til nuværende reel
- Scatters på reel 5 udløser aldrig lyd

### Scatter Glow Regler:
- Uændret: Glow kræver tease mode (2+ scatters)
- Når tease mode aktiveres, glower ALLE landede scatters

