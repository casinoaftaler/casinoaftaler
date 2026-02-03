
# Plan: Stop Scatter Glow Når 3. Scatter Ikke Lander

## Problem
Når en tease sker (2 scatters på hjul 1-4) og hjul 5 lander UDEN en scatter, så fortsætter de allerede landede scatter-symboler med at glowe. De burde stoppe med at glowe når det er klart, at der ikke kommer en 3. scatter.

---

## Analyse

Scatter glow kontrolleres via `hasLandedScatter` prop som sendes til SlotReel:

```typescript
// SlotGame.tsx linje 662
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0}
```

**Problemet:** Denne prop er stadig `true` for hjul med scatters, selv efter hjul 5 har stoppet uden scatter, fordi:
1. `scatterReelsLanded` cleares kun ved næste spin-start
2. `teaseReels.length > 0` er stadig sand mens hjul 5 spinner

---

## Løsning

Tilføj en ekstra betingelse så glow kun vises mens der stadig ER aktiv tease (dvs. hjul spinner endnu):

**Nuværende:**
```typescript
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0}
```

**Ny:**
```typescript
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0 && isSpinning}
```

Ved at tilføje `&& isSpinning` stopper glow automatisk når alle hjul er stoppet, uanset om bonus triggedes eller ej.

---

## Visuel Effekt

```text
NUVÆRENDE:
Scatter reel1 ✨ → Scatter reel3 ✨ → Reel5 stopper (ingen scatter) → Alle stoppet
                                                                     ✨ Glow fortsætter!

MED FIX:
Scatter reel1 ✨ → Scatter reel3 ✨ → Reel5 stopper (ingen scatter) → Alle stoppet  
                                                                     ❌ Glow stopper
```

---

## Glow Regler (opdateret)

| Scenarie | Glow på scatter? |
|----------|------------------|
| 2 scatters lander, hjul 5 spinner | ✅ Ja |
| 2 scatters, hjul 5 stoppet UDEN scatter | ❌ Nej |
| 2 scatters, hjul 5 stoppet MED scatter (bonus!) | ❌ Nej (bonus overlay vises i stedet) |
| Efter spin er helt afsluttet | ❌ Nej |

---

## Fil der ændres

| Fil | Linje | Ændring |
|-----|-------|---------|
| `src/components/slots/SlotGame.tsx` | 662 | Tilføj `&& isSpinning` til hasLandedScatter betingelsen |

---

## Kodeændring

```typescript
// Linje 662 - FØR:
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0}

// Linje 662 - EFTER:
hasLandedScatter={scatterReelsLanded.has(colIndex) && teaseReels.length > 0 && isSpinning}
```
