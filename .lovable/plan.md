
## Centrer Rise of Fedesvin indhold

### Problem
Spillecontaineren bruger `items-start` og `-mt-2`, hvilket placerer alt indhold i toppen af viewporten i stedet for at centrere det.

### Losning
Samme tilgang som blev brugt til Book of Fedesvin: aendr game-area containeren til at centrere indholdet vertikalt og horisontalt.

### Teknisk aendring

**`src/pages/RiseOfFedesvin.tsx` (linje 194)**

Fra:
```
<div className="flex items-start justify-center overflow-hidden flex-1 -mt-2">
```

Til:
```
<div className="flex-1 flex items-center justify-center overflow-hidden">
```

Dette fjerner `-mt-2` og `items-start`, og tilfojer `items-center` og `flex-1` for perfekt centrering i begge akser.
