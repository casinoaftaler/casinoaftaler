
# Plan: Fix Title og Frame Overlap på Mobil

## Problem
På mobile enheder overlapper titel-billedet og spillemaskinens ramme hinanden. Dette skyldes en kombination af:
1. Titel-billedet har negativ top-margin (`-mt-4` på mobil)
2. Rammen strækker sig 90px ud over indholds-boksen (via `top: -90px`)
3. Ramme-wrapperens top-margin er kun 30px (begrænsning), hvilket ikke giver nok plads

## Løsning
Fjern den negative top-margin fra titel-billedet og tilføj responsive margin-top til rammen, så der altid er nok plads mellem titel og ramme - især på mobil.

---

## Filer der ændres

### 1. `src/pages/SlotMachine.tsx`

**Ændring:** Fjern negativ margin på titel-billedet og tilføj minimal positiv spacing

```tsx
// Fra (linje 132):
<div className="flex justify-center -mt-4 sm:-mt-2">

// Til:
<div className="flex justify-center pt-2 sm:pt-4">
```

Dette sikrer at titlen altid har lidt positiv afstand fra toppen.

### 2. `src/components/slots/SlotMachineFrame.tsx`

**Ændring:** Gør top-margin responsiv og større på mobil for at undgå overlap

```tsx
// Fra (linje 30):
marginTop: hasFrame && imageLoaded ? `${Math.min(frameSize * 0.3, 30)}px` : undefined,

// Til - responsive margin der tager højde for ramme-størrelse:
marginTop: hasFrame && imageLoaded ? `${Math.max(frameSize * 0.1, 8)}px` : undefined,
```

Reducér top-margin da titel-billedet nu har positiv spacing, men behold en minimal margin for visuel separation.

### 3. `src/components/slots/SlotGame.tsx`

**Ændring:** Reducér negativ margin på BonusStatusBar da titlen nu har korrekt spacing

```tsx
// Fra (linje 416):
<div className="max-w-fit mx-auto mb-1 sm:mb-2 -mt-8 sm:-mt-10">

// Til:
<div className="max-w-fit mx-auto mb-1 sm:mb-2">
```

Fjern negativ top-margin da titel-positionen nu er korrekt.

---

## Visuelt Resultat

```text
┌─────────────────────────────┐
│                             │
│     [Titel Billede]         │  ← Positiv top-padding
│                             │
│     ┌───────────────┐       │  ← Rammen starter under titlen
│ ╔═══╪═══════════════╪═══╗   │
│ ║   │  Slot Reels   │   ║   │
│ ╚═══╪═══════════════╪═══╝   │
│     └───────────────┘       │
└─────────────────────────────┘
```

---

## Tekniske Detaljer

| Breakpoint | Titel Spacing | Forventet Afstand |
|------------|---------------|-------------------|
| xs (<400px) | `pt-2` (8px) | Titel helt adskilt fra ramme |
| sm (640px+) | `pt-4` (16px) | Mere luft på større skærme |

Ramme-marginerne justeres automatisk baseret på `slot_frame_size` indstillingen, med en minimum på 8px for at undgå at rammen trækkes helt op i titlen.
