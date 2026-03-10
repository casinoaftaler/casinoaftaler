

## SEO-forbedringer for Provider Slot Hub Pages

### Analyse af nuværende status

Siderne er allerede solide med unik tekst, FAQ, JSON-LD, dynamisk data og AuthorBio. Her er de konkrete forbedringer der skal laves:

---

### 1. Breadcrumb-rettelse

**Problem:** Breadcrumbs viser: Forside > Casinospil > Spillemaskiner > {Provider} Slots (3 mellemled).
ChatGPT foreslår: Forside > Spillemaskiner > {Provider} Slots — men URL-strukturen er `/spillemaskiner/{slug}`, så det giver mening at skippe "Casinospil"-niveauet.

**Ændring i `breadcrumbs.ts`:** Opdater alle 13 provider hub PARENT_OVERRIDES fra:
```
[{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }]
```
til:
```
[{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }]
```

Dette giver: Forside > Spillemaskiner > {Provider} Slots — kortere, matcher URL, og JSON-LD opdateres automatisk via SEO.tsx.

---

### 2. Meta Title Optimization

**Problem:** Nuværende format: "{Provider} Slots – Alle Spillemaskiner & Statistik 2026" (for langt for nogle providers).

**Ændring i `providerHubContent.ts`:** Opdater `seoTitle` til formatet:
`"{Provider} Slots – Alle Spillemaskiner, RTP & Statistik"`

Dette fanger bedre søgeintentionen "RTP" og holder titlen under 60 tegn.

---

### 3. Slot-tabel crawlability (noscript fallback)

**Problem:** `ProviderCatalogSlots` bruger progressiv loading (vis 20, derefter 50 ad gangen). Googlebot ser muligvis kun de første 20 slots.

**Ændring i `ProviderCatalogSlots.tsx`:** Tilføj en `<noscript>` blok der renderer alle slots som statiske links. Dette sikrer fuld crawlability uanset JS-rendering.

---

### 4. Auto-linking af slot-navne i intro-teksten

**Status:** Allerede implementeret — alle intro-tekster i `providerHubContent.ts` indeholder manuelle `<a href="/slot-katalog/...">` links til relevante slots. Yderligere auto-linking via `entityAutoLinker.ts` er ikke nødvendig her, da `dangerouslySetInnerHTML` allerede indeholder de korrekte links.

---

### 5. Author/E-E-A-T bekræftelse

**Status:** Allerede på plads — `AuthorMetaBar` (Jonas) vises øverst, `AuthorBio` med sociale links og profil-link vises nederst. Ingen ændring nødvendig.

---

### Opsummering af filer der ændres

| Fil | Ændring |
|-----|---------|
| `src/lib/breadcrumbs.ts` | Forenkle PARENT_OVERRIDES til 1 niveau |
| `src/lib/providerHubContent.ts` | Opdater seoTitle format for alle 13 providers |
| `src/components/ProviderCatalogSlots.tsx` | Tilføj noscript fallback med alle slot-links |

Ingen URL-ændringer. Ingen nye afhængigheder. Ingen database-migrationer.

