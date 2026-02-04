
# Plan: Add Toggle Button for Desktop Leaderboard

## Overview
Replace the always-visible desktop leaderboard with a toggle button that shows/hides it, matching the mobile experience but with desktop-appropriate positioning.

---

## Technical Details

### File: `src/pages/SlotMachine.tsx`

#### Change 1: Remove the always-visible desktop leaderboard (lines 146-149)
Delete the unconditional desktop leaderboard that's always shown on xl screens.

#### Change 2: Update the Collapsible to work on all screen sizes (lines 155-181)
Remove the `xl:hidden` class so the toggle button and collapsible leaderboard work on all screen sizes.

#### Change 3: Add desktop-specific toggle button positioning
On desktop (xl), position the toggle button and leaderboard to the left of the slot machine using absolute positioning. On mobile/tablet, keep it below the slot machine.

**Updated structure:**

```tsx
{/* Main content: Slot machine centered */}
<div className="flex justify-center">
  <div className="relative">
    {/* Desktop: Leaderboard positioned to the left - conditionally shown */}
    <div className="hidden xl:block absolute right-full mr-4 top-0 w-64">
      {/* Toggle button */}
      <Button
        variant="ghost"
        onClick={toggleLeaderboard}
        className="w-full flex items-center justify-center gap-2 py-3 mb-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-500"
      >
        <Trophy className="h-4 w-4" />
        <span>{showLeaderboard ? "Skjul rangliste" : "Vis rangliste"}</span>
        {showLeaderboard ? <ChevronUp /> : <ChevronDown />}
      </Button>
      
      {/* Conditionally render leaderboard */}
      {showLeaderboard && (
        <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
          <SlotLeaderboard />
        </div>
      )}
    </div>
    
    {/* Slot machine */}
    <div className="flex flex-col items-center gap-1">
      <SlotGame />
      
      {/* Mobile/Tablet: Collapsible Leaderboard (below slot) */}
      <Collapsible 
        open={showLeaderboard} 
        onOpenChange={setShowLeaderboard}
        className="w-full max-w-sm xl:hidden"
      >
        {/* ... existing mobile collapsible content ... */}
      </Collapsible>
    </div>
  </div>
</div>
```

---

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| Desktop (xl) | Always visible leaderboard | Toggle button + conditional leaderboard |
| Mobile/Tablet | Collapsible toggle below slot | No change |
| State persistence | localStorage | No change (uses existing state) |

---

## Expected Result
- Desktop users will see a "Vis rangliste" / "Skjul rangliste" button to the left of the slot machine
- Clicking the button toggles the leaderboard visibility
- State is persisted across page refreshes via localStorage (already implemented)
- Mobile/tablet experience remains unchanged
