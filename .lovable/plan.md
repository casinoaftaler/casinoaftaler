
# Plan: Book of Dead-style Slot Machine with Community Tab

## Overview
Build a fully-featured slot machine game inspired by "Book of Dead" with a bonus game feature, 10 pay lines, AI-generated symbols, leaderboard, and a daily spin allowance system. The game will be placed under a new "Community" dropdown in the navigation, which will also include Highlights.

---

## Navigation Changes

### Desktop Navigation
- Replace the standalone "Highlights" link with a "Community" dropdown menu
- The dropdown will contain:
  - **Slot Machine** - Links to `/community/slots`
  - **Highlights** - Links to `/highlights`

### Mobile Navigation  
- Add "Community" as a parent item
- Sub-items: Slot Machine and Highlights

---

## Database Schema

### New Tables

**1. `slot_symbols`** - Store AI-generated symbol data
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Symbol name (e.g., "Pharaoh", "Scarab") |
| image_url | text | URL to stored image |
| multiplier_3 | integer | Payout for 3 matching (× bet) |
| multiplier_4 | integer | Payout for 4 matching |
| multiplier_5 | integer | Payout for 5 matching |
| is_scatter | boolean | Is this the Book/scatter symbol |
| is_wild | boolean | Wild symbol capability |
| position | integer | Display order |
| created_at | timestamp | Creation time |

**2. `slot_spins`** - Track daily spin allowances
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | References profiles |
| date | date | The date (resets at midnight) |
| spins_remaining | integer | Spins left (starts at 100) |
| created_at | timestamp | Creation time |

**3. `slot_game_results`** - Record each spin for leaderboard
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Player |
| bet_amount | integer | Amount wagered |
| win_amount | integer | Amount won |
| is_bonus_triggered | boolean | Did bonus game trigger |
| bonus_win_amount | integer | Winnings from bonus |
| created_at | timestamp | When played |

**4. `slot_leaderboard`** - Aggregated leaderboard view
- This will be a PostgreSQL VIEW that aggregates total winnings per user
- Includes daily, weekly, and all-time rankings

---

## Slot Machine Game Mechanics

### Core Features

**Reel Configuration**
- 5 reels × 3 rows = 15 visible symbols
- 10 fixed pay lines (like classic Book of Dead)

**Pay Lines Pattern (10 lines)**
```text
Line 1:  [1][1][1][1][1]  (middle row)
Line 2:  [0][0][0][0][0]  (top row)
Line 3:  [2][2][2][2][2]  (bottom row)
Line 4:  [0][1][2][1][0]  (V shape)
Line 5:  [2][1][0][1][2]  (inverted V)
Line 6:  [0][0][1][2][2]  (top to bottom)
Line 7:  [2][2][1][0][0]  (bottom to top)
Line 8:  [1][0][0][0][1]  (U shape top)
Line 9:  [1][2][2][2][1]  (U shape bottom)
Line 10: [0][1][1][1][0]  (mild V)
```

### Symbols (10 total, AI-generated)
1. **Pharaoh** - Highest value symbol
2. **Anubis** - High value
3. **Horus** - High value
4. **Scarab** - Medium value
5. **Isis** - Medium value
6. **Ankh** - Medium value
7. **A (Ace)** - Low value
8. **K (King)** - Low value
9. **Q (Queen)** - Low value
10. **Book of Ra** - SCATTER/WILD (triggers bonus)

### Payout Table
| Symbol | 3× | 4× | 5× |
|--------|-----|------|------|
| Pharaoh | 30× | 100× | 500× |
| Anubis | 20× | 60× | 200× |
| Horus | 15× | 40× | 125× |
| Scarab | 10× | 30× | 100× |
| Isis | 10× | 25× | 75× |
| Ankh | 5× | 15× | 50× |
| A | 5× | 10× | 40× |
| K | 5× | 10× | 30× |
| Q | 5× | 10× | 25× |
| Book | 2× | 20× | 200× |

---

## Bonus Game Feature

### Trigger Condition
- 3+ Book symbols anywhere on reels triggers 10 free spins
- During bonus, one random symbol is selected as "expanding symbol"

### Bonus Mechanics
1. **Symbol Selection**: Random symbol chosen before free spins
2. **Expanding Symbols**: When the special symbol appears on any winning line, it expands to fill the entire reel
3. **Retrigger**: 3+ Books during free spins adds +10 more spins
4. **All wins during bonus are added to bonus_win_amount**

---

## Daily Spin System

### Reset Logic
- Each user gets 100 spins per day
- Resets at midnight (server time, UTC)
- Database trigger or edge function checks date on each spin request
- If `slot_spins.date !== today`, reset to 100

