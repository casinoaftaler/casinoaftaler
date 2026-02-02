
# Plan: Clean Up Duplicate "Funktioner" (Features) Display on Casino Cards

## Current Issue

The casino card currently displays features in **three separate places**, creating visual redundancy:

1. **Main Card Body** (always visible): Features with green checkmarks (showing first 3 features)
2. **Expanded Section - Top Badges**: Feature badges at the very top of the collapsible content (showing first 3 features)
3. **Expanded Section - "Funktioner" Section**: A dedicated section with the header "Funktioner" listing all features as outline badges

## Proposed Solution

Consolidate the feature display by:

1. **Keep the main card body features** (with green checkmarks) - These provide a quick overview before expanding
2. **Remove the duplicate feature badges** from the top of the expanded section (Lines 60-69 in `CasinoInfoContent`)
3. **Keep the "Funktioner" section** in the expanded details - but only show features that weren't already displayed in the main card (i.e., features 4+)

This approach:
- Eliminates redundancy while preserving all feature information
- Maintains the visual hierarchy (quick preview on card, full details when expanded)
- Only shows the "Funktioner" section if there are additional features beyond the first 3

## Technical Changes

**File: `src/components/CasinoCard.tsx`**

1. **Remove the Feature Badges block** (Lines 59-69) from `CasinoInfoContent` that shows the bonus type and first 3 features as badges at the top of the expanded section

2. **Update the "Funktioner" section** (Lines 163-175) to only display features starting from index 3 (the 4th feature onwards), and only render the section if there are more than 3 features

### Code Changes Summary

```text
CasinoInfoContent component modifications:
├── Remove: Feature badges block (bonus type badge + first 3 features)
└── Update: "Funktioner" section
    ├── Only show features[3+] (skip first 3 already shown on card)
    └── Only render section if features.length > 3
```

## Result

- Users see the top 3 features with checkmarks on the card (always visible)
- When expanded, they see additional features (4+) in the "Funktioner" section if any exist
- No more duplicate display of the same features
