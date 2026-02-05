
# Simplify to Single Checkbox for Terms Acceptance

## Overview

Instead of three separate checkboxes, consolidate into a single checkbox that confirms the user:
- Is 18 years or older
- Accepts the terms and conditions
- Accepts the privacy policy

This reduces clutter and makes the login flow simpler while maintaining all legal requirements.

## Technical Approach

**File:** `src/pages/Auth.tsx`

Changes to the non-logged-in login section (lines 165-192):
- Add one new state variable: `acceptsTermsAndAge` (boolean)
- Replace the existing disclaimer paragraph with a checkbox group containing:
  1. A checkbox input
  2. Label text that reads: "Jeg bekræfter at jeg er 18+ år og accepterer [vilkår og betingelser] og [privatlivspolitik]"
  3. Both links remain clickable and open in new tabs
- Update the TwitchAuthButton to disable it when the checkbox is unchecked
- The button remains enabled only when the single checkbox is checked

## Visual Layout

```text
┌─────────────────────────────────────────────────────────┐
│  Card Content:                                          │
│                                                         │
│  [Checkbox] Jeg bekræfter at jeg er 18+ år og         │
│             accepterer vilkår og betingelser og       │
│             privatlivspolitik                          │
│                                                         │
│  [Log ind med Twitch Button] (disabled until checked)  │
└─────────────────────────────────────────────────────────┘
```

## Implementation Details

1. **Single State Variable:**
   - `acceptsTermsAndAge: boolean` - tracks if user has checked the single checkbox

2. **Checkbox Component:**
   - Import the existing `Checkbox` component from `@/components/ui/checkbox`
   - Use it with a label that includes inline links to `/terms` and `/privacy`
   - Label text: "Jeg bekræfter at jeg er 18+ år og accepterer vilkår og betingelser og privatlivspolitik"
   - Links have `target="_blank" rel="noopener noreferrer"` to open in new tabs

3. **Button Disable Logic:**
   - Pass `disabled={!acceptsTermsAndAge}` to the TwitchAuthButton
   - Or wrap the button in a div and conditionally disable based on state

4. **Styling:**
   - Use flexbox to align checkbox and label horizontally
   - Add gap spacing between checkbox and label text
   - Ensure text wraps properly on mobile
   - Use `text-sm` for the label to match existing disclaimer text size

## Code Structure

```typescript
const [acceptsTermsAndAge, setAcceptsTermsAndAge] = useState(false);

// In CardContent:
<div className="flex items-start gap-3">
  <Checkbox
    id="terms-acceptance"
    checked={acceptsTermsAndAge}
    onCheckedChange={(checked) => setAcceptsTermsAndAge(checked === true)}
  />
  <label htmlFor="terms-acceptance" className="text-sm leading-relaxed cursor-pointer">
    Jeg bekræfter at jeg er 18+ år og accepterer{" "}
    <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
      vilkår og betingelser
    </a>{" "}
    og{" "}
    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
      privatlivspolitik
    </a>
  </label>
</div>

// Button
<TwitchAuthButton className="w-full" disabled={!acceptsTermsAndAge} />
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Auth.tsx` | Replace three-checkbox approach with single checkbox accepting age + terms + privacy |

## User Experience

1. User navigates to `/auth`
2. Sees login card with unchecked checkbox and disabled login button
3. Checkbox text reads: "Jeg bekræfter at jeg er 18+ år og accepterer vilkår og betingelser og privatlivspolitik"
4. User can click links in the checkbox label to read terms/privacy (opens in new tab)
5. User checks the checkbox
6. Login button becomes enabled
7. User clicks "Log ind med Twitch"

