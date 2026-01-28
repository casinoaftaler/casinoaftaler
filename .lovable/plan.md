
# Change Casino Card Info Icon to "Read More" Dropdown

## Overview
Replace the info icon button that opens a modal dialog with a "Læs mere" (Read more) text button that expands a collapsible dropdown section directly within the card.

## Current Behavior
- An info icon button (circular, with `Info` icon) opens a Dialog modal
- The modal contains detailed casino information (stats, description, pros/cons, features, game providers)

## New Behavior
- A "Læs mere" text link with a chevron icon toggles a collapsible section
- The expanded section appears below the main card content
- Clicking again collapses the section ("Vis mindre")
- No modal overlay - content stays inline with the card

## Visual Design

**Collapsed State:**
```text
+--------------------------------------------------+
|  [Logo]  Casino Name  [Stats]  [HENT BONUS]      |
|                                    Læs mere ▼    |
+--------------------------------------------------+
```

**Expanded State:**
```text
+--------------------------------------------------+
|  [Logo]  Casino Name  [Stats]  [HENT BONUS]      |
|                                    Vis mindre ▲  |
+--------------------------------------------------+
|  Description, Pros/Cons, Features, Providers...  |
+--------------------------------------------------+
```

---

## Technical Details

### Files to Modify
- `src/components/CasinoCard.tsx`

### Implementation Steps

1. **Replace Dialog with Collapsible**
   - Remove Dialog import and add Collapsible imports
   - Import `ChevronDown` icon for the toggle indicator

2. **Create New CasinoInfoDropdown Component**
   - Replace `CasinoInfoDialog` with a new `CasinoInfoDropdown` component
   - Use `Collapsible` from `@radix-ui/react-collapsible` 
   - Add local state to track open/closed status
   - The trigger will be a text button "Læs mere" / "Vis mindre" with animated chevron

3. **Update FeaturedCard (Rank 1-5)**
   - Replace `<CasinoInfoDialog casino={casino} />` in top-right badges area
   - Move the dropdown trigger to a more natural position (bottom of card, after disclaimer)
   - The collapsible content appears below the card content

4. **Update RegularCard (Rank 6+)**
   - Replace the info dialog in the actions area
   - Add the "Læs mere" link next to or below the CTA button
   - Collapsible content expands below the main row

### Code Structure

**New CasinoInfoDropdown Component:**
```typescript
function CasinoInfoDropdown({ casino }: { casino: Casino }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-primary hover:underline">
          {isOpen ? "Vis mindre" : "Læs mere"}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        {/* Reuse existing dialog content structure */}
        <div className="pt-4 space-y-4">
          {/* Feature Badges, Description, Pros/Cons, Features, Game Providers */}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### Import Changes
```typescript
// Remove
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

// Add
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
```

### Styling Considerations
- **FeaturedCard**: The dropdown content will have a dark semi-transparent background to match the card's gradient style (`bg-black/40 rounded-xl p-4`)
- **RegularCard**: The dropdown content will use the card's background with a top border separator (`border-t border-border`)
- Smooth accordion animation using existing tailwind animations
- The chevron rotates 180 degrees when expanded
