
# Plan: Fix BetControls og Nyt Mobil-Layout

## Problem 1: BetControls knapper udenfor boksen (PC)

BetControls har `sm:w-auto` som gør at containerens bredde kollapser, men indholdet har ikke nok padding. Vi skal sikre at containeren har en minimum bredde der passer til indholdet.

## Problem 2: Mobil-layout skal være 2 rækker

Ønsket layout på mobil:
```text
┌─────────────────────────────────────────┐
│  [Vol] [Bet] [Pay]  │ [SPIN] │ [Auto]  │
│      VENSTRE        │ MIDT   │ HØJRE   │
└─────────────────────────────────────────┘
```

---

## Tekniske Ændringer

### Fil: `src/components/slots/BetControls.tsx`

**Ændring (linje 28)**: Tilføj minimum bredde for at sikre knapperne er indenfor boksen

```tsx
// Fra:
<div className="flex flex-col gap-1.5 w-full sm:w-auto bg-gradient-to-b...">

// Til:
<div className="flex flex-col gap-1.5 w-auto min-w-fit bg-gradient-to-b...">
```

### Fil: `src/components/slots/SlotControlPanel.tsx`

**Ændring (linje 62-174)**: Omstrukturér til grid-baseret 2-række layout på mobil

```tsx
<div className="w-full flex flex-col items-center gap-3 sm:gap-4">
  {/* Mobile: 2-row grid layout | Desktop: single row */}
  <div className="grid grid-cols-[1fr_auto_1fr] sm:flex sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
    
    {/* Left section on mobile (Vol, Bet, Pay) */}
    <div className="flex items-center justify-end gap-2 sm:contents">
      <VolumeControl ... />
      <BetControls ... />  {/* På mobil: kompakt version */}
      <PayTable ... />     {/* Kun på mobil i venstre */}
    </div>

    {/* Center: Spin Button */}
    <Button ... />

    {/* Right section on mobile (Autospin) */}
    <div className="flex items-center justify-start sm:contents">
      <AutospinRow ... />
    </div>
    
    {/* Desktop only: PayTable rightmost */}
    <div className="hidden sm:block">
      <PayTable />
    </div>
  </div>
</div>
```

**Desktop rækkefølge** (venstre til højre):
Volume → Bet → Spin → Autospin → PayTable

**Mobil layout** (én horisontal linje med 3 sektioner):
- Venstre: Volume, Bet (kompakt), PayTable
- Midt: Spin-knap (centreret)
- Højre: Autospin

---

## Forventet Resultat

| Platform | Layout |
|----------|--------|
| Desktop | Én horisontal række: Vol → Bet → Spin → Auto → Pay |
| Mobil | Grid med 3 kolonner: [Vol+Bet+Pay] [SPIN] [Auto] |

BetControls vil have korrekt minimum bredde så +/- knapperne altid er indenfor den egyptiske boks.
