

## Analyse af problemet

Jeg har gennemgået alle tre sider i detaljen. Her er de præcise forskelle:

### Hvorfor titlen klippes på Rise of Fedesvin

Frame-billedet (med "Rise of Fedesvin" titlen, troldmænd og krystaller) er **absolut positioneret** med `overflow: visible` og strækker sig ~150px over selve grid-indholdet. Men viewport-containerens **forælder** har `overflow-hidden`, som klipper alt der rækker ud over containerens kanter.

Ved fuld skærmstørrelse (scale ≈ 1.0) er der nok plads. Når vinduet gøres mindre, skaleres containeren ned, og titlen klippes af forældrens overflow-hidden.

**Bonanza har ikke dette problem** fordi dens container er 1880x1120 – stor nok til at rumme hele det visuelle indhold inkl. dekorative elementer.

### Hvorfor maskinerne er mindre end Bonanza

Book of Fedesvin og Rise of Fedesvin bruger `1200x920` som base-dimensioner, mens Bonanza bruger `1880x1120`. Det vigtige er at base-dimensionerne skal matche det **faktiske visuelle indhold** – inkl. frame-dekorationer og titel. De to games har et 5x3 grid med en stor dekorativ frame, som visuelt fylder ca. 1200px bredt og **1100px højt** (inkl. titel over og krystaller under).

### Ekstra forskel: Bonanza har IKKE `flex items-center justify-center` på viewport-containeren

Book/Rise har tilføjet `flex items-center justify-center` på `slot-viewport-container`, som Bonanza IKKE har. Dette skubber indholdet ned og skaber ekstra clipping-problemer for titlen.

## Plan

### 1. Øg container-højden fra 920px til 1100px
Dette giver plads til frame-titlens visuelle udstrækning over griddet. Bredden forbliver 1200px.

### 2. Opdater useSlotScale baseHeight til 1100
Så skaleringsberegningen matcher den nye container.

### 3. Fjern `flex items-center justify-center` fra viewport-containeren
Match Bonanzas mønster – lad `SlotPageLayout` og indholdets egen centrering håndtere positionering.

### 4. Opdater negative margins til ny højde
```
marginTop/Bottom: -(1100 * (1 - scale)) / 2
```

### Filer der ændres
- `src/pages/RiseOfFedesvin.tsx`
- `src/pages/SlotMachine.tsx`

