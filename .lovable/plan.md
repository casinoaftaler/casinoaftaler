
# Plan: Reducer Spillemaskine og Ramme med 15%

## Oversigt

Spillemaskinen og dens ramme skal reduceres med 15%. Dette kræver ændringer i to filer:
- **SlotSymbol.tsx** - Container- og billedstørrelser
- **SlotReel.tsx** - SYMBOL_SIZE konstanter (bruges til spinning animation)

Rammen skalerer automatisk proportionelt med symbolerne, så den behøver ikke direkte ændringer.

## Beregning af Nye Størrelser

Nuværende → Ny (85% af original):

| Breakpoint | Nuværende | Ny (afrundet) |
|------------|-----------|---------------|
| xs         | 72px      | 61px          |
| mobile     | 84px      | 71px          |
| sm         | 108px     | 92px          |
| md         | 128px     | 109px         |
| lg         | 156px     | 133px         |
| xl         | 176px     | 150px         |

Billede-størrelser (inde i containeren):

| Breakpoint | Nuværende | Ny (afrundet) |
|------------|-----------|---------------|
| xs         | 60px      | 51px          |
| mobile     | 72px      | 61px          |
| sm         | 92px      | 78px          |
| md         | 112px     | 95px          |
| lg         | 140px     | 119px         |
| xl         | 160px     | 136px         |

## Tekniske Ændringer

### Fil 1: `src/components/slots/SlotSymbol.tsx`

**Container-størrelser (linje 22):**
```
Nuværende: "w-[72px] h-[72px] xs:w-[84px] xs:h-[84px] sm:w-[108px] sm:h-[108px] md:w-[128px] md:h-[128px] lg:w-[156px] lg:h-[156px] xl:w-[176px] xl:h-[176px]"

Ny: "w-[61px] h-[61px] xs:w-[71px] xs:h-[71px] sm:w-[92px] sm:h-[92px] md:w-[109px] md:h-[109px] lg:w-[133px] lg:h-[133px] xl:w-[150px] xl:h-[150px]"
```

**Billed-størrelser (linje 43):**
```
Nuværende: "w-[60px] h-[60px] xs:w-[72px] xs:h-[72px] sm:w-[92px] sm:h-[92px] md:w-[112px] md:h-[112px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px]"

Ny: "w-[51px] h-[51px] xs:w-[61px] xs:h-[61px] sm:w-[78px] sm:h-[78px] md:w-[95px] md:h-[95px] lg:w-[119px] lg:h-[119px] xl:w-[136px] xl:h-[136px]"
```

**Kommentar opdatering (linje 15):**
```
Nuværende: // Symbol sizes: xs=72, mobile=84, sm=108, md=128, lg=156, xl=176
Ny: // Symbol sizes: xs=61, mobile=71, sm=92, md=109, lg=133, xl=150
```

### Fil 2: `src/components/slots/SlotReel.tsx`

**SYMBOL_SIZE konstant (linje 29):**
```javascript
Nuværende: const SYMBOL_SIZE = { xs: 72, mobile: 84, sm: 108, md: 128, lg: 156, xl: 176 };

Ny: const SYMBOL_SIZE = { xs: 61, mobile: 71, sm: 92, md: 109, lg: 133, xl: 150 };
```

## Hvorfor Dette Virker

- Symbol-containerne og billederne reduceres proportionelt
- `SYMBOL_SIZE` i SlotReel.tsx synkroniseres med de nye værdier (bruges til spinning animation width)
- Rammen i `SlotMachineFrame.tsx` tilpasser sig automatisk, da den baseres på `slot_frame_size` setting og skalerer med indholdet
- Alle gaps og marginer forbliver uændrede, så layout-proportionerne bevares

## Filer der Ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotSymbol.tsx` | Reducer container og billede størrelser med 15% |
| `src/components/slots/SlotReel.tsx` | Opdater SYMBOL_SIZE konstanter til at matche |
