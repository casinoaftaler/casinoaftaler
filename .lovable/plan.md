
# Plan: Rette gevinstlinjer med shimmer-effekt

## Oversigt

Denne plan ændrer gevinstlinjerne fra kurvede til rette linjer og tilføjer en animeret shimmer-effekt der glider langs linjen.

## Ændringer

### 1. Rette linjer i stedet for kurver

Ændrer `generateLinePath` funktionen til at bruge simple lige linjer (`L` kommandoer) i stedet for bezier-kurver (`Q` kommandoer):

```text
Før:  M start Q kontrol1, midt Q kontrol2, slut  (kurvet)
Efter: M start L punkt2 L punkt3 L punkt4 L slut  (ret)
```

### 2. Shimmer-effekt med SVG gradient animation

Tilføjer en animeret linear gradient der bevæger sig langs linjen:

- Opretter en `linearGradient` i SVG defs med en hvid/gennemsigtig overgang
- Animerer gradientens position med `animateTransform`
- Lægger shimmer-effekten oven på de eksisterende linjer

### 3. CSS animation for shimmer

Tilføjer en ny `@keyframes line-shimmer` animation i `src/index.css` der flytter en lysende stribe langs linjen.

---

## Tekniske detaljer

### Fil: `src/components/slots/WinLines.tsx`

**Ændring 1 - Ret linje-generering (linje 63-90):**
```tsx
const generateLinePath = (lineIndex: number, _count: number) => {
  const pattern = PAY_LINES[lineIndex];
  const points: { x: number; y: number }[] = [];

  for (let col = 0; col < 5; col++) {
    const row = pattern[col];
    points.push(getSymbolCenter(col, row));
  }

  if (points.length < 2) return "";

  // Brug rette linjer i stedet for kurver
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }

  return path;
};
```

**Ændring 2 - Tilføj shimmer gradient i defs (linje 112-122):**
```tsx
<defs>
  {/* Eksisterende glow filters... */}
  
  {/* Shimmer gradient til hver linje */}
  {LINE_COLORS.map((color, index) => (
    <linearGradient 
      key={`shimmer-${index}`} 
      id={`shimmer-gradient-${index}`}
      x1="0%" y1="0%" x2="100%" y2="0%"
    >
      <stop offset="0%" stopColor="transparent" />
      <stop offset="40%" stopColor="transparent" />
      <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
      <stop offset="60%" stopColor="transparent" />
      <stop offset="100%" stopColor="transparent" />
      <animateTransform
        attributeName="gradientTransform"
        type="translate"
        from="-1 0"
        to="1 0"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </linearGradient>
  ))}
</defs>
```

**Ændring 3 - Tilføj shimmer overlay linje (efter inner core line, ca. linje 186):**
```tsx
{/* Shimmer effect moving along the line */}
{isLineVisible && (
  <path
    d={path}
    fill="none"
    stroke={`url(#shimmer-gradient-${win.lineIndex})`}
    strokeWidth={6}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ opacity: 0.7 }}
  />
)}
```

### Fil: `src/index.css`

Tilføj fallback shimmer keyframes animation (valgfri, som backup):
```css
@keyframes line-shimmer {
  0% {
    stroke-dashoffset: 100%;
  }
  100% {
    stroke-dashoffset: -100%;
  }
}
```

---

## Resultat

- Gevinstlinjer tegnes nu som rette streger mellem symbol-centrene
- En gylden shimmer-effekt glider kontinuerligt langs hver synlig gevinstlinje
- Den eksisterende blinkende animation bevares
- Alle linjer bruger stadig det egyptiske guld/rav farvetema
