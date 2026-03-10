

## Plan: Crawl Discovery Accelerator for Slot-sider

### Oversigt

Implementer 4 ændringer for at accelerere Googles crawling af alle 1460 slot-sider via stærkere interne links fra højautoritet-sider.

---

### Opgave 1 – Ny "Nyeste Spillemaskiner" komponent + forside-integration

**Ny fil:** `src/components/HomepageLatestSlots.tsx`

- React Query hook henter de 20 nyeste slots fra `slot_catalog` med `ORDER BY created_at DESC LIMIT 20`
- `staleTime: 10 * 60 * 1000` (10 min cache)
- Renderer en grid med `<Link to={/slot-katalog/${slug}}>` for hvert slot (rigtige `<a>` tags via React Router)
- Viser slot_name, provider, RTP hvis tilgængelig
- `<noscript>` fallback med statiske `<a href>` links til alle 20 slots
- JSON-LD `ItemList` schema med alle slots inkluderet i SEO-komponentens jsonLd array
- Lazy-loaded eller placeret efter fold for ikke at blokere LCP

**Ændring i:** `src/pages/Index.tsx`
- Importér `HomepageLatestSlots`
- Tilføj sektionen efter `<TodayUpdatedSection />` (linje ~275)
- Tilføj ItemList JSON-LD til SEO-komponentens jsonLd array (dynamisk, baseret på query-data)

---

### Opgave 2 – Provider Hub links på /casinospil/spillemaskiner

**Ændring i:** `src/pages/Spillemaskiner.tsx`

I sektionen "Spiludviklerne Bag Spillemaskinerne" (linje ~417-448), tilføj links til `/spillemaskiner/{provider}` ud over de eksisterende `/spiludviklere/{provider}` links. Tilføj en ekstra grid efter de eksisterende developer-cards med alle 13 provider hub links:

```
/spillemaskiner/pragmatic-play
/spillemaskiner/netent
/spillemaskiner/play-n-go
/spillemaskiner/hacksaw-gaming
/spillemaskiner/big-time-gaming
/spillemaskiner/microgaming
/spillemaskiner/nolimit-city
/spillemaskiner/evolution-gaming
/spillemaskiner/elk-studios
/spillemaskiner/yggdrasil
/spillemaskiner/relax-gaming
/spillemaskiner/red-tiger
/spillemaskiner/igt
```

Alle som crawlbare `<Link>` (som renderer `<a>` tags).

---

### Opgave 3 – JSON-LD ItemList for nyeste slots

Håndteret som del af Opgave 1. ItemList schema bygges dynamisk fra query-data og inkluderes i `Index.tsx`'s SEO jsonLd-array med `SITE_URL` prefix på alle URLs.

---

### Opgave 4 – Noscript fallback

Håndteret som del af Opgave 1. `<noscript>` blok med `<ul>/<li>/<a href>` links til alle 20 slots.

---

### Opgave 5 – Performance

- Query bruger `LIMIT 20` med `staleTime: 600000`
- Sektionen placeres under fold
- Ingen tunge operationer, kun en simpel SELECT med ORDER BY og LIMIT

---

### Opgave 6 – Crawl-flow bekræftelse

Efter implementering:
- Forsiden → 20 nyeste slots via direkte `<a>` links
- Forsiden → `/casinospil/spillemaskiner` → alle 13 provider hubs via `<a>` links
- Provider hubs → alle tilhørende slots
- Alle links er crawlbare HTML `<a href>`
- XML sitemap indeholder allerede alle slots

### Filer der ændres/oprettes

| Fil | Handling |
|-----|---------|
| `src/components/HomepageLatestSlots.tsx` | **Ny** – Nyeste slots sektion med query, noscript, schema |
| `src/pages/Index.tsx` | Import + indsæt sektion + dynamisk ItemList JSON-LD |
| `src/pages/Spillemaskiner.tsx` | Tilføj 13 provider hub links |

