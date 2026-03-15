

## Problem: Mini-Guides fejlagtigt tilknyttet Jonas

### Hvad der sker
13 "mini slot guides" (oprettet d. 12. marts 2026) er registreret under Jonas i `src/data/authorContent.ts` (linje 95-108) og har `author="jonas"` i deres page-komponenter. Disse er **ikke** dybdegående guides – de er korte, template-baserede sider med identisk struktur, generiske gradients, og ingen unik analyse.

De 13 sider er:
1. Hot Spin Deluxe
2. Esqueleto Explosivo 2
3. Classic Fruits
4. Gold Vein
5. Mystery Reels Megaways
6. Cygnus
7. Chilli Pop
8. Big Bad Wolf
9. Magic Hot
10. Vikings Go Berzerk
11. Tombstone RIP
12. Buffalo Rising Megaways
13. Satoshi's Secret

### Hvad der skal ske
Disse sider skal have **"Casinoaftaler Redaktionen"** som forfatter – ligesom de programmatiske slot-katalog-sider.

### Plan

**1. Fjern mini-guides fra Jonas i `authorContent.ts`**
- Slet linje 95-108 (hele "Mini slot guides (Jonas)" blokken) fra `jonasArticles`.

**2. Opdater alle 13 page-komponenter**
I hver fil:
- Ændr `<AuthorMetaBar author="jonas" ...>` til `<AuthorMetaBar author="redaktionen" ...>`
- Ændr `<AuthorBio author="jonas" ...>` til `<AuthorBio author="redaktionen" ...>` (eller fjern helt)
- Ændr `authorName: "Jonas"` / `authorUrl` i `buildArticleSchema()` til `authorName: "Casinoaftaler Redaktionen"` med organisation-type

Filer:
- `src/pages/slots/HotSpinDeluxeGuide.tsx`
- `src/pages/slots/EsqueletoExplosivo2Guide.tsx`
- `src/pages/slots/ClassicFruitsGuide.tsx`
- `src/pages/slots/GoldVeinGuide.tsx`
- `src/pages/slots/MysteryReelsMegawaysGuide.tsx`
- `src/pages/slots/CygnusGuide.tsx`
- `src/pages/slots/ChilliPopGuide.tsx`
- `src/pages/slots/BigBadWolfGuide.tsx`
- `src/pages/slots/MagicHotGuide.tsx`
- `src/pages/slots/VikingsGoBerzerkGuide.tsx`
- `src/pages/slots/TombstoneRIPGuide.tsx`
- `src/pages/slots/BuffaloRisingMegawaysGuide.tsx`
- `src/pages/slots/SatoshisSecretGuide.tsx`

**3. Sikr at `AuthorMetaBar` og `AuthorBio` understøtter "redaktionen"**
- Verificer at `author="redaktionen"` allerede viser "Casinoaftaler Redaktionen" korrekt. Hvis ikke, tilføj denne case.

### Resultat
- Jonas's profil viser kun dybdegående guides (Book of Dead, Razor Shark, Gates of Olympus, Sweet Bonanza, Dead or Alive 2, osv.)
- De 13 mini-guides vises med "Casinoaftaler Redaktionen" i stedet
- JSON-LD schema bruger Organization-type i stedet for Person

