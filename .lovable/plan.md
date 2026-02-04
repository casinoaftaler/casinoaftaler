
# Plan: Vis gevinst-animation før bonus-trigger overlay

## Problem
Når en bonus lander (3+ scatters) OG der også er en linjegevinst, vises bonus-overlayet øjeblikkeligt - før gevinstanimationen når at spille. Brugeren ser ikke deres gevinst, før bonussen aktiveres.

## Løsning
Forsink visningen af bonus-trigger overlayet, så gevinstanimationen og gevinstlinjerne vises først. Efter gevinstanimationen er færdig, vises bonus-overlayet.

## Teknisk implementering

### Fil: `src/components/slots/SlotGame.tsx`

**1. Tilføj en pending bonus state (omkring linje 94-96)**

Gem bonus-trigger data i state, så vi kan vise det efter gevinstanimationen:

```tsx
const [pendingBonusTrigger, setPendingBonusTrigger] = useState<{
  isRetrigger: boolean;
  spinsToAdd?: number;
  expandingSymbol?: SlotSymbol;
} | null>(null);
```

**2. Modificer bonus-trigger logikken (linje 680-699)**

I stedet for at vise bonus-overlayet øjeblikkeligt, gem det til senere:

Før:
```tsx
if (result.bonusTriggered) {
  shouldStopAuto = true;
  
  if (isBonusSpin) {
    slotSounds.playRetrigger();
    const spinsToAdd = 10;
    retriggerBonus(spinsToAdd);
    setRetriggerSpinsAdded(spinsToAdd);
    setShowRetrigger(true);  // Vises med det samme
  } else {
    slotSounds.playBonusTrigger();
    const expanding = triggerBonus(symbols || []);
    setPendingExpandingSymbol(expanding);
    setShowBonusTrigger(true);  // Vises med det samme
  }
}
```

Efter:
```tsx
if (result.bonusTriggered) {
  shouldStopAuto = true;
  
  if (isBonusSpin) {
    // Retrigger - gem til senere hvis der er gevinst
    const spinsToAdd = 10;
    retriggerBonus(spinsToAdd);
    setRetriggerSpinsAdded(spinsToAdd);
    
    if (result.totalWin > 0) {
      // Gem til efter gevinstanimation
      setPendingBonusTrigger({ isRetrigger: true, spinsToAdd });
    } else {
      // Ingen gevinst, vis med det samme
      slotSounds.playRetrigger();
      setShowRetrigger(true);
    }
  } else {
    // Initial bonus trigger - gem til senere hvis der er gevinst
    const expanding = triggerBonus(symbols || []);
    setPendingExpandingSymbol(expanding);
    
    if (result.totalWin > 0) {
      // Gem til efter gevinstanimation
      setPendingBonusTrigger({ isRetrigger: false, expandingSymbol: expanding });
    } else {
      // Ingen gevinst, vis med det samme
      slotSounds.playBonusTrigger();
      setShowBonusTrigger(true);
    }
  }
}
```

**3. Tilføj useEffect til at vise pending bonus efter animation (efter linje 372)**

```tsx
// Show pending bonus trigger after win animation completes
useEffect(() => {
  if (pendingBonusTrigger && !isWinAnimating && !isSpinning) {
    // Short delay to let user see the win
    const timer = setTimeout(() => {
      if (pendingBonusTrigger.isRetrigger) {
        slotSounds.playRetrigger();
        setShowRetrigger(true);
      } else {
        slotSounds.playBonusTrigger();
        setShowBonusTrigger(true);
      }
      setPendingBonusTrigger(null);
    }, 500); // Kort forsinkelse efter gevinst
    
    return () => clearTimeout(timer);
  }
}, [pendingBonusTrigger, isWinAnimating, isSpinning]);
```

## Resultat
- Gevinstanimation og gevinstlinjer vises først
- Efter animationen er færdig (2 sekunder) + kort pause (500ms)
- Bonus-trigger overlay vises med lyd
- Brugeren ser tydeligt deres gevinst før bonussen starter

## Filer der ændres
- `src/components/slots/SlotGame.tsx`
