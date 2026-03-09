

## Problem: 404-links og Performance på Provider-sider

### Hvad der er galt

1. **404-links (SEO-skadeligt)**: Alle catalog-slots linker til `/slot-katalog?search=...` (linje 119 i ProviderCatalogSlots). Den route eksisterer ikke — den hedder `/slot-database`. Hver provider-side genererer dermed 200+ broken links. Google crawler registrerer disse som soft 404s, hvilket:
   - Spilder crawl-budget på døde URLs
   - Sender negative kvalitetssignaler for hele domænet
   - Giver nul SEO-værdi fra de interne links

2. **Performance**: "Vis alle 245 slots" renderer alle 245 DOM-rækker på én gang. Med 13 provider-sider og 50-250 slots pr. side er det op til 250 `<tr>` elementer der injectes i DOM'en simultant. Det påvirker INP (Interaction to Next Paint).

### Plan

#### Fix 1: Ret broken links (`/slot-katalog` → `/slot-database`)
- I `ProviderCatalogSlots.tsx` linje 119: Ændr linket til `/slot-database?search=...`
- Resultatet: Alle 1.470 slot-links peger nu på en eksisterende side med korrekt search-parameter

#### Fix 2: Paginer "Vis alle" med batches i stedet for fuld ekspansion
- Ændr "Vis alle X slots"-knappen til at vise 50 ad gangen ("Vis 50 mere") i stedet for at dumpe alt
- Brug en `visibleCount` state der incrementeres med 50 per klik
- Knappen viser "Vis 50 mere (X remaining)" og forsvinder når alt er vist
- Ingen virtualization-library nødvendig — 50 rækker ad gangen er let for browseren

### Filer der ændres
- `src/components/ProviderCatalogSlots.tsx` — fix URL + paginated expansion

