

## Analyse: Internal Linking Gaps for Community Enterprise Hubs

### Nuværende status

**3 community enterprise hubs:**
- `/bonus-hunt/arkiv` (Bonus Hunt Arkiv)
- `/slot-database` (Slot Database)
- `/community/turneringer/arkiv` (Turneringsarkiv)

**Hvor linkes de FRA i dag?**
- Header/nav ✅ (alle 3)
- `RelatedGuides.tsx` ✅ (har egne sektioner + linkes fra hinanden)
- `CommunitySeoSections` ✅ (bruges PÅ disse sider, men linker til money pages)
- SEO content-tekster ✅ (krydslinker internt mellem de 3 hubs)
- `BonusHuntCommunityLinks.tsx` ❌ mangler links til `/slot-database` og `/bonus-hunt/arkiv`
- Hall of Fame ✅ (linker til turneringsarkiv og bonus hunt arkiv)

**Hvor mangler links HELT?**

| Money Page | Link til Bonus Hunt | Link til Slot Database | Link til Turneringsarkiv |
|---|---|---|---|
| **Index.tsx (forsiden)** | ✅ `/bonus-hunt` kun | ❌ | ❌ |
| **Spillemaskiner.tsx** | ❌ | ❌ | ❌ |
| **Casinospil.tsx** | ❌ | ❌ | ❌ |
| **CasinoBonus.tsx** | ❌ | ❌ | ❌ |
| **NyeCasinoer.tsx** | ❌ | ❌ | ❌ |
| **FreeSpins.tsx** | ❌ | ❌ | ✅ `/community/turneringer` |
| **Velkomstbonus.tsx** | ❌ | ❌ | ❌ |
| **LiveCasino.tsx** | ❌ | ❌ | ❌ |
| **Spiludviklere.tsx** | ❌ | ❌ | ❌ |
| **CasinoAnmeldelser.tsx** | ❌ | ❌ | ❌ |
| **CommunityHub.tsx** | ❌ `/bonus-hunt/arkiv` | ❌ | ❌ |
| **RelatedGuides (slot cluster)** | ❌ | ❌ | ❌ |
| **RelatedGuides (bonus cluster)** | ❌ | ❌ | ❌ |
| **RelatedGuides (review cluster)** | ❌ | ❌ | ❌ |
| **BonusHuntCommunityLinks** | ❌ arkiv/database | ❌ | ❌ arkiv |

### Plan

#### 1. Forsiden (Index.tsx) – Udvid "Bonus Hunt" sektionen
Den eksisterende sektion (linje 574-610) linker kun til `/bonus-hunt` og `/community`. Tilføj links til alle 3 enterprise hubs:
- Tilføj `/bonus-hunt/arkiv` link-kort
- Tilføj `/slot-database` link-kort  
- Tilføj `/community/turneringer` link-kort
- Tilføj kontekst-tekst i prosaen der nævner slot-databasen og turneringer

#### 2. Spillemaskiner.tsx – Tilføj community data-sektion
I "Social gaming og turnerings-slots" afsnittet (linje ~484), tilføj inline-links til:
- `/slot-database` (naturligt sted: "Se community-statistik for alle testede spillemaskiner")
- `/bonus-hunt/arkiv` (naturligt: "alle dokumenterede bonus hunt resultater")

#### 3. RelatedGuides.tsx – Strategisk community hub injection
Tilføj community enterprise hub links som cross-cluster links i udvalgte clusters:

- **Slot guides** (`/casinospil/spillemaskiner/*`): Tilføj `/slot-database` som cross-cluster option (roteret)
- **Spillemaskiner hub** (`/casinospil/spillemaskiner`): Tilføj `/slot-database` og `/bonus-hunt/arkiv`
- **Casino review hub** (`/casino-anmeldelser`): Tilføj `/bonus-hunt` som cross-cluster
- **Bonus cluster** (`/casino-bonus` etc.): Rotere `/bonus-hunt/arkiv` ind som cross-cluster option
- **Casinospil hub** (`/casinospil`): Tilføj `/slot-database`

#### 4. BonusHuntCommunityLinks.tsx – Tilføj manglende enterprise hubs
Tilføj 2 nye kort:
- `/bonus-hunt/arkiv` (Bonus Hunt Arkiv)
- `/slot-database` (Slot Database)

#### 5. Inline-links i money page content
Tilføj naturlige kontekstuelle links i brødtekst:

- **CasinoBonus.tsx**: Link til `/bonus-hunt/arkiv` i kontekst om at teste bonusser
- **NyeCasinoer.tsx**: Link til `/slot-database` i gamification-sektionen
- **Casinospil.tsx**: Link til `/slot-database` i trends-FAQ
- **Velkomstbonus.tsx**: Link til `/bonus-hunt` i kontekst om live tests

#### Filer der ændres
1. `src/pages/Index.tsx` – Udvid bonus hunt sektion med 3 nye link-kort + prose
2. `src/pages/Spillemaskiner.tsx` – Inline-links i eksisterende tekst
3. `src/components/RelatedGuides.tsx` – Tilføj community hubs som cross-cluster rotationer i slot/bonus/review clusters
4. `src/components/bonus-hunt/BonusHuntCommunityLinks.tsx` – 2 nye kort
5. `src/pages/CasinoBonus.tsx` – Inline-link i brødtekst
6. `src/pages/NyeCasinoer.tsx` – Inline-link i brødtekst
7. `src/pages/Casinospil.tsx` – Inline-link i FAQ/trends

