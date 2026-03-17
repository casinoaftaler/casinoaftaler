
Fase 3 bør bygges som et offentligt “Market Intelligence”-lag oven på det trust-system, der allerede findes. Den rigtige strategi er at starte public-first, men gøre datamodellen klar til senere redaktionel kuratering.

1. Hvorfor dette skal laves nu
- I har allerede et stærkt backend-grundlag: `casino_compliance`, `casino_compliance_history`, `page_metadata`, trust-panel, admin og freshness-kobling.
- Det der mangler, er et offentligt produktlag, som gør data menneskeligt læsbar, crawlbar og linkbar.
- I dag er historikken teknisk smal: databasen indeholder primært kildeændringer (`license_source_url` 145 rækker, `bonus_source_url` 61 rækker) og ikke egentlige redaktionelle “markedshændelser”.
- Derfor er Fase 3 vigtig: den gør trust-data til et synligt E-E-A-T-aktiv i stedet for bare et supporting widget-lag.

2. Hvad der skal bygges
A. Ny offentlig hubside
Ny side, fx `/markedsindsigt`, som bliver den offentlige destination for:
- seneste verificerede ændringer på markedet
- samlet markedsstatus
- regulatoriske/licensmæssige signaler
- bonus- og vilkårsbevægelser
- operatøroversigt

B. Offentlige komponenter
Der bør laves et nyt komponentlag med:
- hero/snapshot-blok med markedstal
- “seneste ændringer”-feed
- operatørtabel med licensstatus, bonusstatus, sidste kontrol, score
- sektion med forklaring af metode og kilder
- teaser-komponenter, som senere kan genbruges på anmeldelser/hubs

C. Nyt event-lag i databasen
Der bør ikke bygges direkte oven på rå `casino_compliance_history`.
I stedet bør der laves en ny offentlig tabel, fx `market_intelligence_events`, med felter som:
- id
- casino_slug nullable
- event_type
- category
- headline
- summary
- impact_level
- source_url
- source_label
- published_at
- effective_date
- is_featured
- is_public
- created_at / updated_at

Hvorfor:
- `casino_compliance_history` er et teknisk audit-log
- public feed kræver redaktionel formulering, ikke kun old/new værdier
- det gør senere admin/publicering meget lettere

3. Hvad der kan genbruges direkte
Eksisterende systemer giver et stærkt fundament:
- `useCasinoTrust.ts` til public trust-data
- `casinoTrust.ts` til path-logik og opsummeringer
- `CasinoTrustAdminSection.tsx` til nuværende dataforvaltning
- `page_metadata` til freshness-touch
- `SEO.tsx` + breadcrumbs til schema/canonical/breadcrumbs
- eksisterende nyhedsmønstre og enterprise-hubs som layout-reference

4. Hvad der er problemet i nuværende data
Den nuværende historik er næsten kun source URL-opdateringer.
Det betyder:
- feedet vil ellers blive fyldt med “Licenskilde opdateret” og “Bonuskilde opdateret”
- det er godt som dokumentation, men ikke stærkt nok som offentlig markedsindsigt
- vi skal derfor adskille:
  - teknisk audit-log
  - public intelligence events

5. Anbefalet arkitektur
```text
casino_compliance
casino_compliance_history
        │
        ├─ bruges stadig til trust-panel + admin audit
        │
        └─ føder / inspirerer
             market_intelligence_events
                     │
                     ├─ offentlig hubside
                     ├─ teaser blocks
                     └─ future curated admin flow
```

6. Konkrete implementeringstrin
Trin 1 — Database
- Opret `market_intelligence_events`
- Sæt RLS så alle kan læse public events, mens kun admin kan skrive
- Tilføj nyttige indeks på `published_at`, `is_public`, `casino_slug`, `category`
- Eventuelt også en simpel SQL-view eller helper-RPC til offentligt feed/snapshot

Trin 2 — Seed public data
- Generér første bølge af events ud fra eksisterende compliance-data:
  - licenskilde verificeret
  - bonusvilkår verificeret
  - større regulatoriske statusændringer hvis de findes
- Men seed skal være selektivt og menneskeligt formuleret, ikke bare rå diffs

Trin 3 — Frontend hooks
- Nyt hook til public events-feed
- Nyt hook til market snapshot
- Evt. nyt hook til operator overview baseret på `casino_compliance`

