

## Site-wide Search in Header

### What we're building
A search icon/button in the header menu that opens a command palette (Cmd+K style dialog) where users can instantly search across ALL content on the site: pages, guides, casino reviews, news articles, glossary terms, slots, and providers.

### How it works

**Search index**: Build a static searchable index from all existing navData arrays + additional route definitions, combined with live DB queries for dynamic content (casino_news, casinos).

**UI**: Use the existing `CommandDialog` component (already in `src/components/ui/command.tsx`) for instant fuzzy search with categorized results.

### Technical plan

**1. Create `src/components/header/SiteSearch.tsx`**
- Search icon button (magnifying glass) placed in the header next to ThemeToggle
- Opens a `CommandDialog` on click (also triggers on Cmd+K / Ctrl+K keyboard shortcut)
- Builds a static search index from:
  - All navData arrays (CASINO_LINKS, BONUS_LINKS, SLOT_LINKS, PROVIDER_LINKS, REVIEW_TOP_LINKS, REVIEW_ALL_LINKS, etc.) — ~200 items
  - Glossary terms from `glossaryTerms` array
  - Additional hardcoded top-level routes (forsiden, casinospil, live casino, etc.)
- Fetches dynamic content on dialog open:
  - `casino_news` (title + slug, published, limit 50 latest)
  - `casinos` table (name + slug, limit 100)
- Groups results into categories: Sider, Casino Anmeldelser, Bonusser, Spillemaskiner, Spiludviklere, Ordbog, Nyheder
- On select: navigate to the route and close the dialog
- Debounced client-side filtering (no server round-trip for search itself)

**2. Update `src/components/Header.tsx`**
- Import and render `<SiteSearch />` in the right-side actions area (before ThemeToggle), visible on both desktop and mobile
- Add Search icon to mobile menu as well

### Result
- Instant search across 300+ pages and DB content
- Keyboard shortcut Cmd+K / Ctrl+K
- Categorized, navigable results
- No external search service needed — pure client-side fuzzy matching using cmdk

