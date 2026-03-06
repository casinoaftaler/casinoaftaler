

# Audit: Internal Linking til Casino Ordbogen

## Fundne problemer

### Problem 1: 8 af 15 ordbog-termer mangler i entityAutoLinker
Kun 7 termer er mappet til `/ordbog/`-sider. Disse 8 mangler helt:

| Term | Slug | Bruges på 161+ sider |
|------|------|----------------------|
| Wagering / Omsætningskrav | `/ordbog/wagering` | ✗ |
| Free Spins | `/ordbog/free-spins` | ✗ |
| Jackpot | `/ordbog/jackpot` | ✗ |
| RNG | `/ordbog/rng` | ✗ |
| Bonusrunde | `/ordbog/bonus-runde` | ✗ |
| Multiplikator | `/ordbog/multiplikator` | ✗ |
| Max Bet | `/ordbog/max-bet` | ✗ |
| Autoplay | `/ordbog/autoplay` | ✗ |

### Problem 2: autoLinkEntities bruges kun på 2 sider
Funktionen er kun integreret i:
- `CasinoNyhedArticle.tsx` (nyheder fra DB)
- `OrdbogTerm.tsx` (ordbog-undersider)

Alle andre sider (30+ slot guides, casino guides, bonus-sider osv.) bruger **JSX** — auto-linkeren kan ikke behandle dem. Disse sider nævner termer som "wagering", "free spins", "jackpot", "volatilitet" hundredvis af gange uden links til ordbogen.

### Problem 3: Ordbog-sider linker ikke bredt nok til money-pages
Glossary term `fullContent` HTML nævner money-page koncepter men mangler systematiske links til `/casino-bonus`, `/free-spins`, `/velkomstbonus`, `/omsaetningskrav` osv.

---

## Plan: Enterprise Internal Linking

### 1. Tilføj alle 8 manglende termer til `entityAutoLinker.ts`
Tilføj regex-patterns for wagering, free spins, jackpot, RNG, bonusrunde, multiplikator, max bet og autoplay med links til deres `/ordbog/`-sider. Dette dækker automatisk alle nyheder og ordbog-undersider.

### 2. Tilføj flere money-page entities til auto-linkeren
Nye mappings for: `/casino-bonus`, `/velkomstbonus`, `/free-spins`, `/omsaetningskrav`, `/bonus-uden-omsaetningskrav`, `/no-sticky-bonus`, `/casinospil/spillemaskiner`, `/casinospil/blackjack`, `/casinospil/roulette`.

### 3. Udvid ordbog-termers `fullContent` med money-page links
Opdater `glossaryTerms.ts` så hvert terms HTML-indhold inkluderer kontekstuelle `<a>`-links til relevante money-pages og andre ordbog-termer (cross-linking inden for clusteret).

### 4. Tilføj ordbog-links til de vigtigste slot guides (JSX)
Manuelt tilføj `<Link to="/ordbog/...">` til første forekomst af nøgletermer i de 10-15 mest trafikerede slot guides. Disse er JSX og kan ikke auto-linkes.

**Berørte filer:**
| Fil | Ændring |
|-----|---------|
| `src/lib/entityAutoLinker.ts` | +8 ordbog-termer, +9 money-page entities |
| `src/data/glossaryTerms.ts` | Udvid fullContent med cross-links |
| 15+ slot guide `.tsx` filer | Tilføj `<Link>` til ordbog-termer |

