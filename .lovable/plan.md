
# Plan: Floating Twitch Live Stream Player

## Overview
Add a floating, minimizable Twitch player that automatically appears when the stream is live and hides when offline. The player will be positioned in the bottom-left corner (to avoid overlap with the BackToTop button in the bottom-right).

## Features
- **Auto-show/hide**: Player only appears when stream is live
- **Minimizable**: Users can collapse the player to a small pill showing "LIVE" with viewer count
- **Dismissible**: Users can close the player entirely (stays closed until page refresh or stream restarts)
- **Draggable position** (optional): Could allow users to move the player
- **Responsive**: Smaller on mobile, larger on desktop

## Technical Implementation

### Files to Create
1. **`src/components/TwitchLivePlayer.tsx`** - The floating player component

### Files to Modify  
1. **`src/components/Layout.tsx`** - Add the floating player to the global layout

### Component Design

```text
┌─────────────────────────────────────┐
│ 🔴 LIVE: Playing Slots!    [_] [X] │
├─────────────────────────────────────┤
│                                     │
│         Twitch Embed Player         │
│           (16:9 aspect)             │
│                                     │
└─────────────────────────────────────┘

When minimized:
┌─────────────────────┐
│ 🔴 LIVE • 234 👁 [+]│
└─────────────────────┘
```

### Implementation Details

**TwitchLivePlayer.tsx:**
- Uses the existing `useTwitchStatus` hook to detect live status
- Uses `useSiteSettings` to get the Twitch channel URL
- Embeds Twitch player using iframe with `player.twitch.tv`
- States: `expanded` (full player) | `minimized` (small pill) | `closed` (hidden)
- Smooth enter/exit animations
- Local state for minimize/close (resets on live status change)

**Twitch Embed URL format:**
```
https://player.twitch.tv/?channel={channelName}&parent={hostname}&muted=true
```

**Positioning:**
- Fixed position: `bottom-20 left-4` (above footer area, left side)
- Z-index: 40 (below header but above most content)
- Width: ~320px desktop, full-width on mobile with padding

**Mobile Behavior:**
- Starts minimized on mobile to avoid blocking content
- Expands to near full-width when opened

### User Experience Flow
1. User visits site
2. If stream is offline: Nothing shown
3. If stream is live: Floating player appears (minimized on mobile, expanded on desktop)
4. User can minimize player to small pill
5. User can close player entirely
6. If user closes, player stays closed until they refresh or the stream goes offline and comes back online
