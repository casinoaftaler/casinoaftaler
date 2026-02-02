

# Plan: Create Highlights Page with Twitch Clips and YouTube Videos

## Overview
Create a new "Highlights" page accessible from the top navigation that displays Twitch clips and YouTube videos. The content will be managed by admins through a new tab in the admin dashboard.

## Technical Architecture

### Database Changes
A new `highlights` table will be created to store video clips with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Title of the clip |
| url | text | Twitch clip URL or YouTube video URL |
| platform | text | Either 'twitch' or 'youtube' |
| description | text | Optional description |
| thumbnail_url | text | Optional custom thumbnail |
| position | integer | For ordering |
| is_active | boolean | Show/hide toggle |
| created_at | timestamp | Auto-generated |
| updated_at | timestamp | Auto-updated |

RLS policies will restrict write access to admins only, while allowing public read access for active items.

---

## Implementation Steps

### 1. Database Migration
Create the `highlights` table with appropriate columns and RLS policies:
- Public can SELECT active highlights
- Only admins can INSERT, UPDATE, DELETE

### 2. Create Hook: `src/hooks/useHighlights.ts`
Similar pattern to `useShopItems.ts`:
- `useHighlights()` - Fetch all highlights (with admin flag for inactive items)
- `useCreateHighlight()` - Create new highlight
- `useUpdateHighlight()` - Update existing highlight
- `useDeleteHighlight()` - Delete highlight
- `useUpdateHighlightPositions()` - Reorder highlights via drag-and-drop

### 3. Create Public Page: `src/pages/Highlights.tsx`
- Hero section with title and description (similar to Shop page)
- Grid/list of embedded Twitch clips and YouTube videos
- Responsive video embeds using aspect-ratio containers
- Platform detection to render appropriate embed (Twitch iframe vs YouTube iframe)

### 4. Create Component: `src/components/HighlightCard.tsx`
- Handles rendering of individual highlight
- Detects platform (Twitch/YouTube) from URL
- Renders appropriate embedded player
- Shows title and optional description

### 5. Create Admin Component: `src/components/HighlightsAdminSection.tsx`
Similar to `ShopAdminSection.tsx`:
- Add/Edit/Delete highlights via dialogs
- Drag-and-drop reordering
- Toggle active/inactive status
- Form fields: Title, URL, Platform (auto-detected), Description, Active toggle

### 6. Update Admin Dashboard: `src/pages/Admin.tsx`
- Add new tab "Highlights" with video icon
- Import and render `HighlightsAdminSection` component
- Update grid-cols-5 to grid-cols-6 in TabsList

### 7. Update Navigation: `src/components/Header.tsx`
- Add "Highlights" link in desktop navigation
- Add "Highlights" link in mobile menu

### 8. Update Routes: `src/App.tsx`
- Add route for `/highlights` page

### 9. Update Footer: `src/components/Footer.tsx`
- Add Highlights to "Hurtige Links" section

---

## Technical Details

### Video Embedding Logic

**YouTube URL Parsing:**
```typescript
// Supports formats:
// - https://www.youtube.com/watch?v=VIDEO_ID
// - https://youtu.be/VIDEO_ID
// - https://www.youtube.com/embed/VIDEO_ID
function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
```

**Twitch Clip URL Parsing:**
```typescript
// Supports formats:
// - https://clips.twitch.tv/CLIP_SLUG
// - https://www.twitch.tv/CHANNEL/clip/CLIP_SLUG
function getTwitchClipEmbedUrl(url: string): string | null {
  const clipMatch = url.match(/clips\.twitch\.tv\/([^?]+)/);
  const channelClipMatch = url.match(/twitch\.tv\/[^/]+\/clip\/([^?]+)/);
  const slug = clipMatch?.[1] || channelClipMatch?.[1];
  return slug ? `https://clips.twitch.tv/embed?clip=${slug}&parent=${window.location.hostname}` : null;
}
```

### SQL Migration

```sql
create table public.highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  platform text not null default 'youtube',
  description text,
  thumbnail_url text,
  position integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.highlights enable row level security;

-- Public can view active highlights
create policy "Anyone can view active highlights"
  on public.highlights for select
  using (is_active = true);

-- Admins can do everything
create policy "Admins can manage highlights"
  on public.highlights for all
  using (has_role(auth.uid(), 'admin'));

-- Updated_at trigger
create trigger set_updated_at
  before update on public.highlights
  for each row
  execute function update_updated_at_column();
```

---

## Files to Create
1. `src/pages/Highlights.tsx` - Public highlights page
2. `src/hooks/useHighlights.ts` - Data fetching hooks
3. `src/components/HighlightCard.tsx` - Video embed component
4. `src/components/HighlightsAdminSection.tsx` - Admin management UI

## Files to Modify
1. `src/App.tsx` - Add route
2. `src/components/Header.tsx` - Add nav link
3. `src/components/Footer.tsx` - Add footer link
4. `src/pages/Admin.tsx` - Add admin tab

---

## Visual Layout

**Public Page:**
- Hero section with gradient background (similar to Shop)
- Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
- Each card shows embedded video with title below

**Admin Section:**
- List of highlights with drag handles
- Each item shows: thumbnail preview, title, platform badge, active status
- Edit/Delete buttons
- Add Highlight button opens dialog with form

