

## Analyse af ChatGPTs SEO-prompt

Her er min vurdering punkt for punkt — hvad vi allerede har gjort, hvad der er forkert, og hvad der stadig giver mening.

---

### ✅ Allerede implementeret

| # | ChatGPT forslag | Status |
|---|----------------|--------|
| 1.1 | Fjern statisk canonical fra index.html | **Allerede gjort** — vi fjernede den i forrige session |
| 2.1 | Flyt Speculation Rules til statisk HTML | **Allerede gjort** — ligger i `<head>` nu |
| 2.1 | Slet SpeculationRules.tsx | **Allerede gjort** — filen er slettet |
| 6 | Organization schema cleanup | **Delvist gjort** — Index.tsx bruger nu `...organizationSchema` fra seo.ts med spread, så der er kun én kilde. Det er korrekt arkitektur — vi *skal* have Organization på forsiden (det er hjemmesiden), men vi bruger den fælles definition |

---

### ❌ Forkert / uenig med ChatGPT

| # | Forslag | Min vurdering |
|---|---------|---------------|
| **1.2** | Fjern robots meta fra index.html | **UENIG.** Den statiske `<meta name="robots">` er et bevidst sikkerhedsnet. Hvis JS fejler, får crawlere et harmløst "index, follow" signal i stedet for intet. React Helmet overskriver den altid per side. ChatGPT siger "forhindrer utilsigtet indeksering hvis JS ikke loader" — det er omvendt logik. Uden den har vi *ingen* robots-signal ved JS-fejl |
| **6** | "Fjern Organization schema fra Index.tsx" | **DELVIST UENIG.** Forsiden *bør* have Organization schema — det er Google's primære discovery-punkt. Vi bruger allerede den fælles definition via `organizationSchema` import. At fjerne den helt ville svække E-E-A-T signaler |
| **7** | `/casino-uden-rofus` eksisterer ikke | **FORKERT.** Ruten hedder `/nye-casinoer/uden-rofus` — men i prefetch-listen i index.html står der `/casino-uden-rofus` som faktisk *ikke* er en rute. Så **konklusionen er rigtig** (fjern den), men begrundelsen er upræcis |
| **10** | Ændr title til bare "Casinoaftaler.dk" | **UENIG.** En keyword-rig fallback-title er bedre SEO end et brand-only title. Den nuværende title er korrekt og matcher forsiden. Google bruger den som snippet hvis Helmet fejler — vi vil have keywords der |

---

### ✅ Giver mening — bør implementeres

| # | Forslag | Vurdering |
|---|---------|-----------|
| **3** | Noscript fallback med links | **Godt forslag.** Giver crawlere uden JS adgang til primære hubs. Vi har allerede noscript til fonts, men ingen navigationslinks |
| **7** | Fjern `/casino-uden-rofus` fra prefetch | **Korrekt.** Den URL eksisterer ikke som rute — den korrekte er `/nye-casinoer/uden-rofus`. Skal fjernes eller rettes |
| **8-9** | Soft 404 + redirect TODO-noter | **Korrekt analyse** — men dette er server/CDN-config som vi allerede har dokumenteret. Kan tilføjes som HTML-kommentarer |

---

### ⚠️ Allerede håndteret anderledes

| # | Forslag | Status |
|---|---------|--------|
| **4** | RSS rewrite `/rss.xml` → edge function | **Vi har allerede** en statisk `public/rss.xml` fallback. En server-side rewrite kræver CDN-config — kan ikke løses i React |
| **5** | Crawl-ping debounce | **Allerede implementeret** — vi tilføjede 60s in-memory debounce i edge function i forrige session |

---

### Plan: De 2 reelle fixes

**Fix 1: Tilføj noscript navigationslinks i index.html**
- Tilføj `<noscript>` blok med links til de vigtigste hubs
- Giver crawlere uden JS adgang til intern linkgraf

**Fix 2: Ret `/casino-uden-rofus` i speculation rules**
- Fjern `/casino-uden-rofus` fra prefetch-listen (ruten eksisterer ikke)
- Eventuelt erstat med `/nye-casinoer/uden-rofus` som er den korrekte rute

Begge er hurtige ændringer i `index.html`.

