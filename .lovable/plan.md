

# Plan: Genbrug eksisterende screenshots på money pages

## Status – Hvad vi har

### Allerede implementerede screenshots (på money pages)
| Screenshot | Bruges på |
|---|---|
| `betinia-bonusvilkaar` | Omsaetningskrav, Indskudsbonus, Velkomstbonus |
| `betinia-betaling-oversigt` | Betalingsmetoder, MobilePayGuide |
| `betinia-mobilepay-kasse` | MobilePayGuide |
| `betinia-mobilepay-bekraeft` | MobilePayGuide |
| `betinia-lobby` | NyeCasinoer |
| `betinia-reg-mitid` | NyeCasinoerMitID |
| `betinia-velkomstbonus-aktiv` | Velkomstbonus |
| `betinia-megaways-filter` | MegawaysSlots |
| `betinia-bonusbuy-lobby/gameplay` | BonusBuySlots |
| Spilleautomaten `vs-lobby/katalog/praemieshop` | Comparison |

### Ubrugte screenshots klar til placering
| Screenshot | Kilde | Indhold |
|---|---|---|
| `betinia-bonussektion.webp` | Lokal asset | Betinia bonusoversigt |
| `betinia-velkomstbonus-close.webp` | Lokal asset | Velkomstbonus detaljer |
| Spilleautomaten `vs-beloningsprogram` | Supabase | Loyalitetsprogram |
| Spilleautomaten `vs-trustly-bankvalg` | Supabase | Trustly bankvalg-flow |
| Spilleautomaten `vs-trustly-login` | Supabase | Trustly MitID-login |
| Spilleautomaten `vs-indbetaling` | Supabase | Indbetalingsside |
| SpilDanskNu `bonus` | Lokal asset | Bonusside |
| SpilDanskNu `indbetaling` | Lokal asset | Indbetalingsflow |
| SpilDanskNu `login` | Lokal asset | Login/MitID |
| SpilDanskNu `lobby` | Lokal asset | Forside/lobby |
| SpilDanskNu `praemieshop` | Lokal asset | Præmieshop |
| SpilDanskNu `belonningsprogram` | Lokal asset | Loyalitetsprogram |
| SpilDanskNu `casinospil` | Lokal asset | Spiloversigt |

**= 13 ubrugte screenshots klar til placering**

---

## Placeringsplan – Genbrug på money pages

Alle placeringer overholder: max 3 pr. side, aldrig consecutive, unikke alt-tekster, size="full".

### 1. TrustlyGuide.tsx (0 → 2 screenshots)
- **Spilleautomaten `vs-trustly-bankvalg`** → i "How to"-sektionen (bankvalg-flow)
- **Spilleautomaten `vs-trustly-login`** → i intro/Open Banking-sektionen (MitID-login)

### 2. VisaMastercardGuide.tsx (0 → 1 screenshot)
- **Spilleautomaten `vs-indbetaling`** → i how-to-sektionen (indbetalingsside viser kortmuligheder)

### 3. PayPalGuide.tsx (0 → 1 screenshot)  
- **Betinia `betaling-oversigt`** → genbrug med unik alt-tekst om PayPal i kontekst af betalingsoversigten

### 4. SkrillGuide.tsx (0 → 1 screenshot)
- **Betinia `betaling-oversigt`** → genbrug med alt-tekst fokuseret på e-wallet-muligheder

### 5. PaysafecardGuide.tsx (0 → 1 screenshot)
- **Betinia `betaling-oversigt`** → genbrug med alt-tekst om forudbetalte metoder

### 6. NyeCasinoerTrustly.tsx (0 → 1 screenshot)
- **Spilleautomaten `vs-trustly-bankvalg`** → genbrug med unik alt-tekst om Trustly hos nye casinoer

### 7. NyeCasinoerHurtigUdbetaling.tsx (0 → 1 screenshot)
- **SpilDanskNu `indbetaling`** → viser hurtigt betalingsflow

### 8. NyeCasinoerLavWagering.tsx (0 → 1 screenshot)
- **SpilDanskNu `bonus`** → bonusvilkår med lav omsætning

### 9. NyeCasinoerDanskLicens.tsx (0 → 1 screenshot)
- **SpilDanskNu `lobby`** → dansk licenseret casino-lobby

### 10. NyeCasinoerBonusUdenIndbetaling.tsx (0 → 1 screenshot)
- **Betinia `bonussektion`** → bonusoversigt

### 11. Casino Bonus hub (0 → 1 screenshot)
- **Betinia `velkomstbonus-close`** → detaljeret bonusvisning

### 12. Comparisons uden screenshots (4 sider → 1-2 hver)

**BetiniaVsCampobet:**
- **Betinia `lobby`** → genbrug med comparison-alt-tekst

**SwiftCasinoVsLunaCasino:**
- Kræver nye screenshots (ingen Swift/Luna i inventar uden for reviews)

**Bet365VsUnibet / LeoVegasVsMrGreen / DanskeSpilVsSpilnu:**
- Kræver nye screenshots

---

## Opsummering

| Handling | Antal |
|---|---|
| Ubrugte screenshots der kan placeres NU | 13 |
| Money pages der får screenshots fra eksisterende | ~12 sider |
| Nye placeringer i alt | ~15 |
| Money pages der stadig mangler (kræver NYE screenshots) | ~30-35 |

### Teknisk implementering
- Importér lokale assets eller brug Supabase storage URL'er
- Alle med `<ReviewScreenshot>`, `size="full"`, unikke alt-tekster
- Placering i relevant tekstafsnit (aldrig consecutive)

Skal jeg implementere disse 15 placeringer?

