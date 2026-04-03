

# Plan: Show Orb Reaction Video on Spins with Orbs

## Summary
Replace the idle looping character video with a one-shot reaction video whenever orbs (multiplier bombs) appear on the grid. The reaction video plays once using the same chroma key WebGL effect, same position, and same dimensions. When no orbs are present, the idle video continues looping as usual.

## Changes

### 1. Copy uploaded video to project
- Copy `user-uploads://hf_20260403_100822_de065929-5f60-4b3f-b9e1-8e12cbd523f4.mp4` to `public/videos/gates-character-orbs.mp4`

### 2. Update `ChromaKeyVideo` component to support one-shot playback
- Add optional `loop` prop (default `true` for backward compat)
- Add optional `playTrigger` prop (a counter/key that triggers replay from start)
- When `playTrigger` changes, reset video to start and play once (no loop)
- When video ends in non-loop mode, keep showing last frame (or hide canvas)

### 3. Update `GatesSlotGame.tsx`
- Add state: `orbVideoTrigger` (number, incremented when orbs detected)
- Add state: `showOrbVideo` (boolean, true while orb video should play)
- In `processTumbleSteps`, when `multiplierBombs` are found on any step, set `showOrbVideo = true` and increment `orbVideoTrigger`
- When orb video ends, set `showOrbVideo = false`
- Conditionally render: when `showOrbVideo` is true, render `ChromaKeyVideo` with `src="/videos/gates-character-orbs.mp4"` and `loop={false}`. Otherwise render the existing idle loop video.
- Both videos use identical position/size/className props

### Technical Details
- The `ChromaKeyVideo` component needs a small `onEnded` callback prop so the parent knows when the one-shot video finishes
- The trigger detection happens at the start of the bomb blow-up sequence (line ~397) — set `showOrbVideo = true` before the bomb animation loop begins
- After the video ends (via `onEnded`), revert to idle video

