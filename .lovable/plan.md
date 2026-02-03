
# Plan: Make Audio Settings Collapsible

## Overview
Wrap the audio settings section in a collapsible component, following the same pattern used by the Admin User Management section.

## Current State
- `SlotSoundAdminSection` is a simple `Card` component that's always expanded
- `AdminUserManagement` already has a working collapsible pattern we can follow

## Solution
Apply the same `Collapsible` pattern from `AdminUserManagement` to the `SlotSoundAdminSection`:
- Wrap the Card in a `Collapsible` component
- Make the `CardHeader` a `CollapsibleTrigger`
- Wrap the `CardContent` in `CollapsibleContent`
- Add a chevron icon that rotates when expanded

## Changes

**File:** `src/components/slots/SlotSoundAdminSection.tsx`

1. Import `Collapsible`, `CollapsibleContent`, and `CollapsibleTrigger` from UI components
2. Import `ChevronDown` icon from lucide-react
3. Wrap the entire Card in a `Collapsible` component
4. Convert CardHeader to a CollapsibleTrigger with hover styling and rotating chevron
5. Wrap CardContent in CollapsibleContent

### Key Code Changes

Add imports:
```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react"; // Add to existing lucide imports
```

Updated structure:
```tsx
return (
  <Collapsible>
    <Card>
      <CollapsibleTrigger className="w-full">
        <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-amber-500" />
            Lydindstillinger
          </CardTitle>
          <ChevronDown className="h-5 w-5 transition-transform duration-200" />
        </CardHeader>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CardContent className="space-y-6">
          {/* All existing content stays the same */}
        </CardContent>
      </CollapsibleContent>
    </Card>
  </Collapsible>
);
```

## Files to Modify

| File | Change |
|------|--------|
| `src/components/slots/SlotSoundAdminSection.tsx` | Add collapsible wrapper with trigger and content |
