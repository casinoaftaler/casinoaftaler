/**
 * Single source of truth for approved dynamic SEO dateModified overrides.
 *
 * Static pages must resolve freshness from seoRoutes.ts.
 * Only the routes/components below may override dateModified at runtime,
 * and only from the documented backend-driven sources.
 */
export const approvedDynamicDateModifiedRules = [
  {
    component: "CasinoNyhedArticle",
    file: "src/pages/CasinoNyhedArticle.tsx",
    pathPattern: "^/casino-nyheder/",
    allowedSourceDescription: "article.updated_at",
    allowedSourcePatterns: [
      "\\bdateModified\\s*:\\s*article\\.updated_at\\b",
      "\\bdateModified\\s*=\\s*\\{article\\.updated_at\\}",
    ],
  },
  {
    component: "SlotCatalogPage",
    file: "src/pages/SlotCatalogPage.tsx",
    pathPattern: "^/slot-katalog/",
    allowedSourceDescription: "slot.updated_at via slotDateModified",
    allowedSourcePatterns: [
      "\\bdateModified\\s*:\\s*slotDateModified\\b",
      "\\bdateModified\\s*=\\s*\\{slotDateModified\\}",
    ],
  },
  {
    component: "MarketIntelligence",
    file: "src/pages/MarketIntelligence.tsx",
    pathPattern: "^/markedsindsigt$",
    allowedSourceDescription: 'pageMeta?.updated_at ?? getRouteLastmod("/markedsindsigt") via dateModified',
    allowedSourcePatterns: [
      "\\bdateModified\\s*:\\s*dateModified\\b",
      "\\bdateModified\\s*=\\s*\\{dateModified\\}",
    ],
  },
  {
    component: "FreeSpinsIDag",
    file: "src/pages/FreeSpinsIDag.tsx",
    pathPattern: "^/free-spins-i-dag$",
    allowedSourceDescription: 'pageMeta?.updated_at ?? getRouteLastmod("/free-spins-i-dag") via seoDateModified',
    allowedSourcePatterns: [
      "\\bdateModified\\s*:\\s*seoDateModified\\b",
      "\\bdateModified\\s*=\\s*\\{seoDateModified\\}",
    ],
  },
];

export function isApprovedDynamicDateModifiedPath(pathname) {
  return approvedDynamicDateModifiedRules.some((rule) => new RegExp(rule.pathPattern).test(pathname));
}

export function getApprovedDynamicDateModifiedPatternsForFile(file) {
  const rule = approvedDynamicDateModifiedRules.find((entry) => entry.file === file);
  return (rule?.allowedSourcePatterns || []).map((pattern) => new RegExp(pattern));
}
