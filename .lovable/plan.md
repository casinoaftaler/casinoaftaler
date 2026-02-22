

## Twitch Chat Commands + Website Betting for Bonus Hunt

This plan adds Twitch chat integration so users can type `!gtw` and `!avgx` commands in chat, while also ensuring the website betting forms work correctly.

### How It Works

StreamElements custom commands will call a new backend function when users type `!gtw` or `!avgx` in Twitch chat. The function looks up the user by their Twitch username, finds the active betting session, and places the bet -- using the same credit system as the website.

### Changes

**1. New Edge Function: `bonus-hunt-twitch-bet`**

A public endpoint (no auth token needed, called by StreamElements) that:
- Accepts `twitchUsername`, `command` (gtw/avgx), and arguments (guess amount or group letter)
- Looks up the user in `profiles` by `twitch_username`
- Finds the active `bonus_hunt_sessions` where betting is open
- Uses a fixed bet amount (e.g. the session's min_bet, since Twitch chat can't easily handle multiple params) OR accepts a bet amount as an optional param
- Deducts credits via `deduct_spin` and inserts the bet
- Returns a text response that StreamElements displays in chat

Command format:
- `!gtw 45000` -- guess end balance is 45,000 kr (uses min bet as credit cost)
- `!gtw 45000 10` -- guess 45,000 kr with 10 credits
- `!avgx F` -- bet on group F (uses min bet)
- `!avgx F 10` -- bet on group F with 10 credits

**2. StreamElements Custom Commands Setup**

You'll need to set up two custom commands in StreamElements dashboard:
- `!gtw` -> `$(customapi.https://<project-url>/functions/v1/bonus-hunt-twitch-bet?user=$(user)&cmd=gtw&args=$(querystring))`
- `!avgx` -> `$(customapi.https://<project-url>/functions/v1/bonus-hunt-twitch-bet?user=$(user)&cmd=avgx&args=$(querystring))`

**3. Website Betting Forms (already exist)**

The GTW and AVG X tabs on the Bonus Hunt page already have betting forms. No changes needed -- they call `bonus-hunt-place-bet` which handles validation and credit deduction.

### Technical Details

**`supabase/functions/bonus-hunt-twitch-bet/index.ts`:**
- No JWT verification (called by StreamElements `$(customapi)`)
- Parses query params: `user` (Twitch username), `cmd` (gtw/avgx), `args` (space-separated arguments)
- Looks up user via `profiles.twitch_username`
- Finds active session where the relevant betting is open
- Validates: not already bet, valid guess/group, sufficient credits
- Returns plain text (not JSON) for StreamElements to display in chat
- Uses service role client for all DB operations

**`supabase/config.toml`:**
- Add `[functions.bonus-hunt-twitch-bet]` with `verify_jwt = false`

**Security considerations:**
- The endpoint is public but only allows placing bets (spending the user's own credits)
- A malicious caller would need to know a valid Twitch username and would only be spending that user's credits
- This is acceptable since StreamElements commands are public by nature
- Rate limiting is inherently handled by StreamElements command cooldowns

