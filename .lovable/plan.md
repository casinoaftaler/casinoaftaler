

## Enterprise SEO Expansion: 1.470 Slots som Strategisk Våben

### Nuværende Status

**Provider-sider (ProviderSlotLinks):** Viser kun 28 manuelt mappede slots fra `slotProviderLinks.ts`. De 1.442 øvrige slots i databasen er usynlige for provider-siderne. Google ser max 9 links per provider – ikke de 50-200 der faktisk tilhører dem.

**Freshness:** `dateModified` på /slot-database sættes til `new Date().toISOString()` (altid "i dag"), men der er ingen synlig freshness-indikator for brugere. Google kan ikke se hvornår databasen reelt sidst blev opdateret med nye hunt-data.

**Struktureret data:** Ingen SoftwareApplication schemas genereres for de 1.470 slots. Kun /casino-app har én SoftwareApplication entity. Massivt uudnyttet Knowledge Graph-potentiale.

---

### Plan: 3 Strategiske Implementeringer

#### 1. Dynamiske Provider-Hubs via Database (ProviderSlotLinks → ProviderCatalogSlots)

**Hvad:** Erstat den statiske `PROVIDER_TO_SLOTS` mapping med live Supabase-data fra `slot_catalog`.

**Hvordan:**
- Ny hook `useProviderSlots(providerName: string)` der querier `slot_catalog` filtreret på `provider`.
- Ny komponent `ProviderCatalogSlots` der erstatter `ProviderSlotLinks` i `ProviderPageTemplate.tsx`.
- Viser ALLE slots for den givne provider med RTP, volatilitet og bonus count i et kompakt grid.
- Beholder de eksisterende guide-links (28 manuelle) som "featured" med fremhævet styling.
- Resten vises som en tabel/grid med link til `/slot-database?provider=X&slot=Y` (anchor til tabellen).
- Lazy-loads (kun henter data når komponent er synlig) for at beskytte LCP.

**SEO-effekt:** Pragmatic Play-siden går fra 9 spoke-links til 200+. Hacksaw fra 4 til 150+. Hver provider-side bliver en autentisk hub med 50-200 unikke slot-referencer. Massiv topical authority signal.

**Filer:**
- `src/hooks/useSlotCatalog.ts` – ny hook `useProviderSlots`
- `src/components/ProviderCatalogSlots.tsx` – ny komponent
- `src/pages/providers/ProviderPageTemplate.tsx` – swap `ProviderSlotLinks` → `ProviderCatalogSlots`

#### 2. Live Freshness fra Bonus Hunt Data

**Hvad:** Vis "Sidst opdateret: efter Bonus Hunt #337 – 8. marts 2026" dynamisk på /slot-database og provider-sider.

**Hvordan:**
- Hook `useLatestCatalogUpdate()` der henter den seneste `updated_at` fra `slot_catalog` + seneste `hunt_number` fra `bonus_hunt_archives`.
- Render synlig freshness-badge under AuthorMetaBar: "Data opdateret efter Bonus Hunt #337 · 8. marts 2026"
- `dateModified` i Article schema bindes til den faktiske seneste `updated_at` (ikke bare `new Date()`).
- `article:modified_time` meta-tag synkroniseres automatisk.

**SEO-effekt:** Google ser at indholdet opdateres efter hver eneste bonus hunt (2-3x/uge). Stærkt freshness-signal der matcher den synlige tekst – ingen "fake freshness". Konkurrenter har statiske sider der opdateres månedligt.

**Filer:**
- `src/hooks/useSlotCatalog.ts` – ny hook
- `src/pages/SlotDatabase.tsx` – freshness badge + dynamisk dateModified
- `src/pages/providers/ProviderPageTemplate.tsx` – tilføj provider-specifik freshness

#### 3. SoftwareApplication Schema for Slot Catalog

**Hvad:** Generer `ItemList` + `SoftwareApplication` JSON-LD for de slots der vises på den aktuelle side.

**Hvordan:**
- Ny funktion `buildSlotCatalogSchema(slots)` i `src/lib/seo.ts`.
- Genererer et `ItemList` med op til 100 `SoftwareApplication` entities (den aktuelle pagineringsside).
- Hvert item inkluderer: `name`, `applicationCategory: "GameApplication"`, `operatingSystem: "Web"`, `author` (provider som Organization).
- Slots med `bonus_count > 0` og `highest_x > 0` får `aggregateRating` baseret på en normaliseret score: `ratingValue = min(5, 1 + (highest_x / 500) * 4)`, `ratingCount = bonus_count`.
- Schema injiceres via SEO-komponenten per page-load, ikke alle 1.470 på én gang.

**SEO-effekt:** 1.470 potentielle rich results med stjerne-ratings i søgeresultaterne. Google Knowledge Graph får strukturerede entiteter for hver slot med provider-binding. Ingen konkurrent i det danske marked har dette.

**Filer:**
- `src/lib/seo.ts` – ny `buildSlotCatalogSchema()` funktion
- `src/pages/SlotDatabase.tsx` – inject schema for pagineret data

---

### Hvad Sker Der Når Vi Implementerer?

1. **Provider-sider:** Går fra "artikel om Pragmatic Play" til "den definitive Pragmatic Play hub i Danmark" med 200 slots. Google forstår at I ejer denne entity.

2. **Freshness loop:** Hver bonus hunt (2-3x/uge) trigger automatisk freshness-signaler. Google crawler ser ny data, ny `modified_time`, ny synlig tekst. Over 6 måneder akkumulerer det 300+ freshness-events – konkurrenter har 0.

3. **Knowledge Graph:** 1.470 SoftwareApplication entities med ratings skaber et semantisk netværk Google ikke kan ignorere. Det binder slots → providers → casinoer sammen i ét kohærent knowledge graph.

### Filer der ændres
- `src/hooks/useSlotCatalog.ts` (2 nye hooks)
- `src/components/ProviderCatalogSlots.tsx` (ny fil)
- `src/pages/providers/ProviderPageTemplate.tsx` (swap komponent + freshness)
- `src/pages/SlotDatabase.tsx` (freshness badge + schema)
- `src/lib/seo.ts` (ny schema-builder)

