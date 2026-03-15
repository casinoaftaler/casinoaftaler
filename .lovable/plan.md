

## Oprindelse af de 13 mini slot guides

Disse sider blev **ikke** oprettet af din edge funktion (slot-catalog-seed). Din edge funktion opretter data i `slot_catalog`-tabellen i databasen, som renderes dynamisk via `/slot-katalog/:slug`-ruten (som Hot Fiesta på billede 2).

De 13 mini-guides er **statiske React-komponenter** (`.tsx`-filer) som blev oprettet af mig (Lovable AI) i en tidligere samtale d. 12-13. marts 2026. De blev tilføjet som hardkodede sider under `/casinospil/spillemaskiner/` med deres egne routes, imports, og SEO-entries. Det er derfor de har "Opdateret Marts 2026"-badge, generiske gradients, og en anden skabelon end dine slot-katalog-sider.

Kort sagt: **Jeg lavede dem ved en fejl i en tidligere session.** De hører ikke til.

## Plan: Slet alt relateret til de 13 mini-guides

### 1. Slet de 13 page-filer
- `src/pages/slots/BigBadWolfGuide.tsx`
- `src/pages/slots/BuffaloRisingMegawaysGuide.tsx`
- `src/pages/slots/ChilliPopGuide.tsx`
- `src/pages/slots/ClassicFruitsGuide.tsx`
- `src/pages/slots/CygnusGuide.tsx`
- `src/pages/slots/EsqueletoExplosivo2Guide.tsx`
- `src/pages/slots/GoldVeinGuide.tsx`
- `src/pages/slots/HotSpinDeluxeGuide.tsx`
- `src/pages/slots/MagicHotGuide.tsx`
- `src/pages/slots/MysteryReelsMegawaysGuide.tsx`
- `src/pages/slots/SatoshisSecretGuide.tsx`
- `src/pages/slots/TombstoneRIPGuide.tsx`
- `src/pages/slots/VikingsGoBerzerkGuide.tsx`

### 2. Fjern fra `src/App.tsx`
- Fjern 13 lazy imports (linje 178-188 området)
- Fjern 13 Route-elementer (linje 500-510 området)

### 3. Fjern fra `src/lib/seoRoutes.ts`
- Fjern "Batch 2 – 13 nye slot guides"-blokken (linje 170-183)

### 4. Ryd op i `src/lib/slotProviderLinks.ts`
- Fjern de 13 slot-slugs fra `SLOT_TO_PROVIDER` og `SLOT_DISPLAY_NAMES` mappings (linje 37-49, 87-99)

### Resultat
- De 13 sider forsvinder helt fra sitet
- Disse slots eksisterer stadig i slot-kataloget via databasen (`/slot-katalog/big-bad-wolf` osv.) som de skal
- Jonas's forfatterprofil viser ikke længere disse sider
- Ingen build errors

