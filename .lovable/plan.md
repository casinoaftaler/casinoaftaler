

# Fix Google Search Favicon

## Problem
Google is showing the default Lovable icon instead of your logo because:
1. The favicon in `index.html` points to a `.jpg` from storage, which is non-standard for favicons
2. There are no `apple-touch-icon` or larger PNG icons defined -- Google prefers icons that are at least 48x48px (ideally 192x192px)
3. The schema references `/favicon.ico` which may not match your actual brand icon

## Solution

### Step 1: Download and add proper favicon files
- Take your existing header icon (from storage) and add it as a proper favicon in the `public/` directory in multiple formats:
  - `public/favicon.ico` (32x32)
  - `public/favicon-192.png` (192x192 -- this is what Google uses)
  - `public/apple-touch-icon.png` (180x180)

Since you already have the icon uploaded to storage, we will reference it directly but also add the proper `<link>` tags that Google needs.

### Step 2: Update `index.html`
Add multiple favicon declarations so Google and all browsers pick up the correct icon:

```html
<link rel="icon" type="image/jpeg" href="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/header-icon.jpg" />
<link rel="icon" type="image/png" sizes="192x192" href="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/header-icon.jpg" />
<link rel="apple-touch-icon" href="https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/header-icon.jpg" />
```

### Step 3: Update Organization schema
Ensure the `logo` field in `src/lib/seo.ts` points to the actual icon URL (the storage URL) instead of `/favicon.ico`, so Google's structured data matches the real asset.

## Important Note
Google caches favicons aggressively. After publishing, it can take **days to weeks** before Google updates the favicon in search results. You can request re-indexing via Google Search Console to speed this up.

---

## Technical Details

**Files to modify:**
- `index.html` -- add proper favicon link tags with sizes
- `src/lib/seo.ts` -- update `logo` in Organization schema to use the actual storage URL

