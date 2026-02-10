

## Show Credits in Header + Redeem Code System

### Part 1: Credits Display in Header

**What**: When logged in, show the user's current credit balance next to their profile avatar in the top nav.

**How**: 
- In `src/components/Header.tsx`, fetch the user's `spins_remaining` from the `slot_spins` table for today's date
- Display a small coin icon + number next to the avatar button (e.g., "142" with a coin icon)
- Use Danish number formatting (e.g., 1.234)
- Only show when user is logged in

### Part 2: Redeem Code System

#### Database: New `redeem_codes` table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| code | text (unique) | The code string (e.g., "BONUS50") |
| credits_amount | integer | How many credits the code gives |
| usage_type | text | "single_user" (one user only) or "one_per_user" (everyone can use once) |
| max_uses | integer (nullable) | Optional cap on total redemptions |
| times_used | integer | Counter of total redemptions |
| expires_at | timestamptz (nullable) | Optional expiry time |
| is_active | boolean | Admin can deactivate |
| created_by | uuid | Admin who created it |
| created_at | timestamptz | Creation timestamp |

#### Database: New `redeem_code_uses` table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| code_id | uuid | FK to redeem_codes |
| user_id | uuid | Who redeemed |
| credits_awarded | integer | How many credits were given |
| redeemed_at | timestamptz | When redeemed |

Unique constraint on (code_id, user_id) to prevent double-use per user.

#### RLS Policies
- `redeem_codes`: Anyone authenticated can SELECT (to validate codes). Only admins can INSERT/UPDATE/DELETE.
- `redeem_code_uses`: Users can SELECT their own uses. INSERT handled via edge function with service role.

#### Edge Function: `redeem-code`
- Accepts `{ code: string }` + auth token
- Validates: code exists, is active, not expired, user hasn't already used it, usage limits not exceeded
- Atomically: inserts into `redeem_code_uses`, increments `times_used`, adds credits to user's `slot_spins` for today
- Returns success/error message

#### User Interface: "Indlos Kode" in Profile Dropdown
- Add a new menu item "Indlos Kode" (with a `Ticket` icon) in the profile dropdown menu in the header (between "Profil" and the theme toggle)
- Clicking it opens a dialog with a text input for the code and a "Indlos" button
- Shows success/error feedback via toast

#### Admin Interface: "Koder" tab in Admin Panel
- New tab in the admin dashboard (11th tab)
- List all existing codes with status (active, expired, usage count)
- Form to create new codes: code string, credits amount, usage type (single user / everyone once), optional expiry date/time
- Toggle to activate/deactivate codes
- Delete codes

### Technical Details

**Files to create:**
- `src/components/RedeemCodeDialog.tsx` -- Dialog with code input
- `src/components/RedeemCodesAdminSection.tsx` -- Admin CRUD for codes
- `supabase/functions/redeem-code/index.ts` -- Server-side redemption logic

**Files to modify:**
- `src/components/Header.tsx` -- Add credits display + "Indlos Kode" menu item + dialog
- `src/pages/Admin.tsx` -- Add "Koder" tab
- `supabase/config.toml` -- Add redeem-code function config

**Database migration:**
- Create `redeem_codes` and `redeem_code_uses` tables with RLS policies
- Enable realtime on `slot_spins` (optional, for live credit updates)

