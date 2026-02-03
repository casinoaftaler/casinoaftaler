
# Fix: Allow Decimal Input in Admin Multiplier Fields

## Problem
When trying to type a decimal number like "1.5" in the multiplier fields, the input jumps back to a whole number. This happens because:

1. User types "1" → value becomes `1`
2. User types "." → `parseFloat("1.")` = `1` → value stays `1`, the "." disappears
3. User can never reach "1.5"

## Solution
Change the input to work with strings during editing, only converting to numbers when saving. This allows intermediate states like "1." to exist.

## Changes Required

### File: `src/components/SlotMachineAdminSection.tsx`

**1. Update formData state to use strings for multipliers:**
```tsx
const [formData, setFormData] = useState({
  name: "",
  image_url: null as string | null,
  multiplier_3: "5",
  multiplier_4: "10", 
  multiplier_5: "25",
  is_scatter: false,
  is_wild: false,
});
```

**2. Update useEffect to convert numbers to strings when loading:**
```tsx
useEffect(() => {
  if (symbol) {
    setFormData({
      name: symbol.name,
      image_url: symbol.image_url,
      multiplier_3: String(symbol.multiplier_3),
      multiplier_4: String(symbol.multiplier_4),
      multiplier_5: String(symbol.multiplier_5),
      is_scatter: symbol.is_scatter,
      is_wild: symbol.is_wild,
    });
  }
}, [symbol]);
```

**3. Update input onChange to work with strings (no parsing during typing):**
```tsx
<Input
  id="mult-3"
  type="number"
  step="0.1"
  min="0.1"
  value={formData.multiplier_3}
  onChange={(e) => setFormData({ ...formData, multiplier_3: e.target.value })}
/>
```
(Same for multiplier_4 and multiplier_5)

**4. Convert strings to numbers when saving:**
```tsx
const handleSave = () => {
  if (!symbol) return;
  updateSymbol.mutate({
    id: symbol.id,
    name: formData.name,
    image_url: formData.image_url,
    multiplier_3: parseFloat(formData.multiplier_3) || 0.1,
    multiplier_4: parseFloat(formData.multiplier_4) || 0.1,
    multiplier_5: parseFloat(formData.multiplier_5) || 0.1,
    is_scatter: formData.is_scatter,
    is_wild: formData.is_wild,
  }, {
    onSuccess: () => onClose(),
  });
};
```

## Summary

| Location | Change |
|----------|--------|
| `formData` state | Multipliers stored as strings |
| `useEffect` | Convert from number to string on load |
| Input `onChange` | Store raw string value (no parsing) |
| `handleSave` | Parse to float when submitting |

This allows typing intermediate values like "1." while still saving proper decimal numbers to the database.
