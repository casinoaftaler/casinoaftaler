

## Plan: Tilføj mørke linjer mellem hjulene

### Baggrund
For at gøre det nemmere at skelne mellem de individuelle hjul på spillemaskinen, tilføjes mørke vertikale linjer som separatorer mellem hvert hjul.

### Teknisk løsning
Opdatere `SlotGame.tsx` til at rendere mørke separator-linjer mellem de 5 hjul i reel-containeren.

**Implementeringsdetaljer:**
- Tilføj en semi-transparent mørk linje (divider) efter hvert hjul undtagen det sidste
- Brug betinget rendering: vis kun separator hvis `colIndex < 4`
- Separator-styling: smal bredde (~1-2px), mørk amber/brun farve, fuld højde
- Responsiv: juster tykkelse efter skærmstørrelse

### Visuel repræsentation

```text
┌─────┬─────┬─────┬─────┬─────┐
│     │     │     │     │     │
│ Hjul│ Hjul│ Hjul│ Hjul│ Hjul│
│  1  │  2  │  3  │  4  │  5  │
│     │     │     │     │     │
└─────┴─────┴─────┴─────┴─────┘
      ↑     ↑     ↑     ↑
   Mørke linjer mellem hjul
```

### Fil der ændres

**`src/components/slots/SlotGame.tsx`** - Linje 428-440

Ændring i reel-containeren:
- Wrap hvert hjul + separator i et React Fragment
- Tilføj en `div` med mørk baggrund efter hvert hjul (undtagen det sidste)
- Separator bruger `bg-amber-950/80` eller lignende mørk farve for at passe til det egyptiske tema

### Kode-ændring

```tsx
{grid?.map((column, colIndex) => (
  <React.Fragment key={colIndex}>
    <SlotReel
      // ... existing props
    />
    {/* Separator line between reels */}
    {colIndex < 4 && (
      <div className="w-[1px] sm:w-[2px] bg-amber-950/70 self-stretch" />
    )}
  </React.Fragment>
))}
```

### Forventet resultat
- Tydelige mørke linjer mellem alle 5 hjul
- Matcher det egyptiske tema med amber/brun farvetone
- Responsiv bredde (tyndere på mobil, tykkere på desktop)
- Semi-transparent for at undgå at være for dominerende

