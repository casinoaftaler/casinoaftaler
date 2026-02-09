
## Justerbar afstand mellem tromler, leaderboard og kontrolpanel

### Problem
Afstanden mellem tromlerne og leaderboardet (sidepanelet) samt mellem tromlerne og kontrolpanelet er hardcodet og kan ikke finjusteres uden kodeaendringer.

### Losning
Tilfoej to nye admin-indstillinger (sliders) i ramme-administrationspanelet:
1. **Sidepanel-afstand** - afstand mellem tromlerne og leaderboardet (desktop)
2. **Kontrolpanel-afstand** - afstand mellem tromlerne og kontrolpanelet nedenunder

Begge vaerdier gemmes i `site_settings` per spil og anvendes dynamisk.

### Tekniske aendringer

**1. Nye site_settings nogler (per spil)**

Book of Fedesvin:
- `slot_sidepanel_gap` (standard: 24px, dvs. nuvaerende `mr-6`)
- `slot_controls_gap` (standard: 16px, dvs. nuvaerende `mt-4`)

Rise of Fedesvin:
- `rise_of_fedesvin_sidepanel_gap`
- `rise_of_fedesvin_controls_gap`

**2. RLS whitelist opdatering**

Tilfoej de fire nye nogler til den eksisterende `Public can read whitelisted display settings` politik pa `site_settings` tabellen.

**3. `src/components/slots/SlotFrameAdminControls.tsx`**

- Tilfoej `sidepanelGapKey` og `controlsGapKey` til `getSettingsKeys()`
- Tilfoej to nye sliders i ramme-positioneringssektionen:
  - "Sidepanel afstand" (0-80px, standard 24)
  - "Kontrolpanel afstand" (0-40px, standard 16)
- Inkluder dem i reset-funktionen

**4. `src/components/slots/SlotGame.tsx`**

- Laes `controlsGap` fra `useSiteSettings()` (nogle afhaengig af `gameId`)
- Anvend vaerdien som inline `style={{ marginTop: controlsGap }}` pa kontrolpanel-containeren (linje 983) i stedet for den hardcodede `mt-3 sm:mt-4`

**5. `src/components/slots/SlotPageLayout.tsx`**

- Tilfoej en ny `sidePanelGap` prop (number, default 24)
- Anvend som `style={{ marginRight: sidePanelGap }}` pa aside-elementet i stedet for den hardcodede `mr-6`

**6. `src/pages/SlotMachine.tsx` og `src/pages/RiseOfFedesvin.tsx`**

- Laes den relevante `sidepanel_gap` vaerdi fra `useSiteSettings()`
- Send den som prop til `SlotPageLayout`

### Overblik over flow

```text
Admin Panel (Slider)
    |
    v
site_settings tabel (per spil)
    |
    v
useSiteSettings() hook
    |
    +---> SlotPageLayout (sidepanel gap)
    +---> SlotGame (controls gap)
```
