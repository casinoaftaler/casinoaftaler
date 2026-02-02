
# Plan: Separate Admin and Twitch Login Experiences

## Current Situation

Right now:
- **Admin login** at `/admin` uses email/password
- **Twitch login** at `/auth` uses Twitch OAuth
- Both share the same authentication session
- The `/auth` page redirects logged-in users away, even admins

## The Problem

When an admin is logged in via email/password, they cannot access the Twitch login page because it automatically redirects them. This means admins cannot:
- Link their Twitch account to their admin profile
- Use Twitch features on the front page

## Solution Overview

Keep both login systems completely separate:
1. **Admin login** (`/admin`) - Remains unchanged with email/password
2. **Twitch login** (`/auth`) - Allow logged-in users to link their Twitch account

## Changes to Make

### 1. Update `/auth` page behavior

**Current:** Redirects away if user is logged in
**New:** Show different content based on user state:
- **Not logged in:** Show Twitch login button (current behavior)
- **Logged in but no Twitch linked:** Show "Link Twitch Account" button
- **Logged in with Twitch linked:** Show profile info and option to unlink

### 2. Update Twitch OAuth edge function

Modify `twitch-auth` to handle account linking:
- If user is already authenticated, link Twitch to their existing account
- If not authenticated, create new account or sign in (current behavior)

### 3. Update Auth Callback

Pass the current user's session to the edge function so it knows whether to create a new account or link to existing.

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Auth.tsx` | Show different UI based on login and Twitch link status |
| `src/pages/AuthCallback.tsx` | Pass current session info to edge function |
| `supabase/functions/twitch-auth/index.ts` | Support linking Twitch to existing accounts |

## Technical Details

### Auth.tsx Changes

```text
If user is logged in:
  - Check if profile has twitch_id
  - If no twitch_id: Show "Link din Twitch-konto" button
  - If has twitch_id: Show Twitch profile info with unlink option
Else:
  - Show current Twitch login flow
```

### Edge Function Changes

The edge function will accept an optional `link_to_user_id` parameter:
- If provided: Update that user's profile with Twitch data (linking)
- If not provided: Create new user or find existing (current behavior)

### AuthCallback Changes

When processing callback, check if user is already logged in and pass their user ID to the edge function for linking.

## User Experience

**For regular visitors:**
- No change - click "Log ind" → Twitch OAuth → logged in

**For admins:**
1. Log in at `/admin` with email/password
2. Navigate to front page
3. Click user dropdown or go to `/auth`
4. See "Link din Twitch-konto" option
5. Click to authorize with Twitch
6. Twitch profile data is added to their account
7. Their Twitch avatar and username now appear in the header

## What Stays the Same

- Admin login at `/admin` remains email/password only
- Admin role checks unchanged
- Regular users can still log in with just Twitch
- All security measures remain in place
