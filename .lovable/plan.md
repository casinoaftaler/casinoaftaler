

## Mobil Casino Cluster – Komplet SEO & Link Audit

### ✅ Hvad der VIRKER

| Område | Status | Detaljer |
|--------|--------|---------|
| **Routes (App.tsx)** | ✅ OK | Alle 6 ruter registreret og lazy-loaded |
| **seoRoutes.ts** | ✅ OK | Alle 6 sider med korrekt lastmod (2026-03-08), priority 0.7-0.8, changefreq monthly |
| **Breadcrumbs** | ✅ OK | Alle spokes har `PARENT_OVERRIDES` → `/mobil-casino` hub. Labels korrekte |
| **Sitemap** | ✅ OK | Alle 6 URLs genereres i sitemap.xml |
| **robots.txt** | ✅ OK | Ingen Disallow blokerer `/mobil-casino` eller `/casino-app` |
| **Intra-cluster linking** | ✅ OK | Alle spokes linker til hinanden og hubben (iPhone↔Android↔Tablet↔Apps↔Hub↔CasinoApp) |
| **RelatedGuides master list** | ✅ OK | Alle 6 sider er registreret i `ALL_GUIDES` (linje 140-145) |

### ❌ Kritiske mangler

#### 1. **entityAutoLinker.ts – MANGLER Mobil Casino entities**
Ingen entries for `mobil casino`, `casino app`, `casino på mobilen`, `mobil spilleautomat` etc. Det betyder at hele klyngen er **afskåret fra automatisk intern linking** fra alle sider med HTML-indhold (nyhedsartikler, ordbog, etc.).

**Fix:** Tilføj 3-4 entity mappings:
- `mobil casino` / `casino på mobilen` → `/mobil-casino`
- `casino app` / `casino apps` → `/casino-app`
- `casino på iphone` / `iphone casino` → `/mobil-casino/iphone`
- `casino på android` / `android casino` → `/mobil-casino/android`

#### 2. **RelatedGuides.tsx – MANGLER dedikeret kontekstblok for `/mobil-casino`**
Der er ingen `if (path.startsWith("/mobil-casino") || path === "/casino-app")` blok i `getContextualGuides()`. Det betyder at alle 6 sider falder ned i den generiske fallback (linje 954) som kun viser `[bonusHub, paymentHub, providerHub, reviewHub]`. Clusteret linker **ikke til sine egne siblings** via RelatedGuides.

**Fix:** Tilføj dedikeret blok med roterede siblings + cross-cluster link til betalingsmetoder/bonus.

#### 3. **Header Navigation – `/mobil-casino` hub MANGLER i navData.ts**
Navigationen har kun `/casinoer/mobil-casinoer` (den ældre casinoer-guide). Den nye `/mobil-casino` hub er **ikke tilgængelig fra hovedmenuen** = den er >3 klik fra forsiden via navigation alene.

**Fix:** Tilføj `/mobil-casino` til `CASINO_LINKS` eller opret en dedikeret sektion.

#### 4. **Forsiden (Index.tsx) – Ingen link til `/mobil-casino`**
Forsiden linker ikke direkte til mobil-casino hubben, hvilket bryder 3-klik reglen for en 0.8 priority hub.

**Fix:** Tilføj `/mobil-casino` til relevant forside-grid eller link-sektion.

#### 5. **Money-pages linker IKKE til mobil-casino**
Ud over 2 casino-uden-konto spokes og CasinoApp.tsx er der **ingen money-pages** (bonus, betalingsmetoder, anmeldelser) der linker ind til `/mobil-casino`. Link equity flyder kun én vej (ud af clusteret).

**Fix:** Tilføj kontekstuelle links fra 3-4 strategiske money-pages (fx `/betalingsmetoder`, `/casino-bonus`, `/velkomstbonus`, `/casino-anmeldelser`).

---

### Implementeringsplan (5 filer)

1. **`src/lib/entityAutoLinker.ts`** – Tilføj 4 entity mappings for mobil-casino cluster
2. **`src/components/RelatedGuides.tsx`** – Tilføj dedikeret kontekstblok for `/mobil-casino/*` og `/casino-app`
3. **`src/components/header/navData.ts`** – Tilføj `/mobil-casino` til CASINO_LINKS
4. **3-4 money-page filer** – Tilføj kontekstuelle `<Link>` til `/mobil-casino` fra betalingsmetoder-hub, bonus-hub, og/eller anmeldelser-hub
5. **Forsiden** – Tilføj link til `/mobil-casino` i relevant grid-sektion (hvis der er et link-grid)

