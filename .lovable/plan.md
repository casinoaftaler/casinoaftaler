## Komplet Analyse: "Mere"-Clusteret (Trust & Info-sider)

### Siderne i clusteret


| Side                | Sti                        | Prioritet | LatestNews | RelatedGuides | FAQ | AuthorBio | Links til money-pages                                            |
| ------------------- | -------------------------- | --------- | ---------- | ------------- | --- | --------- | ---------------------------------------------------------------- |
| Casino Ordbog       | /ordbog                    | 0.9       | —          | —             | —   | —         | Via GlossaryMoneyLinks                                           |
| Om Casinoaftaler.dk | /om                        | 0.6       | Nej        | Ja (6)        | Nej | ajse      | casino-anmeldelser, casino-bonus, nye-casinoer                   |
| Sådan tester vi     | /saadan-tester-vi-casinoer | 0.8       | Nej        | Nej ❌         | Ja  | ajse      | nye-casinoer, casino-anmeldelser, ansvarligt-spil                |
| Forretningsmodel    | /forretningsmodel          | 0.6       | Nej        | Ja (5)        | Nej | niklas    | 12 hub-links (casino-bonus, nye-casinoer, free-spins, etc.)      |
| Redaktionel Politik | /redaktionel-politik       | 0.6       | Nej        | Ja (5)        | Nej | ajse      | forretningsmodel, saadan-tester                                  |
| Ansvarligt Spil     | /ansvarligt-spil           | —         | —          | —             | —   | —         | Eget cluster (6 spokes) – ingen affiliate-links (compliance)     |
| Casino Licenser     | /casino-licenser           | 0.8       | —          | —             | —   | —         | Del af /casinoer cluster                                         |
| Spillemyndigheden   | /spillemyndigheden         | 0.7       | Ja ✅       | Ja            | Ja  | ajse      | spiludviklere, betalingsmetoder, ordbog                          |
| Kontakt             | /kontakt                   | 0.5       | Nej        | Ja            | Ja  | ajse      | velkomstbonus, nye-casinoer, om                                  |
| Casino Nyheder      | /casino-nyheder            | 0.9       | N/A        | Ja (5)        | Nej | ajse      | casino-anmeldelser, casino-bonus, nye-casinoer, betalingsmetoder |
| Forfattere          | /forfatter/*               | 0.6       | —          | —             | —   | —         | Profilering, links til artikler                                  |


---

### Hvad fungerer (Elite-niveau)

1. **Breadcrumb-hierarki**: Korrekt hub-and-spoke. /saadan-tester-vi-casinoer, /forretningsmodel, /redaktionel-politik og /kontakt har alle PARENT_OVERRIDE til `/om` hubben.
2. **Spillemyndigheden** er bundet til `/casinoer` cluster via PARENT_OVERRIDE – korrekt.
3. **Inbound links**: Massiv distribution:
  - `/spillemyndigheden` → 764 matches i 87 filer (entity auto-linker + manuelt)
  - `/saadan-tester-vi-casinoer` → 350 matches i 54 filer (alle anmeldelser)
  - `/forretningsmodel` → 104 matches i 17 filer (AuthorMetaBar disclaimer-varianter)
  - `/redaktionel-politik` → 110 matches i 18 filer
  - `/kontakt` → 45 matches i 9 filer
  - `/om` → 77 matches i 12 filer
4. **Cross-linking inden for clusteret**: Siderne linker indbyrdes (forretningsmodel ↔ redaktionel-politik ↔ saadan-tester ↔ om).
5. **entityAutoLinker**: "Spillemyndigheden" er registreret som entity mapping → auto-links fra alle HTML-content sider.
6. **Forretningsmodel.tsx**: Har en dedikeret "Udforsk vores indhold"-sektion med 12 hub-links til alle primære money-pages. Excellent equity distribution.
7. **Footer**: Inkluderer /forretningsmodel, /kontakt, /spillemyndigheden.
8. **JSON-LD**: Alle sider med buildArticleSchema har korrekt author, datePublished og dateModified.

---

### Fundne issues

**Issue 1: `LatestNewsByCategory` mangler på 5 sider**

- `/om`, `/forretningsmodel`, `/redaktionel-politik`, `/saadan-tester-vi-casinoer`, `/kontakt` har INGEN `LatestNewsByCategory`. 
- `/spillemyndigheden` har den ✅, `/casino-nyheder` er selve hubben.
- Disse sider er statiske E-E-A-T trust-sider. De mangler freshness-signaler. Alle andre strategiske sider (guides, anmeldelser, hubs) har denne komponent.

**Issue 2: `RelatedGuides` mangler på `/saadan-tester-vi-casinoer**`

- Alle andre sider i clusteret har RelatedGuides – denne har det ikke.

**Issue 3: Ingen issues med money-page linking**

- Forretningsmodel har 12 money-page links ✅
- Spillemyndigheden linker til spiludviklere, betalingsmetoder, ordbog ✅
- Kontakt linker til velkomstbonus, nye-casinoer ✅
- CasinoNyheder + NewsHubSections linker til casino-bonus, casino-anmeldelser, nye-casinoer, betalingsmetoder ✅
- RedaktionelPolitik linker til forretningsmodel og testmetode ✅
- Ordbog-termer linker via GlossaryMoneyLinks til relevante money-pages ✅

---

### Konklusion

**Clusteret er 95% elite.** Breadcrumbs, inbound links, cross-linking, entity-mapping, money-page equity flow og JSON-LD er alt korrekt.

De to mangler er:

1. **Tilføj `LatestNewsByCategory**` til: `/om`, `/forretningsmodel`, `/redaktionel-politik`, `/saadan-tester-vi-casinoer`, `/kontakt` – dette giver freshness-signaler og kontekstuelle nyheds-links. (Behøver vi dette når det ikk er på money pages) ?
2. **Tilføj `RelatedGuides**` til `/saadan-tester-vi-casinoer` – matcher standarden på alle andre sider i clusteret.

Begge er simple tilføjelser (1 import + 1 komponent-linje per fil). Skal jeg implementere dem?