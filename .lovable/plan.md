

# Flyt spillemaskinen op til toppen af skaermen

## Problem
Spillemaskinen er vertikalt centreret (`items-center`) i sin container, hvilket skubber den ned mod bunden paa mobil, hvor viewporten er hoejere end den skalerede spillemaskine.

## Loesning
Skift `items-center` til `items-start` paa den skalerede game-container i begge page-filer, saa spillet altid starter fra toppen. Paa desktop hvor spillet fylder det meste af viewporten, vil forskellen vaere minimal.

## AEndringer

### `src/pages/SlotMachine.tsx` (linje 190)
- AEndr `flex-1 flex items-center justify-center` til `flex-1 flex items-start justify-center`

### `src/pages/RiseOfFedesvin.tsx` (tilsvarende linje)
- Samme aendring: `items-center` til `items-start`

### Ingen andre filer paavirkedes
- Skalering, spillogik, side-paneler og overlays forbliver uaendrede

