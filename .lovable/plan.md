## Analyse: Provider Hub Pages

### Hvad ChatGPT foreslår

Dedikerede "provider slot hub" sider som `/spillemaskiner/pragmatic-play` der ranker på "pragmatic play slots" og sender interne links til alle slots fra den provider.

### Hvad vi allerede har

- **13 provider-guides** på `/spiludviklere/*` (8.000+ ord hver) — dybdegående guides om hver developer
- **ProviderCatalogSlots** komponent allerede integreret på provider-siderne — viser live data fra slot_catalog med RTP, volatilitet, highest X
- **Freshness-signaler** med "Data opdateret efter Bonus Hunt #X"
- **Kategori-sider**: `/megaways-slots`, `/jackpot-slots`, `/bonus-buy-slots`

### Gabet

De nuværende provider-sider er på `/spiludviklere/pragmatic-play` og er "om udvikleren"-guides. De ranker på "pragmatic play" men **ikke** nødvendigvis på "pragmatic play **slots**" eller "pragmatic play **spillemaskiner**".

### Plan: Provider Slot Hub Pages

Opret nye mellemlag-sider under `/spillemaskiner/` der er specifikt optimeret til slot-søgeintentionen:

**Nye ruter** (13 sider):

- `/spillemaskiner/pragmatic-play`
- `/spillemaskiner/netent`
- `/spillemaskiner/play-n-go`
- `/spillemaskiner/hacksaw-gaming`
- `/spillemaskiner/big-time-gaming`
- `/spillemaskiner/microgaming`
- `/spillemaskiner/nolimit-city`
- `/spillemaskiner/evolution-gaming`
- `/spillemaskiner/elk-studios`
- `/spillemaskiner/yggdrasil`
- `/spillemaskiner/relax-gaming`
- `/spillemaskiner/red-tiger`
- `/spillemaskiner/igt`

**Indhold per side:**

1. SEO-optimeret titel: "Pragmatic Play Slots – Alle Spillemaskiner & Statistik 2026"
2. Intro-tekst (300-500 ord) fokuseret på slots, ikke virksomheden
3. Quick stats (antal slots i katalog, gns. RTP, mest populære)
4. **Fuld slot-tabel** fra `slot_catalog` med RTP, volatilitet, highest X, bonus count
5. Links til eksisterende dybdegående guide (`/spiludviklere/X`)
6. Links til individuelle slot-katalog-sider (`/slot-katalog/X`)
7. Breadcrumb: Forside > Spillemaskiner > Pragmatic Play Slots

**Teknisk implementering:**

- Én `ProviderSlotsHub.tsx` template-komponent (genbruger `useProviderSlots` hook)
- Dynamisk route via provider-slug parameter
- Genbruger eksisterende `ProviderCatalogSlots` data
- Article + ItemList JSON-LD schema
- Registrering i `seoRoutes.ts`, `breadcrumbs.ts`, `page_metadata`

**SEO-gevinst:**

- Fanger "pragmatic play slots" søgeintention (kommerciel)
- Skaber et nyt mellemlag der sender link equity ned til 1.460 slot-sider
- Cross-linker til eksisterende provider-guides for authority flow
- 13 nye indexerbare sider med unik data

**Estimeret omfang:** 2-3 implementeringssteps — template, routes, breadcrumbs/sitemap.  
  
  
(SE TEKST FRA CHATGPT)   
  
Vi vil oprette provider hub pages under:

/spillemaskiner/{provider}

Eksempler:

/spillemaskiner/pragmatic-play  
/spillemaskiner/hacksaw-gaming  
/spillemaskiner/play-n-go

Disse sider må IKKE være thin content eller generiske templates.

De skal indeholde unikt indhold og unik data per provider.

---

KRAV TIL INDHOLD

Hver provider-side skal indeholde:

1. UNIK INTROTEKST

300-500 ord skrevet specifikt om den enkelte provider.

Teksten skal være forskellig for hver provider og må IKKE være generiske templates.

Eksempel emner:

- providerens historie
- typiske slot features
- volatilitet
- bonus buy trends
- populære slots
- RTP tendenser

---

2. PROVIDER STATISTIK (DYNAMISK DATA)

Generér statistik baseret på slot_catalog data.

Vis fx:

Total antal slots  
Gennemsnitlig RTP  
Antal high volatility slots  
Antal bonus buy slots  
Mest populære slots

Disse tal vil være unikke per provider.

---

3. SLOT TABEL

Vis alle slots fra den provider.

Kolonner:

Slot navn  
RTP  
Volatility  
Max win  
Bonus buy  
Link til slot side

Data hentes fra slot_catalog.

---

4. POPULÆRE SLOTS SEKTION

Vis fx:

Top 5 slots fra provider baseret på:

bonus hunt data  
popularitet  
eller database metrics.

---

5. INTERNE LINKS

Provider hub siden skal linke til:

alle slots fra provider

Eksempel:

/casinospil/spillemaskiner/gates-of-olympus

---

6. UNIK META DATA

Title eksempel:

"Pragmatic Play Slots – Alle Spillemaskiner & Statistik 2026"

Meta description skal være unik per provider.

---

7. SCHEMA MARKUP

Tilføj:

Article schema  
ItemList schema for slot listen.

---

VIGTIGT

Provider sider må IKKE være tynde templates.

Hver side skal have:

unik tekst  
unik statistik  
unik slot liste.

---

OUTPUT

Efter implementering:

1. verificér at alle provider sider har unik tekst
2. verificér at statistik er forskellig per provider
3. verificér at alle slots linker korrekt
4. verificér at sider kan crawles og indekseres.