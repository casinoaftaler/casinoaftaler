

## Plan: Reorganize Admin Request Buttons

### What changes
Rearrange the action buttons for pending slot requests in the admin panel:
1. **Primary buttons**: "No Hit" and "Afvis" — these are the main actions since auto-match handles Bonus Hit automatically
2. **Safety fallback**: A small "Bonus Hit" button (secondary/outline style, less prominent) for manual override when needed

### File: `src/components/SlotRequestsAdminSection.tsx`

Change the button group (lines 141-163) to reorder:

1. **"No Hit"** button (outline variant) — calls `handleAction(req.id, req.user_id, "no_bonus")`
2. **"Afvis"** button (destructive variant) — calls `handleAction(req.id, req.user_id, "rejected")`
3. **"Bonus Hit"** button — small, ghost/outline style with Trophy icon only (no label), as a manual fallback. Keeps `awardCredits: true`.

This keeps the UI clean with the two common actions prominent, while the Bonus Hit manual override is still accessible but visually de-emphasized.

