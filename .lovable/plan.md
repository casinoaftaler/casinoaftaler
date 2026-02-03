

# Plan: Glow Kun Ved Aktiv Tease Mode

## Problem
Glow vises når 2. scatter lander på reel 5, men dette er ikke en tease-situation. Glow skal **kun** vises når tease mode faktisk aktiveres - dvs. når 2. scatter lander på reel 4 eller tidligere.

---

## Nuværende vs. Ønsket Logik

```text
NUVÆRENDE:
- Glow: Vises for ALLE landede scatters når der er 2+
- Problem: Scatter på reel 2 + reel 5 = glow (forkert!)

ØNSKET:
- Glow: Kun når 2+ scatters OG 2. scatter lander på reel 1-4
- Scatter på reel 2 + reel 5 = INGEN glow (korrekt!)
```

---

## Løsning

### Opdater Scatter Tracking i SlotGame.tsx

**Fil:** `src/components/slots/SlotGame.tsx` (linje 500-501)

```typescript
// NUVÆRENDE (linje 500-501):
// Track ALL scatter reels for glow effect
setScatterReelsLanded(prev => new Set([...prev, reelIndex]));

// NY LOGIK:
// Only track scatter reels for glow when tease mode is possible
// Tease requires 2nd scatter to land on reel 1-4 (not reel 5)
// So only add to glow tracking if:
// 1. This scatter is on reel 1-3 (can build toward tease), OR
// 2. This is the 2nd+ scatter on reel 4 (activates tease), OR
// 3. There's already a scatter on reel 1-3 AND this is on reel 4 (tease activated)
// Reel 5 scatters NEVER trigger glow (even with prior scatter on 1-3)
const canTriggerTease = isOnReels123 || isOnReel4WithPriorScatter;

if (canTriggerTease) {
  setScatterReelsLanded(prev => new Set([...prev, reelIndex]));
}
```

---

## Visuelt Resultat

### Scenarie: Scatter på reel 2, så reel 5
```text
Reel 2 lander:    📖 → 🔊 Lyd (scatter på reel 1-3)
                       ❌ Ingen glow endnu (kun 1 scatter)
                       
Reel 5 lander:    📖 → 🔇 Ingen lyd (reel 5)
                       ❌ INGEN glow (reel 5 kan ikke trigge tease)
```

### Scenarie: Scatter på reel 1, så reel 4
```text
Reel 1 lander:    📖 → 🔊 Lyd (scatter på reel 1-3)
                       ❌ Ingen glow endnu
                       
Reel 4 lander:    📖 → 🔊 Lyd (reel 4 + prior scatter)
                       ✨ Glow aktiveres på BEGGE (tease mode!)
```

### Scenarie: Scatter på reel 4, så reel 5
```text
Reel 4 lander:    📖 → 🔇 Ingen lyd (ingen prior scatter på 1-3)
                       ❌ Ingen glow
                       
Reel 5 lander:    📖 → 🔇 Ingen lyd
                       ❌ Ingen glow
```

### Scenarie: Scatter på reel 2, så reel 4
```text
Reel 2 lander:    📖 → 🔊 Lyd (scatter på reel 1-3)
                       ❌ Ingen glow endnu
                       
Reel 4 lander:    📖 → 🔊 Lyd (reel 4 + prior scatter)
                       ✨ Glow aktiveres på BEGGE (tease mode!)
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Tilføj betingelse for scatter tracking - kun når tease er mulig |

---

## Tekniske Detaljer

### Scatter Lyd Regler (uændret):
- **Reel 1-3**: Lyd afspilles altid
- **Reel 4**: Lyd afspilles KUN hvis der er mindst én scatter på reel 1-3
- **Reel 5**: Aldrig lyd

### Scatter Glow Regler (opdateret):
- **Reel 1-3**: Altid tracked for glow
- **Reel 4**: Kun tracked hvis der allerede er scatter på reel 1-3
- **Reel 5**: ALDRIG tracked for glow
- Glow vises først når 2+ scatters er tracked

