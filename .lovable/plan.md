

## Merge Highlights and Community Highlights into One Page

### Overview

Currently there are two separate pages:
- **Highlights** (`/highlights`) -- Admin-curated video highlights with category/platform filters and search
- **Community Highlights** (`/community/highlights`) -- User-submitted clips with submission form, likes, and comments

These will be merged into a single page at `/highlights` using tabs to switch between the two sections.

### Changes

**File 1: `src/pages/Highlights.tsx`**
- Add a tabbed interface (using Radix Tabs) at the top of the content area with two tabs: "Highlights" (admin-curated) and "Community Clips" (user-submitted)
- Import and embed the community clips content (clip grid, submission button, detail dialog) directly into the second tab
- Keep the existing hero section but update the description to cover both sections
- The "Highlights" tab shows the current filter/search/grid for admin highlights
- The "Community Clips" tab shows the community clip grid with the submit button and detail dialog

**File 2: `src/App.tsx`**
- Remove the `/community/highlights` route (line 59)
- Remove the `CommunityHighlights` lazy import (line 22)
- Keep `/highlights` route as the single merged page

**File 3: `src/components/Header.tsx`**
- Remove the "Community Highlights" link from the Community dropdown (desktop, lines 154-159)
- Remove the "Community Highlights" link from the mobile menu
- The "Highlights" link in the Community dropdown already points to `/highlights`

**File 4: `src/pages/CommunityHighlights.tsx`**
- This file can be deleted since its content is merged into `Highlights.tsx`

### Technical Details

The merged page will use `@radix-ui/react-tabs` (already installed via shadcn Tabs component) to separate the two content types:

```
[Hero Section - shared]

[Tab: Highlights | Tab: Community Clips]

Tab 1: Search + Filters + Admin Highlight Cards
Tab 2: Submit Button + Community Clip Cards + Detail Dialog
```

Any links elsewhere in the codebase that point to `/community/highlights` will need to redirect or be updated. The Rewards Program page references community highlights -- those links will be updated to point to `/highlights` with the community tab pre-selected via a URL parameter or hash.

