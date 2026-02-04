
# Plan: Automatisk Fuldskærm ved Spillemaskinens Start

## Oversigt

Når brugeren klikker på intro-skærmen for at starte spillet, går siden automatisk i fuldskærmstilstand (ligesom F11). Dette giver en mere immersiv spiloplevelse uden header, browser-UI osv.

## Hvad Ændres?

| Før | Efter |
|-----|-------|
| Spillet starter i normalt browser-vindue | Spillet starter automatisk i fuldskærm |
| Header er altid synlig | Header skjules i fuldskærm |
| Ingen måde at forlade fuldskærm udover ESC | Knap til at forlade fuldskærm vises |

## Implementering

### 1. Opret Fuldskærms-Hook (`src/hooks/useFullscreen.ts`)

En genbrugelig hook til at håndtere fuldskærmsfunktionalitet:

```text
Funktioner:
- isFullscreen: Boolean der angiver om vi er i fuldskærm
- enterFullscreen(): Anmoder om fuldskærm
- exitFullscreen(): Forlader fuldskærm
- toggleFullscreen(): Skifter mellem tilstande
```

Understøtter forskellige browser-varianter af Fullscreen API.

### 2. Opdater SlotIntroScreen (`src/components/slots/SlotIntroScreen.tsx`)

Når brugeren klikker for at starte:
1. Kald `onStart()` som normalt (skifter til 'ready' fase)
2. Anmod om fuldskærm via `document.documentElement.requestFullscreen()`

Note: Fuldskærm kræver brugerinteraktion (klik), så det passer perfekt med intro-skærmen.

### 3. Tilføj Fuldskærms-Knap i SlotMachine (`src/pages/SlotMachine.tsx`)

Vis en lille knap når spillet er i gang:
- Hvis i fuldskærm: Vis "Forlad fuldskærm" knap (med `Minimize2` ikon)
- Hvis ikke i fuldskærm: Vis "Gå i fuldskærm" knap (med `Maximize2` ikon)

Placering: Øverste højre hjørne af spillets container (diskret men tilgængelig).

### 4. Håndter Escape-Tast

Browseren håndterer ESC automatisk for at forlade fuldskærm - dette behøver ingen ekstra kode.

## Teknisk Detaljer

### Fullscreen API Browser-Support

```typescript
// Hook kode (useFullscreen.ts)
const enterFullscreen = async () => {
  try {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      await el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      await (el as any).webkitRequestFullscreen(); // Safari
    } else if ((el as any).msRequestFullscreen) {
      await (el as any).msRequestFullscreen(); // IE/Edge
    }
  } catch (err) {
    console.warn('Fullscreen not supported:', err);
  }
};
```

### Event Listeners

Lyt efter `fullscreenchange` events for at holde `isFullscreen` state synkroniseret:

```typescript
useEffect(() => {
  const handler = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  document.addEventListener('fullscreenchange', handler);
  return () => document.removeEventListener('fullscreenchange', handler);
}, []);
```

## Fil-Ændringer

| Fil | Ændring |
|-----|---------|
| `src/hooks/useFullscreen.ts` | **Ny fil** - Hook til fuldskærmsstyring |
| `src/components/slots/SlotIntroScreen.tsx` | Anmod fuldskærm ved klik |
| `src/pages/SlotMachine.tsx` | Tilføj fuldskærms-knap i øverste hjørne |

## Brugeroplevelse

1. Bruger navigerer til `/community/slots`
2. Loading-skærm vises → derefter intro-skærm
3. Bruger klikker på intro-billedet
4. **Browseren går i fuldskærm** + spillet starter
5. Lille knap i hjørnet tillader at forlade fuldskærm (eller tryk ESC)
6. Når bruger navigerer væk, afsluttes fuldskærm automatisk

## Vigtige Bemærkninger

- **Mobil**: Fuldskærm fungerer anderledes på mobil - nogle enheder understøtter det ikke. Vi viser ikke fejl, bare ignorerer det stille.
- **Bruger Afvisning**: Hvis bruger afviser fuldskærms-prompten, fortsætter spillet normalt.
- **Ikke blokerende**: Hvis fuldskærm fejler, starter spillet stadig.
