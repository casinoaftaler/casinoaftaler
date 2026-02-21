
# Fix alle 7 issues fra /casino-nyheder produktionsvalidering

## Overblik
Planen adresserer 3 kritiske fejl og 4 warnings fundet i produktionsvalideringen af casino-nyheder sektionen.

---

## 1. Header: Tilfoej Casino Nyheder link (KRITISK)
Tilfoej "Casino Nyheder" som et direkte link i "Mere" dropdown-menuen i desktop-navigationen, placeret efter "Kontakt" og foer "Forfattere". Tilfoej ogsaa i mobil-menuen.

**Fil:** `src/components/Header.tsx`
- Desktop: Tilfoej `DropdownMenuItem` med `Newspaper` ikon og link til `/casino-nyheder` i "Mere" dropdown (efter Kontakt, linje ~463)
- Mobil: Tilfoej tilsvarende link i mobil-menuen

---

## 2. Forside: Tilfoej Casino Nyheder sektion (KRITISK)
Tilfoej en kort "Seneste Casino Nyheder" sektion paa forsiden med link til hubben. Placeres efter "Casino Anmeldelser" sektionen (linje ~471).

**Fil:** `src/pages/Index.tsx`
- Tilfoej en ny sektion med H2 "Casino Nyheder" og et afsnit med kontekst
- Inkluder et `Link` til `/casino-nyheder` hubben
- Sikrer crawl-dybde 1 fra forsiden

---

## 3. QuickNavBar: Tilfoej Casino Nyheder (WARNING)
Tilfoej Casino Nyheder til sidebar-navigationen.

**Fil:** `src/components/QuickNavBar.tsx`
- Tilfoej `{ label: "Casino Nyheder", to: "/casino-nyheder", icon: anmeldelserIcon }` til `navItems` arrayet

---

## 4. robots.txt: Brug venlig sitemap-news URL (WARNING)
Erstat den raa Supabase URL med en mere SEO-venlig reference. Da edge function URL'en er den faktiske endpoint, behold den men tilfoej en kommentar. Alternativt: ingen aendring nødvendig, da Google kan crawle begge formater. Men for konsistens, behold som den er (dette er funktionelt korrekt).

**Fil:** `public/robots.txt`
- Ingen aendring nødvendig - URL'en fungerer korrekt og Google crawler den fint

---

## 5. Hero images: Tilfoej width/height attributter (WARNING)
Tilfoej eksplicitte `width` og `height` attributter paa hero-billeder for at forhindre CLS.

**Fil:** `src/pages/CasinoNyhedArticle.tsx`
- Tilfoej `width={1200} height={400}` paa hero image (linje ~142-148)

**Fil:** `src/pages/CasinoNyheder.tsx`
- Tilfoej `width={600} height={192}` paa article card images (linje ~149-154)

---

## 6. Hub-datoer: Goer dynamiske (WARNING)
Erstat hardcoded datoer i hub-sidens schema og AuthorMetaBar med dynamiske vaerdier baseret paa seneste artikel.

**Fil:** `src/pages/CasinoNyheder.tsx`
- Beregn `latestModified` fra `articles[0]?.updated_at` eller `published_at`
- Brug dynamisk dato i `buildArticleSchema({ datePublished, dateModified })`
- Brug dynamisk dato i `AuthorMetaBar date={...}`

---

## 7. AuthorBio billeder: Tilfoej width/height (WARNING)
Author-billederne har allerede `width={176} height={176}` i AuthorBio.tsx. Men AuthorMetaBar bruger ogsaa forfatter-billeder - verificer at de ogsaa har dimensioner.

**Fil:** `src/components/AuthorMetaBar.tsx`
- Verificer og tilfoej `width`/`height` attributter paa forfatter-avatarer

---

## Teknisk Opsummering

| # | Problem | Fil(er) | Type |
|---|---------|---------|------|
| 1 | Manglende header-link | Header.tsx | Kritisk |
| 2 | Manglende forside-link | Index.tsx | Kritisk |
| 3 | Manglende QuickNav-link | QuickNavBar.tsx | Warning |
| 4 | robots.txt URL | Ingen aendring | OK |
| 5 | Hero image CLS | CasinoNyhedArticle.tsx, CasinoNyheder.tsx | Warning |
| 6 | Hardcoded hub-datoer | CasinoNyheder.tsx | Warning |
| 7 | Author avatar dimensioner | AuthorMetaBar.tsx | Warning |

Samlet: 5 filer aendres, 0 nye filer, 0 database-migrationer.
