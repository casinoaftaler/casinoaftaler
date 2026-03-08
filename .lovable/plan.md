

## Plan: Casino uden Konto / Pay N Play Cluster (Hub + 3 Spokes)

### Cluster-arkitektur

```text
/casino-uden-konto (HUB — 8.000+ ord, priority 0.9)
├── /casino-uden-konto/pay-n-play (Spoke — 7.000+ ord)
├── /casino-uden-konto/hurtig-registrering (Spoke — 7.000+ ord)
└── /casino-uden-konto/fordele-og-ulemper (Spoke — 7.000+ ord)
```

**Søgeintentions-differentiering:**
- **Hub**: Bred kommerciel intent — "casino uden konto", "casino uden registrering" (~1.200/md)
- **Pay N Play**: Teknisk deep-dive — Trustly Pay N Play mekanik, bankkompatibilitet, flow-diagram
- **Hurtig Registrering**: Sammenligning — Pay N Play vs. MitID vs. standard registrering, tidstest-data
- **Fordele og Ulemper**: Informational/evaluering — sikkerhed, KYC-compliance, ROFUS-integration, risici

### Hvad der bygges

---

**1. Hub-side: `/casino-uden-konto`** (~8.000+ ord)
- Enterprise-cornerstone med Article + FAQ JSON-LD
- Hero med gradient (kopierer MobilCasino-mønstret)
- Sektioner: Intro, hvad er casino uden konto, Pay N Play forklaring, sikkerhed/KYC, sammenligningstabel (Pay N Play vs. standard vs. MitID-flow), praktisk info, fordele/ulemper, ansvarligt spil
- InlineCasinoCards integration
- Interne links til alle 3 spokes + kryds-links til /betalingsmetoder/trustly, /nye-casinoer/trustly, /nye-casinoer/mitid, /casino-licenser
- CasinoTestLog med reelle Pay N Play test-data (E-E-A-T Experience)
- AuthorMetaBar + AuthorBio (Kevin)
- RelatedGuides + LatestNewsByCategory

**2. Spoke 1: `/casino-uden-konto/pay-n-play`** (~7.000+ ord)
- Teknisk deep-dive i Trustly Pay N Play protokollen
- Bankkompatibilitetsmatrice (alle danske banker)
- Flow-diagram: bruger → bank → Trustly → casino
- Tidstest-data fra reelle Pay N Play registreringer
- Differentiering fra hub: niche-teknisk, ikke kommerciel oversigt
- Kryds-links til hub + de 2 andre spokes

**3. Spoke 2: `/casino-uden-konto/hurtig-registrering`** (~7.000+ ord)
- Sammenligning: Pay N Play vs. MitID vs. standard registrering
- Tidstest-tabel med faktiske registreringstider
- Scenarie-analyse: hvornår er hvilken metode bedst
- EV-model for tidsbesparelse over X registreringer
- Kryds-links til hub + spokes + /nye-casinoer/mitid

**4. Spoke 3: `/casino-uden-konto/fordele-og-ulemper`** (~7.000+ ord)
- Dybdegående evaluering: sikkerhed, KYC, ROFUS, databeskyttelse
- Risk/reward-analyse med matematisk model
- Compliance-perspektiv: Spillemyndighedens krav
- Kryds-links til /ansvarligt-spil, /ansvarligt-spil/rofus, /casino-licenser

---

### SEO-infrastruktur (10 touchpoints)

| # | Fil | Ændring |
|---|-----|---------|
| 1 | `src/pages/casino-uden-konto/CasinoUdenKonto.tsx` | Ny hub-side |
| 2 | `src/pages/casino-uden-konto/PayNPlayGuide.tsx` | Spoke 1 |
| 3 | `src/pages/casino-uden-konto/HurtigRegistreringGuide.tsx` | Spoke 2 |
| 4 | `src/pages/casino-uden-konto/FordeleOgUlemperGuide.tsx` | Spoke 3 |
| 5 | `src/App.tsx` | 4 nye routes + lazy imports |
| 6 | `src/lib/breadcrumbs.ts` | routeLabels + PARENT_OVERRIDES for alle 4 sider |
| 7 | `src/lib/seoRoutes.ts` | 4 nye entries (hub: 0.9, spokes: 0.8) |
| 8 | `src/lib/entityAutoLinker.ts` | Ny entity: "casino uden konto" → `/casino-uden-konto` |
| 9 | `src/components/header/navData.ts` | Tilføj til CASINO_LINKS |
| 10 | `src/components/Footer.tsx` | Tilføj under Casino Guides |

### Anti-template differentiering

Hver side bruger en unik layout-arketype:
- **Hub**: Type A — bred intro + sammenligningstabel + CasinoTestLog + InlineCasinoCards
- **Pay N Play**: Type B — teknisk flow-diagram + bankmatrice + step-by-step
- **Hurtig Registrering**: Type C — side-by-side comparison cards + tidstest-tabel
- **Fordele og Ulemper**: Type D — pro/con deep-dive + risk-model + compliance-sektion

### Internal linking strategi

- entityAutoLinker: "casino uden konto", "Pay N Play", "casino uden registrering" → `/casino-uden-konto`
- Kryds-cluster links til: `/betalingsmetoder/trustly`, `/nye-casinoer/trustly`, `/nye-casinoer/mitid`, `/casino-licenser`, `/ansvarligt-spil/rofus`
- Alle spokes linker til hub + hinanden (lukket kredsløb)
- Hub linker ned til alle 3 spokes
- Eksisterende sider der nævner Pay N Play (NyeCasinoerTrustly, NyeCasinoerHurtigUdbetaling, betalingsmetoder/trustly) får manuelt tilføjet links til den nye hub

