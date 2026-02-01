
# Plan: Update Bonus Type Terminology

## Overview
Change all occurrences of "Klæbende bonus" to "Sticky Bonus" and "Ikke-klæbende" to "No-Sticky Bonus" throughout the codebase.

## Files to Update

### 1. src/components/Header.tsx
**Lines 51-54** - Dropdown menu items:
- "Ikke-klæbende Bonusser" → "No-Sticky Bonusser"
- "Klæbende Bonusser" → "Sticky Bonusser"

### 2. src/components/FilterTabs.tsx
**Line 5** - Filter tab label:
- `label: "Ikke-klæbende"` → `label: "No-Sticky"`

### 3. src/components/BonusTypeCards.tsx
**Lines 25, 29, 61, 65** - Card titles and descriptions:
- "Ikke-klæbende Bonus" → "No-Sticky Bonus"
- "ikke-klæbende bonus" → "no-sticky bonus"
- "Klæbende Bonus" → "Sticky Bonus"
- "klæbende bonus" → "sticky bonus"

### 4. src/pages/BonusGuide.tsx
**Multiple lines** - Table of contents and section headers:
- "Ikke-klæbende Bonusser Forklaret" → "No-Sticky Bonusser Forklaret"
- "Klæbende Bonusser Forklaret" → "Sticky Bonusser Forklaret"
- All in-text references to these terms

### 5. src/pages/Admin.tsx
**Line 681** - Badge display:
- `"Ikke-klæbende"` → `"No-Sticky Bonus"`

### 6. src/pages/CasinoDetail.tsx
**Line 76** - Badge display:
- `"Ikke-klæbende"` → `"No-Sticky Bonus"`

### 7. src/components/FAQSection.tsx
**Lines 21-28** - FAQ questions and answers:
- Update terminology in the FAQ about bonus types

---

## Technical Details

All changes are straightforward text replacements. The logic (such as `casino.bonus_type === "No-sticky"`) remains unchanged - only the displayed labels change.

**Note**: The database value "No-sticky" stays the same; only the user-facing Danish text is being updated to use the English terms "Sticky" and "No-Sticky".
