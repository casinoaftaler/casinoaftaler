

## Remove Navigation Sidebar from Trust/Editorial/Author Pages

### Problem
The `ContentSidebar` (right-side navigation bar) appears on trust, editorial, and author pages where it's not needed. These pages should have full-width content without the sidebar.

### Approach
Add a `hideSidebar` prop to `ContentPageLayout`. Set it to `true` on the affected pages. This avoids modifying the sidebar component itself and keeps the change localized.

### Files to Change

**1. `src/components/ContentPageLayout.tsx`** — Add optional `hideSidebar` prop; conditionally render `ContentSidebar`

**2. Pages that need `hideSidebar={true}`** (14 files):
- `src/pages/SaadanTesterVi.tsx`
- `src/pages/CasinoLicenser.tsx`
- `src/pages/Spillemyndigheden.tsx`
- `src/pages/Forfatter.tsx` (Jonas)
- `src/pages/ForfatterKevin.tsx`
- `src/pages/ForfatterAjse.tsx`
- `src/pages/ForfatterNiklas.tsx`
- `src/pages/ForfatterFrederik.tsx`
- `src/pages/ansvarligt-spil/RofusGuide.tsx`
- `src/pages/ansvarligt-spil/SelvudelukkelseGuide.tsx`
- `src/pages/ansvarligt-spil/SpillegraenserGuide.tsx`
- `src/pages/ansvarligt-spil/LudomaniGuide.tsx`
- `src/pages/ansvarligt-spil/HjaelpelinjerGuide.tsx`
- `src/pages/ansvarligt-spil/StopSpilletGuide.tsx`

### Technical Detail

```tsx
// ContentPageLayout.tsx
interface ContentPageLayoutProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export function ContentPageLayout({ children, hideSidebar = false }: ContentPageLayoutProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className={hideSidebar ? "" : "flex gap-8 xl:gap-10"}>
        <div className="min-w-0 flex-1">{children}</div>
        {!hideSidebar && <ContentSidebar />}
      </div>
    </div>
  );
}
```

Each affected page changes from `<ContentPageLayout>` to `<ContentPageLayout hideSidebar>`.

