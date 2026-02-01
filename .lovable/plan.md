
# Plan: Add Hero Section to Butik Page

## Overview
Move the title and description to a hero section similar to the "Om os" page, with centered text and the same gradient background with decorative elements. Use the ShoppingBag icon instead of Users.

## Changes Required

### File: src/pages/Shop.tsx

#### 1. Add ShoppingBag icon for the hero (already imported)
The ShoppingBag icon is already imported from lucide-react.

#### 2. Create Hero Section Structure
Add a hero section at the top of the page with:
- Gradient background matching About page style
- Decorative blur circles for visual effect
- Centered ShoppingBag icon in a rounded container
- Centered h1 title "Butik"
- Centered description text in white/80 opacity

#### 3. Update Page Structure
- Wrap entire page in `min-h-screen` div
- Move products grid to a separate container section below the hero
- Apply hero to all three render states (loading, error, main)

## Code Structure

```tsx
<div className="min-h-screen">
  {/* Hero Section */}
  <section className="relative py-16 md:py-24 overflow-hidden">
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
      }}
    />
    <div className="absolute inset-0 opacity-20">
      <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[hsl(210_80%_60%)] blur-xl" />
      <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[hsl(260_70%_60%)] blur-xl" />
    </div>
    <div className="container relative z-10">
      <div className="mx-auto max-w-3xl text-center text-white">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/10 p-4">
            <ShoppingBag className="h-12 w-12" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Butik</h1>
        <p className="text-lg text-white/80">
          Her kan du shoppe eksklusive varer...
        </p>
      </div>
    </div>
  </section>

  {/* Products Section */}
  <div className="py-16">
    <div className="container">
      {/* Product grid here */}
    </div>
  </div>
</div>
```

## Visual Result
- Hero section with purple/blue gradient background
- Centered ShoppingBag icon in a semi-transparent circle
- "Butik" title in large white text, centered
- Description text in white with 80% opacity, centered
- Decorative blur circles for visual interest
- Products displayed below in a clean container section
