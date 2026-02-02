
# Plan: Add Twitch Login

## Overview
Add the ability for users to log in with their Twitch account using OAuth. Since the project already has `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` configured, we can implement Twitch OAuth flow with an edge function that handles the token exchange securely.

## How It Will Work

1. User clicks "Login with Twitch" button
2. User is redirected to Twitch's authorization page
3. After approval, Twitch redirects back with an authorization code
4. Our edge function exchanges the code for tokens and creates/signs in the user
5. User is logged in and redirected to the app

## Files to Create

### 1. `supabase/functions/twitch-auth/index.ts`
Edge function that handles the Twitch OAuth callback:
- Receives the authorization code from Twitch
- Exchanges it for access token using `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`
- Fetches user info from Twitch API
- Creates or signs in the user via Supabase Auth (using admin client)
- Returns a session token to the frontend

### 2. `src/pages/Auth.tsx`
New authentication page with:
- "Login with Twitch" button (primary option)
- Email/password login as fallback
- Handles OAuth callback (reads code from URL, calls edge function)
- Redirects authenticated users to home page
- Styled to match the site's design

### 3. `src/components/TwitchAuthButton.tsx`
Reusable Twitch login button component:
- Twitch-branded purple button with Twitch icon
- Initiates OAuth flow by redirecting to Twitch authorization URL
- Loading state while processing

## Files to Modify

### 1. `src/hooks/useAuth.ts`
Add:
- `signInWithTwitch()` function to initiate OAuth redirect
- `handleTwitchCallback()` function to process the callback code
- Handle Twitch user session from the edge function response

### 2. `src/components/Header.tsx`
Add:
- User avatar/profile button when logged in
- Login button when logged out (links to `/auth`)

### 3. `src/App.tsx`
Add:
- Route for `/auth` page
- Route for `/auth/callback` (Twitch OAuth callback)

### 4. `supabase/config.toml`
Add configuration for the new `twitch-auth` edge function with `verify_jwt = false` (since unauthenticated users need to use it)

## OAuth Flow Details

**Authorization URL:**
```
https://id.twitch.tv/oauth2/authorize?
  client_id={TWITCH_CLIENT_ID}&
  redirect_uri={callback_url}&
  response_type=code&
  scope=user:read:email
```

**Token Exchange (in edge function):**
- POST to `https://id.twitch.tv/oauth2/token`
- Exchange code for access_token
- Use token to fetch user info from `https://api.twitch.tv/helix/users`

**User Creation:**
- Use Supabase Admin client to create/update user with Twitch ID as identifier
- Store Twitch profile data (username, avatar) for display

## Database Changes
Optional: Create a `profiles` table to store additional user information like Twitch username and avatar for display purposes (will ask for confirmation before proceeding).

## Technical Details

**Redirect URIs to configure in Twitch Developer Console:**
- Preview: `https://id-preview--ecb4eda6-8d78-47e6-a9ce-38dfcc2dcd6a.lovable.app/auth/callback`
- Published: `https://bonushuset-buddy.lovable.app/auth/callback`

**Security Considerations:**
- All token exchange happens server-side in the edge function
- Client only sees the final session token
- PKCE flow not strictly required but could be added for extra security
- State parameter to prevent CSRF attacks

## User Experience
- Prominent "Login with Twitch" button with Twitch branding
- Seamless redirect flow
- User avatar appears in header when logged in
- Dropdown menu with logout option
