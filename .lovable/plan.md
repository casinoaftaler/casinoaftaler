

## Plan: Fjern glow-effekter fra spillemaskinen

### Baggrund
Der er to steder i koden, hvor der tilføjes en "glow"-effekt (lysende skygge) omkring spillemaskinen:

1. **SlotMachineFrame.tsx** - Linje 74-79: En `shadow`-effekt der aktiveres under spinning og bonus
2. **SlotGame.tsx** - Linje 400-405: En wrapper-div med `shadow` under bonus-tilstand

### Ændringer

**1. `src/components/slots/SlotMachineFrame.tsx`**

Fjern glow-effekt div'en (linje 74-79):

Før:
```tsx
{/* Glow effects */}
<div className={cn(
  "absolute inset-0 rounded-xl transition-shadow duration-300 pointer-events-none",
  isBonus && "shadow-[0_0_40px_rgba(251,191,36,0.4)]",
  isSpinning && !isBonus && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
)} />
```

Efter:
- Fjern hele denne div-sektion

---

**2. `src/components/slots/SlotGame.tsx`**

Fjern glow på wrapper-div (linje 400-405):

Før:
```tsx
<div 
  className={cn(
    "max-w-fit mx-auto",
    bonusState.isActive && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
  )}
>
```

Efter:
```tsx
<div className="max-w-fit mx-auto">
```

### Resultat
- Ingen glow-effekt under normal spinning
- Ingen glow-effekt under bonus-runder
- Renere, mere minimalistisk look

