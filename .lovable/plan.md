

## Ærlig vurdering: Hvad kan jeg gøre, og hvad kan jeg ikke?

### 1. Prerender-detection — **Kan IKKE løses fuldt i Lovable**

Prerendering kræver at en **reverse proxy** (fx Cloudflare Workers) sidder *foran* jeres webserver og opsnapper crawler-requests. Lovable kontrollerer ikke hosting-laget — edge functions kan ikke fungere som middleware for page requests.

**Hvad der kræves udenfor Lovable:**
- En Cloudflare Worker (eller lignende) på casinoaftaler.dk der detecter Googlebot via User-Agent
- Proxyer bot-requests til en prerender-service (fx Prerender.io, ~$9/md for 250 sider/dag)
- Returnerer cached HTML til crawlere

**Hvad jeg KAN gøre:** Skrive Cloudflare Worker-koden klar til deploy + opsætningsguide. Men I skal selv konfigurere det i Cloudflare dashboard.

---

### 2. Google Indexing API — **Kan bygges, kræver én ting fra dig**

Jeg kan bygge en edge function der submitter URLs til Google Indexing API (op til 200/dag). Du skal oprette en Google Cloud Service Account og give mig JSON-nøglen.

**Implementering:**
- Edge function `google-indexing` der accepterer URL-lister og submitter via Google API
- Integration med eksisterende `crawl-ping` flow så nye sider automatisk pushes
- Admin UI-knap til manuel batch-submission

---

### 3. Prioritets-sitemap — **Kan gøres 100% nu**

Opretter et `sitemap-priority.xml` med top-50 money pages (priority ≥ 0.8) som et separat sitemap i `sitemap-index.xml`. Dette kan submites individuelt i GSC for hurtigere crawling.

**Implementering:**
- Udvid `sitemapPlugin()` i vite.config.ts til at generere `sitemap-priority.xml` fra seoRoutes filtreret på priority ≥ 0.8
- Tilføj det til `sitemap-index.xml`
- Ingen kodeændringer ellers nødvendige

---

## Anbefalet plan

| # | Opgave | Status |
|---|--------|--------|
| 1 | Generer `sitemap-priority.xml` med top-50 pages ved build-time | Kan gøres nu |
| 2 | Byg Google Indexing API edge function | Kan bygges, kræver Service Account key |
| 3 | Skriv Cloudflare Worker-kode til prerendering | Kan skrive koden, men deploy er manuelt |

**Skal jeg starte med #1 (prioritets-sitemap) nu, og derefter #2 når du har en Google Service Account klar?**

For #3 kan jeg skrive en detaljeret guide + koden til en Cloudflare Worker, men det kræver at casinoaftaler.dk kører bag Cloudflare.

