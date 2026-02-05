
# Plan: Slot Casino Card Slideshow with Giveaway Banner

## Overview
Transform the `SlotCasinoCard` component into an auto-sliding carousel that alternates between the current casino card content and a new giveaway banner image every 10 seconds.

## Implementation Steps

### 1. Process and Add Giveaway Image
- Use AI image generation to remove the black background from the uploaded giveaway banner image
- Save the processed image to `src/assets/slots/giveaway-banner.png`

### 2. Create New SlotPromoSlider Component
Create a wrapper component that handles the slideshow logic:
- **File**: `src/components/slots/SlotPromoSlider.tsx`
- Contains two slides: Casino Card and Giveaway Banner
- Uses `useState` with `useEffect` interval (10 seconds)
- Implements horizontal slide animation using CSS transforms and transitions

### 3. Update SlotCasinoCard
Modify the existing component to work within the slider context:
- Keep all existing casino card content intact
- Ensure it fills its container properly for the slide animation

### 4. Create GiveawayBanner Component
- **File**: `src/components/slots/GiveawayBanner.tsx`
- Simple component that displays the giveaway image
- Matches the dimensions and border styling of the casino card
- Clickable (could link to Twitch channel or shop page)

### 5. Update SlotMachine.tsx
Replace direct `SlotCasinoCard` usage with the new `SlotPromoSlider` component:
- Desktop position (beside leaderboard)
- Mobile position (below slot game)

---

## Technical Details

### Slide Animation CSS
```css
/* Container clips overflow, slides move via translateX */
.slider-container {
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.6s ease-in-out;
}

/* Active slide 0: translateX(0) */
/* Active slide 1: translateX(-100%) */
```

### Interval Logic
```typescript
const [activeSlide, setActiveSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide(prev => (prev + 1) % 2);
  }, 10000);
  return () => clearInterval(interval);
}, []);
```

### Slide Indicator Dots
- Two small dots below the slider
- Amber color scheme to match Egyptian theme
- Active dot is fully opaque, inactive is 30% opacity
- Clickable for manual navigation

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/assets/slots/giveaway-banner.png` | Create (AI processed image) |
| `src/components/slots/SlotPromoSlider.tsx` | Create new component |
| `src/components/slots/GiveawayBanner.tsx` | Create new component |
| `src/pages/SlotMachine.tsx` | Update to use SlotPromoSlider |
