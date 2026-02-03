
# Plan: Opret Bonus Afslutnings-Skærm

## Oversigt
Opret en dedikeret, festlig bonus-afslutningsskærm der vises når free spins er slut. Inspireret af det uploadede reference-billede, men med det egyptiske guld/amber tema.

---

## Ny Komponent: `BonusCompleteScreen.tsx`

Opret en ny komponent der erstatter den simple "complete" sektion i BonusOverlay:

### Design Elementer

| Element | Beskrivelse |
|---------|-------------|
| **Baggrund** | Fullscreen mørk overlay med blur + golden glow i centrum |
| **Ramme** | Egyptisk-inspireret ramme med gyldne hjørner og border |
| **Titel** | "TILLYKKE!" med stor, animeret gylden tekst |
| **Undertekst** | "DU HAR VUNDET" i amber-100 farve |
| **Gevinstbeløb** | Stort animeret tal (bruger useAnimatedCounter) med gylden gradient |
| **Antal spins** | "I X GRATIS SPINS" med fremhævet tal |
| **Call-to-action** | "Klik for at fortsætte" med subtil puls-animation |
| **Partikler** | Gyldne stjerner og mønter der falder ned |
| **Egyptiske ikoner** | Dekorative ankh/scarab ikoner i hjørnerne |

### Animations Flow

```text
1. Overlay fader ind (300ms)
2. Ramme zoomer ind med bounce (500ms)
3. "TILLYKKE!" tekst popper ind (400ms, delay 200ms)
4. "DU HAR VUNDET" fader ind (300ms, delay 400ms)
5. Gevinstbeløb tæller op (1500-2500ms, delay 600ms)
6. Partikler begynder at falde (kontinuerligt)
7. Glow-effekt pulserer (kontinuerligt)
```

---

## Filer der skal ændres/oprettes

### 1. Opret `src/components/slots/BonusCompleteScreen.tsx`

```tsx
// Ny dedikeret komponent til bonus-afslutning
interface BonusCompleteScreenProps {
  isVisible: boolean;
  totalWinnings: number;
  totalSpinsUsed: number;
  onClose: () => void;
}

// Indeholder:
// - Fullscreen overlay med egyptisk ramme
// - Animeret "TILLYKKE!" header
// - Animeret gevinsttæller
// - Faldende gyldne partikler
// - Dekorative hjørne-elementer
```

**Styling features:**
- Baggrund: `bg-black/85 backdrop-blur-md`
- Ramme: `bg-gradient-to-b from-amber-950/90 to-amber-900/80`
- Border: `border-4 border-amber-400/70` med gyldne hjørne-dekorationer
- Tekst: Gylden gradient på titel og gevinst

### 2. Opdater `src/index.css`

Tilføj nye animations til bonus complete screen:

```css
/* Bonus complete screen animations */
@keyframes confetti-fall {
  0% { transform: translateY(-10%) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

@keyframes text-pop-in {
  0% { transform: scale(0) rotate(-10deg); opacity: 0; }
  60% { transform: scale(1.1) rotate(2deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes pulse-glow-intense {
  0%, 100% { 
    text-shadow: 0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4);
  }
  50% { 
    text-shadow: 0 0 40px rgba(251,191,36,1), 0 0 80px rgba(251,191,36,0.6);
  }
}

@keyframes egyptian-sparkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
```

### 3. Opdater `src/components/slots/BonusOverlay.tsx`

Modificer komponenten til at bruge den nye BonusCompleteScreen for "complete" type:

```tsx
// Når type === "complete", render BonusCompleteScreen i stedet
if (type === "complete") {
  return (
    <BonusCompleteScreen
      isVisible={isVisible}
      totalWinnings={totalWinnings}
      totalSpinsUsed={totalFreeSpins}
      onClose={onClose}
    />
  );
}
```

### 4. Opdater `src/hooks/useBonusGame.ts`

Tilføj tracking af total antal spins brugt:

```tsx
// Tilføj til BonusGameState:
totalSpinsUsed: number;

// Opdater endBonus() til at returnere både winnings og spins:
const endBonus = useCallback(() => {
  const finalWinnings = bonusState.bonusWinnings;
  const totalSpins = bonusState.totalFreeSpins;
  setBonusState(INITIAL_STATE);
  return { winnings: finalWinnings, spins: totalSpins };
}, [bonusState.bonusWinnings, bonusState.totalFreeSpins]);
```

### 5. Opdater `src/components/slots/SlotGame.tsx`

Opdater hvor bonus complete vises til at inkludere antal spins:

```tsx
// I handleBonusEnd:
const { winnings, spins } = endBonus();
setBonusTotalWinnings(winnings);
setBonusTotalSpinsUsed(spins); // Ny state
setShowBonusComplete(true);
```

---

## Visuel Sammenligning

| Reference (Candy) | Vores Design (Egyptisk) |
|-------------------|-------------------------|
| Pink/lilla baggrund | Mørk med gylden glow |
| "CONGRATULATIONS" | "TILLYKKE!" |
| Pink candy-ramme | Egyptisk gylden ramme |
| "$7.80" i pink badge | Stort gyldent tal med glow |
| "IN 10 FREE SPINS" | "I X GRATIS SPINS" |
| Stjerner rundt om | Ankh/scarab ikoner + gyldne partikler |

---

## Partikkel-system

Genbruger det eksisterende partikkel-system fra WinCelebration, men med:
- Flere partikler (80+)
- Længere animationsvarighed
- Fokus på gyldne mønter og stjerner
- Subtile egyptiske symboler (ankh, scarab emojis)

---

## Tekniske Detaljer

**Performance:**
- Partikler oprettes kun når skærmen vises
- Cleanup via useEffect når komponenten unmountes
- requestAnimationFrame bruges til tæller-animation

**Responsivt design:**
- Mindre tekst på mobil (text-3xl vs text-5xl)
- Kompakt padding på små skærme
- Partikkel-antal reduceres på mobil

**Tilgængelighed:**
- Klik anywhere lukker overlayet
- Escape-tast lukker også (optional)
- aria-modal og role="dialog" attributter
