

# Plan: Freshness-strategi for forsiden – daglige/ugentlige rotationer

## Problemet
Google ser forsiden som "statisk" mellem builds, fordi det meste dynamiske indhold kræver JS-rendering. Vi mangler synlige indholdsrotationer der ændrer sig dagligt/ugentligt og er synlige i HTML for crawlere.

## Nuværende freshness-signaler
- `TodayUpdatedSection`: Viser dagens dato + seneste nyhed (DB-drevet, kræver JS)
- `WeeklyRotationReviews`: Roterer 3 anmeldelser ugentligt (client-side, kræver JS)
- `HomepageLatestSlots/PopularSlots`: DB-drevet, kræver JS
- HeroSection: Statisk "marts 2026" tekst

## Nye komponenter

### 1. `DailyRotatingTip` – Dagligt skiftende indhold (ingen DB)
- Pool af 30+ danske casino-tips/facts (statisk array i koden)
- Vælger tip baseret på `dayOfYear % tips.length` – ændrer sig hver dag
- Renderet som synlig tekst med dato i `<time datetime="...">` tag
- Inkluderer `<noscript>` fallback med alle tips som `<ul>` (crawlbar)
- Placeres lige efter `TodayUpdatedSection`
- Hvert tip indeholder et dofollow `<Link>` til en relevant underside

### 2. `DailyCasinoSpotlight` – Dagligt roterende casino-fokus
- Roterer gennem de 6 partner-casinoer baseret på `dayOfYear % 6`
- Viser et kort highlight-card med navn, score, og "Dagens anbefaling" badge
- Linker til casino-anmeldelsen (dofollow)
- Placeres i `TodayUpdatedSection` som et 3. kort (grid udvides til 3 kolonner)

### 3. `WeeklyGuideRotation` – Ugentlig guide-rotation
- Roterer 3 guide-links ugentligt fra en pool af alle hub/spoke-sider
- Supplement til `WeeklyRotationReviews` men for guides (bonus, spil, betalingsmetoder)
- Baseret på `ISOWeek` ligesom den eksisterende komponent
- Placeres efter `WeeklyRotationReviews`

### 4. Noscript-fallbacks for eksisterende sektioner
- `TodayUpdatedSection`: Tilføj `<noscript>` med statiske links til `/free-spins-i-dag` og `/casino-nyheder`
- `HomepageLiveCommunity`: Tilføj `<noscript>` med links til `/bonus-hunt`, `/community/slots`

## Teknisk tilgang
- **Ingen nye DB-kald** – alle rotationer er deterministiske (dag/uge-baserede)
- Alle nye komponenter renderer synlig HTML med `<a>`/`<Link>` tags
- `<time>` tags med ISO-datoer for maskinlæsbar freshness
- `<noscript>` fallbacks sikrer crawl-discovery uden JS

## Filer der oprettes/ændres
| Fil | Handling |
|-----|---------|
| `src/components/DailyRotatingTip.tsx` | **Ny** – 30+ tips med daglig rotation |
| `src/components/DailyCasinoSpotlight.tsx` | **Ny** – dagligt casino-highlight |
| `src/components/WeeklyGuideRotation.tsx` | **Ny** – ugentlig guide-rotation |
| `src/components/TodayUpdatedSection.tsx` | **Ændring** – tilføj noscript fallback |
| `src/pages/Index.tsx` | **Ændring** – indsæt nye komponenter |

