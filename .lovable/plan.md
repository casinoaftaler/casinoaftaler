

## Plan: Center Gevinst between `[+]` and AutoSpin + Add Count-Up Animation

### 1. Reposition Gevinst (`BonanzaControlBar.tsx`)

The Gevinst is currently in the right zone div alongside AutoSpin. To center it **between** the `[+]` button and AutoSpin, I'll move it out of the right zone and instead place it as a **new absolute zone** positioned between the center zone's right edge and the AutoSpin button. 

Specifically:
- **Remove** Gevinst from the right zone (lines 247-261)
- **Add a new absolute div** positioned to sit between `[+]` and AutoSpin. Use `right-[calc position]` or a flex approach: place Gevinst as the last item inside the center zone (after the `[+]` button), with a left margin/gap to separate it from `[+]`.

Simpler approach: Add Gevinst **inside the center zone** after the `[+]` button with appropriate gap. This naturally centers it relative to the `[+]` button while keeping it left of the AutoSpin area.

### 2. Add Count-Up Animation for Win Amount

Use the existing `AnimatedWinCounter` component to animate the win value counting up when a win hits:
- Import `AnimatedWinCounter` in `BonanzaControlBar.tsx`
- Replace `{winAmount.toLocaleString()}` with `<AnimatedWinCounter targetValue={winAmount} />`
- The component already handles ease-out counting and bump animation on completion

### Files Modified
- `src/components/slots/BonanzaControlBar.tsx` — move Gevinst into center zone after `[+]`, use `AnimatedWinCounter`

