
# Plan: Fix Scatter Glow - Kun Start Ved 2. Scatter Landing

## Problem
Scatter glow starter nogle gange når kun 1 scatter er landet. Den bør først vise sig når **2. scatter lander**.

---

## Analyse

Nuværende betingelse for scatter glow i SlotGame.tsx linje 692:

```typescript
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0 && isSpinning}
```

**Problemet:** `teaseReels.length > 0` er baseret på det fulde grid-resultat som beregnes FØR hjulene stopper. Så når første scatter lander, er `teaseReels` allerede udfyldt (fordi systemet ved at der kommer 2+ scatters), og glow aktiveres for tidligt.

---

## Løsning

Tilføj en ekstra betingelse der sikrer at glow kun vises når **mindst 2 scatters er landet**:

**Nuværende:**
```typescript
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0 && isSpinning}
```

**Ny:**
```typescript
hasLandedScatter={scatterReelsLanded.has(colIndex) && scatterReelsLanded.size >= 2 && isSpinning}
```

Ved at erstatte `teaseReels.length > 0` med `scatterReelsLanded.size >= 2` sikrer vi:
1. Denne reel har en scatter der er landet (`scatterReelsLanded.has(colIndex)`)
2. Der er mindst 2 scatters landet i alt (`scatterReelsLanded.size >= 2`)
3. Spillet spinner stadig (`isSpinning`)

---

## Tidslinje

```text
NUVÆRENDE (FORKERT):
Scatter1 lander → scatterReelsLanded={0}, teaseReels.length=2 → ✨ Glow starter (FORKERT!)

MED FIX:
Scatter1 lander → scatterReelsLanded={0}, size=1 → ❌ Ingen glow
Scatter2 lander → scatterReelsLanded={0,2}, size=2 → ✨ Glow starter (KORREKT!)
```

---

## Fil der ændres

| Fil | Linje | Ændring |
|-----|-------|---------|
| `src/components/slots/SlotGame.tsx` | 692 | Erstat `teaseReels.length > 0` med `scatterReelsLanded.size >= 2` |

---

## Kodeændring

```typescript
// Linje 692 - FØR:
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0 && isSpinning}

// Linje 692 - EFTER:
hasLandedScatter={scatterReelsLanded.has(colIndex) && scatterReelsLanded.size >= 2 && isSpinning}
```
