

# Reducer Afstanden Mellem Titel og Spillemaskine

## Oversigt
Reducer padding og mellemrum mellem navigationen, titelbilledet og spillemaskinen for at skabe et mere kompakt layout.

## Nuværende Spacing
- Container: `py-1` (4px top/bottom padding)
- Titelbillede: `mb-1` (4px margin-bottom)
- Slot wrapper: `gap-2` (8px gap)

Selvom værdierne allerede er ret små, kan vi reducere dem yderligere eller helt fjerne dem.

---

## Tekniske Detaljer

### Fil: `src/pages/SlotMachine.tsx`

**Ændring 1 - Linje 99: Fjern vertikal padding fra container**

| Fra | Til |
|-----|-----|
| `py-1` | (fjernes helt) |

```typescript
// Fra:
<div className="container px-2 sm:px-4 py-1">

// Til:
<div className="container px-2 sm:px-4">
```

**Ændring 2 - Linje 101: Fjern margin under titelbilledet**

| Fra | Til |
|-----|-----|
| `mb-1` | (fjernes helt) |

```typescript
// Fra:
<div className="flex justify-center mb-1">

// Til:
<div className="flex justify-center">
```

**Ændring 3 - Linje 122: Reducer gap mellem elementer**

| Fra | Til |
|-----|-----|
| `gap-2` | `gap-1` |

```typescript
// Fra:
<div className="flex flex-col items-center gap-2">

// Til:
<div className="flex flex-col items-center gap-1">
```

---

## Visuelt Resultat

```text
Før:                          Efter:
┌─────────────────────┐       ┌─────────────────────┐
│     NAVIGATION      │       │     NAVIGATION      │
├─────────────────────┤       ├─────────────────────┤
│                     │       │  ☥ BOOK OF FEDESVIN │
│  ☥ BOOK OF FEDESVIN │       ├─────────────────────┤
│                     │       │   [SLOT MACHINE]    │
├─────────────────────┤       │   [●][●][●][●][●]   │
│                     │       │   [●][●][●][●][●]   │
│   [SLOT MACHINE]    │       │   [●][●][●][●][●]   │
│   [●][●][●][●][●]   │       ├─────────────────────┤
│   [●][●][●][●][●]   │       │      [SPIN 🎰]      │
│   [●][●][●][●][●]   │       └─────────────────────┘
│                     │
├─────────────────────┤           ↑ Meget mere
│      [SPIN 🎰]      │             kompakt!
└─────────────────────┘
```

## Forventede Ændringer

| Fil | Linje | Ændring |
|-----|-------|---------|
| `src/pages/SlotMachine.tsx` | 99 | Fjern `py-1` fra container |
| `src/pages/SlotMachine.tsx` | 101 | Fjern `mb-1` fra titel-wrapper |
| `src/pages/SlotMachine.tsx` | 122 | Ændre `gap-2` til `gap-1` |

