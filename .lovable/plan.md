

# Extend Featured Cards to Top 5 Casinos

## Overview
Modify the casino card layout to display the first 5 casinos with the featured (Roshtein-style) hero layout, while keeping rank 6+ as compact horizontal list rows.

---

## Current State
- **Rank 1-2**: Use `FeaturedCard` component (hero-style layout)
- **Rank 3+**: Use `RegularCard` component (compact horizontal rows)

## Target State
- **Rank 1-5**: Use `FeaturedCard` component (hero-style layout)
- **Rank 6+**: Use `RegularCard` component (compact horizontal rows)

---

## Implementation

### File: `src/components/CasinoCard.tsx`

**Change the decision logic** in the main `CasinoCard` component (line 479-487):

```text
Current:  const isFeatured = rank && rank <= 2;
New:      const isFeatured = rank && rank <= 5;
```

This single change will make ranks 1-5 render as featured hero cards.

---

### File: `src/pages/Index.tsx`

**Update the slicing logic** to match the new 5-card featured section:

1. **Featured section** (lines 87-93): Change `slice(0, 2)` to `slice(0, 5)`
2. **Regular section** (lines 96-106): Change `slice(2)` to `slice(5)` and update starting rank from `index + 3` to `index + 6`

---

## Summary

| Change | File | Line(s) |
|--------|------|---------|
| Featured threshold: `<= 2` → `<= 5` | CasinoCard.tsx | 481 |
| Featured slice: `slice(0, 2)` → `slice(0, 5)` | Index.tsx | 87 |
| Regular slice: `slice(2)` → `slice(5)` | Index.tsx | 98 |
| Regular rank: `index + 3` → `index + 6` | Index.tsx | 102 |

---

## Visual Result

```text
Top Casinos Section:
┌─────────────────────────────────────────┐
│ #1 - Featured Hero Card (with HOT badge)│
├─────────────────────────────────────────┤
│ #2 - Featured Hero Card                 │
├─────────────────────────────────────────┤
│ #3 - Featured Hero Card                 │
├─────────────────────────────────────────┤
│ #4 - Featured Hero Card                 │
├─────────────────────────────────────────┤
│ #5 - Featured Hero Card                 │
├─────────────────────────────────────────┤
│ #6 - Compact Row                        │
│ #7 - Compact Row                        │
│ #8 - Compact Row                        │
│ ...                                     │
└─────────────────────────────────────────┘
```

