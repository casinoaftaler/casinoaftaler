

## Add Lucide icons to the ContentSidebar navigation

The mega menu already maps an `iconName` (kebab-case Lucide name) to every link. The sidebar (`contentSidebarData.ts`) has the exact same links but without icons. The plan is to add the matching `iconName` to each sidebar link and render them with the same colored-badge pattern as the mega menu.

### Performance impact
None. Lucide icons are already bundled (the mega menu imports `icons` from `lucide-react`). This adds zero extra network requests -- just reuses existing tree-shaken SVG components. The sidebar is only rendered on desktop (xl breakpoint), so mobile is unaffected.

---

### Changes

**1. Update `SidebarLink` interface and add `iconName` to all links**
File: `src/components/contentSidebarData.ts`
- Add optional `iconName?: string` to the `SidebarLink` interface
- Copy the matching `iconName` from `navData.ts` to every link (they share the same `to` paths, so it's a 1:1 mapping)

**2. Render icons in the sidebar links**
File: `src/components/ContentSidebar.tsx`
- Import `icons` from `lucide-react` (same as mega menu)
- Add the `getLucideIcon` helper (kebab-case to PascalCase lookup)
- Add rotating `ICON_COLORS` array (same 5 colors as mega menu)
- In each link row, render a small colored icon badge (h-5 w-5 circle) before the label, matching the mega menu's visual style but slightly smaller to fit the sidebar's compact layout

### Visual result
Each sidebar link gets a small colored Lucide icon badge to the left of the label, matching the style seen in the mega menu screenshot (image 1). The category headers keep their existing larger icons unchanged.

