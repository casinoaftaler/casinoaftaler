

## Batch 2: VIP/Loyalty Guide + Casino med MobilePay Landingpage

### Overblik

To nye enterprise-niveau sider (7.000+ ord hver) der følger den etablerede /casinospil-struktur: gradient hero-header → hero-billede (uden tekst, rounded-xl, max-h-[400px]) → AuthorMetaBar → dybt indhold → FAQ → AuthorBio → RelatedGuides → StickyCtaBySlug.

---

### Side 1: `/vip-program` – VIP & Loyalitetsprogram Guide

**URL:** `/vip-program`
**Forfatter:** Jonas
**Hero-billede:** Nyt billede (luxury casino VIP lounge æstetik, ingen tekst) → `src/assets/heroes/vip-program-hero.jpg`
**CTA slug:** `spildansknu`

**Indhold (7.000+ ord, 10+ sektioner):**
- Hvad er et VIP-program hos danske casinoer
- Tier-system forklaring (Bronze → Diamond) med matematisk EV-analyse pr. tier
- Comp points og konverteringsrater (sammenligning af bet365, LeoVegas, Unibet, Campobet)
- Cashback-programmer vs. reload bonus – hvad giver bedst EV
- Omsætningskrav på VIP-bonusser (BEK 1494 kontekst)
- Dedikeret kontaktperson og eksklusive borde (live casino VIP)
- Sammenligning: Bedste VIP-programmer i Danmark (tabelformat)
- Hvem bør prioritere VIP-programmer – bankroll-strategi
- Ansvarligt spil og VIP (link til /ansvarligt-spil)
- FAQ (8+ spørgsmål med ReactNode svar og interne links)

**Internal linking targets:**
- `/casino-bonus`, `/cashback-bonus`, `/reload-bonus`, `/velkomstbonus`
- `/casino-anmeldelser/leovegas`, `/casino-anmeldelser/bet365`, `/casino-anmeldelser/unibet`, `/casino-anmeldelser/luna-casino`, `/casino-anmeldelser/campobet`
- `/live-casino`, `/omsaetningskrav`, `/ansvarligt-spil`
- `/ordbog/wagering`, `/ordbog/rtp`, `/expected-value`

---

### Side 2: `/casino-med-mobilepay` – Casino med MobilePay Landingpage

**URL:** `/casino-med-mobilepay`
**Forfatter:** Jonas
**Hero-billede:** Nyt billede (smartphone med MobilePay interface i casino kontekst, ingen tekst) → `src/assets/heroes/casino-mobilepay-hero.jpg`
**CTA slug:** `spildansknu`

**Indhold (7.000+ ord, 10+ sektioner):**
- Introduktion: Hvorfor MobilePay er den mest populære indbetalingsmetode
- Alle casinoer med MobilePay (dynamisk via `useCasinos()` eller statisk liste med links)
- Step-by-step: Sådan indbetaler du med MobilePay (HowTo schema)
- Beløbsgrænser, gebyrer og behandlingstid (testresultater fra rigtige casinoer)
- MobilePay vs. Trustly vs. Apple Pay – detaljeret sammenligning med EV-perspektiv
- Bonuskvalificering med MobilePay (alle casinoer accepterer, ingen e-wallet-restriktioner)
- Udbetalinger: Kan du hæve via MobilePay? (nej – alternativer)
- Sikkerhed og regulering (MitID, Spillemyndigheden, AML)
- MobilePay på mobil casino (cross-link til /mobil-casino)
- FAQ (8+ spørgsmål)

**Internal linking targets:**
- `/betalingsmetoder/mobilepay`, `/betalingsmetoder/trustly`, `/betalingsmetoder/apple-pay`
- `/casino-anmeldelser/spildansknu`, `/casino-anmeldelser/danske-spil`, `/casino-anmeldelser/campobet`
- `/mobil-casino`, `/velkomstbonus`, `/casino-bonus`, `/ansvarligt-spil`
- `/ordbog/wagering`, `/spillemyndigheden`

---

### Registrering (begge sider)

**Nye filer (4):**
- `src/pages/VipProgram.tsx`
- `src/pages/CasinoMedMobilePay.tsx`
- `src/assets/heroes/vip-program-hero.jpg`
- `src/assets/heroes/casino-mobilepay-hero.jpg`

**Ændrede filer (4):**
- `src/App.tsx` – 2 lazy imports + 2 routes
- `src/lib/seoRoutes.ts` – 2 nye entries (priority 0.85, weekly)
- `src/lib/breadcrumbs.ts` – 2 routeLabels + PARENT_OVERRIDES (`/vip-program` → `/casino-bonus`, `/casino-med-mobilepay` → `/betalingsmetoder`)
- `src/components/header/navData.ts` – tilføj i BONUS_LINKS og PAYMENT_LINKS

**Schema:**
- Article + FAQ JSON-LD på begge
- HowTo JSON-LD på MobilePay-siden (3+ steps)
- `about` entities: VIP → `Thing: VIP Program`; MobilePay → `Thing: MobilePay Casino`
- `mentions`: Spillemyndigheden, Casino Bonus, Ansvarligt Spil

