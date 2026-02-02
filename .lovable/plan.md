
# Add Category Filtering to Highlights

## Overview
Add a category/tag system to highlights so users can filter videos by type (e.g., "Big Wins", "Bonus Hunts", "Funny Moments") on the public page. Admins will be able to create, edit, and delete categories, and assign categories to each highlight.

## What You'll Get

### Public Highlights Page
- Filter tabs at the top (similar to the casino page filters)
- "Alle" (All) option to show all highlights
- Click a category to filter highlights by that tag
- Smooth filtering without page reload

### Admin Panel
- New "Kategorier" (Categories) section in the Highlights admin tab
- Create, rename, and delete categories
- Category selector when adding/editing highlights
- Visual category badge displayed on each highlight in the admin list

---

## Technical Implementation

### 1. Database: Create Categories Table

```sql
CREATE TABLE public.highlight_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.highlight_categories ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view categories"
  ON public.highlight_categories FOR SELECT
  USING (true);

-- Admin write access
CREATE POLICY "Admins can manage categories"
  ON public.highlight_categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

### 2. Database: Add Category to Highlights

```sql
ALTER TABLE public.highlights
ADD COLUMN category_id uuid REFERENCES public.highlight_categories(id) ON DELETE SET NULL;

-- Index for faster filtering
CREATE INDEX idx_highlights_category ON public.highlights(category_id);
```

### 3. Create useHighlightCategories Hook

New file: `src/hooks/useHighlightCategories.ts`

Provides:
- `useHighlightCategories()` - fetch all categories
- `useCreateCategory()` - create new category
- `useUpdateCategory()` - rename category
- `useDeleteCategory()` - delete category
- `useUpdateCategoryPositions()` - reorder categories

### 4. Update useHighlights Hook

Modify `src/hooks/useHighlights.ts`:
- Add `category_id` to the Highlight interface
- Update `useHighlights` to accept optional `categoryId` filter parameter
- Include category data in queries

```typescript
export function useHighlights(adminView = false, categoryId?: string) {
  return useQuery({
    queryKey: ["highlights", adminView, categoryId],
    queryFn: async () => {
      let query = supabase
        .from("highlights")
        .select("*, highlight_categories(name, slug)")
        .order("position", { ascending: true });

      if (!adminView) {
        query = query.eq("is_active", true);
      }
      
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
```

### 5. Create HighlightFilterTabs Component

New file: `src/components/HighlightFilterTabs.tsx`

Similar to the existing FilterTabs component but dynamic:
- Fetches categories from database
- Shows "Alle" (All) as first option
- Displays category names as filter buttons
- Calls `onFilterChange` when clicked

```typescript
import { useHighlightCategories } from "@/hooks/useHighlightCategories";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";

interface HighlightFilterTabsProps {
  activeFilter: string;
  onFilterChange: (categoryId: string) => void;
}

export function HighlightFilterTabs({ activeFilter, onFilterChange }: HighlightFilterTabsProps) {
  const { data: categories } = useHighlightCategories();

  return (
    <Tabs value={activeFilter} onValueChange={onFilterChange}>
      <TabsList className="flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
        <TabsTrigger value="all" className="rounded-full border ...">
          <Filter className="h-4 w-4 mr-1.5" />
          Alle
        </TabsTrigger>
        {categories?.map((cat) => (
          <TabsTrigger key={cat.id} value={cat.id} className="rounded-full border ...">
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
```

### 6. Update Highlights Page

Modify `src/pages/Highlights.tsx`:
- Add filter state: `const [activeCategory, setActiveCategory] = useState("all")`
- Pass category filter to `useHighlights`
- Render `HighlightFilterTabs` below the hero section

```typescript
export default function Highlights() {
  const [activeCategory, setActiveCategory] = useState("all");
  const categoryId = activeCategory === "all" ? undefined : activeCategory;
  
  const { data: highlights, isLoading, error } = useHighlights(false, categoryId);

  return (
    <div className="min-h-screen">
      <HighlightsHero />
      <div className="py-16">
        <div className="container">
          <div className="mb-8">
            <HighlightFilterTabs 
              activeFilter={activeCategory} 
              onFilterChange={setActiveCategory} 
            />
          </div>
          {/* Existing highlights grid */}
        </div>
      </div>
    </div>
  );
}
```

### 7. Add Category Management to Admin

Update `src/components/HighlightsAdminSection.tsx`:

**A) Add Category Manager UI**
- Collapsible section at the top for managing categories
- Input field + button to add new category
- List of existing categories with edit/delete buttons
- Drag-and-drop to reorder categories

**B) Add Category Selector to Highlight Form**
- Dropdown/select in the add/edit highlight dialog
- Shows all available categories
- Optional (highlight can have no category)

```typescript
// In the form
<div className="space-y-2">
  <Label htmlFor="category">Kategori (valgfrit)</Label>
  <Select
    value={formData.category_id || "none"}
    onValueChange={(val) => setFormData(prev => ({ 
      ...prev, 
      category_id: val === "none" ? null : val 
    }))}
  >
    <SelectTrigger>
      <SelectValue placeholder="Vælg kategori" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="none">Ingen kategori</SelectItem>
      {categories?.map(cat => (
        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>
```

**C) Show Category Badge in Item List**
Display the assigned category as a badge next to each highlight in the admin list.

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/hooks/useHighlightCategories.ts` | Category CRUD hooks |
| `src/components/HighlightFilterTabs.tsx` | Filter UI for public page |
| `src/components/HighlightCategoryManager.tsx` | Admin category management UI |

## Files to Modify

| File | Change |
|------|--------|
| `src/hooks/useHighlights.ts` | Add category_id to interface, add filter param |
| `src/pages/Highlights.tsx` | Add filter state and HighlightFilterTabs |
| `src/components/HighlightsAdminSection.tsx` | Add category selector and manager |
| `src/components/HighlightCard.tsx` | Optionally show category badge |

## Database Changes
- Create `highlight_categories` table with RLS policies
- Add `category_id` column to `highlights` table

---

## Example Category Ideas
Once implemented, you can add categories like:
- Big Wins
- Bonus Hunts
- Funny Moments
- Slots
- Live Casino
- Collabs
