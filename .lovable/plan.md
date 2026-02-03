
# Plan: Scatter Glow og Lyd på Alle Hjul

## Problem
Scatter land lyd og glow-effekt vises kun når der er 2+ scatters (tease mode). Brugeren ønsker at:
1. **Lyd** skal altid afspilles når et scatter lander (også selvom det er det første/eneste scatter)
2. **Glow** skal vises på scatter-symboler på ALLE hjul når de lander

---

## Løsning

### 1. Fjern `teaseReels.length > 0` betingelsen for scatter lyd

**Fil:** `src/components/slots/SlotGame.tsx` (linje 468-479)

Ændre logikken så scatter land lyd afspilles for ALLE scatters:

```typescript
// NUVÆRENDE KODE (kun når tease mode):
if (hasScatterOnReel && teaseReels.length > 0) {
  // ... scatter lyd
}

// NY KODE (altid):
if (hasScatterOnReel) {
  // Count how many scatters have landed up to and including this reel
  let scattersLanded = 0;
  for (let r = 0; r <= reelIndex; r++) {
    const reelHasScatter = grid?.[r]?.some(symbolId => {
      const symbol = symbols?.find(s => s.id === symbolId);
      return symbol?.is_scatter;
    });
    if (reelHasScatter) scattersLanded++;
  }
  slotSounds.playScatterLand(scattersLanded);
}
```

### 2. Tilføj ny prop til SlotReel for at tracke landede scatters

**Fil:** `src/components/slots/SlotReel.tsx`

Tilføj en ny prop `hasLandedScatter` der indikerer at dette hjul indeholder et scatter der har landet:

```typescript
interface SlotReelProps {
  // ... eksisterende props
  hasLandedScatter?: boolean;  // NY: Om dette hjul har et scatter der har landet
}
```

Opdater `isTeasing` logikken for landede symboler til også at inkludere `hasLandedScatter`:

```typescript
// NUVÆRENDE KODE (linje 330):
isTeasing={symbol.is_scatter && (globalTeaseActive || (scatterLandedOnPreviousReel && spinState !== "stopped"))}

// NY KODE:
isTeasing={symbol.is_scatter && (hasLandedScatter || globalTeaseActive || scatterLandedOnPreviousReel) && spinState !== "stopped"}
```

### 3. Track landede scatter reels i SlotGame

**Fil:** `src/components/slots/SlotGame.tsx`

Opdater `scatterReelsLanded` state til at tracke ALLE hjul med scatters (ikke kun sidste):

```typescript
// I onReelStop callback, tilføj tracking for alle scatter reels:
if (hasScatterOnReel) {
  setScatterReelsLanded(prev => new Set([...prev, reelIndex]));
}
```

Pass den nye prop til SlotReel:

```typescript
<SlotReel
  // ... eksisterende props
  hasLandedScatter={scatterReelsLanded.has(colIndex)}
/>
```

---

## Visuelt Resultat

```text
BEFORE (kun tease mode):
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│   📖   │  │   🐺   │  │   📖   │  │ SPINNING│  │ SPINNING│
│  (NO   │  │   👑   │  │ ✨GLOW✨│  │   ✨    │  │   ✨    │
│  GLOW) │  │   ☥   │  │         │  │  GLOW   │  │  GLOW   │
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
  🔇 intet      ---       🔊 lyd        ---         ---
    lyd

AFTER (alle scatter hjul):
╔═════════╗  ┌─────────┐  ╔═════════╗  ┌─────────┐  ┌─────────┐
║ ✨📖✨  ║  │   🐺   │  ║ ✨📖✨  ║  │ SPINNING│  │ SPINNING│
║  GLOW!  ║  │   👑   │  ║  GLOW!  ║  │   ✨    │  │   ✨    │
║         ║  │   ☥   │  ║         ║  │  GLOW   │  │  GLOW   │
╚═════════╝  └─────────┘  ╚═════════╝  └─────────┘  └─────────┘
  🔊 lyd        ---       🔊 lyd        ---         ---
  (1st)                   (2nd)
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Fjern `teaseReels.length > 0` check, track alle scatter reels, pass `hasLandedScatter` prop |
| `src/components/slots/SlotReel.tsx` | Tilføj `hasLandedScatter` prop og opdater glow-logik |

---

## Tekniske Detaljer

### Scatter Land Lyd:
- Afspilles for **ALLE** scatters der lander (1., 2., 3., osv.)
- Progressiv lyd bibeholdes (stigende intensitet for hver scatter)
- Fungerer uafhængigt af tease mode

### Scatter Glow:
- Vises når scatter symbolet har landet OG hjulet ikke er idle
- Forbliver aktiv mens andre hjul stadig spinner
- Forsvinder når alle hjul er stoppet (normal tilstand)
