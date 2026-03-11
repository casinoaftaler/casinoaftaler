

## Plan: Offentlig /statistik side — Linkable Asset

### Formål
En offentlig, data-drevet side på `/statistik` der aggregerer bonus hunt data, provider-rankings og historiske grafer. Designet som "linkable asset" som andre sites naturligt vil referere til som datakilde.

### Datakilder (allerede tilgængelige)
- **`bonus_hunt_archives`** — hunt_number, average_x, total_slots, start_balance, end_balance, created_at, api_data (indeholder slot-level data)
- **`slot_catalog`** — slot_name, provider, highest_win, highest_x, bonus_count, rtp, volatility
- **`get_community_stats()` RPC** — active_members, total_spins, tournaments_this_month

### Sektioner på siden

**1. Hero + headline-statistikker**
- "Vi har testet X slots i Y bonus hunts" (aggregeret fra archives + catalog)
- Total investeret, total gevinst, samlet gennemsnitlig X

**2. Historisk udvikling (Area/Line chart)**
- Average X over tid (per hunt) — Recharts AreaChart
- Kumulativ profit/loss over tid
- Data fra `bonus_hunt_archives` sorteret kronologisk

**3. Provider-ranking tabel**
- Top providers sorteret efter antal hunts (bonus_count), gns. highest_x, antal slots
- Data fra `slot_catalog` aggregeret per provider
- Links til `/spiludviklere/:slug` hvor guides eksisterer

**4. Top 10 bedst performende slots**
- Sorteret efter highest_x fra `slot_catalog`
- Viser slot_name, provider, highest_x, highest_win, bonus_count
- Links til `/slot-katalog/:slug`

**5. Nøgletal-kort**
- Samlet antal testede slots, bonus hunts, gennemsnitlig X, højeste win, højeste multiplier

**6. SEO-prosa + FAQ + JSON-LD**
- Article schema med structured data
- FAQ schema
- `<noscript>` fallback med statisk tekst
- Breadcrumb: Forside → Statistik

### Teknisk implementering

| Fil | Beskrivelse |
|-----|-------------|
| `src/pages/Statistik.tsx` | Ny side-komponent med data-fetching, charts og SEO |
| `src/App.tsx` | Tilføj lazy-load import + Route `/statistik` |
| `src/components/header/navData.ts` | Tilføj link i COMMUNITY_LINKS |

- Bruger eksisterende hooks: `useSlotCatalog()`, `useBonusHuntArchives()`, `useDocumentedHuntCount()`
- Ny `useStatistikData()` hook i selve siden der aggregerer provider-stats fra slot_catalog
- Recharts til grafer (allerede installeret)
- Ingen nye database-tabeller eller migrationer nødvendige
- `page_metadata` entry tilføjes via migration for sitemap

### SEO-strategi
- Canonical: `https://casinoaftaler.dk/statistik`
- Title: "Bonus Hunt Statistik — X Hunts Analyseret | Casinoaftaler"
- JSON-LD: Article + FAQ + Dataset (schema.org/Dataset for Google Dataset Search)
- Intern linking: fra `/bonus-hunt`, `/slot-database`, forsiden

