
# Plan: Add Live Indicator to Twitch Icon

## Overview
Add a pulsing red "live" dot next to the Twitch icon in the header to create a visual indicator that the stream is currently live. The dot will have a glowing pulse animation for an authentic live streaming appearance.

## Changes Required

### File: src/components/Header.tsx

Wrap the Twitch icon link in a relative container and add a pulsing red dot indicator positioned at the top-right corner of the icon.

**Implementation:**
- Change the Twitch link to include `relative` positioning
- Add a red dot with CSS animation for pulsing/glowing effect
- Use a combination of a solid dot and an animated ping ring for the live effect

**Code changes (lines 79-91):**

```tsx
{siteSettings?.twitch_url && (
  <a
    href={siteSettings.twitch_url}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    aria-label="Twitch - Live"
  >
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
    {/* Live indicator */}
    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </span>
  </a>
)}
```

## Styling Details
- Uses Tailwind's built-in `animate-ping` for the pulsing effect
- Red color (`bg-red-500`) matches standard live indicators
- Positioned at top-right corner with `-top-0.5 -right-0.5`
- Two-layer approach: solid dot underneath with a pinging ring on top
- Updated aria-label to "Twitch - Live" for accessibility

## Visual Result
- A glowing red dot appears at the top-right corner of the Twitch icon
- The dot has a smooth pulsing animation that radiates outward
- Creates an authentic "we're live" streaming appearance
- Animation runs continuously to catch user attention
