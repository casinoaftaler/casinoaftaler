

## Plan: Auto Internal Linking in Markedspuls Articles

### Problem
Market pulse articles are generated without any internal links to money pages. This wastes link equity that should flow from fresh content → commercial pages.

### Solution: Two-layer approach

**Layer 1: AI-generated contextual inline links**
Update the system prompt in `generate-market-pulse/index.ts` to instruct the AI to weave in 3-5 natural inline links to money pages within the article body. Provide the AI with a fixed list of allowed link targets (the same ones from `newsInternalLinks.ts`).

Example: Instead of writing "free spins tilbud", the AI writes `<a href="/free-spins-i-dag">free spins tilbud</a>`.

**Layer 2: Appended "Relaterede guider" section**
After AI content generation but before DB insert, append a `<section data-enterprise-news-links="true">` block with 8-12 categorized internal links — replicating the same logic as `appendEnterpriseInternalLinks()` but server-side in the edge function.

### Changes

**File: `supabase/functions/generate-market-pulse/index.ts`**

1. Add money page link targets as a constant in the edge function
2. Update system prompt to include linking instructions + the allowed link targets list
3. Add a `appendInternalLinksSection()` helper that builds the "Relaterede guider" HTML section
4. Call it on `article.content` before inserting into `casino_news`

### Technical details

- Money page targets embedded in prompt: `/casino-bonus`, `/free-spins-i-dag`, `/velkomstbonus`, `/top-10-casino-online`, `/nye-casinoer`, `/casino-med-mobilepay`, `/casino-anmeldelser`, `/cashback-bonus`, `/reload-bonus`
- Markedspuls-specific category links added: `/casino-licenser`, `/ansvarligt-spil`, `/ordbog/omsaetningskrav`
- AI instructed to use max 5 inline links, vary anchor text, only link first occurrence
- Appended section uses rotated selection (seeded by slug) for variety across articles
- No changes to frontend rendering — `CasinoNyhedArticle.tsx` already renders raw HTML with `dangerouslySetInnerHTML`

