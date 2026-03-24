

## Plan: Flyt screenshots ind i teksten på 5 anmeldelser

### Problem
På SpilDanskNu er screenshots korrekt placeret **inden i** tekstafsnittene – mellem relevante paragraffer. På de 5 andre anmeldelser (Betinia, Campobet, Luna Casino, Swift Casino, Spilleautomaten) er screenshots placeret **i bunden af sektioner**, efter al teksten. Det gør læseoplevelsen mindre engagerende og giver Google mindre kontekst til billederne.

### Filer der skal rettes
1. **BetiniaAnmeldelse.tsx** – 6 screenshots
2. **CampobetAnmeldelse.tsx** – 6 screenshots
3. **LunaCasinoAnmeldelse.tsx** – 6 screenshots
4. **SwiftCasinoAnmeldelse.tsx** – 6 screenshots
5. **SpilleautomatenAnmeldelse.tsx** – 7 screenshots

### Strategi per fil
For hvert screenshot:
- Flyt det **op** fra sektionens bund til **mellem to relevante paragraffer** i samme sektion
- Sørg for at screenshottet har mindst ét tekstafsnit over og under sig (aldrig to screenshots i træk)
- Behold `eager` kun på det første billede i artiklen (lobby)

Eksempel: Login-MitID screenshot flyttes fra bunden af 14-dages-test-sektionen til lige efter "Dag 1-2: Registrering"-afsnittet, hvor det kontekstuelt hører hjemme.

### Fremtidig praksis
Reglen noteres: Når nye screenshots tilføjes til anmeldelser, placeres de altid **inden i** teksten ved det relevante afsnit – aldrig samlet i bunden af en sektion.

