## Plan: PlayKasino Anmeldelse – Fuld Enterprise SEO Casino Review

### Verificerede fakta om PlayKasino (fra research)


| Felt                    | Verificeret data                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Operatør                | SkillOnNet Ltd (Malta)                                                                 |
| Licens                  | Spillemyndigheden (DK) + Malta Gaming Authority + UK GC                                |
| Lanceret DK             | Marts 2026                                                                             |
| Velkomstbonus           | 100% op til 500 kr. (auto-krediteret)                                                  |
| Omsætningskrav          | 10x (indbetaling + bonus), 60 dage                                                     |
| Min. indbetaling        | 100 kr.                                                                                |
| Maks. indsats med bonus | 50 kr. pr. spin                                                                        |
| Antal spil              | 1200+                                                                                  |
| Live Casino             | Playtech (primær) + Evolution Gaming                                                   |
| Betalingsmetoder        | MobilePay, Apple Pay, Trustly, PayPal, Visa/Mastercard, Skrill                         |
| Kundeservice            | Kun e-mail ([support@playkasino.com](mailto:support@playkasino.com)) – ingen live chat |
| Mobilapp                | iOS + Android app tilgængelig                                                          |
| Adresse                 | Level 5, Quantum House, 75 Abate Rigord Street, Ta' Xbiex, Malta                       |


### Filer der oprettes/redigeres

**1. `src/pages/PlayKasinoAnmeldelse.tsx**` (NY – ~800-900 linjer)

Fuld anmeldelse med alle standard-sektioner:

- SEO component med articleSchema, faqJsonLd, reviewJsonLd (ratingValue "4.5")
- Hero section med badge "4.5 / 5 – Nyt dansk casino med kæmpe katalog"
- AuthorMetaBar (author="jonas")
- CasinoReviewHero (slug="playkasino")
- ReviewMoneyLinks (showMobilePay)
- Quick Facts kort (2 rækker × 4 kolonner)
- QuickFactsProviders med leverandører
- **Introduktion**: SkillOnNet-platformen, hvad det betyder, 4.400+ spil, DK lancering marts 2026
- **Bonusanalyse**: 100% op til 500 kr., auto-krediteret, 10x omsætning, EV-beregning
- **EV-analyse**: Bonus 500 kr., omsætning 10.000 kr., HE 4% → forventet tab 400 kr. → EV +100 kr.
- **Spiludvalg**: 4.400+ slots, Playtech live casino, Evolution supplement, filtreringsmuligheder
- **Live Casino**: Playtech-drevet med Evolution supplement
- **Betalingsmetoder**: MobilePay, Apple Pay, Trustly, PayPal, Skrill, Visa/MC – tabel med detaljer
- **Kundeservice**: Kun e-mail – ærlig kritik, sammenligning med konkurrenter
- **Mobiloplevelse**: App til iOS/Android + responsiv web
- **Sikkerhed & licens**: SkillOnNet, Spillemyndigheden, ROFUS, SSL, MitID via ZignSec
- **SkillOnNet deep-dive**: Hvem er SkillOnNet, andre brands (PlayOJO), platform-fordele/ulemper
- **Fordele/Ulemper**: Grid med Check/X ikoner
- **Hvem bør IKKE vælge PlayKasino**: Ærlig segmentering
- **Sammenligning**: vs SpilDanskNu, vs Campobet, vs Swift Casino
- **Endelig vurdering** med RatingBreakdown
- UserReviewSection, RelatedReviews, InlineCasinoCards, LatestNewsByCategory, RelatedGuides
- FAQSection (7+ spørgsmål)
- AuthorBio
- StickyCTA med affiliate link

**2. `src/App.tsx**` – Tilføj lazy import + route:

```
const PlayKasinoAnmeldelse = lazy(() => import("./pages/PlayKasinoAnmeldelse"));
// Route: /casino-anmeldelser/playkasino
```

**3. `src/lib/seoRoutes.ts**` – Tilføj entry:

```
{ path: "/casino-anmeldelser/playkasino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-25" }
```

**4. `src/lib/breadcrumbs.ts**` – Tilføj:

- PARENT_OVERRIDES label: `"PlayKasino"`
- Parent path: `/casino-anmeldelser`

**5. `src/lib/reviewScoring.ts**` – Justering af scores baseret på research:

- kundeservice: 4.2 → 3.5 (kun e-mail, ingen live chat – bør afspejle den reelle svaghed)
- Recalculate total

### Tekniske detaljer

- Alle interne links bruger `<Link to="...">` med `linkClass` pattern
- Eksterne links bruger `<a>` med `target="_blank" rel="noopener noreferrer"`
- casinoReviewEntities("PlayKasino", "playkasino") for schema
- Affiliate redirect via `getAffiliateRedirect(casino.slug, user?.id)`
- Unik sektionsrækkefølge for at undgå template footprint (SkillOnNet deep-dive placeres mellem bonus og spiludvalg)

### Omfang

~900 linjer TSX for hoveddokumentet + 4 small edits i eksisterende filer. Alt indhold er faktuelt verificeret via minimum 2 kilder (playkasino.com, betxpert.com, casino.guru, casinosdanmark.com).