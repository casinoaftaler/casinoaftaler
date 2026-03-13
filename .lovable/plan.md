## Problem

`formatTitle()` truncates titles at word boundary but leaves trailing punctuation like `&`, `–`, `-`, `,` — producing nonsensical titles:

- "LeoVegas Anmeldelse 2026 – Mobilcasino **&**" 
- "bet365 Anmeldelse 2026 – Casino, Odds **&**"
- "Spilleautomaten Anmeldelse 2026 – Bonus **&**"
- "Mr Green Anmeldelse 2026 – Green Gaming **&**"

## Fix

One-line addition in `src/components/SEO.tsx` inside `formatTitle()` — after truncating at word boundary, strip trailing punctuation:

```typescript
// Current (line 54):
stripped = (lastSpace > maxPageTitle * 0.6 ? truncated.slice(0, lastSpace) : truncated).trimEnd();

// Add after:
stripped = stripped.replace(/[\s&–\-,:|]+$/g, "");
```

This turns:

- "LeoVegas Anmeldelse 2026 – Mobilcasino &" → "LeoVegas Anmeldelse 2026 – Mobilcasino"
- "bet365 Anmeldelse 2026 – Casino, Odds &" → "bet365 Anmeldelse 2026 – Casino, Odds"
- "Mr Green Anmeldelse 2026 – Green Gaming &" → "Mr Green Anmeldelse 2026 – Green Gaming"

All read naturally. One file, one line. Fixes all current and future titles automatically.  
  
  
Det er ikke KUN disse sider. Det er GENERALT på ALLE mine sider hvor sætningen er blevet afskåret og derfor ikke giver mening. 