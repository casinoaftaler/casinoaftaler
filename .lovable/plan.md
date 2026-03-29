

## Performance Investigation: Homepage Load Speed

### Problem Identified

The homepage renders **20+ sections eagerly** on initial load, including several that fire Supabase queries. All of this happens before the user even scrolls. The project already has a `LazySection` component (used on review pages) but it is **not used on the homepage at all**.

### Concurrent Supabase queries on homepage load

From the network requests and code analysis, these queries fire simultaneously on page load:

1. `useCasinos()` — fetches all casinos from `casinos_public`
2. `useLatestSlots()` — fetches 20 latest slots from `slot_catalog`
3. `usePopularSlots()` — fetches 20 popular slots from `slot_catalog`
4. `latestNewsDate` query — fetches latest news date
5. `HomepageLiveCommunity` — fires 3 parallel queries (community stats, bonus hunts, leaderboard) + 1 follow-up profile query
6. `PopularReviewsSection` — fetches casino data for review cards
7. `HomepageLeftSidebar` / `HomepageRightSidebar` — likely fetch news
8. `TodayUpdatedSection` — fetches latest news
9. `HomepageTopProviders` — eagerly loads 13 provider logo images via `import.meta.glob`
10. Twitch stream status (edge function call)
11. `bonus_hunt_sessions` polling (every 60s)

That's **10+ concurrent Supabase requests** plus image loads on initial render, most for content far below the fold.

### Plan

**Wrap below-fold homepage sections in `LazySection`** to defer rendering and data fetching until the user scrolls near them. Only keep above-the-fold content eagerly loaded.

#### Above the fold (keep eager):
- `HeroSection`
- Top Casinos section (casino cards + filter tabs)
- `TodayUpdatedSection`

#### Wrap in `LazySection` (defer until near-viewport):
- `DailyRotatingTip`
- `HomepageLatestSlots`
- `HomepagePopularSlots`
- `HomepageTopProviders`
- `HomepageLiveCommunity`
- `WhyTrustUs`
- Entire SEO content `<div>` block (BonusTypeCards, PopularReviewsSection, WeeklyRotationReviews, WeeklyGuideRotation, all bottom sections, FAQ, SourceCitations)

### Technical Details

**File: `src/pages/Index.tsx`**

1. Add import: `import { LazySection } from "@/components/LazySection";`
2. Wrap each below-fold section:

```tsx
<LazySection minHeight="300px">
  <DailyRotatingTip />
</LazySection>
<LazySection minHeight="400px">
  <HomepageLatestSlots />
</LazySection>
<LazySection minHeight="400px">
  <HomepagePopularSlots />
</LazySection>
<LazySection minHeight="300px">
  <HomepageTopProviders />
</LazySection>
<LazySection minHeight="500px">
  <HomepageLiveCommunity />
</LazySection>
<LazySection minHeight="300px">
  <WhyTrustUs />
</LazySection>
<LazySection minHeight="2000px">
  {/* entire SEO content div */}
</LazySection>
```

This defers ~7-8 Supabase queries and dozens of image loads until the user scrolls, significantly reducing initial load time. The `rootMargin="200px"` default preloads content 200px before it enters the viewport, so there's no visible delay when scrolling.

