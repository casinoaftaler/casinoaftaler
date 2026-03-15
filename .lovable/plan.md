

## Plan: Opret Niklas som ny forfatter

Niklas tilføjes som 4. forfatter med profil som **Finansøkonom & forsikringsekspert**, præcis efter samme mønster som Jonas, Kevin og Ajse.

---

### Filer der oprettes

**1. `src/assets/niklas-forfatter.webp`** + **`public/niklas-avatar.webp`**
- Du uploader billedet, og jeg placerer det korrekt i begge mapper (stor version til profil, avatar til meta-barer).

**2. `src/pages/ForfatterNiklas.tsx`** (~700 linjer)
- Klonet fra `ForfatterAjse.tsx` som template, tilpasset med:
  - Person schema: `@id: /forfatter/niklas#person`, jobTitle "Finansøkonom & forsikringsekspert", `knowsAbout` (forsikring, finans, bankroll management, casino skat, EV-analyse)
  - `sameAs`: LinkedIn (`https://www.linkedin.com/in/niclas-finscet-hansen/`)
  - Hero-sektion med badges: Forfatter, Finansøkonom, Forsikringsekspert
  - Profilkort med rolle, speciale, fokusområde, aktiv siden, artikler, indhold
  - Bio-sektion om hans baggrund (finans + forsikring + 5+ års erfaring)
  - Ekspertise-items: Finansiel analyse, Forsikring & risikostyring, Bonusøkonomi & EV, Casino & Skat
  - Dokumenteret Erfaring, Baggrund & Motivation sektioner
  - Top 3 Casinoer (SpilDanskNu, Spilleautomaten, Campobet)
  - Artikler skrevet af Niklas (fra authorContent registry)
  - Transparens & metode sektion
  - FAQ-sektion
  - `AuthorBio` + `RelatedGuides` i bunden

---

### Filer der opdateres

**3. `src/data/authorContent.ts`**
- Udvid `AuthorId` type: `"jonas" | "kevin" | "ajse" | "niklas"`
- Tilføj `niklasArticles: AuthorArticle[]` (tom array til start, eller med de artikler vi eventuelt flytter)
- Opdater `getAuthorArticles`, `getAuthorReviewVideos`, `getAuthorGuideVideos`, `getAuthorAllVideos` med `case "niklas"`

**4. `src/components/AuthorBio.tsx`**
- Tilføj `niklas` i `authorData` med navn, billede, alt, link, badge, rolle, bio og socials (LinkedIn)

**5. `src/components/AuthorMetaBar.tsx`**
- Udvid author type til `"jonas" | "kevin" | "ajse" | "niklas" | "redaktionen"`
- Tilføj `niklas` i `authorConfig` med avatar, alt-tekst og link
- Opdater faktatjek-logik (Niklas faktatjekkes af Kevin eller Jonas)

**6. `src/lib/seo.ts`**
- Tilføj `export const NIKLAS_SAME_AS = ["https://www.linkedin.com/in/niclas-finscet-hansen/"]`
- Udvid `buildPersonEntity()` til at håndtere `Niklas` med korrekt navn, billede, jobTitle og knowsAbout

**7. `src/App.tsx`**
- Tilføj lazy import: `const ForfatterNiklas = lazy(() => import("./pages/ForfatterNiklas"))`
- Tilføj route: `<Route path="/forfatter/niklas" element={<ForfatterNiklas />} />`

**8. `src/components/header/navData.ts`**
- Tilføj `{ to: "/forfatter/niklas", label: "Niklas" }` i `FORFATTER_LINKS`

**9. `src/lib/seoRoutes.ts`**
- Tilføj route-entry for `/forfatter/niklas` med changefreq, priority og lastmod

**10. `src/pages/OmTeamet.tsx`**
- Tilføj Niklas i teamoversigten med billede, navn, rolle og beskrivelse

**11. `src/components/community/CommunityBrandBlock.tsx`**
- Eventuelt tilføj Niklas som 3. person i brand-blokken (kan vente til senere)

---

### Hvad der IKKE ændres nu
- Ingen artikler flyttes til Niklas endnu (det gør vi som et separat trin)
- Ingen eksisterende siders `author`-prop ændres

