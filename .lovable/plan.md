
# Track Logged-In Twitch Users' Deal Clicks

## Overview
Add user tracking to the affiliate click system so you can see which Twitch users clicked on which casino deals. This will show the user's Twitch username in the admin analytics dashboard.

## Current State
- Click events are tracked in the `click_events` table with casino info and timestamp
- No user information is currently stored with clicks
- The admin dashboard shows "Recent Clicks" with Casino and Time columns only

## What You'll Get
- A new "Bruger" (User) column in the Recent Clicks table showing the Twitch username
- Anonymous clicks will show "Anonym" (Anonymous)
- Ability to see which of your Twitch viewers are most engaged with casino deals

---

## Technical Implementation

### 1. Database Migration
Add a `user_id` column to the `click_events` table to store which user made the click.

```sql
ALTER TABLE public.click_events
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster user-based queries
CREATE INDEX idx_click_events_user_id ON public.click_events(user_id);
```

### 2. Update Edge Function (affiliate-redirect)
Modify the edge function to accept and store the user ID when provided.

**Changes:**
- Accept optional `userId` query parameter
- Include `user_id` in the database insert

```typescript
// Parse userId from query params
const userId = url.searchParams.get("userId");

// Insert with user_id
await supabaseAdmin.from("click_events").insert({
  casino_id: casino.id,
  casino_slug: slug,
  casino_name: casino.name,
  event_type: "affiliate_click",
  user_agent: userAgent,
  referrer: referrer,
  user_id: userId || null,  // New field
});
```

### 3. Update Frontend Redirect Function
Pass the current user's ID when calling the affiliate redirect.

**File: `src/lib/affiliateRedirect.ts`**
- Add optional `userId` parameter
- Include in the redirect URL

```typescript
export async function getAffiliateRedirect(
  slug: string,
  userId?: string
): Promise<void> {
  let redirectUrl = `https://${projectId}.supabase.co/functions/v1/affiliate-redirect?slug=${encodeURIComponent(slug)}`;
  
  if (userId) {
    redirectUrl += `&userId=${encodeURIComponent(userId)}`;
  }
  
  window.open(redirectUrl, "_blank", "noopener,noreferrer");
}
```

### 4. Update CasinoCard Component
Get the current user and pass their ID to the redirect function.

**File: `src/components/CasinoCard.tsx`**
- Import `useAuth` hook
- Pass `user.id` to `getAffiliateRedirect`

```typescript
import { useAuth } from "@/hooks/useAuth";

// In FeaturedCard and RegularCard:
const { user } = useAuth();

// Button onClick:
onClick={() => getAffiliateRedirect(casino.slug, user?.id)}
```

### 5. Update Admin Dashboard
Join click events with profiles to show Twitch usernames.

**File: `src/components/CombinedAnalyticsDashboard.tsx`**
- Update the ClickEvent interface to include user info
- Modify the query to fetch profile data
- Add "Bruger" column to the Recent Clicks table

```typescript
// Updated interface
interface ClickEvent {
  id: string;
  casino_name: string;
  created_at: string;
  user_id: string | null;
  profiles: { twitch_username: string | null } | null;
}

// Query with profile join
const { data } = await supabase
  .from("click_events")
  .select(`
    id, casino_name, created_at, user_id,
    profiles:user_id (twitch_username)
  `)
  .gte("created_at", start.toISOString())
  .order("created_at", { ascending: false });

// Table column
<th>Bruger</th>
<td>{event.profiles?.twitch_username || "Anonym"}</td>
```

### 6. Update ClickAnalyticsDashboard (if used separately)
Apply the same changes to `src/components/ClickAnalyticsDashboard.tsx` for consistency.

---

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/affiliate-redirect/index.ts` | Accept and store `userId` |
| `src/lib/affiliateRedirect.ts` | Pass `userId` to edge function |
| `src/components/CasinoCard.tsx` | Get user and pass ID to redirect |
| `src/components/CombinedAnalyticsDashboard.tsx` | Display Twitch username in table |
| `src/components/ClickAnalyticsDashboard.tsx` | Display Twitch username in table |

## Database Changes
- Add `user_id` column to `click_events` table
- Add index for performance
