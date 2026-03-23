

## Plan: Indsæt Screenshots i Spilleautomaten-anmeldelsen

### Hvad der sker
De 6 uploadede screenshots placeres kontekstuelt i anmeldelsen ved hjælp af den eksisterende `ReviewScreenshot`-komponent. Billederne konverteres til WebP, komprimeres til under 150KB og uploades til storage.

### Billedplacering (baseret på screenshots)

| # | Screenshot | Placering i artiklen | Alt-tekst |
|---|-----------|----------------------|-----------|
| 1 | **Lobby/Forside** | Efter intro-sektionen (linje ~223, efter video-boksen) | "Spilleautomaten lobby med populære spilleautomater og kategorinavigation" |
| 2 | **Præmieshop/Rewards** | I Præmieshop-sektionen (linje ~504, efter feature-grid) | "Spilleautomaten Præmieshop med loyalitetspoints og kontante præmier" |
| 3 | **Live Casino** | I spiludvalg-sektionen (linje ~571, efter spilkort-grid) | "Spilleautomaten live casino med Evolution Gaming-borde" |
| 4 | **Bonus/Kampagner** | I bonus-sektionen (linje ~416, efter bonusmatematik) | "Spilleautomaten bonusaktivering med VELKOMMEN-koder" |
| 5 | **Betalingsmetoder** | I betalings-sektionen (linje ~613, efter tabellen) | "Spilleautomaten betalingsmetoder med MobilePay og Trustly" |
| 6 | **Login/Registrering** | I 14-dages test-sektionen (linje ~258, efter testlog) | "Spilleautomaten login via MitID-verifikation" |

### Teknisk flow

1. **Konverter + komprimer**: Kør ImageMagick-script på de 6 uploadede billeder → WebP, max 150KB
2. **Upload til storage**: `news-images/reviews/spilleautomaten/` bucket
3. **Indsæt `<ReviewScreenshot>`**: 6 steder i `SpilleautomatenAnmeldelse.tsx` med unikke alt-tekster og captions
4. **Første billede**: `eager={true}` (lobby-screenshot, tættest på top)

### Fil der ændres
- `src/pages/SpilleautomatenAnmeldelse.tsx` — tilføj import + 6 `<ReviewScreenshot>` indsættelser

### Ingen visuel påvirkning uden billeder
Komponenten viser kun noget når `src` peger på et eksisterende billede. Ingen layout-ændringer uden data.