### Spin Deduction Flow
1. User clicks "SPIN"
2. Check if `spins_remaining > 0`
3. If yes, decrement by 1 and proceed
4. If no, show "Come back tomorrow!" message

---

## Leaderboard

### Display Sections
- **Daily Top 10** - Today's biggest winners
- **Weekly Top 10** - This week's leaders
- **All-Time Top 10** - Hall of fame

### Data Points per Entry
- Rank position
- User avatar + display name
- Total winnings
- Biggest single win

---

## File Structure

### New Files
```text
src/pages/Community.tsx              - Community landing/redirect
src/pages/SlotMachine.tsx            - Main slot game page
src/components/slots/
  ├── SlotGame.tsx                   - Main game container
  ├── SlotReel.tsx                   - Individual reel with spin animation
  ├── SlotSymbol.tsx                 - Symbol display component
  ├── PayTable.tsx                   - Paytable popup/modal
  ├── BonusGame.tsx                  - Free spins bonus round
  ├── SpinButton.tsx                 - Main spin control
  ├── BetControls.tsx                - Bet amount selector
  ├── WinDisplay.tsx                 - Win amount animations
  ├── SpinsRemaining.tsx             - Daily spins counter
  ├── SlotLeaderboard.tsx            - Leaderboard display
  └── PayLineOverlay.tsx             - Visual pay line indicators
src/hooks/useSlotMachine.ts          - Game state and logic hook
src/hooks/useSlotSpins.ts            - Daily spins management
src/hooks/useSlotLeaderboard.ts      - Leaderboard data fetching
src/lib/slotGameLogic.ts             - Pure functions for game math
```

---

## UI/UX Design

### Slot Machine Page Layout
```text
+------------------------------------------+
|        COMMUNITY SLOT MACHINE            |
|          [Spins: 87/100 today]           |
+------------------------------------------+
|   +-------------------------------+      |
|   |  [Reel 1] [Reel 2] [Reel 3]  |      |
|   |  [Reel 4] [Reel 5]           |      |
|   |                              |      |
|   |  [  5 × 3 Symbol Grid  ]     |      |
|   |                              |      |
|   +-------------------------------+      |
|                                          |
|   [Bet: 1-10]  [💰 WIN: 0]  [SPIN 🎰]   |
|                                          |
|   [📊 Paytable]  [🏆 Leaderboard]        |
+------------------------------------------+
```

### Visual Style
- Egyptian gold/amber theme matching the casino site aesthetic
- Smooth reel spinning animations (CSS transforms)
- Win line highlighting with glowing effects
- Celebratory animations for big wins
- Dark background with gold accents

---

## Technical Details

### Symbol Generation (AI)
- Use Lovable AI (gemini-2.5-flash-image) to generate the 10 symbols
- Store generated images in a storage bucket `slot-symbols`
- Admin can regenerate symbols if needed

### Game State Management
- React state for current spin
- Optimistic UI updates
- Server validates all wins via edge function

### RNG and Fairness
- All randomization happens server-side in edge function
- Each spin request returns the final grid state
- Client only handles display/animation

### Edge Function: `slot-spin`
- Validates user has spins remaining
- Generates random grid
- Calculates wins across all 10 lines
- Checks for bonus trigger
- Updates database
- Returns result to client

---

## Security Considerations

### RLS Policies
- Users can only read their own spin records
- Users can only read their own daily spins count
- Leaderboard view is public (aggregated data only)
- Only authenticated users can play
- Game results insert only via edge function (service role)

### Anti-Cheat
- All game logic runs server-side
- Client sends only: "spin" command + bet amount
- No client-side RNG or win calculation

---

## Implementation Order

1. **Database Setup**
   - Create tables: slot_symbols, slot_spins, slot_game_results
   - Create leaderboard view
   - Set up RLS policies

2. **Navigation Update**
   - Add Community dropdown to Header
   - Move Highlights under Community
   - Add routes to App.tsx

3. **Symbol Generation**
   - Create admin tool or script to generate symbols via AI
   - Store in storage bucket
   - Seed slot_symbols table

4. **Core Game UI**
   - Build SlotGame component with reels
   - Implement spin animations
   - Create pay line overlay

5. **Game Logic Edge Function**
   - Create slot-spin edge function
   - Implement RNG, win calculation, bonus trigger
   - Handle daily spins logic

6. **Daily Spins System**
   - Build useSlotSpins hook
   - Display remaining spins
   - Handle midnight reset

7. **Bonus Game**
   - Implement free spins mode
   - Expanding symbol logic
   - Retrigger capability

8. **Leaderboard**
   - Create database view
   - Build leaderboard component
   - Daily/weekly/all-time tabs

9. **Polish**
   - Win animations
   - Sound effects (optional)
   - Mobile responsiveness
