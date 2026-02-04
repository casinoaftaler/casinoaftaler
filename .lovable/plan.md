

# Plan: Juster Leaderboard og Casino Card Positionering

## Oversigt

Små positioneringsjusteringer til spillemaskinens sidepanel:
1. Leaderboard flyttes 2px ned (mindre top-margin)
2. Casino card flyttes 2px op (mindre afstand fra bunden af leaderboard)

## Ændringer

### Fil: `src/pages/SlotMachine.tsx`

| Element | Nuværende | Ny Værdi |
|---------|-----------|----------|
| Leaderboard marginTop | `-75px` | `-73px` |
| Leaderboard marginBottom (mb-3) | `12px` (0.75rem) | `10px` (~mb-2.5 eller inline style) |

### Specifik Kodeændring

**Linje 181** - Desktop leaderboard container:
```tsx
// Fra:
style={{ marginTop: '-75px' }}

// Til:
style={{ marginTop: '-73px' }}
```

**Linje 182** - Leaderboard wrapper:
```tsx
// Fra:
<div className="mb-3">

// Til:
<div className="mb-2">
```

Note: `mb-3` = 12px, `mb-2` = 8px. For præcis 2px reduktion (10px) kan vi bruge inline style i stedet.

## Resultat

- Leaderboard starter 2px lavere på skærmen
- Casino card er 2px tættere på leaderboard (mindre mellemrum)

