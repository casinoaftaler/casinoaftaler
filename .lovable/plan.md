

## Plan: Allow Non-Logged-In Users to View Slot Machine Page

### Overview
Currently, non-logged-in users see a blocking screen asking them to log in. We'll modify the page so everyone can see the slot machine, title, and leaderboard, but only logged-in users can actually spin.

### Changes

#### 1. Update SlotMachine.tsx Page
- Remove the `if (!user)` block that shows the login prompt
- Always render the full slot machine page with title, SlotGame component, and SlotLeaderboard
- Keep the loading state check as-is

#### 2. Update SlotGame.tsx Component
The spin functionality already checks for user authentication (line 144: `if (!symbols || symbols.length === 0 || !user || isSpinning) return;`), but we need to:
- Show a clear "Log in to spin" message when the user is not authenticated
- Disable spin buttons for non-logged-in users with an appropriate visual indicator
- Conditionally render the SpinsRemaining component (only show for logged-in users)
- Update the button states and "no spins" message to handle the unauthenticated case

#### 3. Update SpinsRemaining.tsx Component
- Add handling for when user is not logged in (currently it relies on useSlotSpins which requires auth)
- Show a message prompting users to log in, or hide the component for non-authenticated users

### Technical Details

**SlotMachine.tsx:**
```tsx
// Remove lines 30-56 (the !user check and login prompt)
// The page will always show the full slot machine UI
```

**SlotGame.tsx:**
- Add a login prompt overlay or message when `!user`
- Modify spin buttons to show "Log ind for at spille" when not authenticated
- Add a Link to "/auth" on the disabled spin button for easy navigation

**SpinsRemaining.tsx:**
- Import `useAuth` hook
- Return null or a "Log in" prompt when user is not logged in

### Files to Modify
1. `src/pages/SlotMachine.tsx` - Remove login gate, always show full content
2. `src/components/slots/SlotGame.tsx` - Add login prompts on controls when not authenticated
3. `src/components/slots/SpinsRemaining.tsx` - Handle unauthenticated state gracefully

