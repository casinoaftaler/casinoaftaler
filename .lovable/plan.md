

## Analyse: Community Internal Linking Gap

### Problemet

Jeres money-pages og guides har et **massivt, automatiseret internt link-netværk** (28.000+ links via entityAutoLinker med 220 mappings). Men community-sektionen er næsten **fuldstændigt udelukket** fra denne motor.

### Hvad entityAutoLinker dækker i dag

| Kategori | Antal mappings |
|---|---|
| Casino brands | 44 |
| Ordbogstermer | 70 |
| Spiludviklere | 22 |
| Money-page hubs | ~80 |
| **Community-sider** | **1** (kun `/statistik`) |

Community-ruter der **MANGLER** i auto-linkeren:
- `/bonus-hunt` (0 mappings)
- `/community/slots` / "spillehal" (0 mappings)
- `/highlights` (0 mappings)
- `/community/turneringer` (0 mappings)
- `/community/hall-of-fame` (0 mappings)
- `/slot-database` har 1 mapping, men kun for eksakt "slot database"
- `/community/rewards` (0 mappings)
- `/bonus-hunt/arkiv` (0 mappings)

### Link-flowet er ensrettet

```text
Community → Money Pages:  ✅ Stærkt (CommunitySeoSections, CommunitySeoBridge, SeoBridge sidebar)
Money Pages → Community:  ⚠️ Svagt (kun ~24 manuelle JSX-links spredt i 24 filer)
Auto-linker → Community:  ❌ Næsten fraværende (1 mapping ud af 220)
```

Det betyder at community-sidernes PageRank **sendes ud** til money-pages, men de **modtager næsten ingen equity tilbage** fra jeres 1.800+ sider.

### Plan: Tilføj community-mappings til entityAutoLinker

Tilføj **8-10 nye mappings** i `src/lib/entityMappings.ts` med naturlige patterns:

| Pattern | Href | Anchor variants |
|---|---|---|
| `bonus hunt`, `bonushunt` | `/bonus-hunt` | "bonus hunt", "live bonus hunt", "vores bonus hunts" |
| `spillehal`, `gratis spillehal`, `gratis slots` | `/community/slots` | "gratis spillehal", "vores spillehal", "prøv gratis slots" |
| `stream highlights`, `highlights`, `bedste clips` | `/highlights` | "highlights", "stream highlights", "bedste clips" |
| `turneringer`, `slot turneringer` | `/community/turneringer` | "turneringer", "community turneringer" |
| `hall of fame`, `leaderboard` | `/community/hall-of-fame` | "Hall of Fame", "community leaderboard" |
| `bonus hunt arkiv`, `hunt arkiv` | `/bonus-hunt/arkiv` | "bonus hunt arkivet", "arkivet", "vores hunt-arkiv" |
| `rewards`, `rewards program` | `/community/rewards` | "rewards program", "vores belønningsprogram" |

**Placering:** Lige under de eksisterende "Community data-hubs" kommentaren (linje 50-51), men **efter** alle money-page mappings for at bevare prioriteringen.

### Forventet effekt

- Hver gang "bonus hunt", "spillehal", "turneringer" etc. nævnes i slot-beskrivelser (1.460 sider), nyheder, eller ordbogstermer → automatisk dofollow link til community
- Estimeret **500-2.000 nye kontekstuelle links** til community-sider
- Skaber det **bidirektionelle equity-loop** der mangler: Money ↔ Community

### Hvad IKKE skal ændres
- Prioriteringen: Money-pages forbliver øverst i mappings-arrayet
- Community → Money linking er allerede stærkt og skal ikke røres
- `_redirects` og broken-link checker behøver ingen opdatering (ruterne eksisterer allerede)

