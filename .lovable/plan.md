
Målet er at gå i gang med Phase 1 nu: bygge både trust-UI og admin/freshness-styring samtidig, oven på det der allerede findes i koden.

1. Hvad jeg har verificeret i jeres nuværende løsning
- I har allerede et freshness-fundament:
  - `page_metadata` + `usePageLastmod()` + `AuthorMetaBar` til “Opdateret”-datoer.
  - adminværktøjer til at “touch’e” sider og sync’e sitemap.
  - `LatestNewsByCategory` på mange money pages som friskhedssignal.
- I har allerede trust-data i backend:
  - `casino_compliance`
  - `casino_compliance_history`
- I har ikke endnu et samlet frontend-lag, der viser disse trust-signaler på anmeldelser/money pages.
- I har heller ikke et dedikeret admin-flow, der gør compliance/freshness/history nemt at styre som et samlet system.

2. Hvad vi bygger først
Vi laver en første leverance med 2 spor, som hænger sammen:

A. Frontend trust-lag
- Ny genbrugelig “Trust & Freshness” komponent til money pages og anmeldelser.
- Den viser fx:
  - Sidst verificeret
  - Licensstatus
  - Bonus compliance
  - Compliance score / trust score-light
  - Kort historik-teaser: “Seneste ændring registreret …”
- Komponenten placeres tæt på toppen af relevante sider, sammen med eksisterende `AuthorMetaBar`.

B. Admin/freshness-lag
- Ny adminsektion hvor redaktionen kan:
  - se compliance-data pr. casino
  - se ændringshistorik
  - opdatere verificeringsdatoer
  - opdatere compliance-felter manuelt
  - samtidig “touch’e” relevante sider i freshness-systemet
- Det gør admin til den operative motor bag trust-signalerne.

3. Hvorfor den rækkefølge er rigtig
- I får synlig værdi på siden med det samme.
- Samtidig får I et internt workflow, så det ikke bliver endnu en død feature.
- Det udnytter eksisterende databaser i stedet for at starte forfra.
- Det er svært at kopiere, fordi signalerne kobler jeres redaktionelle lag, compliance-historik og freshness sammen.

4. Konkret implementeringsplan
Trin 1: Kortlægning af hvilke sider der skal have trust-laget først
Start med:
- `/casino-anmeldelser/*`
- `/casinoer`
- `/nye-casinoer`
- `/casino-bonus`
- evt. `/betalingsmetoder/*` og `/live-casino` i næste bølge

Trin 2: Byg et fælles frontend-komponentlag
- Én genbrugelig komponent, fx et trust-panel med:
  - “Sidst verificeret”
  - “Licens kontrolleret”
  - “Bonusvilkår kontrolleret”
  - “Historik registreret”
- Hvis der findes compliance-data for et casino, vis fuld trust-boks.
- Hvis ikke, fallback til page freshness fra `page_metadata`.

Trin 3: Kobl anmeldelser til compliance-data
- På review-sider matcher vi casinoets slug mod `casino_compliance.casino_slug`.
- Hvis data findes:
  - vis trust-status
  - hent 3-5 seneste rækker fra `casino_compliance_history`
- Hvis data mangler:
  - vis kun generel verificering/freshness, ikke falske badges.

Trin 4: Udvid admin med samlet trust-dashboard
- Ny sektion i Admin:
  - liste over casinoer/compliance-status
  - hurtig filtrering
  - visning af historik
  - knapper til:
    - markér verificeret nu
    - opdater licensstatus
    - opdater bonusdata
    - touch relevante sider
- Her genbruger vi mønstre fra eksisterende admin-sektioner og `PageMetadataAdminSection`.

Trin 5: Automatisk kobling mellem admin-opdatering og freshness
- Når redaktionen opdaterer et casino i trust-dashboardet:
  - compliance-data gemmes
  - relevante sider får opdateret `page_metadata.updated_at`
- Eksempel:
  - `spilleautomaten` opdateres
  - så touches fx:
    - `/casino-anmeldelser/spilleautomaten`
    - evt. `/casino-anmeldelser`
    - evt. `/casinoer`
- Det giver ærlige freshness-signaler, ikke bred “lastmod inflation”.

Trin 6: Introducér “change log teaser” på siderne
- Ikke hele historikken først.
- Kun en kort blok som:
  - “Seneste registrerede ændringer”
  - 1-3 seneste compliance-hændelser
- Senere kan vi udbygge det til fulde offentlige changelogs.

Trin 7: Rul ud til flere clusters
Efter reviews og money pages:
- betalingsmetoder
- live casino
- trust-sider
- evt. free-spins-relaterede sider hvor der allerede findes freshness-logik

5. Hvad det gør godt
- Styrker E-E-A-T: I dokumenterer markedet i stedet for kun at anbefale det.
- Styrker freshness: opdateringer bliver knyttet til faktiske redaktionelle handlinger.
- Styrker internal linking indirekte: trust-blokke og historik-teasers skaber nye kontekstuelle links.
- Skaber information gain: konkurrenter har sjældent offentligt verificeringslag koblet til reelle historikdata.
- Gør jeres redaktionelle arbejde synligt for både brugere og søgemaskiner.

6. Teknisk design
Frontend
- Genbruge:
  - `AuthorMetaBar`
  - `usePageLastmod`
  - eksisterende admin patterns
- Tilføje:
  - ny hook til compliance-data pr. casino/page
  - ny trust-komponent
  - evt. lille historik-komponent

Backend/data
- Primært genbruge eksisterende tabeller:
  - `casino_compliance`
  - `casino_compliance_history`
  - `page_metadata`
- Kun lave schema-ændringer hvis vi mangler et felt til UI eller admin-flow.
- RLS ser allerede korrekt ud til public SELECT + admin management.

Freshness-governance
- Kun touch’e sider, der faktisk er relaterede til ændringen.
- Ingen fake “alle sider opdateret i dag”.

7. Risici jeg vil undgå
- Ikke vise trust-badges på sider uden datadækning.
- Ikke opfinde scorelogik uden tydelig kilde.
- Ikke opdatere lastmod bredt og kunstigt.
- Ikke blande compliance-data og marketing-copy sammen på en utroværdig måde.

8. Min anbefalede første leverance
Første implementation bør være:
- Trust-panel på casino-anmeldelser
- Admin trust-dashboard
- Knytning mellem admin-opdatering og `page_metadata`
- Kort change-log teaser på anmeldelser

Det er den skarpeste første version, fordi den:
- er synlig
- er operationel
- er SEO-relevant
- og bygger direkte på jeres eksisterende systemer

9. Helt konkret næste skridt når du godkender
Jeg går i denne rækkefølge:
1. bygge trust-data hooks og UI-komponenter
2. bygge admin trust-dashboard
3. koble admin-opdateringer til freshness/page metadata
4. rulle trust-panel ud på casino-anmeldelser først
5. derefter udvide til de vigtigste money pages
