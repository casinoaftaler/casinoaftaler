

## Plan: Add StickyCTA to All Money Pages

### Current State
StickyCTA already exists on 6 casino review pages (SpilDanskNu, Spilleautomaten, Betinia, Campobet, Swift Casino, Luna Casino). Each fetches casino data via `useCasinos()` and renders `<StickyCTA>` at the bottom of the page.

### Approach
Create a wrapper component `StickyCtaBySlug` that accepts a casino slug, fetches data internally, and renders the StickyCTA. This avoids duplicating the `useCasinos()` + `.find()` logic across 50+ pages.

Then add this component to:

**1. Template-based pages (2 templates, covers many pages at once):**

- **`PaymentMethodPageTemplate.tsx`** — Add a `ctaCasinoSlug` prop, render `StickyCtaBySlug` at the bottom
- **`ProviderPageTemplate.tsx`** — Same approach with `ctaCasinoSlug` prop

**2. Payment guide pages (pass slug via prop):**
| Page | Casino Slug |
|------|------------|
| ApplePayGuide | `spildansknu` |
| MobilePayGuide | `spildansknu` |
| PayPalGuide | `campobet` |
| SkrillGuide | `campobet` |
| TrustlyGuide | `campobet` |
| ZimplerGuide | `betinia` |
| PaysafecardGuide | `campobet` |
| BankTransferGuide | `spilleautomaten` |
| VisaMastercardGuide | `spilleautomaten` |
| RevolutGuide | `betinia` |

**3. Provider guide pages (pass slug via prop):**
| Page | Casino Slug |
|------|------------|
| PragmaticPlayGuide | `spildansknu` |
| HacksawGamingGuide | `spilleautomaten` |
| NolimitCityGuide | `campobet` |
| NetEntGuide | `campobet` |
| EvolutionGamingGuide | `campobet` |
| RelaxGamingGuide | `betinia` |
| ELKStudiosGuide | `betinia` |
| YggdrasilGuide | `betinia` |
| MicrogamingGuide | `campobet` |
| RedTigerGuide | `betinia` |
| BigTimeGamingGuide | `campobet` |
| PlayNGoGuide (Play'n GO) | `betinia` |

**4. Standalone money pages (add directly with StickyCtaBySlug):**

These are the pages under the main nav dropdowns (Casinoer, Nye Casinoer, Casinospil, Live Casino, Casino Bonus) and their sub-pages:

| Category | Pages | Casino (rotating) |
|----------|-------|-------------------|
| **Casino Bonus cluster** | Velkomstbonus, StickyBonus, NoStickyBonus, CashbackBonus, ReloadBonus, Indskudsbonus, BonusUdenIndbetaling, BonusUdenOmsaetningskrav, Omsaetningskrav, CasinoBonus, FreeSpins, FreeSpinsIDag | Rotate: betinia, campobet, spildansknu, spilleautomaten |
| **Casinoer hub** | CasinoerHub, CasinoLicenser, Spillemyndigheden, Betalingsmetoder, CasinoAnmeldelser, TopCasinoOnline + sub-guides (HoejRTP, HurtigUdbetaling, MobilCasinoer, etc.) | Rotate: betinia, campobet, spildansknu, spilleautomaten |
| **Nye Casinoer** | NyeCasinoer + all sub-pages (2026, DanskLicens, Trustly, MitID, etc.) | Rotate |
| **Casinospil** | Casinospil hub, BlackjackGuide, RouletteGuide, BaccaratGuide, PokerGuide + all strategy sub-pages | Rotate |
| **Live Casino** | LiveCasino hub, LiveBlackjackGuide, LiveRouletteGuide, LightningRouletteGuide, LiveBaccaratGuide, MonopolyLiveGuide | Rotate |
| **Spillemaskiner** | Spillemaskiner, SpillemaskinerHoejRTP + all 31 slot guides | Rotate |
| **Spiludviklere** | Spiludviklere hub | campobet |

### New Component

```tsx
// src/components/StickyCtaBySlug.tsx
import { useCasinos } from "@/hooks/useCasinos";
import { StickyCTA } from "@/components/StickyCTA";

export function StickyCtaBySlug({ slug }: { slug: string }) {
  const { data: casinos } = useCasinos();
  const casino = casinos?.find((c) => c.slug === slug);
  if (!casino) return null;
  return <StickyCTA casinoSlug={casino.slug} casinoName={casino.name} ... />;
}
```

### Implementation Steps

1. **Create `StickyCtaBySlug` component** — encapsulates data fetching + StickyCTA rendering
2. **Update `PaymentMethodPageTemplate`** — add optional `ctaCasinoSlug` prop, render `StickyCtaBySlug` after closing `</div>`
3. **Update `ProviderPageTemplate`** — same approach
4. **Update all 10 payment guide pages** with correct slug
5. **Update all 12 provider guide pages** with correct slug
6. **Update all standalone money pages** (~60+ pages) — add import + `<StickyCtaBySlug slug="xxx" />` before closing `</>`

This is a large but mechanical task. Every page gets the same pattern: import + one line of JSX.

