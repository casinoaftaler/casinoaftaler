# Anti-Footprint Regler for Shared Components

> **Formål**: Forhindre at Google opdager identiske HTML-blokke på tværs af programmatiske side-clusters.

## Grundregel

**Enhver komponent der bruges på 5+ sider SKAL variere sit output per side.**

## Implementering

### 1. Brug `useAntiFootprint()` hook

```tsx
import { useAntiFootprint } from "@/hooks/useAntiFootprint";

function MySharedComponent() {
  const { rotate, shuffle, pick } = useAntiFootprint();
  
  // Roter items så hver side viser en unik kombination
  const visibleItems = rotate(allItems, 4);
  
  // Shuffl sektionsrækkefølge
  const sections = shuffle(["intro", "stats", "faq"]);
  
  // Vælg én variant af en heading/tekst
  const heading = pick(["Populære", "Udvalgte", "Anbefalede"]);
}
```

### 2. Tjekliste for nye shared components

Før en komponent bruges på mange sider, verificér:

- [ ] **Lister/cards**: Bruges `rotate()` til at variere rækkefølge og subset?
- [ ] **Sektionsrækkefølge**: Bruges `shuffle()` til at omrokere sektioner?
- [ ] **Tekst/headings**: Har komponenten 3+ varianter valgt via `pick()`?
- [ ] **Links**: Varierer de interne links per side (ikke samme 6 links overalt)?
- [ ] **Statisk indhold**: Er der nogen blok >50 tegn der er 100% identisk på alle sider?

### 3. Risikovurdering

| Antal sider | Risiko | Handling |
|---|---|---|
| 1-4 | Ingen | Ingen variation nødvendig |
| 5-20 | Lav | Roter mindst lister/cards |
| 20-100 | Mellem | Roter + varier tekst |
| 100+ | Høj | Fuld variation: rotation, shuffle, tekstvarianter |

### 4. Kendte patterns at undgå

❌ **Samme casino-liste på alle sider** (fixed: InlineCasinoCards med hash-rotation)
❌ **Identisk sektionsrækkefølge** (fixed: ProviderSlotsHub med seededShuffle)
❌ **Statisk "Relaterede guides" blok** (allerede fixet med offset-rotation)
❌ **Samme FAQ på tværs af et cluster** (fixet med hash-varianter på slot-sider)

### 5. Ved bulk-generering af sider

Når nye sider genereres programmatisk (fx via Edge Functions):

1. Sørg for at **beskrivelser er unikke** per side (AI-genereret)
2. Brug **layout-shuffling** via hash af side-identifikator
3. Verificér at **interne links varierer** (brug `rotate()` med pool > display count)
4. Test ved at sammenligne HTML output fra 3+ sider i clusteret

### 6. Komponenter der allerede er compliant ✅

- `InlineCasinoCards` – hash-rotation af casino-rækkefølge
- `RelatedGuides` – offset-baseret rotation
- `RelatedReviews` – håndkureret per casino
- `CasinospilMoneyLinks` – hash-rotation af casino reviews + cluster siblings
- `ProviderMoneyLinks` – hash-baseret intro-variation
- `ProviderPageTemplate` – sectionOrder prop
- `ProviderSlotsHub` – seededShuffle af sektioner
- `SlotCatalogPage` – hash-rotation af layout, FAQ, related slots
