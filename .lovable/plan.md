

## Remove Responsible Gaming Top Bar

This plan removes the top banner displaying the "18+ | Spil kan være vanedannende..." warning message from the site.

### What will be changed

**File: `src/components/Layout.tsx`**

Remove the `<ResponsibleGamingBanner />` component from the layout and its import statement.

**Current code:**
```tsx
import { ResponsibleGamingBanner } from "./ResponsibleGamingBanner";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ResponsibleGamingBanner />  {/* This will be removed */}
      <Header />
      ...
    </div>
  );
}
```

**After the change:**
```tsx
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      ...
    </div>
  );
}
```

### Note

The `ResponsibleGamingBanner.tsx` component file will remain in the project in case you want to re-add it later. If you'd like, I can also delete the component file completely.

