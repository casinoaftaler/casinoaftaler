

# Fix Admin Panel Tab Persistence

## Problem
The admin panel stores the active tab in React state (`useState("")`), which resets to the default ("Indhold") on every re-render or navigation. When you switch to e.g. "Requests" and then navigate elsewhere and back, it always reverts.

## Solution
Persist the active tab in the URL using a query parameter (e.g. `?tab=requests`). This way the browser's back/forward and re-navigation preserves the tab.

## Changes — `src/pages/Admin.tsx`

1. **Read `tab` from URL on mount**: Use `useSearchParams()` to initialize `activeTab` from `?tab=...` instead of `""`.

2. **Sync tab changes to URL**: When `setActiveTab` is called, also update the search param via `setSearchParams({ tab: value })` (using `replace: true` to avoid polluting history).

3. **Remove the initialization `useEffect`**: Replace the `useEffect` that sets `activeTab` on mount with direct initialization from URL params, falling back to the role-based default.

4. **Update sidebar click handler**: Ensure clicking a nav item calls both `setActiveTab` and updates the URL param.

This is a small, focused change — only the tab state management in `AdminDashboard` needs updating.

