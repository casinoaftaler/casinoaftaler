
# Visning af Gevinstlinjer på Spillemaskinen

## Overblik
Tilføjer en visuel overlay til spillemaskinen der viser de gevinstlinjer der blev ramt efter et spin. Linjerne vil blive tegnet som farvede linjer/kurver der forbinder de vindende symboler på tværs af hjulene.

## Implementeringsplan

### 1. Ny Komponent: WinLines.tsx
Opretter en ny komponent der tegner SVG-linjer hen over hjulene for at visualisere gevinstlinjerne.

**Funktioner:**
- Modtager liste af vundne linjer fra `SpinResult`
- Tegner farvede linjer baseret på PAY_LINES mønstrene
- Animerer linjerne sekventielt (én ad gangen eller alle på én gang)
- Hver linje får en unik farve for at skelne mellem flere gevinster
- Viser linjenummer og gevinst ved siden af linjen

### 2. Opdatering af SlotGame.tsx
- Tilføjer state til at tracke hvilke linjer der skal vises
- Viser WinLines overlay efter spin er færdigt
- Aktiverer visningen når der er gevinster
- Timer til at skjule linjerne efter et par sekunder

### 3. Linje-Farver og Styling
```text
Linje 1 (midt): Gul (#FFD700)
Linje 2 (top): Rød (#FF4444)
Linje 3 (bund): Grøn (#44FF44)
Linje 4 (V-form): Blå (#4444FF)
Linje 5 (omvendt V): Orange (#FF8800)
Linje 6-10: Andre distinkte farver
```

### 4. SVG Linje-Beregning
- Beregner midtpunktet af hvert symbol baseret på PAY_LINES mønster
- Tegner en linje/kurve der forbinder punkterne
- Kun tegner linjen for de symboler der er del af gevinsten (baseret på `count`)

---

## Tekniske Detaljer

### WinLines Komponent Props
```typescript
interface WinLinesProps {
  wins: LineWin[];
  symbolSize: { width: number; height: number };
  gap: number;
  isVisible: boolean;
}
```

### Responsive Dimensioner
Komponenten genbruger de samme dimensionsberegninger som SlotReel for at sikre korrekt placering:
- Mobile: 80x80px symboler, 8px gap
- SM: 96x96px, 12px gap
- MD: 112x112px, 16px gap
- LG: 128x128px, 16px gap

### Animation
- Linjerne fader ind efter spin stopper
- Hver linje pulserer for at tiltrække opmærksomhed
- Linjer vises i 3-4 sekunder før de fader ud
- Under autospin vises linjerne i kortere tid

### SlotGame Ændringer
1. Tilføjer `showWinLines` state
2. Aktiverer når `lastResult.wins.length > 0`
3. Timer der deaktiverer efter 3 sekunder
4. WinLines overlay placeres absolut over reel-containeren
