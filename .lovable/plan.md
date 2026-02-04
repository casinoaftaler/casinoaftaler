
# Plan: Ændre kontrolpanel-layout

## Oversigt
Denne ændring vil omorganisere kontrolpanelet til én enkelt horisontal række med følgende rækkefølge:

**Volume → Bet → Win Box → Spin → Autospin → Gevinsttabel**

## Nuværende layout
```text
┌─────────────────────────────────────────────────┐
│             [ Small Win Bar ]                   │  ← Separat række
├─────────────────────────────────────────────────┤
│ Volume | Bet | [SPIN] | Autospin | PayTable     │  ← Horisontal række
└─────────────────────────────────────────────────┘
```

## Nyt layout
```text
┌──────────────────────────────────────────────────────────────┐
│ Volume | Bet | Win Box | [SPIN] | Autospin | Gevinsttabel    │
└──────────────────────────────────────────────────────────────┘
```

## Ændringer

### Fil: `src/components/slots/SlotControlPanel.tsx`

1. **Fjern separat SmallWinBar-række** (linje 66-67)
   - Fjern den separate `<SmallWinBar amount={winAmount} />` linje over kontrolrækken

2. **Indsæt SmallWinBar i den horisontale række**
   - Placer SmallWinBar mellem BetControls og Spin-knappen
   - Tilføj `flex-shrink-0` for at bevare størrelsen

3. **Opdater container-strukturen**
   - Ændre fra to-række layout til én enkelt horisontal række
   - Fjern den ydre flex-col container da den ikke længere er nødvendig

### Tekniske detaljer

**Før:**
```tsx
<div className="w-full flex flex-col items-center gap-2 sm:gap-3">
  <SmallWinBar amount={winAmount} />
  
  <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 ...">
    <VolumeControl />
    <BetControls />
    <Button>SPIN</Button>
    <AutospinRow />
    <PayTable />
  </div>
</div>
```

**Efter:**
```tsx
<div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
  <VolumeControl />
  <BetControls />
  <SmallWinBar amount={winAmount} />
  <Button>SPIN</Button>
  <AutospinRow />
  <PayTable />
</div>
```

## Fordele
- Mere kompakt layout med alle elementer på én linje
- Win Box er synligt placeret ved siden af Spin-knappen
- Naturlig visuel flow fra venstre mod højre
- Bedre udnyttelse af horisontal plads på desktop
