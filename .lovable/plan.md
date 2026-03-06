

## Analyse: Forskelle mellem Fedesvin Bonanza vs. Book of Fedesvin / Rise of Fedesvin

### Problemet

Book of Fedesvin og Rise of Fedesvin har en **fundamentalt anderledes skaleringsmodel** end Fedesvin Bonanza. Her er de konkrete forskelle:

| Aspekt | Fedesvin Bonanza | Book of Fedesvin / Rise of Fedesvin |
|--------|-----------------|--------------------------------------|
| **Base-dimensioner** | `1880×1120` | `1280×960` (default) |
| **minScale** | `0.2` | `0.25` (default) |
| **Ydre container** | `h-[calc(100svh-4rem)]` + `overflow-hidden` | `min-h-[calc(100dvh-4rem)]` + `overflow-x-hidden` |
| **Viewport-container** | Negative margins for korrekt centrering | Kun `transform-origin: top center` via CSS-klasse |
| **Mobil-håndtering** | `useIsMobile()` → native layout uden scaling | Ingen mobilskelnen – bruger altid scale |
| **Scroll-lås** | `overflow: hidden` på body+html | Ingen scroll-lås |
| **Flex alignment** | `items-center` (vertikal centrering) | `items-start` (top-aligned) |
| **Chat** | Dynamisk positioneret `fixed` chat | Ingen chat |
| **Body overflow lock** | Ja (forhindrer scroll/bounce) | Nej |

### Plan

#### 1. Opdater `useSlotScale` kald i begge sider
Brug samme baseWidth/baseHeight som Bonanza (`1880×1120`) og `minScale: 0.2`. Disse dimensioner passer til hele slotmaskinen inkl. sidepaneler.

#### 2. Opdater ydre container
Skift fra `min-h-[calc(100dvh-4rem)]` til `h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)]` med `overflow-hidden` – identisk med Bonanza.

#### 3. Tilføj scroll-lås effect
Kopiér body/html `overflow: hidden` + `overscrollBehavior: none` effecten fra Bonanza til begge sider.

#### 4. Tilføj mobil-detection
Importér `useIsMobile()` og brug samme branching: mobil = native layout uden scaling, desktop = CSS transform med negative margins.

#### 5. Opdater viewport-container styling
Brug Bonanzas negative margin-teknik for korrekt centrering:
```
width: 1880px, height: 1120px
marginTop/Bottom: -(1120 * (1-scale)) / 2
marginLeft/Right: -(1880 * (1-scale)) / 2
```
Og `items-center` i stedet for `items-start`.

#### 6. Fjern manuelle offsets
Fjern `translate(offsetX, offsetY)` og `shouldScale`-conditionals – Bonanza bruger dem ikke, da margin-teknikken håndterer positionering korrekt.

#### 7. Tilføj dynamisk chat (valgfrit)
Hvis chat ønskes på disse spil, tilføj samme `fixed right-0` chat-komponent med dynamisk højde baseret på `scale`.

### Filer der ændres
- `src/pages/SlotMachine.tsx` (Book of Fedesvin)
- `src/pages/RiseOfFedesvin.tsx`

