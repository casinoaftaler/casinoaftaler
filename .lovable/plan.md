

## Plan: Icon-Only Twitch Badges

### Overview
Replace the current text-based badge pills with standalone colored icons (no background, no text label). Each role gets a specific icon and color as requested:
- **VIP**: Pink diamond icon (`Gem`)
- **Moderator**: Green sword icon (`Sword`)
- **Subscriber**: Gold star icon (`Star`)
- **Follower**: Red heart / Amber crown / Yellow award (unchanged colors, just icon-only)

### Changes

#### 1. Update `src/hooks/useTwitchBadges.ts`
- Change the `color` field in badge definitions to just the icon color class (e.g., `text-pink-400` for VIP, `text-green-400` for Moderator, `text-amber-400` for Subscriber).
- Remove the background/border color classes since we won't use Badge wrappers anymore.

#### 2. Update `src/components/TwitchBadges.tsx`
- Remove the `Badge` component wrapper entirely.
- Render each badge as a standalone icon with a `Tooltip` showing the label on hover.
- Use the Tooltip component (already available via `@radix-ui/react-tooltip`).
- Icon sizes stay the same (`sm`/`md`/`lg` variants).
- The skeleton loading state will show smaller circular skeletons instead of pill-shaped ones.
- Remove the `showLabels` prop since labels will only appear as tooltips.
- `TwitchBadgesInline` stays as a thin wrapper using `size="sm"`.

#### 3. Specific icon colors
| Badge | Icon | Color Class |
|-------|------|-------------|
| Moderator | `Sword` | `text-green-400` |
| VIP | `Gem` | `text-pink-400` |
| Subscriber | `Star` | `text-amber-400` (gold) |
| Follower | `Heart` | `text-red-400` |
| 1+ Year Follower | `Award` | `text-yellow-400` |
| OG Follower (2+ yr) | `Crown` | `text-amber-400` |

### Files Changed
| File | Change |
|------|--------|
| `src/hooks/useTwitchBadges.ts` | Simplify color field to icon-only color classes |
| `src/components/TwitchBadges.tsx` | Replace Badge pills with Tooltip-wrapped colored icons |

No changes needed to `Profile.tsx` or `PublicProfile.tsx` since they just render the `TwitchBadges` component.

