

# Plan: Gylden Glødende Stroke på Scatter Under Tease

## Problem
Når spillemaskinen teaser (bygger op til en mulig bonus), skal scatter-symbolerne have en synlig gylden glødende ramme/stroke for at fremhæve dem og øge spændingen.

---

## Løsning

### Tilføj en ny tease-tilstand til SlotSymbol komponenten

Når scatter-symboler er synlige under tease-mode, skal de have en animeret gylden glødende ramme rundt om sig.

---

## Ændringer

### 1. Opdater SlotSymbol.tsx

Tilføj ny prop `isTeasing` for at indikere at symbolet er i tease-tilstand:

```typescript
interface SlotSymbolProps {
  symbol: SlotSymbolType;
  isWinning?: boolean;
  isSpinning?: boolean;
  isExpanded?: boolean;
  isNewlyExpanded?: boolean;
  hasLanded?: boolean;
  isTeasing?: boolean;  // NY: Scatter tease glow
}
```

Tilføj gylden glødende ramme styling når `isTeasing` er true og symbolet er scatter:

```typescript
<div
  className={cn(
    "relative flex items-center justify-center rounded-lg border-2 transition-all duration-300 overflow-hidden",
    // ... existing classes ...
    // Scatter tease glow - golden animated border
    isTeasing && symbol.is_scatter && 
    "border-amber-400 animate-[scatter-tease-glow_1s_ease-in-out_infinite]"
  )}
>
```

### 2. Opdater SlotReel.tsx

Pass `isTeasing` prop til SlotSymbol baseret på tease-tilstand:

- Når hjulet er i fake loop mode OG scatter er landet på et tidligere hjul
- Når hjulet er i active tease mode

```typescript
<SlotSymbol
  symbol={symbol}
  isSpinning={true}
  isTeasing={
    (isFakeLooping && scatterLandedOnPreviousReel) || 
    isActiveTeaseReel
  }
/>
```

For idle/stopped tilstand skal scatter-symboler også vise tease-glow hvis scatter allerede er landet:

```typescript
<SlotSymbol
  symbol={symbol}
  isWinning={winningPositions.includes(rowIndex)}
  isSpinning={false}
  isExpanded={symbolIsExpanded}
  isNewlyExpanded={symbolIsNewlyExpanded}
  hasLanded={spinState === "stopped"}
  isTeasing={symbol.is_scatter && scatterLandedOnPreviousReel && spinState !== "stopped"}
/>
```

### 3. Tilføj CSS Animation til index.css

Tilføj en ny keyframes animation for scatter tease glow:

```css
@keyframes scatter-tease-glow {
  0%, 100% {
    border-color: rgba(251, 191, 36, 0.6);
    box-shadow: 
      0 0 10px rgba(251, 191, 36, 0.5),
      0 0 20px rgba(251, 191, 36, 0.3),
      inset 0 0 10px rgba(251, 191, 36, 0.1);
  }
  50% {
    border-color: rgba(251, 191, 36, 1);
    box-shadow: 
      0 0 20px rgba(251, 191, 36, 0.8),
      0 0 40px rgba(251, 191, 36, 0.5),
      0 0 60px rgba(251, 191, 36, 0.3),
      inset 0 0 15px rgba(251, 191, 36, 0.2);
  }
}
```

---

## Visuelt Resultat

```text
Normal spinning:
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│   🎴   │  │   🐺   │  │   📖   │  │ SPINNING│  │ SPINNING│
│   🦅   │  │   👑   │  │   🅰️   │  │ SPINNING│  │ SPINNING│
│   🪲   │  │   ☥   │  │   👸   │  │ SPINNING│  │ SPINNING│
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘

Tease mode (2 scatters landed, reels 4-5 slowing):
┌─────────┐  ┌─────────┐  ╔═════════╗  ┌─────────┐  ┌─────────┐
│   🎴   │  │   🐺   │  ║ ✨📖✨  ║  │ TEASING │  │ TEASING │
│   🦅   │  │   👑   │  ║ GYLDEN  ║  │   ✨    │  │   ✨    │
│   🪲   │  │   ☥   │  ║  GLOW   ║  │  GLOW   │  │  GLOW   │
└─────────┘  └─────────┘  ╚═════════╝  └─────────┘  └─────────┘
                              ↑
                    Scatter med gylden glødende stroke
```

---

## Filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/components/slots/SlotSymbol.tsx` | Tilføj `isTeasing` prop og gylden glow styling |
| `src/components/slots/SlotReel.tsx` | Pass `isTeasing` prop til scatter-symboler under tease |
| `src/index.css` | Tilføj `scatter-tease-glow` keyframes animation |

---

## Tekniske Detaljer

### Tease Glow Effekt:
- **Border**: Animeret gylden (amber-400) kant der pulserer
- **Box-shadow**: Multi-layer glow effekt med outer og inner glow
- **Animation**: 1 sekund loop med ease-in-out timing
- **Intensitet**: Pulserer mellem 60% og 100% opacity

### Hvornår vises glow:
1. Når scatter-symboler allerede er landet og flere hjul teaser
2. Kun på scatter-symboler (ikke almindelige symboler)
3. Stopper når alle hjul er stoppet

