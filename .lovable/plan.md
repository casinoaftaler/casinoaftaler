

## Adjustable Slot Request Limit

### What Changes
Right now, users can only have **1 pending slot request** at a time (hardcoded check). This change adds an admin-configurable setting so you can increase the limit (e.g., allow 3 pending requests at once).

### How It Works
- A new setting is stored in the `site_settings` table with the key `max_pending_slot_requests` and a default value of `1`
- The slot request form reads this setting and compares it to the user's current pending request count
- An admin control is added inside the "Spillemaskine" tab (next to the existing Slot Requests section) to adjust the limit

### Technical Details

#### 1. Site Setting (no migration needed)
Insert a default row into `site_settings`:
- Key: `max_pending_slot_requests`
- Value: `"1"`

This table already exists with public read + admin write RLS policies.

#### 2. SlotRequestForm.tsx
- Fetch `max_pending_slot_requests` from `site_settings` (via `useSiteSettings` or a direct query)
- Replace `hasPendingRequest` boolean with a count check:
  ```typescript
  const pendingCount = myRequests?.filter(r => r.status === "pending").length ?? 0;
  const maxPending = parseInt(siteSettings?.max_pending_slot_requests ?? "1", 10);
  const hasReachedLimit = pendingCount >= maxPending;
  ```
- Update the disabled message to show remaining slots: "Du har {pendingCount}/{maxPending} aktive requests."

#### 3. SlotRequestsAdminSection.tsx
Add a small input field at the top of the admin section:
- Label: "Maks ventende requests pr. bruger"
- Number input (min 1, max 20)
- Save button that upserts the `site_settings` row

#### 4. useSiteSettings.ts
Verify that the hook already returns key-value pairs from `site_settings`. The existing hook should already cover this since it reads all settings. Just need to access `max_pending_slot_requests` from it.

### Files to Change

| File | Change |
|------|--------|
| `src/components/SlotRequestForm.tsx` | Replace boolean check with count vs configurable limit |
| `src/components/SlotRequestsAdminSection.tsx` | Add limit adjustment input |
| `src/hooks/useSiteSettings.ts` | Verify it exposes the new key (likely no change needed) |
| Data insert | Add default `max_pending_slot_requests = "1"` to `site_settings` |

