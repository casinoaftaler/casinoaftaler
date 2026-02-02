

## StreamElements Points Integration

This plan adds the display of user's StreamElements points on the Shop page. StreamElements provides a public API to fetch points for a specific user on a channel.

---

## Overview

When a user is logged in via Twitch, we'll display their current StreamElements points prominently on the shop page. This requires:
1. Storing the StreamElements channel ID in admin settings
2. Creating a hook to fetch points from StreamElements API
3. Displaying the points on the shop page

---

## Implementation Steps

### Step 1: Add StreamElements Channel ID Setting

**Database Migration**
- No migration needed - we'll use the existing `site_settings` table with a new key `streamelements_channel_id`

**File: `src/components/SocialLinksInput.tsx`**
- Add a new input field for "StreamElements Channel ID"
- Save it to site_settings with key `streamelements_channel_id`

---

### Step 2: Create StreamElements Points Hook

**New File: `src/hooks/useStreamElementsPoints.ts`**

This hook will:
1. Get the `streamelements_channel_id` from site settings
2. Get the current user's `twitch_username` from their profile
3. Call the StreamElements public API: `https://api.streamelements.com/kappa/v2/points/{channel_id}/{username}`
4. Return the points value, loading state, and error state

```text
API Response Example:
{
  "channel": "channel_id",
  "username": "username",
  "points": 1500,
  "rank": 42
}
```

---

### Step 3: Display Points on Shop Page

**File: `src/pages/Shop.tsx`**

Add a points display section below the hero that shows:
- The user's current points balance
- A message prompting login if not authenticated
- Loading state while fetching points

UI Design:
```text
┌─────────────────────────────────────┐
│  💰 Dine Point: 1,500              │
│  Watch streams to earn more!        │
└─────────────────────────────────────┘
```

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useStreamElementsPoints.ts` | Create | Hook to fetch points from StreamElements API |
| `src/components/SocialLinksInput.tsx` | Modify | Add StreamElements Channel ID input field |
| `src/pages/Shop.tsx` | Modify | Display user's points balance |

---

## Technical Details

### StreamElements API

The public API endpoint does not require authentication:
```
GET https://api.streamelements.com/kappa/v2/points/{channel_id}/{username}
```

- `channel_id`: The StreamElements account/channel ID (found in StreamElements dashboard)
- `username`: The Twitch username (lowercase)

### Data Flow

```text
1. User visits /butik (Shop page)
2. useStreamElementsPoints hook:
   a. Fetches streamelements_channel_id from site_settings
   b. Gets twitch_username from user's profile
   c. Calls StreamElements API
3. Points displayed in UI
```

### Error Handling

- If user not logged in: Show "Log ind for at se dine point"
- If no channel ID configured: Hide points section
- If API fails: Show "Kunne ikke hente point"
- If user has no points/not found: Show "0 point"

---

## Admin Configuration

The admin will need to:
1. Go to Admin panel > Site Settings
2. Enter their StreamElements Channel ID (found at streamelements.com/dashboard)
3. Save

