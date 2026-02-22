

## Fix: Deploy the Twitch Bet Function

### Problem
The `bonus-hunt-twitch-bet` backend function was never successfully deployed. When your Twitch bot calls it, it gets a 404 (not found) error, which is why no confirmation message appears in chat.

### Solution
Deploy the `bonus-hunt-twitch-bet` function. The code is already correct with all the right messages -- it just needs to be deployed to make it live.

### What This Fixes
- Users typing `!gtw 45000` in Twitch chat will now get a confirmation like: `"Dit GTW bet er placeret! Gat: 45.000 kr (X credits brugt)"`
- Users typing `!avgx F` will get: `"Dit AVG X bet er placeret! Gruppe: F (X credits brugt)"`
- Updates to existing bets will show: `"Dit GTW/AVG X bet er opdateret!"`
- Error cases (no credits, betting closed, unregistered) will also show proper messages

### Technical Details
- The file `supabase/functions/bonus-hunt-twitch-bet/index.ts` exists and the code is complete
- The function just needs to be deployed to the backend
- No code changes are needed -- only deployment

