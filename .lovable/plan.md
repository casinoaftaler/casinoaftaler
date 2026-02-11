

## Fix: Spillemaskinens kontrolbar bliver afskåret

### Problem
Skaleringshooket (`useSlotScale`) antager at spillemaskinens totale højde er 720px, men det faktiske indhold er højere -- tromler (3 rader x 150px + gaps), ramme/padding, bonus-bars og kontrolpanelet med den store spin-knap (112px) gør den reelle højde ca. 900-950px. Det betyder at skaleringsfaktoren bliver for stor, og bunden skæres af.

### Løsning
Ændr `useSlotScale` til at måle den faktiske højde af slot-containeren dynamisk med en `ResizeObserver` i stedet for at bruge en hardcoded `BASE_HEIGHT`. Dette sikrer at skaleringen altid passer til det fulde indhold uanset skærmstørrelse.

### Tekniske detaljer

**1. `src/hooks/useSlotScale.ts`**
- Tilføj en `ref` som returneres fra hooket og skal sættes på slot-containeren
- Brug `ResizeObserver` til at måle containerens faktiske højde og bredde
- Beregn scale ud fra de målte dimensioner i stedet for faste `BASE_WIDTH`/`BASE_HEIGHT`
- Behold `BASE_WIDTH = 1280` som fallback for bredden (den er korrekt)
- Øg `BASE_HEIGHT` fra 720 til ca. 920 som fallback/default indtil måling er klar
- Tilføj lidt ekstra padding til højdeberegningen for at sikre at kontrolbaren ikke afskæres

**2. `src/pages/SlotMachine.tsx` og `src/pages/RiseOfFedesvin.tsx`**
- Ingen ændringer nødvendige -- den øgede `BASE_HEIGHT` værdi løser problemet direkte

### Alternativ simpel tilgang (anbefalet)
I stedet for dynamisk måling, øg blot `BASE_HEIGHT` fra 720 til 920 i `useSlotScale.ts`. Dette er den mest stabile løsning da spillemaskinens layout er fast og forudsigeligt. Tallet 920 dækker: tromler (498px) + ramme/padding (ca. 80px) + bonus-bars (100px) + kontrolpanel (150px) + mellemrum (92px).

**Eneste fil der ændres: `src/hooks/useSlotScale.ts`**
- Linje 5: `const BASE_HEIGHT = 720;` bliver til `const BASE_HEIGHT = 920;`

