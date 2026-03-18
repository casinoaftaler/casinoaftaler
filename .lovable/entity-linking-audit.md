# Entity linking coverage audit

## Covered surfaces
- `src/pages/CasinoNyhedArticle.tsx`
- `src/pages/SlotCatalogPage.tsx`
- `src/pages/ProviderSlotsHub.tsx`
- `src/pages/OrdbogTerm.tsx`

## Current sitewide status
- News articles: covered
- Slot detail pages: covered
- Provider slot hubs: covered
- Glossary terms: covered

## Not yet covered by `autoLinkEntities()`
- Static evergreen guides using handcrafted JSX/markdown-like sections
- Review pages where links are manually curated
- Utility/legal pages where auto-linking is intentionally unnecessary

## Governance conclusion
The auto-linker is active on the highest-value rich-text surfaces where scalable internal linking matters most. Coverage is not universal by design, but it now has documented scope and can be expanded intentionally instead of implicitly.
