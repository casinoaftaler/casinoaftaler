

# Plan: Live Casino Strategi & Udbydere – Enterprise Spoke Pages

## Scope

Create two new 8,000+ word spoke pages under `/live-casino/`:

1. **`/live-casino/strategi`** – Live Casino Strategi (bankroll management, house edge optimization, betting systems, session management)
2. **`/live-casino/udbydere`** – Live Casino Udbydere (Evolution Gaming, Pragmatic Play Live, Playtech, Ezugi, comparison tables)

Both pages follow the exact pattern established by `LiveBlackjackGuide.tsx`, `CrazyTimeGuide.tsx` etc.

---

## Files to Create

### 1. `src/pages/live-casino/LiveCasinoStrategiGuide.tsx` (~700-800 lines)
- **SEO:** `<SEO>` with `buildArticleSchema`, `buildFaqSchema`, `buildHowToSchema`
- **Hero:** Gradient hero with Badge "Opdateret Marts 2026", h1, subtitle
- **AuthorMetaBar:** `author="jonas"`, `date="2026-03-16"`, `readTime="28 Min."`
- **GuideHeroImage** with dedicated hero image
- **12 H2 sections** covering:
  1. Introduktion til live casino-strategi
  2. House edge-sammenligning (blackjack 0.5%, roulette 2.7%, baccarat 1.06%, game shows 4-6%)
  3. Bankroll management – 40x/60x/80x formler
  4. Betting-systemer analyse (Martingale, D'Alembert, Fibonacci – hvorfor de alle taber)
  5. Spilvalg-strategi (hvilket spil passer din profil)
  6. Session management & tidsstyring
  7. Bonusstrategi for live casino (10% wagering-bidrag)
  8. Avanceret: EV-optimering og variansreduktion
  9. Psychologiske fælder i live casino
  10. Tabeller: forventet tab/time pr. spiltype
  11. Hvornår skal du stoppe
  12. Ansvarligt spil
- **Components:** `InlineCasinoCards`, `LiveCasinoMoneyLinks`, `LatestNewsByCategory`, `RelatedGuides`, `FAQSection` (10 FAQs), `AuthorBio`, `StickyCtaBySlug`
- **Internal links:** til `/live-casino`, `/live-casino/blackjack`, `/live-casino/roulette`, `/live-casino/baccarat`, `/live-casino/udbydere`, `/casino-bonus`, `/omsaetningskrav`, `/ordbog/house-edge`, `/ordbog/rtp`, `/ordbog/volatilitet`, `/ordbog/bankroll-management`, `/ansvarligt-spil`

### 2. `src/pages/live-casino/LiveCasinoUdbydereGuide.tsx` (~700-800 lines)
- **SEO:** `<SEO>` with `buildArticleSchema`, `buildFaqSchema`
- **Hero:** Same pattern
- **12 H2 sections** covering:
  1. Overblik over live casino-udbydere
  2. Evolution Gaming – markedsleder (85%+ markedsandel)
  3. Pragmatic Play Live – challenger
  4. Playtech Live – europæisk tradition
  5. Ezugi – niche-specialist
  6. Vivo Gaming, Authentic Gaming, SA Gaming etc.
  7. Sammenligningstabel (RTP, spiltyper, studier, teknologi)
  8. Streaming-teknologi og studie-infrastruktur
  9. Licensering og regulering af udbydere
  10. Danske casinoers udbyder-porteføljer
  11. Fremtiden: AI-dealers, VR-borde, gamification
  12. Ansvarligt spil
- **Internal links:** til `/live-casino`, alle live-casino spokes, `/spiludviklere/evolution-gaming`, `/spiludviklere/pragmatic-play`, `/live-casino/strategi`, `/casino-anmeldelser`, `/casino-licenser`, `/spillemyndigheden`

### 3. Hero Images
- Need two new hero images. Will use existing pattern: import from `src/assets/heroes/`. Since we can't generate images, we'll reference existing related heroes as fallback (`live-casino-hero.jpg`) with specific alt text, OR create placeholder references that follow the naming convention (`live-casino-strategi-hero.jpg`, `live-casino-udbydere-hero.jpg`).

---

## Files to Modify

### 4. `src/App.tsx`
- Add lazy imports for both new pages
- Add `<Route>` entries: `/live-casino/strategi` and `/live-casino/udbydere`

### 5. `src/lib/seoRoutes.ts`
- Add entries with `priority: 0.8`, `changefreq: "weekly"`, `lastmod: "2026-03-16"`

### 6. `src/lib/breadcrumbs.ts`
- Add labels: `"/live-casino/strategi": "Live Casino Strategi"`, `"/live-casino/udbydere": "Live Casino Udbydere"`
- Add PARENT_OVERRIDES: both → `[{ name: "Live Casino", path: "/live-casino" }]`

### 7. `src/components/header/navData.ts`
- Add to `LIVE_CASINO_LINKS`: `{ to: "/live-casino/strategi", label: "Live Casino Strategi" }`, `{ to: "/live-casino/udbydere", label: "Live Casino Udbydere" }`

### 8. `src/components/LiveCasinoMoneyLinks.tsx`
- Add to `LIVE_CASINO_SIBLINGS`: `{ to: "/live-casino/strategi", label: "Live Casino Strategi" }`, `{ to: "/live-casino/udbydere", label: "Live Casino Udbydere" }`

### 9. `src/components/RelatedGuides.tsx`
- Add both pages to the `liveCasinoSiblings` array inside the `path.startsWith("/live-casino/")` block
- Add dedicated entries for both pages if they need specific cross-cluster links

### 10. `src/pages/LiveCasino.tsx`
- Add links to both new spokes in the "Dybdeguides" section (lines ~538-547):
  - `→ Live casino strategi og bankroll management`
  - `→ Live casino udbydere – Evolution, Pragmatic Play & mere`

### 11. `src/lib/entityMappings.ts`
- Add mapping for "live casino strategi" → `/live-casino/strategi`
- Add mapping for "live casino udbydere" → `/live-casino/udbydere`

---

## Internal Linking Architecture

```text
                    /live-casino (Hub)
                   ↙    ↓    ↓    ↘
         /blackjack  /roulette  /baccarat  ...
              ↕          ↕          ↕
         /strategi ←→ /udbydere
              ↕          ↕
    /ordbog/*    /spiludviklere/*
    /casino-bonus   /casino-anmeldelser
```

Every existing spoke gets sibling links to the 2 new pages via `LiveCasinoMoneyLinks` and `RelatedGuides`. The hub links down to both. Both new pages link back to the hub and cross-link to each other and all existing spokes.

