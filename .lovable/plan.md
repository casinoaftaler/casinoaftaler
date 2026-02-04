
# Plan: Juster Mobil-Layout for Casino Card og Leaderboard

## Oversigt

Ændrer rækkefølgen på mobil/tablet-visningen, så casino kortet vises **over** leaderboard i stedet for under.

## Nuværende Layout (Mobil)

```text
┌─────────────────┐
│   SlotGame      │
├─────────────────┤
│   Leaderboard   │  ← Vises først
├─────────────────┤
│   Casino Card   │  ← Vises sidst
└─────────────────┘
```

## Nyt Layout (Mobil)

```text
┌─────────────────┐
│   SlotGame      │
├─────────────────┤
│   Casino Card   │  ← Flyttes op
├─────────────────┤
│   Leaderboard   │  ← Flyttes ned
└─────────────────┘
```

## Kodeændring

**Fil:** `src/pages/SlotMachine.tsx`

Bytter rundt på rækkefølgen af de to mobil-elementer (linje 196-206):

```tsx
// Fra (nuværende):
{/* Mobile/Tablet: Leaderboard */}
<div className="w-full max-w-sm xl:hidden">
  <SlotLeaderboard />
</div>

{/* #1 Casino Card - Mobile/Tablet */}
{topCasino && (
  <div className="w-full max-w-sm xl:hidden mt-3">
    <SlotCasinoCard ... />
  </div>
)}

// Til (nyt):
{/* #1 Casino Card - Mobile/Tablet */}
{topCasino && (
  <div className="w-full max-w-sm xl:hidden mt-3">
    <SlotCasinoCard ... />
  </div>
)}

{/* Mobile/Tablet: Leaderboard */}
<div className="w-full max-w-sm xl:hidden mt-3">
  <SlotLeaderboard />
</div>
```

Note: Tilføjer `mt-3` til leaderboard for at matche spacing.

## Resultat

- Casino card vises nu over leaderboard på mobil/tablet
- Spacing mellem elementer forbliver konsistent
- Desktop-layout er uændret
