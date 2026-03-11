

## Fuld SEO Enterprise Analyse: /statistik

### Kritisk problem: /statistik er en orphan page

**Nul interne links peger til /statistik** fra nogen side på hele sitet — bortset fra header-navigation (navData.ts) og RelatedGuides-rotationen. Det betyder:
- Google ser den som lav-prioritet
- Ingen link equity flyder til siden
- Den bryder 3-klik reglen kun via menuen, ikke via content-links

---

### Hvad mangler — prioriteret liste

**1. Forsiden (Index.tsx) — KRITISK**
- `HomepageBonusHuntSection` nævner Bonus Hunt Arkiv, Slot Database, Turneringsarkiv — men IKKE Statistik. Der skal tilføjes et link-kort: `<Link to="/statistik">Statistik</Link>`
- `HomepageLiveCommunity` har CTA-knapper til /bonus-hunt, /community/slots, /slot-database — mangler /statistik CTA
- `noscript` fallback i HomepageLiveCommunity mangler /statistik link

**2. BonusHuntCommunityLinks — KRITISK**
- Bruges på tværs af alle community-sider via CommunitySeoSections. Linker til 9 community-sider men IKKE /statistik. Én tilføjelse her giver links fra 10+ sider automatisk.

**3. CommunitySeoBridge — VIGTIG**
- ALL_LINKS arrayet (9 links) bruges på community-sider med rotation. /statistik mangler.

**4. entityMappings.ts — VIGTIG**
- Auto-linkeren har ingen mapping for "statistik" / "bonus hunt statistik". Tilføj entity-mapping så prosa-tekst automatisk linker til /statistik ved forekomst.

**5. BonusHunt.tsx — VIGTIG**
- Hovedsiden for bonus hunt. Bør linke til /statistik i sin SEO-prosa som "Se aggregeret statistik fra alle hunts".

**6. SlotDatabase.tsx — VIGTIG**
- Relateret data-side. Bør have inline-link til /statistik.

**7. CommunityHub.tsx — VIGTIG**
- SECTIONS-arrayet har 7 community-kort. /statistik mangler som kort.

**8. Siden selv mangler:**
- `CommunityBrandBlock` — alle andre community enterprise-hubs har den
- `CommunitySeoSections` — giver tovejs-linking til money-pages
- `CommunitySeoBridge` — bridge-komponent fra community → money pages
- `<noscript>` fallback kunne forbedres med flere links
- Ingen `itemListElement` JSON-LD for provider/slot tabellerne

**9. Sitemap-sider**
- /sitemap og sub-sitemaps nævner ikke /statistik under community-gruppen

---

### Implementeringsplan

| # | Fil | Ændring |
|---|-----|---------|
| 1 | `src/components/HomepageBottomSections.tsx` | Tilføj `/statistik` link-kort i HomepageBonusHuntSection |
| 2 | `src/components/HomepageLiveCommunity.tsx` | Tilføj `/statistik` CTA-knap + noscript link |
| 3 | `src/components/bonus-hunt/BonusHuntCommunityLinks.tsx` | Tilføj Statistik-kort (BarChart3 icon) |
| 4 | `src/components/community/CommunitySeoBridge.tsx` | Tilføj `/statistik` i ALL_LINKS |
| 5 | `src/lib/entityMappings.ts` | Tilføj entity: "bonus hunt statistik" → `/statistik` |
| 6 | `src/pages/Statistik.tsx` | Tilføj `CommunityBrandBlock` + `CommunitySeoSections` efter AuthorBio. Tilføj ItemList JSON-LD for top-10 slots |
| 7 | `src/pages/CommunityHub.tsx` | Tilføj Statistik-kort i SECTIONS-arrayet |
| 8 | `src/pages/BonusHunt.tsx` | Tilføj inline-link til /statistik i SEO-prosa |
| 9 | `src/pages/SlotDatabase.tsx` | Tilføj inline-link til /statistik i intro-prosa |

Dette giver /statistik links fra:
- Forsiden (2 steder)
- Alle community-sider via BonusHuntCommunityLinks (10+ sider)
- CommunitySeoBridge rotation (alle community-sider)
- BonusHunt + SlotDatabase (højautoritets-sider)
- CommunityHub
- entityAutoLinker (potentielt 50+ sider med prosa-matches)

Estimeret resultat: fra **0 content-links** til **30-50+ interne links** fordelt på hele sitet.

