
# Plan: Fjern mellemrum mellem header og titel

## Problem
Der er et stort mellemrum mellem navigationsheaderen og "Book of Fedesvin" titel-kunsten på intro-skærmen. Dette skyldes top-padding i containeren.

## Løsning
Fjern top-padding fra `SlotIntroScreen`-komponenten så titel-billedet starter direkte under headeren.

## Ændring

### Fil: `src/components/slots/SlotIntroScreen.tsx`

**Linje 14 - Ændre container-styling:**

Før:
```tsx
<div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-start pt-4 sm:pt-6 px-4">
```

Efter:
```tsx
<div className="min-h-[calc(100vh-4rem)] relative flex flex-col items-center justify-start pt-0 px-4">
```

## Resultat
Titel-kunsten vil nu vises direkte under headeren uden noget mellemrum.
