
# Tilføj Max-Width til SlotGame Komponenten

## Oversigt
For at sikre at spin-knappen centreres inden for samme bredde som slot-maskinens hjul, skal der tilføjes en `max-width` begrænsning til SlotGame komponentens ydre container.

## Problemet
- Spin-knappen bruger `flex justify-center` og centreres inden for hele den overordnede container
- Slot-maskinen (SlotMachineFrame) har en naturlig bredde baseret på hjulene
- Da der ikke er nogen max-width, kan spin-knappen centreres i et bredere område end selve slot-maskinen

## Løsningen
Tilføj en `max-width` og `mx-auto` klasse til den ydre wrapper-div i SlotGame, så alle elementer (inklusive spin-knappen) centreres inden for samme bredde som slot-maskinen.

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotGame.tsx`

**Linje 400-406 - Opdater container div:**

Fra:
```typescript
<div 
  className={cn(
    "overflow-hidden",
    bonusState.isActive && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
  )}
>
  <div className="p-1 xs:p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
```

Til:
```typescript
<div 
  className={cn(
    "overflow-hidden max-w-fit mx-auto",
    bonusState.isActive && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
  )}
>
  <div className="p-1 xs:p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
```

---

## Hvad `max-w-fit` gør
- `max-w-fit` begrænser containerens bredde til at matche dens indhold (slot-maskinen)
- `mx-auto` centrerer denne container på siden
- Dette sikrer at spin-knappen, controls og andre elementer alle centreres inden for slot-maskinens bredde

## Visuelt Resultat
```
              ╭────────────────────────────╮
              │                            │
              │   [SLOT MACHINE FRAME]     │
              │   [●][●][●][●][●]          │
              │   [●][●][●][●][●]          │
              │   [●][●][●][●][●]          │
              │                            │
              ├────────────────────────────┤
              │  [Bet] [Auto] [Win] [🔊]   │  ← Centreret i samme bredde
              ├────────────────────────────┤
              │                            │
              │      ╭─────────────╮       │
              │      │     🎰      │       │  ← Perfekt centreret
              │      │    SPIN     │       │     under maskinen
              │      ╰─────────────╯       │
              │                            │
              ╰────────────────────────────╯
```

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotGame.tsx` | Tilføj `max-w-fit mx-auto` til ydre container |
