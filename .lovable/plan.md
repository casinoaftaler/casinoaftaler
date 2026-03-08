## Plan: Fix 4 tekniske gældspunkter

### Analyse af hvad der kan fikses


| Problem                       | Kan fikses?                                 | Vurdering     |
| ----------------------------- | ------------------------------------------- | ------------- |
| 11.2 Bundle størrelse         | Delvist — bedre chunk-splitting             | Kan optimeres |
| 11.3 Dual Source of Truth     | Ja — eliminér seoRoutes som sitemap-kilde   | Kritisk fix   |
| 11.5 Manglende Error Tracking | Ja — lightweight error logging til database | Kan bygges    |
| Meta tags efter hydration     | Delvist — bedre SSR-fallbacks i index.html  | Kan forbedres |


---

### 1. Dual Source of Truth (11.3) — Kritisk

**Problem**: `seoRoutes.ts` og `page_metadata`-tabellen styrer begge sitemap-data. Inkonsistens er uundgåelig.

**Løsning**: Gør `page_metadata` til single source of truth for sitemap. `seoRoutes.ts` beholdes kun som en statisk route-registry for breadcrumbs/priority i koden, men sitemap-generering kører udelukkende fra databasen.

- Opdater `sitemap-dynamic` edge function til at være den autoritative sitemap-kilde (allerede tilfældet)
- Tilføj et admin-sync-værktøj der sammenligner `seoRoutes.ts` entries med `page_metadata` rækker og rapporterer uoverensstemmelser (manglende DB-rækker, orphaned DB-rækker, priority-mismatches)
- Tilføj en `PageMetadataSyncSection` i admin-panelet

---

### 2. Error Tracking (11.5)

**Problem**: Kun `console.error` i `ChunkErrorBoundary`. Fejl i produktion er usynlige.

**Løsning**: Opret en `error_logs`-tabel og en global error handler der sender fejl til databasen.

- Ny tabel: `error_logs` (id, error_message, error_stack, component_name, url, user_agent, created_at)
- Ny utility: `src/lib/errorTracker.ts` med `trackError(error, context)` der inserter til `error_logs`
- Integrér i `ChunkErrorBoundary.componentDidCatch`
- Tilføj `window.addEventListener('error')` og `window.addEventListener('unhandledrejection')` i `main.tsx`
- Admin-sektion til at se de seneste fejl

---

### 3. Bundle størrelse (11.2)

**Problem**: Kun 4 manuelle chunks defineret. Tunge libs som `embla-carousel`, `react-resizable-panels`, `dnd-kit` bundtes sammen med siderne.

**Løsning**: Udvid `manualChunks` i `vite.config.ts`:

```text
vendor-react      → react, react-dom, react-router-dom (eksisterer)
vendor-icons      → lucide-react (eksisterer)
vendor-supabase   → @supabase/supabase-js (eksisterer)
vendor-charts     → recharts (eksisterer)
vendor-carousel   → embla-carousel-react (NY)
vendor-dnd        → @dnd-kit/* (NY)
vendor-ui         → @radix-ui/* (NY)
```

---

### 4. Meta tags før hydration (Helmet)

**Problem**: `react-helmet-async` sætter meta tags først efter React mount. Crawlere der ikke kører JS ser kun fallback-title.

**Løsning**: Forbedret `index.html` fallback + et `<noscript>` meta tag med generisk description. Dette er allerede delvist på plads (linje 31-32 i index.html). Det vigtigste fix er at sikre prerender-servicen (`prerenderReady` signalet) fungerer korrekt — det gør den allerede via `main.tsx`. Denne del kræver ingen kodeændring, kun bekræftelse af at prerender-setup er korrekt. (VI BRUGER IKKE PREREDER), så dette skal IKKE gøres )

---

### Filændringer


| #   | Fil                                                | Ændring                                     |
| --- | -------------------------------------------------- | ------------------------------------------- |
| 1   | DB migration                                       | Opret `error_logs` tabel med RLS            |
| 2   | `src/lib/errorTracker.ts`                          | Global error tracking utility               |
| 3   | `src/main.tsx`                                     | Tilføj globale error listeners              |
| 4   | `src/App.tsx`                                      | Integrér errorTracker i ChunkErrorBoundary  |
| 5   | `src/components/admin/PageMetadataSyncSection.tsx` | Sync-checker: seoRoutes vs page_metadata    |
| 6   | `src/components/admin/ErrorLogsSection.tsx`        | Admin UI til fejl-logs                      |
| 7   | `src/pages/Admin.tsx`                              | Tilføj de 2 nye admin-sektioner             |
| 8   | `vite.config.ts`                                   | Udvid manualChunks med carousel, dnd, radix |
