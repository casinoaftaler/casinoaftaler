

## Plan: Flyt spin-knappen til midten med kontroller på hver side

### Nuværende layout
```
[Indsats] [Auto Count] [Auto] [Gevinst] [Lyd]
             ⬇️
         [SPIN BUTTON]
```

### Nyt layout
```
[Indsats]  [Auto Count] [Auto]  ────  [SPIN]  ────  [Gevinst]  [Lyd]
```

Spin-knappen placeres centralt i en enkelt række, med bet/autospin kontroller til venstre og gevinst/lyd kontroller til højre.

---

### Tekniske ændringer

**Fil: `src/components/slots/SlotGame.tsx`**

Sammenflet kontrolrækken (linje 601-681) og spin-knap sektionen (linje 683-747) til én linje:

**Ny struktur:**
```tsx
{/* Controls row with spin button in center */}
<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2">
  {/* LEFT SIDE: Bet Controls + Autospin */}
  <div className="flex items-center gap-1 xs:gap-2">
    <BetControls ... />
    {/* Autospin controls */}
    <div className="flex items-center gap-1">
      {/* Autospin count selector */}
      ...
      {/* Autospin button */}
      ...
    </div>
  </div>
  
  {/* CENTER: Spin button */}
  <Button className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 ..." ...>
    SPIN
  </Button>
  
  {/* RIGHT SIDE: Win Display + Volume */}
  <div className="flex items-center gap-1 xs:gap-2">
    <WinDisplay ... />
    <VolumeControl />
  </div>
</div>
```

**Justeringer til spin-knappen:**
- Reduceret størrelse for at passe i en inline række
- Fjerner den separate wrapper `<div className="flex justify-center my-3 sm:my-4">`

