
# Plan: Flyt titel-billede tættere på top-navigation

## Problem
Titel-billedet ("Book of Fedesvin") har for meget afstand til navigationsheaderen.

## Løsning
Tilføj negativ top-margin til titel-containeren for at flytte billedet tættere på navigationen.

## Ændring

### Fil: `src/pages/SlotMachine.tsx`

**Linje 156 - Tilføj negativ margin til titel-containeren:**

Før:
```tsx
<div className="flex justify-center">
```

Efter:
```tsx
<div className="flex justify-center -mt-2 sm:-mt-4">
```

## Resultat
Titel-billedet vil nu vises tættere på navigationsheaderen uden unødvendigt mellemrum.
