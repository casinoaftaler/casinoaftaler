

## Frit positionerbar spilleramme med admin-kontroller

### Problem
Rammen er i dag bundet til reels-containeren via `absolute` positionering med symmetriske offsets (top/left/right/bottom). Det betyder at rammen altid strækkes til at fylde en rektangulær zone omkring tromlerne med `object-fill`, hvilket "squeezer" billedet hvis proportionerne ikke matcher.

### Losning
Rammen frigores fra reel-containeren og placeres som et uafhaengigt overlay med individuel kontrol over position (X, Y), storrelse (bredde, hojde) via admin-panelet. Alle vaerdier gemmes i `site_settings` per spil.

### Nye admin-kontroller (i SlotFrameAdminControls)
Administratoren far 4 nye sliders under ramme-fanen (kun synlige nar en ramme er uploadet):

| Kontrol | Beskrivelse | Standardvaerdi |
|---------|-------------|----------------|
| **Bredde (%)** | Rammens bredde relativt til reel-containeren | 130% |
| **Hojde (%)** | Rammens hojde relativt til reel-containeren | 130% |
| **Horisontal offset (px)** | Flyt rammen til venstre/hojre | 0 |
| **Vertikal offset (px)** | Flyt rammen op/ned | 0 |

### Database-nogler (site_settings)
Per spil gemmes op til 4 ekstra vaerdier:
- `{prefix}frame_width` (default: 130)
- `{prefix}frame_height` (default: 130)  
- `{prefix}frame_offset_x` (default: 0)
- `{prefix}frame_offset_y` (default: 0)

Ingen databasemigrering noedvendig - vi bruger den eksisterende `site_settings` key-value tabel.

### Tekniske aendringer

**1. `src/components/slots/SlotMachineFrame.tsx`**
- Fjern den nuvaerende logik med symmetriske `effectiveFrameSize` margins og offsets
- Rammen placeres som et `absolute` overlay centreret over reel-containeren
- Position og storrelse styres af de nye settings-vaerdier
- Brug `object-contain` i stedet for `object-fill` sa rammen bevarer sine proportioner
- Containeren far `overflow: visible` og ingen ekstra margins fra rammen
- De hardcodede `GAME_FRAME_VERTICAL_OFFSET` og `GAME_CONTENT_VERTICAL_OFFSET` fjernes og erstattes af de dynamiske settings

**2. `src/components/slots/SlotFrameAdminControls.tsx`**
- Tilfoej 4 nye sliders under den eksisterende "Rammestorrelse" slider:
  - Bredde: 50-250% (step 5)
  - Hojde: 50-250% (step 5)
  - Horisontal offset: -200 til 200px (step 1)
  - Vertikal offset: -200 til 200px (step 1)
- Hver slider gemmer vaerdien direkte til `site_settings` via upsert (samme pattern som eksisterende `updateFrameSize`)
- Tilfoej en "Nulstil position" knap der sletter alle 4 nogler

**3. Opdateret positioneringslogik i SlotMachineFrame**

Den nuvaerende tilgang:
```
// Frame stretches around reels with fixed padding
top: -effectiveFrameSize
left: -effectiveFrameSize
right: -effectiveFrameSize
bottom: -effectiveFrameSize
```

Ny tilgang:
```
// Frame is freely positioned relative to reel center
width: frameWidth%
height: frameHeight%
left: 50% + offsetX  (centered via transform)
top: 50% + offsetY   (centered via transform)
transform: translate(-50%, -50%)
object-contain preserves aspect ratio
```

Rammen pavirker ikke laengere reel-containerens margins, sa tromlerne forbliver i deres naturlige position. Rammen er rent dekorativ og `pointer-events-none`.

