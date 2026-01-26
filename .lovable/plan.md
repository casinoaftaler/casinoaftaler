
# Admin Page Navigation Redesign

## Overview
Transform the admin dashboard from a vertically stacked collapsible card layout to a tabbed navigation interface with a persistent navigation bar at the top. The "Casino Tilbud" section will be the default/main view.

## Current Structure
The admin page currently displays sections as stacked collapsible cards:
1. CombinedAnalyticsDashboard (Analytics)
2. Site Settings (Collapsible card)
3. Admin User Management (Collapsible card)
4. Shop Administration (Collapsible card inside a Card)
5. Casino Tilbud (Main content area - casinos list with drag-and-drop)

## Proposed Structure

```text
+----------------------------------------------------------+
|  Super Admin Dashboard          [user@email] [Theme] [Logout] |
+----------------------------------------------------------+
| [Casino Tilbud] [Butik] [Analytics] [Indstillinger] [Brugere] |
+----------------------------------------------------------+
|                                                          |
|   (Active Tab Content)                                   |
|                                                          |
+----------------------------------------------------------+
```

## Navigation Tabs
| Tab Name | Danish Label | Content |
|----------|--------------|---------|
| casinos | Casino Tilbud | Casino management with drag-and-drop ordering (DEFAULT) |
| shop | Butik | Shop administration section |
| analytics | Analytics | Combined analytics dashboard |
| settings | Indstillinger | Site settings (name, header icon, hero, social links) |
| users | Brugere | Admin user management |

## Implementation Details

### 1. Add Tab State Management
- Add a `useState` hook to track the active tab
- Default value: `"casinos"` (Casino Tilbud as main page)

### 2. Create Navigation Bar
- Use the existing Tabs component from `@/components/ui/tabs`
- Place TabsList below the header, inside the main container
- Style tabs to be visually prominent and easy to navigate

### 3. Refactor Content Sections
Each section will be wrapped in a `TabsContent` component:

**Casino Tilbud Tab:**
- Contains the "Casino Tilbud" header with "Tilfoej Casino" button
- Casino list with DndContext for drag-and-drop reordering
- Edit casino dialog

**Butik Tab:**
- ShopAdminSection component (remove outer Card wrapper)
- Remove Collapsible wrapper since it's now in its own tab

**Analytics Tab:**
- CombinedAnalyticsDashboard component

**Indstillinger Tab:**
- Site name input
- Header icon upload
- Hero settings input
- Social links input
- Remove Collapsible wrapper

**Brugere Tab:**
- AdminUserManagement component
- Remove Collapsible wrapper

### 4. Component Modifications

**ShopAdminSection:**
- Create a variant or modify to work without the Collapsible wrapper when used in tabs
- Keep internal functionality (drag-and-drop, add/edit dialogs)

**AdminUserManagement:**
- Remove the Collapsible/Card wrapper
- Keep the content and functionality

### 5. Visual Design
- Tabs will use the existing shadcn Tabs component styling
- Add icons to each tab for better visual identification:
  - Casino Tilbud: `Dice` or `Gift` icon
  - Butik: `ShoppingBag` icon
  - Analytics: `BarChart3` icon
  - Indstillinger: `Settings` icon
  - Brugere: `Users` icon

---

## Technical Section

### Files to Modify

**src/pages/Admin.tsx:**
- Import Tabs components and additional icons
- Add `activeTab` state with default "casinos"
- Restructure `AdminDashboard` component:
  - Keep header as-is
  - Add Tabs wrapper around main content
  - Create TabsList with 5 TabsTrigger elements
  - Wrap each section in appropriate TabsContent

### Code Structure (AdminDashboard)

```typescript
function AdminDashboard() {
  // ... existing state and hooks
  
  return (
    <div className="min-h-screen bg-background">
      <header>...</header>
      
      <main className="container py-8">
        <Tabs defaultValue="casinos" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="casinos">
              <Gift className="mr-2 h-4 w-4" />
              Casino Tilbud
            </TabsTrigger>
            <TabsTrigger value="shop">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Butik
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Indstillinger
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Brugere
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="casinos">
            {/* Casino management section */}
          </TabsContent>
          
          <TabsContent value="shop">
            {/* Shop admin without Collapsible */}
          </TabsContent>
          
          <TabsContent value="analytics">
            <CombinedAnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="settings">
            {/* Site settings content without Collapsible */}
          </TabsContent>
          
          <TabsContent value="users">
            {/* Admin user management without Collapsible */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
```

### Component Modifications

**AdminUserManagement.tsx:**
- Add optional `embedded` prop to control wrapper rendering
- When `embedded={true}`, render content without Card/Collapsible wrappers

**ShopAdminSection.tsx:**
- Add optional `embedded` prop
- When `embedded={true}`, render content directly without Collapsible wrapper

### New Imports Needed
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, ShoppingBag, BarChart3, Settings, Users } from "lucide-react";
```

### Responsive Considerations
- On smaller screens, the 5-column grid may be too cramped
- Consider using `grid-cols-5` on desktop and scrollable horizontal tabs on mobile
- Alternative: Stack tabs vertically on mobile with icons only
