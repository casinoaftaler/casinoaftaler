
# Plan: Flyt BonusStatusBar til lige over kontrolpanelet

## Nuværende layout
1. Overlays (Bonus trigger, Retrigger, Complete)
2. **BonusStatusBar** ← Nuværende placering (over spillemaskinen)
3. SlotMachineFrame med hjul
4. SlotControlPanel

## Nyt layout
1. Overlays (Bonus trigger, Retrigger, Complete)
2. SlotMachineFrame med hjul
3. **BonusStatusBar** ← Ny placering (lige over kontrolpanelet)
4. SlotControlPanel

## Tekniske ændringer

### Fil: `src/components/slots/SlotGame.tsx`

**1. Fjern BonusStatusBar fra dens nuværende placering (linje 548-557)**

Slet denne blok:
```tsx
{/* Bonus Status Bar - positioned above the frame */}
<div className="max-w-fit mx-auto mb-1 sm:mb-2">
  <BonusStatusBar
    isActive={bonusState.isActive}
    freeSpinsRemaining={bonusState.freeSpinsRemaining}
    totalFreeSpins={bonusState.totalFreeSpins}
    expandingSymbol={bonusState.expandingSymbol}
    bonusWinnings={bonusState.bonusWinnings}
  />
</div>
```

**2. Tilføj BonusStatusBar lige før kontrolpanelet (linje 838-839)**

Indsæt BonusStatusBar i wrapper-div'en sammen med kontrolpanelet:
```tsx
{/* Control Panel with Bonus Status Bar above */}
<div className="mt-2 sm:-mt-12 md:-mt-16 lg:-mt-[200px]">
  {/* Bonus Status Bar - positioned just above controls */}
  <div className="max-w-fit mx-auto mb-1 sm:mb-2">
    <BonusStatusBar
      isActive={bonusState.isActive}
      freeSpinsRemaining={bonusState.freeSpinsRemaining}
      totalFreeSpins={bonusState.totalFreeSpins}
      expandingSymbol={bonusState.expandingSymbol}
      bonusWinnings={bonusState.bonusWinnings}
    />
  </div>
  <SlotControlPanel ... />
</div>
```

## Resultat
- BonusStatusBar vises nu direkte over kontrollerne under bonus-runder
- Baren følger kontrolpanelets responsive positionering
- Spilleren kan se bonus-status (free spins remaining, expanding symbol, gevinst) tættere på handlingsknapperne

## Fil der ændres
- `src/components/slots/SlotGame.tsx`
