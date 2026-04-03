

## Plan: Redesign Raffle Page with Card Grid Layout

### What changes

Redesign the raffle page to show both the **active raffle** and **completed raffles** as visual cards in a **2-column grid**, inspired by the reference image. Each card shows:
- Raffle number (top-left)
- Date (top-right badge)
- Prize amount (bold centered text, e.g. "CREDITS 500")
- Active raffle: "DELTAG" button + countdown timer
- Completed raffle: "VIS VINDERE" (Show Winners) button that expands/reveals the winner

### Design per card (matching reference style)
- Dark card with rounded corners and subtle border glow
- Raffle ID number top-left, date badge top-right (dd.mm.yyyy)
- Large bold prize text centered
- Bottom area: button + decorative element
- Active card gets a highlighted border (primary color glow) to stand out

### Data changes
- Update `useRecentRaffleWinners` to also fetch completed raffles **without** winners (no entries = no winner), and increase limit to 20
- Add raffle `id` number display (already available)

### Files changed

**`src/pages/Raffle.tsx`** — Full redesign:
- Remove the current single-card + list layout
- Render a 2-column grid (`grid-cols-1 md:grid-cols-2`)
- First card = active raffle (with countdown, join button, participant count)
- Remaining cards = completed raffles with "Vis Vindere" expand/collapse showing winner info
- Each card styled as a dark, rounded box with raffle number, date, prize, and CTA

**`src/hooks/useRaffle.ts`** — Minor update:
- `useRecentRaffleWinners`: fetch all completed raffles (with or without winner), increase limit to 20
- Include `starts_at` in the select for date display

### No database changes needed

