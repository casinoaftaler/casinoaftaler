

# Plan: Flyt Spins Visning Under Indsats

## Problem
"Spins i dag" visningen er placeret akavet udenfor spillemaskinen, adskilt fra indsats-kontrollerne, selvom de er direkte relaterede (indsats bestemmer hvor mange spins der bruges).

## Løsning
Flyt `SpinsRemaining` komponenten ind i `SlotGame` og placer den direkte under `BetControls`, så de visuelt hænger sammen.

---

## Ændringer

### 1. `src/pages/SlotMachine.tsx`

**Fjern SpinsRemaining** fra denne fil, da den nu vil være inde i SlotGame.

```tsx
// SLET disse linjer (156-159):
{/* Spins remaining */}
<div className="w-full max-w-sm flex justify-center">
  <SpinsRemaining />
</div>
```

Fjern også importen af `SpinsRemaining` (linje 4).

---

### 2. `src/components/slots/SlotGame.tsx`

**Tilføj SpinsRemaining** under BetControls i kontrol-sektionen.

```tsx
// Tilføj import:
import { SpinsRemaining } from "./SpinsRemaining";

// I controls-sektionen (linje 640-642), omstrukturér til:
{/* TOP ROW ON MOBILE: Bet Controls + Autospin */}
<div className="flex flex-col items-center gap-1 order-1 sm:order-1">
  <div className="flex items-center gap-2">
    <BetControls bet={bet} onBetChange={setBet} ... />
    {/* Autospin controls */}
    <div className="flex items-center gap-1">
      ...
    </div>
  </div>
  {/* Spins remaining - direkte under indsats */}
  {!bonusState.isActive && <SpinsRemaining />}
</div>
```

**Note:** SpinsRemaining skjules under bonus-tilstand, da free spins ikke bruger daglige spins.

---

## Nyt Layout

```text
Desktop:
┌────────────────────────────────────────────────────────┐
│         [Indsats: -1+] [10▼] [AUTO]                    │
│              [3/20 spins i dag]         [SPIN]  [Gevinst] [🔊]│
└────────────────────────────────────────────────────────┘

Mobil (stacked):
┌──────────────────────┐
│  [Indsats: -1+] [AUTO]│
│   [3/20 spins i dag] │
│                      │
│       [SPIN]         │
│                      │
│  [Gevinst] [🔊]      │
└──────────────────────┘
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/pages/SlotMachine.tsx` | Fjern SpinsRemaining og import |
| `src/components/slots/SlotGame.tsx` | Tilføj import og placer SpinsRemaining under BetControls |

