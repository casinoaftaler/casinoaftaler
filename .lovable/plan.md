

## Plan: Indsæt 6 Screenshots i Betinia-anmeldelsen + Fix Build Errors

### Opgave 1: Fix build errors i Casinostuen og Kapow
Undersøg og fix de rapporterede TSX-fejl. Linjerne ser korrekte ud i nuværende kode – dette kan være stale errors, men vi verificerer og fikser hvis nødvendigt.

### Opgave 2: Upload og indsæt 6 Betinia-screenshots

**Billedbehandling:**
- Konverter alle 6 billeder til WebP (allerede WebP/PNG)
- Komprimer til under 150KB
- Upload til storage: `news-images/reviews/betinia/`

**Placering i artiklen:**

| # | Screenshot | Sektion | Placering (efter linje) | Alt-tekst |
|---|-----------|---------|------------------------|-----------|
| 1 | Lobby/Forside | Intro-sektion | ~292, efter video-boksen | "Betinia casino forside med populære spilleautomater, anbefalede spil og sportsbegivenheder" |
| 2 | Login/MitID | 14-dages test | ~327, efter testlog-card | "Betinia login-dialog med MitID-verifikation for sikker adgang" |
| 3 | Betinia Points | Bonus-sektion | ~502, efter bonusmatematik | "Betinia loyalitetspoint – tjen points ved indskud og spil" |
| 4 | Live Casino | Live casino-sektion | ~693, efter live casino tekst | "Betinia live casino med Speed Roulette, Lightning Baccarat og blackjack-varianter fra Evolution Gaming" |
| 5 | Betalingsmetoder | Betalings-sektion | ~758, efter betalingstabel | "Betinia betalingsmetoder med MobilePay, Visa, Mastercard og Trustly" |
| 6 | Mobilapp | Mobil-sektion | ~709, efter mobiltekst | "Betinia mobilapp-side med QR-kode download og sponsorater" |

### Teknisk implementation
- Import `ReviewScreenshot` component
- Screenshot #1 (lobby): `eager={true}` (tættest på top)
- Alle andre: default `lazy` loading
- Captions på dansk der beskriver hvad billedet viser

### Filer der ændres
- `src/pages/BetiniaAnmeldelse.tsx` — tilføj import + 6 `<ReviewScreenshot>`
- `src/pages/CasinostuenAnmeldelse.tsx` — fix build error (hvis stadig relevant)
- `src/pages/KapowCasinoAnmeldelse.tsx` — fix build error (hvis stadig relevant)

