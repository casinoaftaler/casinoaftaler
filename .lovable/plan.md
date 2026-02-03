
# Plan: Scatter Glow og Lyd på Alle Hjul - ✅ IMPLEMENTERET

## Ændringer foretaget

### 1. SlotGame.tsx
- Fjernet `teaseReels.length > 0` betingelsen for scatter lyd - nu afspilles lyd for ALLE scatters
- Opdateret `scatterReelsLanded` tracking til at inkludere ALLE hjul med scatters (ikke kun sidste)
- Tilføjet `hasLandedScatter` prop til SlotReel

### 2. SlotReel.tsx  
- Tilføjet ny prop `hasLandedScatter?: boolean`
- Opdateret `isTeasing` logik til: `(hasLandedScatter || globalTeaseActive || scatterLandedOnPreviousReel) && spinState !== "stopped"`

## Resultat
- Scatter land lyd afspilles for ALLE scatters (1., 2., 3., osv.)
- Scatter glow vises på ALLE hjul hvor scatter har landet (ikke kun tease mode)
