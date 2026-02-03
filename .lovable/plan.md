

# Plan: Pulserende Glow-effekt og Flyt Bonus Status Bar

## Oversigt
Tilføj en pulserende gylden glow-animation rundt om bonus-status baren under free spins, og flyt baren højere op så den ikke dækker over rammen.

---

## Filer der skal ændres

### 1. `src/index.css`
Tilføj ny keyframe animation for pulserende glow:

```css
@keyframes bonus-bar-glow {
  0%, 100% {
    box-shadow: 
      0 0 10px rgba(251,191,36,0.4),
      0 0 20px rgba(251,191,36,0.2),
      0 0 30px rgba(251,191,36,0.1);
  }
  50% {
    box-shadow: 
      0 0 20px rgba(251,191,36,0.6),
      0 0 40px rgba(251,191,36,0.4),
      0 0 60px rgba(251,191,36,0.2);
  }
}
```

---

### 2. `src/components/slots/BonusStatusBar.tsx`
Tilføj den pulserende glow-effekt til containerens styling:

**Nuværende styling (linje 25-30):**
```tsx
className={cn(
  "w-full p-2 sm:p-3 rounded-xl",
  "bg-card/70 backdrop-blur-sm",
  "border border-border/60",
  "shadow-sm"
)}
```

**Ny styling:**
```tsx
className={cn(
  "w-full p-2 sm:p-3 rounded-xl",
  "bg-card/70 backdrop-blur-sm",
  "border border-amber-400/50",
  "animate-[bonus-bar-glow_2s_ease-in-out_infinite]"
)}
```

**Ændringer:**
- Ændret border fra `border-border/60` til `border-amber-400/50` for gylden kant
- Erstattet `shadow-sm` med den nye pulserende glow-animation

---

### 3. `src/components/slots/SlotGame.tsx`
Flyt bonus-status baren højere op ved at øge den negative margin:

**Nuværende (linje 410):**
```tsx
<div className="max-w-fit mx-auto mb-1 sm:mb-2 -mt-5">
```

**Ny:**
```tsx
<div className="max-w-fit mx-auto mb-1 sm:mb-2 -mt-8 sm:-mt-10">
```

Dette flytter baren 8-10 rem højere op (responsivt) så den ikke overlapper rammen.

---

## Visuel Resultat

| Element | Før | Efter |
|---------|-----|-------|
| Bonus bar kant | Grå (`border-border/60`) | Gylden (`border-amber-400/50`) |
| Bonus bar skygge | Statisk (`shadow-sm`) | Pulserende gylden glow (2s cyklus) |
| Bonus bar position | `-mt-5` (alle skærme) | `-mt-8` mobil, `-mt-10` desktop |

---

## Animation Karakteristik

- **Varighed:** 2 sekunder per cyklus
- **Timing:** `ease-in-out` for blød overgang
- **Intensitet:** Pulserer mellem svag og stærk gylden glow
- **Farve:** Amber/guld (rgba(251,191,36)) for konsistens med temaet

