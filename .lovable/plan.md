

## Plan: Fix Bonus Hunt numbering to always show DB position number

The issue: when viewing a live/current bonus hunt, the UI shows the StreamSystem API's hunt number (e.g., #126) instead of our database position number (e.g., #179). Archived hunts already work correctly because the proxy injects `visibleId`.

### Root Cause
On the live proxy path (non-archived), the response returns raw StreamSystem data without injecting our `visibleId`. The frontend then parses the number from the API's `name` field ("Bonus Hunt #126" → 126), displaying the wrong number.

### Changes

**1. Update `bonus-hunt-proxy` Edge Function**
- On the live path (after line 496, before returning), inject `visibleId` into the response data using the `huntNumber` from our DB (which was used for the archive upsert)
- Change `hunt_name` in the upsert to use `'Bonus Hunt #' || hunt_number` format instead of the raw API name, to maintain consistency with the migration we just ran
- This ensures the frontend always receives the correct position number

**2. Update `BonusHuntHeroBar.tsx`** (no change needed)
- Already displays `#{huntNumber}` where `huntNumber` comes from the page's `currentHuntNumber`, which is derived from `huntData.visibleId`. Once the proxy injects the correct `visibleId`, this will show correctly.

**3. Update `BonusHuntNavBar.tsx`** (no change needed)
- Same logic — already uses `huntNumber` prop.

### Technical detail
In `bonus-hunt-proxy/index.ts`, before returning the response on line 498, modify the data to inject `visibleId`:

```typescript
// Inject our hunt_number as visibleId so frontend shows correct position
if (huntNumber > 0 && data?.data) {
  data.data.visibleId = huntNumber;
}
```

And change line 412 from:
```typescript
hunt_name: huntData.name,
```
to:
```typescript
hunt_name: `Bonus Hunt #${huntNumber}`,
```

