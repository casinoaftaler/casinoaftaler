

## Problem

Book of Fedesvin og Rise of Fedesvin er ubrugelige på mobil. Symbolerne renderes i fuld desktop-størrelse (150px × 5 kolonner = 750px+ bredde) inden i en container der bare bruger `w-full px-1` uden nogen skalering. Resultatet er at gitteret overflower skærmen massivt (se screenshot).

**Rodårsagen:** `SlotGame.tsx` og `SlotReel.tsx` har hardcoded `SYMBOL_SIZE = 150` og `SYMBOL_HEIGHT = 150` uden nogen `isMobile` prop eller responsiv tilpasning. Til sammenligning har `BonanzaSlotGame` en `isMobile` prop der dynamisk beregner symbolstørrelser baseret på viewport-bredden – derfor virker Bonanza fint på mobil.

## Løsning

Den simpleste og sikreste fix: **Brug CSS transform scaling på mobil i stedet for native width** – samme tilgang som desktop, bare med mobil-viewport som udgangspunkt.

### Ændringer

**1. `SlotMachine.tsx` (Book of Fedesvin) – linje 225-231**

Fjern den separate mobile path der renderer uden skalering. Brug i stedet den samme CSS transform-skalering som desktop, men med `transformOrigin: 'top center'` så spillet skaleres ned fra toppen og passer i viewport:

```tsx
{isMobile ? (
  <div className="flex-1 flex items-start justify-center overflow-hidden">
    <div
      className="slot-viewport-container"
      style={{
        width: '1200px',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        marginBottom: `${-(920 * (1 - scale))}px`,
        marginLeft: `${-(1200 * (1 - scale)) / 2}px`,
        marginRight: `${-(1200 * (1 - scale)) / 2}px`,
      }}
    >
      <SlotPageLayout sidePanel={null}>
        <SlotGame />
      </SlotPageLayout>
    </div>
  </div>
) : (
  // ... desktop unchanged
)}
```

**2. `RiseOfFedesvin.tsx` – linje 223-231**

Identisk fix som ovenfor, med `gameId={GAME_ID}`:

```tsx
{isMobile ? (
  <div className="flex-1 flex items-start justify-center overflow-hidden">
    <div
      className="slot-viewport-container"
      style={{
        width: '1200px',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        marginBottom: `${-(920 * (1 - scale))}px`,
        marginLeft: `${-(1200 * (1 - scale)) / 2}px`,
        marginRight: `${-(1200 * (1 - scale)) / 2}px`,
      }}
    >
      <SlotPageLayout sidePanel={null}>
        <SlotGame gameId={GAME_ID} />
      </SlotPageLayout>
    </div>
  </div>
) : (
  // ... desktop unchanged
)}
```

**3. `useSlotScale.ts` – ingen ændringer nødvendige**

Hooken beregner allerede korrekt skalering baseret på viewport. På en 390px bred mobil med 1200px base-bredde giver den `scale ≈ 0.32`, hvilket passer perfekt.

### Hvorfor denne tilgang

- Ingen ændringer til `SlotGame.tsx` eller `SlotReel.tsx` (ingen risiko for at bryde desktop)
- Samme skaleringsmetode som allerede virker på desktop
- `transformOrigin: 'top center'` sikrer at spillet starter fra toppen af skærmen på mobil (ingen tom plads over spillet)
- Negative margins kompenserer for CSS transform's pladsreservering

