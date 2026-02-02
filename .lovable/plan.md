

# Plan: Reducer spillemaskine-symboler på mobil

## Oversigt
Gør spillemaskine-symbolerne mindre på de mindste skærmstørrelser for at sikre at hele spillemaskinen (5 hjul × 3 rækker) passer på mobilskærme uden at blive skåret af.

## Nuværende størrelser vs. Nye størrelser

| Breakpoint | Skærmbredde | Nuværende | Ny størrelse |
|------------|-------------|-----------|--------------|
| Base       | < 400px     | 80px      | **64px**     |
| xs         | ≥ 400px     | 96px      | **76px**     |
| sm         | ≥ 640px     | 112px     | 96px         |
| md         | ≥ 768px     | 128px     | 112px        |
| lg         | ≥ 1024px    | 160px     | 140px        |
| xl         | ≥ 1280px    | 176-180px | 160px        |

Gap mellem symboler reduceres også tilsvarende:
- Base: 6px → **4px**
- xs: 8px → **6px**
- sm: 10px → **8px**

## Beregning: Passer det på mobil?
Med de nye størrelser:
- **5 symboler × 64px + 4 gaps × 4px = 336px** bredde (passer på 360px skærm)
- **3 symboler × 64px + 2 gaps × 4px = 200px** højde

## Filer der skal opdateres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotSymbol.tsx` | Opdater responsive Tailwind klasser til mindre størrelser |
| `src/components/slots/SlotReel.tsx` | Opdater `SYMBOL_SIZE` og `GAP` konstanterne |
| `src/components/slots/SlotGame.tsx` | Opdater `SYMBOL_SIZE` og `GAP` konstanterne (skal matche SlotReel) |

## Tekniske detaljer

### SlotSymbol.tsx
Ændre symbol container og billede størrelser:
```
Container: 64px → 76px → 96px → 112px → 140px → 160px
Billede:   52px → 64px → 80px → 96px  → 124px → 144px
```

### SlotReel.tsx & SlotGame.tsx
Opdater konstanterne:
```typescript
const SYMBOL_SIZE = { 
  xs: 64,      // var 80
  mobile: 76,  // var 96
  sm: 96,      // var 112
  md: 112,     // var 128
  lg: 140,     // var 160
  xl: 160      // var 176-180
};

const GAP = { 
  xs: 4,      // var 6
  mobile: 6,  // var 8
  sm: 8,      // var 10
  md: 12,     // var 14
  lg: 16      // var 18
};
```

## Resultat
- Hele spillemaskinen passer nu på skærme ned til 360px bredde
- Bevarer proportionerne og det visuelle design
- WinLines og animationer forbliver synkroniserede
- Symbolbilleder forbliver skarpe og læsbare

