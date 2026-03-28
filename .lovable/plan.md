

## Sidebar Navigation for Money Pages

The user wants a categorized sidebar navigation (like bedrageri.com) on content/money pages. Currently the site only has a small `QuickNavSidebar` on the homepage. All other pages are pure content with no sidebar navigation.

### What We'll Build

A reusable `ContentSidebar` component that renders on the right side of money pages, with collapsible categorized link groups:

```text
┌─────────────────────────────────────────────────────┐
│  Main Content (existing)    │  Sidebar (new, ~280px) │
│                             │  ┌──────────────────┐  │
│                             │  │ Online Casinoer  │  │
│                             │  │  Betinia    >    │  │
│                             │  │  bwin       >    │  │
│                             │  │  Campobet   >    │  │
│                             │  │  ...             │  │
│                             │  ├──────────────────┤  │
│                             │  │ Betalingsmetoder │  │
│                             │  │  Apple Pay  >    │  │
│                             │  │  MobilePay  >    │  │
│                             │  │  ...             │  │
│                             │  ├──────────────────┤  │
│                             │  │ Bonusser         │  │
│                             │  │  Casino bonus >  │  │
│                             │  │  Free spins  >  │  │
│                             │  │  ...             │  │
│                             │  ├──────────────────┤  │
│                             │  │ Casino Spil      │  │
│                             │  │  Blackjack   >  │  │
│                             │  │  Roulette    >  │  │
│                             │  │  ...             │  │
│                             │  ├──────────────────┤  │
│                             │  │ Spiludviklere    │  │
│                             │  │  NetEnt      >  │  │
│                             │  │  Play'n GO   >  │  │
│                             │  │  ...             │  │
│                             │  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Categories and Links

**Online Casinoer** - Links to all casino reviews (Betinia, bwin, Campobet, ComeOn!, Expekt, GetLucky, JackpotBet, LeoVegas, Luna Casino, Mr Green, PlayJango, Royal Casino, etc.)

**Flere kategorier** - Nye casinoer, Mobilcasinoer, Casinoer med dansk licens, Casinoer med rigtige penge, etc.

**Betalingsmetoder** - Apple Pay, MobilePay, PayPal, Paysafecard, Revolut, Trustly, Visa/Mastercard, Skrill, etc.

**Bonusser** - Casino bonus, Free spins, Uden indbetaling, Uden omsætningskrav, Velkomstbonus, Cashback, Reload bonus, etc.

**Casino Spil** - Blackjack, Roulette, Poker, Baccarat, Slots, Live Casino, High Roller, etc.

**Spiludviklere** - All 22 providers (NetEnt, Play'n GO, Pragmatic Play, etc.)

### Implementation Steps

1. **Create `src/components/ContentSidebar.tsx`** - A new reusable component with collapsible category sections. Each category has a colored header with icon and a list of links with chevron arrows. Sticky positioning, hidden on mobile (shown only on `xl:` breakpoints). Styled to match the site's design language (dark purple/blue theme).

2. **Create `src/components/ContentPageLayout.tsx`** - A wrapper layout component that takes `children` (the page content) and renders a 2-column grid: content on the left, `ContentSidebar` on the right. This makes it easy to add the sidebar to any money page.

3. **Apply to key money pages** - Wrap the content of pages like `NyeCasinoer`, `CasinoBonus`, `FreeSpins`, `Betalingsmetoder`, `Casinospil`, `Spiludviklere`, `CasinoAnmeldelser` etc. in the new layout. The sidebar highlights the current page's category/link.

### Design Details

- Sticky sidebar (`sticky top-24`) matching bedrageri.com's pattern
- Category headers with green/brand-colored backgrounds and icons (matching the uploaded screenshots)
- Each link row has subtle hover state and a chevron `>` on the right
- Active page highlighted in the sidebar
- Hidden below `xl` breakpoint (1280px) to avoid crowding content on smaller screens
- The existing `QuickNavSidebar` on the homepage remains unchanged

### Technical Notes

- No database changes needed
- No new dependencies required
- Uses existing routing structure and Link components
- The sidebar data (categories + links) is defined as a static config array, making it easy to maintain