Trin 4 — Ny offentlig side
Siden bør indeholde:
- Hero: “Market Intelligence for danske casinoer”
- Snapshot cards:
  - antal trackede operatører
  - gyldige licenser
  - bonusvilkår verificeret
  - seneste markedstjek
- Featured events
- Seneste ændringer-feed
- Operatøroversigt
- Metode/kilder/E-E-A-T sektion
- FAQ
- LatestNewsByCategory og RelatedGuides for freshness + intern linking

Trin 5 — SEO/schema
Siden bør have:
- Article/WebPage schema via eksisterende `SEO`
- Breadcrumbs via eksisterende system
- evt. CollectionPage/Dataset-lignende supplement hvis indholdet bliver mere datatungt
- `page_metadata` entry så freshness kan styres ordentligt

Trin 6 — Teasers på eksisterende sider
Efter hubben er live, kan der bygges små public entry points:
- på `/casino-anmeldelser`: “Seneste markedsændringer”
- på `/casino-bonus`: “Bonusmarked opdateret”
- på `/casinoer`: “Markedsstatus”
Men det bør være sekundært efter selve hubben

7. Hvad jeg vil bygge først
Public-first version bør være:
- ny tabel til public events
- ny route `/markedsindsigt`
- public feed + snapshot + operator overview
- SEO/breadcrumb/page metadata
- initial seed af rigtige public events
- links fra relevante trust-/money-pages

8. Hvad jeg bevidst ikke vil bygge i første omgang
For at holde Fase 3 skarp:
- ikke fuld admin-editor til events endnu
- ikke automatisk AI-skrivning af events
- ikke edge function automation i første iteration
- ikke realtime

9. Hvorfor denne rækkefølge er rigtig
- Den giver jer et offentligt, crawlbart produkt hurtigt
- Den undgår at bygge UI oven på et forkert datalag
- Den bevarer eksisterende trust-engine intakt
- Den gør Fase 4 enkel: admin-kuratering/publicering oven på samme eventmodel

10. Teknisk leverance for “Lad os lave det hele”
Jeg vil i implementeringen fokusere på:
- database: nyt public event-lag med sikker RLS
- frontend: ny enterprise hubside for markedsindsigt
- data: initial public event-seeding fra eksisterende compliance-verificeringer
- SEO: schema, breadcrumbs, page metadata, intern linking
- integration: kobling til eksisterende trust/freshness-engine uden at bryde nuværende paneler

11. Forventet effekt
- stærkere E-E-A-T, fordi markedsovervågning bliver offentlig og vedvarende
- bedre intern linking til money-pages og trust-sider
- mere unikt indhold ift. konkurrenter
- mere troværdig dokumentation af licenser/bonusændringer
- et klart fundament for senere redaktionel kuratering

12. Kort teknisk note
Der skal laves schemaændringer i databasen, fordi den nuværende `casino_compliance_history` ikke er egnet som public content-model. Public layer skal læse fra en dedikeret tabel og ikke direkte fra tekniske audit logs. Eksisterende RLS ser god ud for trust-tabellerne, så den nye tabel bør følge samme mønster: public read, admin write.

13. Implementeringsscope jeg vil følge
- Fase 3A: public market intelligence hub + datamodel + seed + SEO
- Fase 3B senere: admin/publiceringsværktøj, featured control, evt. automation fra compliance changes

<lov-actions>
<lov-suggestion message="Test den nye Market Intelligence-side end-to-end og verificér feed, links, schema og placering på desktop og mobil.">Verify that it works</lov-suggestion>
<lov-suggestion message="Implementer Fase 3A nu: opret public event-tabellen, byg /markedsindsigt-siden, seed de første events og forbind den med eksisterende trust-data.">Byg Fase 3A nu</lov-suggestion>
<lov-suggestion message="Tilføj teaser-blokke fra Market Intelligence-hubben på casinoanmeldelser, /casinoer og /casino-bonus for at sende mere intern linkværdi til den nye side.">Tilføj teaser-blokke</lov-suggestion>
<lov-suggestion message="Lav Fase 3B bagefter med admin-kuratering, så redaktionen kan oprette, fremhæve og publicere Market Intelligence-events manuelt.">Planlæg admin-kuratering</lov-suggestion>
</lov-actions>
