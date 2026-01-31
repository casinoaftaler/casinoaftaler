

## Unify Casino Card Gradient Backgrounds

This plan removes the dynamic logo-based gradients from featured casino cards and replaces them with a consistent gradient that matches the site's purple/blue color theme.

### Current Implementation

Featured cards (rank 1-5) currently use dynamic gradients that extract the dominant color from each casino's logo using the `useLogoColor` hook. This creates varied backgrounds for each card.

Regular cards (rank 6+) use the standard card background color (`bg-card`).

### Proposed Changes

**File: `src/components/CasinoCard.tsx`**

1. **Remove the `useLogoColor` hook import and usage** - This hook will no longer be needed since we're using a fixed gradient

2. **Replace the dynamic gradient with a consistent site-themed gradient** using the site's primary (purple - `260 70% 55%`) and accent (blue - `210 90% 50%`) colors:

**Before (FeaturedCard):**
```tsx
const logoColor = useLogoColor(casino.logoUrl);

const gradientStyle = logoColor
  ? {
      background: `linear-gradient(to bottom right, 
        hsl(${logoColor} / 0.95) 0%, 
        hsl(${logoColor} / 0.8) 50%, 
        hsl(${logoColor} / 0.95) 100%)`
    }
  : undefined;

const fallbackGradientClass = !logoColor 
  ? "bg-gradient-to-br from-violet-900/90 via-purple-800/80 to-indigo-900/90" 
  : "";
```

**After (FeaturedCard):**
```tsx
// All featured cards use the same site-themed gradient
const gradientClass = "bg-gradient-to-br from-primary/90 via-accent/70 to-primary/90";
```

3. **Update the #1 ranked card glow effect** to use the site's primary/accent colors consistently instead of the logo color

4. **Apply the gradient to the card div** using Tailwind classes instead of inline styles

### Visual Result

- All featured casino cards (rank 1-5) will have the same purple-to-blue gradient background
- The gradient uses the site's CSS variables for primary and accent colors
- Works seamlessly in both light and dark mode
- Regular cards (rank 6+) remain unchanged with the standard card background

### Technical Details

| Change | From | To |
|--------|------|-----|
| Gradient source | Logo color extraction | Site theme CSS variables |
| Gradient colors | Dynamic per-casino | Primary/Accent (purple/blue) |
| Implementation | Inline style + fallback class | Single Tailwind class |
| #1 glow effect | Logo-based colors | Site primary/accent colors |

