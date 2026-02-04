
# Plan: Synkroniser Fake Loop Størrelse og Flyt Spillemaskinen Op

## Problem

1. **Symbol-størrelse mismatch**: `SlotReel.tsx` bruger forældede `SYMBOL_SIZE` konstanter, mens `SlotSymbol.tsx` blev opdateret til større størrelser. Dette får spinning-hjulene til at vise mindre symboler end de landede symboler.

2. **Spillemaskinens position**: Spillemaskinen skal flyttes 5px op.

## Løsning

### 1. Opdater SYMBOL_SIZE i SlotReel.tsx

Ændre linje 29 fra:
```javascript
const SYMBOL_SIZE = { xs: 64, mobile: 76, sm: 96, md: 112, lg: 140, xl: 160 };
```

Til:
```javascript
const SYMBOL_SIZE = { xs: 72, mobile: 84, sm: 108, md: 128, lg: 156, xl: 176 };
```

Dette matcher de nye størrelser i `SlotSymbol.tsx`.

### 2. Flyt spillemaskinen 5px op

I `SlotMachine.tsx`, tilføj en negativ top-margin til slot machine containeren (linje 195):

```javascript
<div className="flex flex-col items-center gap-1" style={{ marginTop: '-5px' }}>
```

## Filer der skal ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotReel.tsx` | Opdater `SYMBOL_SIZE` konstanter til at matche `SlotSymbol.tsx` |
| `src/pages/SlotMachine.tsx` | Tilføj `marginTop: -5px` til slot machine containeren |

## Tekniske Detaljer

- Spinning-hjulene beregner viewport-højde og symbol-positioner baseret på `SYMBOL_SIZE`
- Når disse værdier ikke matcher de faktiske CSS-størrelser i `SlotSymbol`, får vi en visuel mismatch
- Ved at synkronisere konstanterne sikrer vi at fake loop og landede symboler har samme dimensioner
