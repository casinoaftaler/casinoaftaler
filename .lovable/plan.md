

## Analyse af Google-visningsproblemer

### Problem 1: `/u/Levino` i Google-breadcrumb (KRITISK)

**Årsag:** Google-søgeresultatet viser `casinoaftaler.dk › Levino` som breadcrumb. Selvom PublicProfile-sider har `noindex`, er `/u/`-ruter **IKKE blokeret i robots.txt**. Google crawler derfor profilsider og bruger dem til at opbygge sitets breadcrumb-hierarki. Når en profil som `/u/Levino` crawles, kan Google fejlagtigt vise "Levino" som en del af sitets struktur i SERP.

**Løsning:**
- Tilføj `Disallow: /u/` i `public/robots.txt` for alle user-agents — dette blokerer crawling af alle offentlige profiler
- Profiler har allerede `noindex`, men robots.txt-blokering forhindrer overhovedet crawling og elimenerer breadcrumb-forurening

### Problem 2: Generiske beskrivelser i Google ("Din guide til online casinoer i Danmark")

**Årsag:** Teksten "Din guide til online casinoer i Danmark" findes IKKE i koden. Expekt har en unik description (`"Komplet anmeldelse af Expekt – kombineret sportsbook og casino..."`), og Casinospil har også en unik description. Google genererer selv denne generiske snippet fordi:

1. Sitet er et SPA (Single Page Application) – Googlebot kan fejle under JS-rendering
2. Google har muligvis cachet en ældre version fra før unikke descriptions blev tilføjet
3. `index.html` har en fallback description (linje 32), men den matcher heller ikke "Din guide til..."

**Løsning:** Ingen kodeændring nødvendig for disse to sider – de har allerede unikke descriptions. Brug **Google Search Console → URL Inspection → Request Indexing** for at tvinge en re-crawl.

### Problem 3: Komplet audit af alle sider

Gennemgangen viser:
- **204 filer** bruger `<SEO>`-komponenten med individuelle titles og descriptions
- Alle casino-anmeldelser, guides og hubs har unikke descriptions
- `noindex` bruges korrekt på: profiler, sitemap-sider, 404, auth, community-spil
- Ingen sider mangler `<SEO>`-komponenten

### Planlagte ændringer

**Fil: `public/robots.txt`**
- Tilføj `Disallow: /u/` under alle tre user-agent-blokke (Googlebot, Bingbot, `*`)

Det er den eneste nødvendige kodeændring. Alt andet kræver action i Google Search Console (re-indexering af Expekt og Casinospil for at tvinge Google til at bruge de korrekte descriptions).

