

# Plan: Flyt titel-billedet højere op mod navigationen

## Analyse af nuværende layout

Jeg har undersøgt `src/pages/SlotMachine.tsx` og fundet følgende:

- **Linje 131**: Titel-containeren har `pt-2 sm:pt-4` (8px mobil / 16px desktop top-padding)
- **Linje 143**: Derefter følger slot-maskine-indholdet med `flex justify-center`
- Der er ingen gap mellem titel og slot-maskinen i containeren

## Ændringer

### Fil: `src/pages/SlotMachine.tsx`

1. **Fjern top-padding fra titel-containeren**
   - Ændre `pt-2 sm:pt-4` til `pt-0` eller fjern det helt
   - Dette vil placere titlen direkte under navigationen

2. **Reducer afstanden mellem titel og slot-maskine**  
   - Tilføj evt. en lille negativ margin-bottom på titlen for at flytte slot-maskinen også op

## Tekniske detaljer

```tsx
// Før (linje 131)
<div className="flex justify-center pt-2 sm:pt-4">

// Efter - fjern top-padding helt
<div className="flex justify-center pt-0">
```

## Resultat

Titel-billedet vil nu sidde næsten helt oppe mod navigationen uden mellemrum, og hele spillemaskinen vil rykke op sammen med det.

