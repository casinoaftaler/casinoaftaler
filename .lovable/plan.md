

# Plan: Opdater slot-katalog sitemap parametre

## Ændringer

Tre steder skal opdateres med `changefreq: "weekly"` og `priority: 0.6`:

### 1. `vite.config.ts` (build-time sitemap)
- Linje 122: `monthly` → `weekly`
- Linje 123: `0.5` → `0.6`

### 2. `supabase/functions/sitemap-slots/index.ts` (edge function sitemap)
- Linje 65: `monthly` → `weekly`
- Linje 66: `0.5` → `0.6`

### 3. `supabase/functions/sitemap-dynamic/index.ts`
- Ingen ændring nødvendig – denne bruger `page_metadata` tabellen, som ikke dækker slot-katalog sider.

Forsiden (`/`) er allerede korrekt håndteret via `seoRoutes.ts` med `changefreq: "daily"` og lastmod auto-resolved til dagens dato.

