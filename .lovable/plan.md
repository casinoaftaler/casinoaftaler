
## Twitch Badges Display + Subscriber Credit Bonus

### Overview
Two main features:
1. Display VIP and Moderator badges from Twitch on user profiles (already partially working but subscription detection is hardcoded to `false`)
2. Check if users are Twitch subscribers and give them +100 daily credits (raising max from 220 to 320)

### Current State
- Badge display (VIP, Moderator, Follower) already works via `TwitchBadges` component and `twitch-badges` edge function
- Subscription checking is **not implemented** -- the edge function hardcodes `is_subscriber: false` because it requires a **user access token** (not an app token)
- The OAuth scope is currently only `user:read:email` -- needs `user:read:subscriptions` added
- The user's access token from Twitch login is discarded after auth -- it needs to be stored securely for later subscription checks

### Changes

#### 1. Add OAuth Scope (`twitch-auth-url/index.ts`)
Add `user:read:subscriptions` to the scope so the user grants permission to check their subscription status during login.

#### 2. Store Twitch Access Token (`twitch-auth/index.ts`)
After the token exchange, store the encrypted `access_token` and `refresh_token` in the `profiles` table so the `twitch-badges` function can use it later to check subscription status.

#### 3. Database Migration
Add two new columns to `profiles`:
- `twitch_access_token` (text, nullable) -- encrypted user access token
- `twitch_refresh_token` (text, nullable) -- for refreshing expired tokens

These columns are protected by existing RLS (only user can view own profile, service role can update).

#### 4. Subscription Check (`twitch-badges/index.ts`)
Add a `checkSubscription` function that uses the stored user access token to call `GET /helix/subscriptions/user?broadcaster_id=X&user_id=Y`. This endpoint returns subscription status and tier. If the token is expired, refresh it using the stored refresh token.

Update the badges result to populate `is_subscriber` and `tier` with real data instead of `false`.

#### 5. Daily Credit Allocation (`daily-credit-allocation/index.ts`)
Update the credit cap calculation to account for subscriber status:
- Non-subscriber: base 200 + bonus_spins_permanent (max 220)
- Subscriber: base 200 + 100 (subscriber bonus) + bonus_spins_permanent (max 320)

This requires reading the cached `twitch_badges` JSON from profiles to check `is_subscriber`.

Change `MAX_SPINS_CAP` logic from a flat 220 to a dynamic value:
```
const subscriberBonus = badges?.is_subscriber ? 100 : 0;
const cap = Math.min(BASE_DAILY_SPINS + subscriberBonus + bonusPermanent, 
                     badges?.is_subscriber ? 320 : 220);
```

#### 6. Slot Spin Credit Cap (`slot-spin/index.ts`)
Same adjustment in the slot-spin function's `maxSpins` calculation -- read `twitch_badges` from profile to determine if subscriber, and set cap to 320 for subscribers.

#### 7. Frontend `useSlotSpins.ts`
Update the `MAX_SPINS_CAP` constant and logic to be dynamic based on subscriber status. Fetch `twitch_badges` from profile alongside `bonus_spins_permanent` to determine the correct cap (220 vs 320).

### Files Changed

| File | Change |
|------|--------|
| `supabase/functions/twitch-auth-url/index.ts` | Add `user:read:subscriptions` scope |
| `supabase/functions/twitch-auth/index.ts` | Store access_token and refresh_token in profiles |
| `supabase/functions/twitch-badges/index.ts` | Add subscription check using stored user token, token refresh logic |
| `supabase/functions/daily-credit-allocation/index.ts` | Read twitch_badges, apply +100 subscriber bonus to cap |
| `supabase/functions/slot-spin/index.ts` | Read twitch_badges, apply subscriber cap (320) |
| `src/hooks/useSlotSpins.ts` | Dynamic MAX_SPINS_CAP based on subscriber badge |
| Database migration | Add `twitch_access_token` and `twitch_refresh_token` columns to profiles |

### Important Notes
- Existing users will need to **re-login with Twitch** to grant the new `user:read:subscriptions` scope and store their token. Until they do, `is_subscriber` will remain `false`.
- The subscriber badge will automatically appear in profiles once detected (the `TwitchBadges` component already handles `is_subscriber` display with a star icon).
- Tokens are stored server-side only and never exposed to the frontend (protected by RLS and the profiles table's column-level access).
