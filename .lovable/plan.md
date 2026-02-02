
# Plan: Add YouTube Shorts/Reels Support to Highlights

## Overview
The current highlights system only supports standard YouTube video URLs. This update will add full support for YouTube Shorts (also known as Reels) which use a different URL format.

## Current Limitation
YouTube Shorts URLs look like:
- `https://www.youtube.com/shorts/ABC123xyz`

The current code only recognizes:
- `https://www.youtube.com/watch?v=ABC123xyz`
- `https://youtu.be/ABC123xyz`
- `https://www.youtube.com/embed/ABC123xyz`

## Solution

### File Changes

**1. src/components/HighlightCard.tsx**

Update two helper functions to also match YouTube Shorts URLs:

- `getYouTubeEmbedUrl()` - Add `shorts/` to the regex pattern
- `getYouTubeThumbnail()` - Add `shorts/` to the regex pattern

The updated regex will be:
```text
/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/
```

This adds `shorts\/` as an additional matching option, extracting the video ID the same way.

**2. src/components/HighlightsAdminSection.tsx**

Update the URL placeholder text in the admin form to indicate that YouTube Shorts are also supported:
```text
"https://www.youtube.com/watch?v=... , /shorts/... eller https://clips.twitch.tv/..."
```

---

## Technical Details

### Regex Breakdown
The pattern `(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)` matches:
- `youtube.com/watch?v=` (standard videos)
- `youtube.com/embed/` (embed URLs)
- `youtube.com/shorts/` (Shorts/Reels) **NEW**
- `youtu.be/` (short share links)

The `([^&?/]+)` captures the video ID that follows.

### Embedding
YouTube Shorts can be embedded using the same standard embed URL format:
`https://www.youtube.com/embed/VIDEO_ID?autoplay=1`

### Thumbnails
YouTube Shorts thumbnails work with the same thumbnail API:
`https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`

---

## Files to Modify
1. `src/components/HighlightCard.tsx` - Update regex patterns
2. `src/components/HighlightsAdminSection.tsx` - Update placeholder text
