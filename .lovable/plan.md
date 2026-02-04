
# Plan: Omrokér Kontrolpanelet til Én Horisontal Række

## Overblik
Omstrukturér kontrolpanelet så alle elementer (Bet, Spin, Autospin, Volume og PayTable) vises i én sammenhængende horisontal linje på desktop, med mobil-stacking bevaret.

---

## Nuværende Layout vs. Nyt Layout

```text
NUVÆRENDE:
┌─────────────┐   ┌─────────┐   ┌─────────────┐
│ Bet + Spins │   │  SPIN   │   │ Vol + Auto  │
└─────────────┘   └─────────┘   └─────────────┘
           ┌──────────────┐
           │   PayTable   │
           └──────────────┘

NYT:
┌─────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌─────┐
│ Vol │ │   Bet    │ │  SPIN   │ │ Autospin │ │ Pay │
└─────┘ └──────────┘ └─────────┘ └──────────┘ └─────┘
           ↓ Spins vises under Bet ↓
```

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotControlPanel.tsx`

**Ændring 1: Ny layout-struktur (linje 62-174)**

Erstatter den eksisterende trekolonne-struktur med en enkelt-række layout:

```tsx
<div className="w-full flex flex-col items-center gap-3 sm:gap-4">
  {/* Single row layout - all controls in one line */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full flex-wrap">
    
    {/* Volume (leftmost on desktop) */}
    <div className="order-4 sm:order-1 flex-shrink-0">
      <VolumeControl className="..." />
    </div>
    
    {/* Bet Controls (second from left) */}
    <div className="order-1 sm:order-2 w-full sm:w-auto">
      <BetControls ... />
    </div>
    
    {/* Spin Button (center) */}
    <Button ... order-2 sm:order-3 />
    
    {/* Autospin (second from right) */}
    <div className="order-3 sm:order-4 w-full sm:w-auto">
      <AutospinRow ... />
    </div>
    
    {/* PayTable (rightmost on desktop) */}
    <div className="order-5 sm:order-5 flex-shrink-0">
      <PayTable />
    </div>
  </div>
</div>
```

**Ændring 2: Fjern separate wrapper-bokse**

Fjern de egyptiske container-styles fra AutospinRow's wrapper (det bliver nu standalone-knapper), og flyt Volume ud af sin boks.

### Fil: `src/components/slots/BetControls.tsx`

**Ændring: Gør komponenten mere kompakt (linje 28)**

Fjern `w-full` og tilføj en fast bredde så den passer i én række:

```tsx
// Fra
<div className="flex flex-col gap-1.5 w-full bg-gradient-to-b...">

// Til
<div className="flex flex-col gap-1.5 w-full sm:w-auto bg-gradient-to-b...">
```

### Fil: `src/components/slots/AutospinRow.tsx`

**Ændring: Fjern flex-wrap da den nu har mere plads**

Knapperne vil nu have tilstrækkelig plads i det nye layout.

---

## Mobil-opførsel

På mobil (< sm breakpoint) vil elementerne stadig stacke vertikalt i følgende rækkefølge:
1. Bet Controls (øverst)
2. Spin Button
3. Autospin
4. Volume
5. PayTable (nederst)

---

## Fordele

| Aspekt | Før | Efter |
|--------|-----|-------|
| Rækker | 2 rækker | 1 række |
| Visuelt fokus | Spredt | Samlet kontrollinje |
| PayTable | Separat række | Integreret i hovedrække |
| Volume | Delt boks med Autospin | Standalone ikon |

---

## Forventet Resultat
- Alle kontroller i én sammenhængende horisontal linje på desktop
- Spin-knappen forbliver central og fremtrædende
- Mere kompakt og professionelt udseende
- Mobil-layout forbliver brugervenligt med vertikal stacking
