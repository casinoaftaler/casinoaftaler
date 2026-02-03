

# Flyt Rammen Bagved Slot-Symbolerne

## Problem
Ramme-billedet bruger `z-10` som placerer det FORAN alt indhold, så slot-symbolerne er skjulte bag rammen.

## Løsning
Ændre z-index fra `z-10` til `-z-10` så rammen placeres BAGVED indholdet.

---

## Tekniske Detaljer

### Fil: `src/components/slots/SlotMachineFrame.tsx`

**Linje 29 - Ændre z-index:**

| Fra | Til |
|-----|-----|
| `z-10` | `-z-10` |

```typescript
// Fra:
"absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"

// Til:
"absolute inset-0 pointer-events-none -z-10 transition-opacity duration-500"
```

---

## Visuelt Resultat

```text
          ╔════════════════════════════════╗
          ║  ┌──────────────────────────┐  ║
          ║  │ [●][●][●][●][●] ← Synlige│  ║
          ║  │ [●][●][●][●][●]   nu!    │  ║
          ║  │ [●][●][●][●][●]          │  ║
          ║  └──────────────────────────┘  ║
          ╚════════════════════════════════╝
               ↑ Rammen er nu BAGVED
```

## Forventede Ændringer

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotMachineFrame.tsx` | Ændre `z-10` til `-z-10` på linje 29 |

