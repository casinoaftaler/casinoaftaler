

## Slot Request Feature

Users can request specific slot machines for the live stream. If the admin hits a bonus on the requested slot, the user earns +20 credits.

### Database

**New table: `slot_requests`**

| Column | Type | Details |
|--------|------|---------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | NOT NULL |
| slot_name | text | NOT NULL -- preset or custom name |
| provider | text | NOT NULL -- always required, even for custom slots |
| is_custom | boolean | default false |
| status | text | default 'pending' -- pending / played / bonus_hit / no_bonus / rejected |
| admin_note | text | nullable |
| credits_awarded | integer | default 0 |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

**RLS Policies:**
- Users can INSERT their own requests (auth.uid() = user_id)
- Users can SELECT their own requests (auth.uid() = user_id)
- Admins can SELECT, UPDATE, DELETE all requests (using has_role)

**Constraint:** 1 pending request per user at a time (enforced in app logic).

---

### Form Flow

The user always selects a **provider first** from the 6 preset providers + "Andet" (Other):

1. **Known provider selected** (e.g. Pragmatic Play):
   - Show a slot dropdown with presets for that provider + an "Andet" option
   - If "Andet" slot is chosen -> free-text input for the slot name, saved with the selected provider

2. **"Andet" provider selected**:
   - Show a free-text input for the provider name
   - Show a free-text input for the slot name
   - Both are saved as custom entries

This way, even custom slots always have a provider attached.

---

### Preset Slot List

- **Relax Gaming**: Money Train 4, Dream Drop Jackpot, Temple Tumble 2, Snake Arena
- **Pragmatic Play**: Gates of Olympus, Sweet Bonanza, Sugar Rush, Big Bass Bonanza, Starlight Princess
- **Play'n GO**: Book of Dead, Reactoonz 2, Rise of Olympus, Fire Joker
- **Thunderkick**: Pink Elephants 2, Flame Busters, Esqueleto Explosivo 2
- **Hacksaw Gaming**: Wanted Dead or a Wild, Chaos Crew, Stick 'Em, Hand of Anubis
- **Quickspin**: Big Bad Wolf, Sakura Fortune 2, Sticky Bandits

---

### New Files

1. **`src/hooks/useSlotRequests.ts`**
   - `useMySlotRequests()` -- user's own requests
   - `useAllSlotRequests()` -- admin: all requests with profile display_name
   - `useCreateSlotRequest()` -- insert mutation
   - `useUpdateSlotRequestStatus()` -- admin mutation (update status, award credits)

2. **`src/components/SlotRequestForm.tsx`**
   - Provider select (6 presets + "Andet")
   - If "Andet" provider: text input for custom provider name
   - Slot select (presets for chosen provider + "Andet")
   - If "Andet" slot or "Andet" provider: text input for custom slot name
   - Submit button (requires login)
   - List of user's existing requests with status badges below the form

3. **`src/components/SlotRequestsAdminSection.tsx`**
   - Table of all requests (newest first)
   - Columns: user display name, slot name, provider, status, date
   - Action buttons: "Bonus Hit" (awards 20 credits), "Ingen Bonus", "Afvis"
   - "Bonus Hit" flow: updates status, adds 20 to slot_spins, logs in credit_allocation_log
   - Status badges with color coding

---

### Changes to Existing Files

4. **`src/pages/RewardsProgram.tsx`**
   - Add a third section "Slot Request Rewards" between Profile Completion and the Info section
   - Icon: Gamepad2, heading: "Slot Request Rewards"
   - Explanation text: request a slot for the stream, if we hit bonus you get +20 credits
   - Embed the `<SlotRequestForm />` component directly
   - Requires login to submit

5. **`src/pages/Admin.tsx`**
   - Change grid-cols-10 to grid-cols-11
   - Add new tab trigger "Requests" with Gamepad2 icon (or Dices)
   - Add TabsContent rendering `<SlotRequestsAdminSection />`

---

### Credit Awarding (Admin "Bonus Hit" action)

When admin clicks "Bonus Hit" on a request:
1. Update request: `status = 'bonus_hit'`, `credits_awarded = 20`
2. Fetch/upsert the user's `slot_spins` row for today, add +20 to `spins_remaining`
3. Insert into `credit_allocation_log` with source `"slot_request_bonus"`
4. Show toast confirmation

This follows the exact same pattern already used in `SpinManagementSection.tsx`.

