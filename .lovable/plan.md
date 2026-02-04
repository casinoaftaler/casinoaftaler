
# Add Specific Colors to Common Symbol Generation

## Overview
Update the AI symbol generation edge function to assign unique colors to each common letter/number symbol:
- **10** = Blue
- **J** = Green  
- **Q** = Pink
- **K** = Light Blue
- **A** = Red

Premium symbols (Pharaoh, Anubis, Horus, Scarab) and scatter will remain unchanged with their gold styling.

## Technical Changes

### File: `supabase/functions/generate-slot-symbol/index.ts`

Update the prompt text for each common symbol:

| Symbol | Current | New Color |
|--------|---------|-----------|
| 10 | "polished gold" | Blue gemstone/sapphire material |
| J | "polished gold" | Green emerald material |
| Q | "polished gold" | Pink/rose quartz material |
| K | "polished gold" | Light blue/aquamarine material |
| A | "polished gold" | Red ruby/carnelian material |

**Prompt updates:**

- **10 (lines 282-298)**: Change "Made of polished gold" → "Made of polished BLUE gemstone/sapphire material with golden accents"
- **J (lines 263-279)**: Change "Made of polished gold" → "Made of polished GREEN emerald material with golden accents"  
- **Q (lines 244-260)**: Change "Made of polished gold" → "Made of polished PINK rose quartz material with golden accents"
- **K (lines 225-241)**: Change "Made of polished gold" → "Made of polished LIGHT BLUE aquamarine material with golden accents"
- **A (lines 206-222)**: Change "Made of polished gold" → "Made of polished RED ruby/carnelian material with golden accents"

Each prompt will also be updated to mention the color prominently in the description to ensure the AI generates the correct color.

## Example Updated Prompt (Letter A - Red)

```text
MAIN SUBJECT:
- A large, ornate letter "A" as the central focus
- Made of polished RED ruby/carnelian gemstone material with golden accents
- The letter should have a rich, deep RED color as the primary color
- Decorated with subtle hieroglyphic engravings carved into the surface
- Small golden and turquoise gem accents at key points
- 3D appearance with depth and dimension
- Elegant serif font style with Egyptian decorative flourishes
```

## Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/generate-slot-symbol/index.ts` | Update 5 prompts for common symbols with their respective colors |

## Expected Result
When generating symbols through the admin panel:
- 10 will be generated with a blue sapphire appearance
- J will be generated with a green emerald appearance
- Q will be generated with a pink rose quartz appearance
- K will be generated with a light blue aquamarine appearance
- A will be generated with a red ruby appearance
- All premium symbols remain unchanged (golden)
