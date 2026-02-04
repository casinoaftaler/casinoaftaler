
# Plan: Flytte Small Win Bar ind i kontrolpanelet

## Oversigt
Denne ændring vil integrere Small Win Bar-komponenten direkte i SlotControlPanel, så den vises som en del af kontrolpanelets layout i stedet for at være et separat element ovenfor.

## Ændringer

### 1. Opdater SlotControlPanel-komponenten
**Fil:** `src/components/slots/SlotControlPanel.tsx`

- Tilføj en ny prop `winAmount: number` til interface
- Importer `SmallWinBar`-komponenten
- Placer SmallWinBar i en række over de eksisterende kontroller
- Juster layoutet så Small Win Bar er centreret over spin-knappen

**Nyt layout:**
```text
┌─────────────────────────────────────────────────┐
│             [ Small Win Bar ]                   │  ← Ny række
├─────────────────────────────────────────────────┤
│ Volume | Bet | [SPIN] | Autospin | PayTable     │  ← Eksisterende række
└─────────────────────────────────────────────────┘
```

### 2. Opdater SlotGame-komponenten
**Fil:** `src/components/slots/SlotGame.tsx`

- Fjern den separate SmallWinBar-sektion (linje 794-797)
- Tilføj `winAmount`-prop til SlotControlPanel-kaldet
- Fjern SmallWinBar import (da den nu bruges inde i SlotControlPanel)
- Forenkl positioneringen da der kun er ét element at placere

## Tekniske detaljer

### SlotControlPanel ændringer:
```tsx
// Tilføj til props interface:
winAmount: number;

// Nyt layout i return:
<div className="w-full flex flex-col items-center gap-2 sm:gap-3">
  {/* Small Win Bar - centreret over kontrollerne */}
  <SmallWinBar amount={winAmount} />
  
  {/* Eksisterende horizontal row */}
  <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 ...">
    ...eksisterende kontroller...
  </div>
</div>
```

### SlotGame ændringer:
```tsx
// Fjern denne sektion:
{/* Small Win Display Bar - adjusted to match control panel position */}
<div className="relative z-10 flex justify-center mt-2 sm:-mt-16 md:-mt-20 lg:-mt-[216px]">
  <SmallWinBar amount={winAmount} />
</div>

// Opdater SlotControlPanel kaldet:
<SlotControlPanel
  ...eksisterende props...
  winAmount={winAmount}  // ← Tilføj denne
/>
```

## Fordele
- Enklere positionering - kun ét element at justere
- Bedre sammenhæng i kontrolpanelet
- Eliminerer separate responsive margin-justeringer
- Mere intuitiv komponentstruktur
