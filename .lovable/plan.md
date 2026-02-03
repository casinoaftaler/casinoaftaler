
# Plan: Fix Scatter Glow - Kun Under Aktiv Tease

## Problem
Scatter-symbolet blinker/glower selv efter hjulet er stoppet. Dette sker fordi:

```text
Linje 332 i SlotReel.tsx:
spinState !== "stopped"  →  TRUE når spinState === "idle"!
```

Så i idle tilstand vises glow stadigvæk, fordi `"idle" !== "stopped"` er sandt.

---

## Løsning

Ændr betingelsen så glow KUN vises under aktiv spinning:

**Fil:** `src/components/slots/SlotReel.tsx` (linje 332)

| Før | Efter |
|-----|-------|
| `spinState !== "stopped"` | `spinState === "spinning"` |

---

## Visuel Effekt

```text
NUVÆRENDE OPFØRSEL:
Spin → Scatter lander → Reel stopped → Idle
                ✨ Glow    ✨ Glow      ✨ Glow (FORKERT!)

MED FIX:
Spin → Scatter lander → Reel stopped → Idle  
         ✨ Glow           ❌ Stop       ❌ Stop
```

---

## Glow Regler (samlet)

| Scenarie | Glow? |
|----------|-------|
| 1 scatter på reel 3 | ❌ Nej |
| Scatter på reel 2 + reel 5 | ❌ Nej (ingen tease) |
| Scatter på reel 2 + reel 4 | ✅ Ja (under spin) |
| Efter spin er stoppet | ❌ Nej |
| I idle tilstand | ❌ Nej |

---

## Teknisk Detalje

Ændringen er på linje 332:

```typescript
// FØR:
isTeasing={symbol.is_scatter && (hasLandedScatter || globalTeaseActive || scatterLandedOnPreviousReel) && spinState !== "stopped"}

// EFTER:
isTeasing={symbol.is_scatter && (hasLandedScatter || globalTeaseActive || scatterLandedOnPreviousReel) && spinState === "spinning"}
```

---

## Fil der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotReel.tsx` | Linje 332: Ændr spin state check til kun at være true under spinning |
