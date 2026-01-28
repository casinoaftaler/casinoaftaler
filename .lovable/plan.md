
# Make Casino Logo Bigger with Rounded Edges in Top Left Corner

## Overview
Update the casino card logos to be larger, have rounded edges (rounded-xl), and position them in the top left corner instead of centered.

## Current State
- **FeaturedCard (Rank 1-5)**: Logo is centered, sizes are `h-16 max-w-[180px]` for top row and `h-12 max-w-[140px]` for others
- **RegularCard (Rank 6+)**: Logo is `h-12 w-12` with `rounded-lg`

## Changes

### FeaturedCard Updates
1. Move logo from centered to top-left absolute positioning
2. Increase logo size: `h-20 w-20` for top row, `h-16 w-16` for rank 3-5
3. Add `rounded-xl` for more rounded corners
4. Add white border and shadow for visibility on gradient backgrounds

### RegularCard Updates  
1. Increase logo size from `h-12 w-12` to `h-16 w-16`
2. Change from `rounded-lg` to `rounded-xl`
3. Logo already in left position, just needs sizing update

---

## Technical Details

### File to Modify
- `src/components/CasinoCard.tsx`

### FeaturedCard Logo Changes (Lines 243-258)

**Before:**
```jsx
<div className="flex justify-center mb-4">
  {casino.logoUrl ? (
    <img
      src={casino.logoUrl}
      alt={casino.name}
      className={`object-contain ${isTopRow ? "h-16 max-w-[180px]" : "h-12 max-w-[140px]"}`}
    />
  ) : (
    <div className={`flex items-center justify-center rounded-xl bg-muted font-bold text-foreground ${
      isTopRow ? "h-16 w-32 text-xl" : "h-12 w-24 text-lg"
    }`}>
      {casino.name}
    </div>
  )}
</div>
```

**After:**
```jsx
{/* Top-left Logo */}
<div className="absolute top-4 left-4 z-10">
  {casino.logoUrl ? (
    <img
      src={casino.logoUrl}
      alt={casino.name}
      className={`object-cover rounded-xl border-2 border-white/30 shadow-lg ${
        isTopRow ? "h-20 w-20" : "h-16 w-16"
      }`}
    />
  ) : (
    <div className={`flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm font-bold text-white border-2 border-white/30 ${
      isTopRow ? "h-20 w-20 text-xl" : "h-16 w-16 text-lg"
    }`}>
      {casino.name.substring(0, 2).toUpperCase()}
    </div>
  )}
</div>
```

### FeaturedCard Content Padding
- Adjust content container padding to account for logo: `pt-8` becomes `pt-28` (for top row) or `pt-24` (for rank 3-5)

### RegularCard Logo Changes (Lines 351-364)

**Before:**
```jsx
<div className="flex-shrink-0">
  {casino.logoUrl ? (
    <img
      src={casino.logoUrl}
      alt={casino.name}
      className="h-12 w-12 rounded-lg object-cover"
    />
  ) : (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground">
      {casino.name.substring(0, 2).toUpperCase()}
    </div>
  )}
</div>
```

**After:**
```jsx
<div className="flex-shrink-0">
  {casino.logoUrl ? (
    <img
      src={casino.logoUrl}
      alt={casino.name}
      className="h-16 w-16 rounded-xl object-cover"
    />
  ) : (
    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-base font-bold text-foreground">
      {casino.name.substring(0, 2).toUpperCase()}
    </div>
  )}
</div>
```

### Summary of Size Changes

| Card Type | Current Size | New Size | Corner Radius |
|-----------|-------------|----------|---------------|
| Featured (Rank 1-2) | h-16 | h-20 w-20 | rounded-xl |
| Featured (Rank 3-5) | h-12 | h-16 w-16 | rounded-xl |
| Regular (Rank 6+) | h-12 w-12 | h-16 w-16 | rounded-xl |
