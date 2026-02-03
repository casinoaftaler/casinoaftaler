
# Plan: Forbedret Big Win Notifikation

## Oversigt
Tilføj en semi-transparent baggrund omkring Big Win teksten, en pulserende animation på gevinstbeløbet når tælleranimationen er færdig, og blokér spinning indtil hele animationen er afsluttet.

---

## Ændringer

### 1. Fil: `src/components/slots/WinCelebration.tsx`

**Tilføj baggrund og puls-animation:**

| Ændring | Beskrivelse |
|---------|-------------|
| Ny state | `isPulsing` - tracker om tælleren er færdig og pulserer |
| Ny state | `countingDone` - tracker om tælleren har nået målet |
| Baggrund | Semi-transparent mørk baggrund med blur-effekt og gylden kant omkring Big Win overlay |
| Puls-animation | Når `displayAmount === winAmount`, start 3-4 pulser før forsvinden |
| Callback prop | Ny `onAnimationComplete` callback der kaldes når hele animationen er færdig |

**Struktur efter ændring:**
```tsx
// Ny baggrund wrapper omkring Big Win text
<div className="bg-black/70 backdrop-blur-sm rounded-2xl px-8 py-6 border-2 border-amber-500/50">
  {/* BIG WIN! tekst */}
  {/* Point tekst med puls-animation når counting done */}
</div>
```

---

### 2. Fil: `src/index.css`

**Tilføj ny keyframe animation:**

```css
@keyframes win-amount-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}
```

---

### 3. Fil: `src/components/slots/SlotGame.tsx`

**Opdater WinCelebration props og timing:**

| Ændring | Beskrivelse |
|---------|-------------|
| Ny prop | `onAnimationComplete` callback til WinCelebration |
| Timing | Erstat `setTimeout(() => setIsWinAnimating(false), 2000)` med callback-baseret logik |
| Blokering | `isWinAnimating` bruges allerede til at blokere spinning - dette sikrer animationen fuldføres |

---

## Animationsflow

```text
[Spin resultat]
     │
     ▼
[Big Win overlay vises med baggrund]
     │
     ▼
[Tal tæller op: 0 → 1500 (1.5-2.5s)]
     │
     ▼
[Tæller færdig → Puls animation starter (0.8s)]
     │
     ▼
[3 pulser → Fade out → onAnimationComplete]
     │
     ▼
[isWinAnimating = false → Spin tilladt]
```

---

## Tekniske detaljer

### WinCelebration.tsx ændringer:

1. **Ny interface prop:**
```tsx
interface WinCelebrationProps {
  isActive: boolean;
  winAmount: number;
  bet: number;
  onAnimationComplete?: () => void; // NY
}
```

2. **Nye states:**
```tsx
const [countingDone, setCountingDone] = useState(false);
const [isPulsing, setIsPulsing] = useState(false);
```

3. **Detekter når tælleren er færdig:**
```tsx
useEffect(() => {
  if (showBigWin && displayAmount === winAmount && winAmount > 0) {
    setCountingDone(true);
    setIsPulsing(true);
    
    // Puls i 800ms, derefter forsvind
    const pulseTimeout = setTimeout(() => {
      setIsPulsing(false);
      setShowBigWin(false);
      onAnimationComplete?.();
    }, 800);
    
    return () => clearTimeout(pulseTimeout);
  }
}, [displayAmount, winAmount, showBigWin]);
```

4. **Baggrund styling:**
```tsx
<div className="bg-black/70 backdrop-blur-sm rounded-2xl px-6 sm:px-10 py-4 sm:py-8 border-2 border-amber-500/40 shadow-[0_0_40px_rgba(251,191,36,0.3)]">
```

5. **Pulserende beløb:**
```tsx
<div
  className={cn(
    "mt-2 font-bold",
    isPulsing && "animate-[win-amount-pulse_0.25s_ease-in-out_3]"
  )}
>
  {displayAmount} POINT!
</div>
```

### SlotGame.tsx ændringer:

1. **Callback handler:**
```tsx
const handleWinAnimationComplete = useCallback(() => {
  setIsWinAnimating(false);
}, []);
```

2. **Fjern setTimeout:**
Erstat `setTimeout(() => setIsWinAnimating(false), 2000)` med ingenting (callback håndterer det)

3. **Opdater WinCelebration:**
```tsx
<WinCelebration
  isActive={isWinAnimating}
  winAmount={winAmount}
  bet={bet}
  onAnimationComplete={handleWinAnimationComplete}
/>
```

---

## Resultat

| Element | Status |
|---------|--------|
| Semi-transparent baggrund med blur | ✅ Tilføjet |
| Gylden kant omkring overlay | ✅ Tilføjet |
| Puls-animation efter counting | ✅ Tilføjet (3 pulser) |
| Spin blokeret under animation | ✅ Virker (callback-baseret) |
| Korrekt timing for alle win-typer | ✅ Skalerer med win-størrelse |

