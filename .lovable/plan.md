

## Ekspandér slot-database programmatisk

### Status quo

I har **494 slots** fra 47 providers i `slot_catalog` — alle importeret organisk via Bonus Hunt API'et. Næsten alle har RTP, volatilitet og max potential udfyldt (tak til `slot-catalog-enrich`). Det er en solid start, men det er kun de slots I tilfældigvis har spillet i hunts.

### Hvad vi bygger

En ny Edge Function `slot-catalog-seed` der programmatisk importerer hundredvis af populære spillemaskiner fra kendte providers — uafhængigt af om de har optrådt i en bonus hunt.

**Kilde:** AI-genereret seed-data fra Lovable AI (Gemini). Funktionen beder modellen om de mest populære slots pr. provider og upsert'er dem via den eksisterende `upsert_slot_catalog` RPC.

**Flow:**
1. Admin klikker "Seed Slot Database" i admin-panelet
2. Edge Function itererer over en liste af top-providers (Pragmatic Play, NetEnt, Play'n GO, Hacksaw, Nolimit City, BTG, Red Tiger, ELK, Yggdrasil, Microgaming, Relax Gaming, Push Gaming, Thunderkick, Blueprint, iSoftBet)
3. For hver provider: AI returnerer 30-50 slots med RTP, volatilitet, max potential
4. `upsert_slot_catalog` sikrer ingen dubletter (case-insensitivt)
5. Eksisterende bonus hunt-data (highest_win, highest_x, bonus_count) røres **aldrig**

**Mål:** Gå fra ~494 → 1.000-1.500+ slots.

### Hvorfor det er en SEO-bombe

**1. Topical Authority eksplosion**

Google vurderer jeres autoritet inden for "online slots" baseret på **bredde og dybde** af jeres dækning. Med 494 slots dækker I kun de slots I tilfældigvis har spillet. Med 1.500+ dækker I hele markedet systematisk — hver eneste populære spillemaskine en dansk spiller kan søge på.

Det sender et klart signal: "Denne side ved ALT om spillemaskiner."

**2. Internal linking-netværk eksploderer**

Jeres `entityAutoLinker.ts` og `SLUG_MAP` kan udvides til at linke fra artikler, nyheder og guides direkte til individuelle slots i databasen. Forestil jer:

- En nyhed om "Sweet Bonanza får ny feature" → auto-linker til `/slot-katalog` med Sweet Bonanza data
- Casino-anmeldelser der nævner specifikke slots → link til slot-databasen
- Provider-guides (fx `/spiludviklere/pragmatic-play`) → linker til alle Pragmatic-slots i kataloget

Det skaber **hundredvis af nye interne links** der fordeler link-equity ned til slot-databasen og op til provider-siderne. Det er præcis den "Semantic Authority Loop" I allerede kører — bare med 3x flere noder i netværket.

**3. Long-tail keyword dominans**

Hver slot i databasen er en potentiel landing page for søgninger som:
- "Sweet Bonanza RTP"
- "Gates of Olympus volatilitet"  
- "Nolimit City slots oversigt"

Med 1.500+ slots fanger I tusindvis af long-tail søgninger der tilsammen udgør mere trafik end de brede termer.

**4. Crawl-signal og freshness**

En database med 1.500+ entries der opdateres løbende (via bonus hunts + enrich) giver Google et stærkt freshness-signal. Sitemappet vokser, crawl-frekvensen stiger, og jeres sider opdateres oftere i indekset.

**5. Konkurrence-moat**

Ingen af jeres konkurrenter har en slot-database med community-verified performance-data. De kan kopiere jeres tekst, men de kan ikke kopiere 1.500+ slots med live test-resultater fra Twitch bonus hunts. Det er **umuligt at reverse-engineere**.

### Teknisk plan

**Fil 1: `supabase/functions/slot-catalog-seed/index.ts`**
- Accepterer `{ providers?: string[] }` (default: alle 15 top-providers)
- For hver provider: kalder Lovable AI med prompt for top 30-50 slots
- Parser JSON-response og kalder `upsert_slot_catalog` for hver slot
- Returnerer summary med antal nye vs. eksisterende

**Fil 2: `src/components/admin/SlotCatalogAdminSection.tsx`**
- Tilføj "Seed Database" knap der kalder Edge Function
- Vis progress (provider for provider)

**Fil 3: `supabase/config.toml`**
- Tilføj `[functions.slot-catalog-seed]` med `verify_jwt = false`

### Ingen database-ændringer

`slot_catalog` tabellen og `upsert_slot_catalog` RPC'en er allerede klar. Det case-insensitive unikke indeks sikrer at der aldrig kommer dubletter.

