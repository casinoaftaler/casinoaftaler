

# Plan: Spacebar Spin Support

## Oversigt
Tilføj mulighed for at spinne spillemaskinen ved tryk på mellemrumstasten, og forhindre at siden scroller ned (standard browser-opførsel for spacebar).

---

## Teknisk Løsning

### Fil: `src/components/slots/SlotGame.tsx`

Tilføj en keyboard event listener der lytter efter spacebar-tryk og trigger spin:

```typescript
// Tilføj useEffect til keyboard handling (efter linje ~130)
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Kun spacebar
    if (e.code !== "Space") return;
    
    // Forhindre scroll (standard browser opførsel)
    e.preventDefault();
    
    // Ignorer hvis fokus er på et input element
    if (
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA" ||
      document.activeElement?.tagName === "SELECT"
    ) return;
    
    // Tjek om vi kan spinne
    const canSpinNow = bonusState.isActive 
      ? bonusState.freeSpinsRemaining > 0 
      : hasEnoughSpins(bet);
    
    if (!isSpinning && canSpinNow && !showBonusTrigger && !isAutoSpinning) {
      handleSpin();
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isSpinning, bonusState, bet, hasEnoughSpins, showBonusTrigger, isAutoSpinning]);
```

---

## Opførsel

| Scenarie | Spacebar handling |
|----------|-------------------|
| Normalt spin | ✅ Trigger spin |
| Under spinning | ❌ Ignoreret |
| Under autospin | ❌ Ignoreret |
| Ved bonus overlay | ❌ Ignoreret |
| Ingen spins tilbage | ❌ Ignoreret |
| Fokus på input/tekstfelt | ❌ Standard opførsel (skriver mellemrum) |
| Scroll | ❌ Forhindret med preventDefault |

---

## Brugeroplevelse

- Tryk på **mellemrum** for at spinne
- Siden scroller **ikke** ned når man trykker spacebar
- Input-felter fungerer stadig normalt
- Virker både på desktop og når man har tastatur tilsluttet

---

## Fil der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Tilføj keyboard event listener i useEffect |

