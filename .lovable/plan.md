

# Butik (Shop) Feature Implementation Plan

## Overview
This plan adds a complete "Butik" (Shop) feature allowing admins to create and manage shop items that visitors can browse. Each item will have a "KØB" (Buy) button that redirects to an external website, similar to the reference design at casinoholdet.com/butik.

## Database Changes

### New Table: `shop_items`
Create a new table to store shop items with fields matching the reference design:

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `name` | text | Item name (required) |
| `slug` | text | URL-friendly identifier |
| `description` | text | Item description |
| `image_url` | text | Product image URL |
| `price` | text | Price display (e.g., "40000 Points") |
| `stock` | text | Stock display (e.g., "20 STK") |
| `external_url` | text | Redirect URL when buying |
| `position` | integer | Display order |
| `is_active` | boolean | Visibility toggle |
| `created_at` | timestamp | Auto-generated |
| `updated_at` | timestamp | Auto-updated |

### Storage Bucket
Create a new `shop-item-images` storage bucket (public) for product images.

### RLS Policies
- Public can read active items (via a `shop_items_public` view that excludes `external_url`)
- Authenticated admins can CRUD all items

## Frontend Components

### 1. Header Update (`src/components/Header.tsx`)
Add "Butik" navigation link in both desktop and mobile menus, positioned after "Ansvarligt Spil".

### 2. New Page: `src/pages/Shop.tsx`
Public-facing shop page featuring:
- Dark-themed grid layout (3 columns on desktop, 1 on mobile)
- Product cards with orange/amber border styling
- Each card displays: image, name, description, "PRIS" (price), "LAGER" (stock), and "KØB" button

### 3. New Component: `src/components/ShopItemCard.tsx`
Product card component styled to match the reference:
- Dark card with thin orange border
- Large rectangular product image at top
- White text for title, light gray for description
- "PRIS" and "LAGER" fields in uppercase bold
- Rounded orange "KØB" button that opens external URL in new tab

### 4. New Component: `src/components/ShopImageUpload.tsx`
Reusable image upload component for shop items (similar to LogoUpload but using the new bucket).

### 5. Admin Panel Updates (`src/pages/Admin.tsx`)
Add new collapsible section "Butik Administration" containing:
- "Tilføj Produkt" dialog with form fields:
  - Produkt Navn (name)
  - Slug (auto-generated)
  - Beskrivelse (description)
  - Produkt Billede (image upload)
  - Pris (price text)
  - Lager (stock text)
  - Ekstern Link (external URL)
  - Aktiv (is_active toggle)
- Product list with drag-and-drop reordering
- Edit and delete functionality per item

### 6. New Hook: `src/hooks/useShopItems.ts`
React Query hook providing:
- `useShopItems()` - Fetch all items (respects public/admin visibility)
- `useCreateShopItem()` - Create new item
- `useUpdateShopItem()` - Update existing item
- `useDeleteShopItem()` - Delete item
- `useUpdateShopItemPositions()` - Reorder items

## Routing
Add new route in `src/App.tsx`:
```
<Route path="/butik" element={<Shop />} />
```

## Visual Design (Matching Reference)

The shop cards will feature:
- Dark background with thin amber/orange border
- Large product image (aspect ratio ~16:9)
- White title text, gray description
- Stats section showing PRIS and LAGER in uppercase
- Rounded orange "KØB" button with hover effect
- Responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile

---

## Technical Details

### Database Migration SQL
```sql
-- Create shop_items table
CREATE TABLE public.shop_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  price TEXT NOT NULL DEFAULT '0 Points',
  stock TEXT NOT NULL DEFAULT '0 STK',
  external_url TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create public view (excludes external_url for security)
CREATE VIEW public.shop_items_public AS
SELECT id, name, slug, description, image_url, price, stock, position, is_active, created_at, updated_at
FROM public.shop_items
WHERE is_active = true;

-- Enable RLS
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- Public read policy via view
CREATE POLICY "Anyone can view active shop items" ON public.shop_items
  FOR SELECT USING (is_active = true);

-- Admin full access
CREATE POLICY "Admins can manage shop items" ON public.shop_items
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_shop_items_updated_at
  BEFORE UPDATE ON public.shop_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Storage Bucket Configuration
Create bucket `shop-item-images` with:
- Public access for viewing
- Authenticated upload for admins

### Files to Create
1. `src/pages/Shop.tsx` - Public shop page
2. `src/components/ShopItemCard.tsx` - Product card component
3. `src/components/ShopImageUpload.tsx` - Image upload for products
4. `src/hooks/useShopItems.ts` - Data fetching hook

### Files to Modify
1. `src/App.tsx` - Add /butik route
2. `src/components/Header.tsx` - Add Butik nav link
3. `src/pages/Admin.tsx` - Add shop management section

