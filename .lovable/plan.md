

## Fix Admin Panel Mobile Layout

The current admin panel uses a horizontal tab bar with 11 columns (`grid-cols-11`), which is completely unusable on mobile devices. The plan is to replace this with a responsive layout that uses a **slide-out sheet/drawer** on mobile and keeps the current tab layout on desktop.

### Current Problem
- 11 tabs in a single horizontal row squished on small screens
- Tab labels are hidden on mobile (`hidden sm:inline`), leaving only tiny icons
- Header bar text overflows on narrow viewports

### Solution

**1. Create an `AdminSidebar` component**
- A new component that renders the list of 11 navigation items (icon + label) vertically
- On mobile (< `lg` breakpoint): rendered inside a `Sheet` (slide-out drawer) triggered by a hamburger/menu button in the admin header
- On desktop (`lg`+): the existing horizontal `TabsList` remains as-is

**2. Refactor `AdminDashboard` layout**
- Replace `Tabs` with a state-based approach using `useState` for the active section (e.g., `activeTab`)
- On mobile: hide the `TabsList` entirely; show a menu button in the header that opens the sheet with all nav items
- On desktop: show the `TabsList` as it currently works
- The `TabsContent` sections render based on the `activeTab` state regardless of device

**3. Fix admin header for mobile**
- Stack or truncate the user email on small screens
- Ensure the menu button, theme toggle, and logout button fit comfortably

### Technical Details

**Files to modify:**
- `src/pages/Admin.tsx` -- Main changes:
  - Add `Sheet` import from `@/components/ui/sheet`
  - Add `useIsMobile` hook import
  - Add `useState` for `activeTab` and `sidebarOpen`
  - Replace `<Tabs>` with controlled `<Tabs value={activeTab} onValueChange={setActiveTab}>`
  - Add a mobile menu button in the header (visible only below `lg`)
  - Wrap nav items in a `Sheet` for mobile
  - Hide `TabsList` on mobile with `hidden lg:grid`
  - Fix header to be responsive (hide email on small screens, adjust spacing)

**Navigation items in the sheet:**
Each item is a button with icon + label that sets `activeTab` and closes the sheet. The active item gets a highlighted background.

**No new files needed** -- all changes are contained within `Admin.tsx` using existing UI components (`Sheet`, `Button`, `useIsMobile`).

