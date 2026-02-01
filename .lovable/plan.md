
# Plan: Add Twitch Icon to Header Navigation

## Overview
Add a Twitch social icon button to the top navigation, positioned next to the light/dark mode toggle. The icon will link to the Twitch URL configured in site settings.

## Changes Required

### File: src/components/Header.tsx

#### 1. Get Twitch URL from site settings
Extract `twitch_url` from the existing `siteSettings` data (already being fetched).

#### 2. Add Twitch icon button
Add a link button with the Twitch SVG icon (same as used in Footer) next to the ThemeToggle component.

**Location:** Inside the `<div className="flex items-center gap-2">` section (line 78-92), before the ThemeToggle.

**Code to add:**
```tsx
{siteSettings?.twitch_url && (
  <a
    href={siteSettings.twitch_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    aria-label="Twitch"
  >
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
  </a>
)}
```

## Styling Details
- Uses the same Twitch SVG icon as the Footer for consistency
- Styled as an icon button matching the ThemeToggle appearance
- Only displays if a Twitch URL is configured in site settings
- Opens in a new tab with proper security attributes

## Visual Result
- Twitch icon appears to the left of the theme toggle button
- Consistent styling with the rest of the header
- Only visible when Twitch URL is configured in admin settings
