
# Support Decimal Multipliers in Paytable

## Overview
Currently the slot machine paytable only supports whole number multipliers (e.g., 5×, 10×, 25×). This change will allow decimal values like 1.5×, 2.5×, etc.

## What Changes

### 1. Database Update
The multiplier columns are currently stored as integers. We need to change them to decimal numbers.

| Column | Current | After |
|--------|---------|-------|
| multiplier_3 | integer | decimal |
| multiplier_4 | integer | decimal |
| multiplier_5 | integer | decimal |

### 2. Admin Panel Changes
The edit dialog for symbols will be updated to accept decimal values:
- Change input step from "1" to "0.1" to allow smooth decimal entry
- Change parsing from whole numbers to decimals
- Allow minimum value of 0.1 instead of 1

### 3. Paytable Display
Format multipliers to show decimals only when needed:
- "5×" stays as "5×" (not "5.0×")
- "1.5×" displays as "1.5×"

## Files Changed

| File | Change |
|------|--------|
| Database migration | Change column types from `integer` to `numeric(10,2)` |
| `src/components/SlotMachineAdminSection.tsx` | Update inputs to accept decimals with `parseFloat()` and `step="0.1"` |
| `src/components/slots/PayTable.tsx` | Add formatting function to clean up decimal display |

## Technical Details

**Database Migration:**
```sql
ALTER TABLE slot_symbols 
  ALTER COLUMN multiplier_3 TYPE numeric(10,2),
  ALTER COLUMN multiplier_4 TYPE numeric(10,2),
  ALTER COLUMN multiplier_5 TYPE numeric(10,2);
```

**Admin Input Example:**
```tsx
<Input
  type="number"
  step="0.1"
  min="0.1"
  value={formData.multiplier_3}
  onChange={(e) => setFormData({ 
    ...formData, 
    multiplier_3: parseFloat(e.target.value) || 0.1 
  })}
/>
```

**Display Formatting:**
```tsx
// Format 1.50 as "1.5×", 5.00 as "5×"
const formatMultiplier = (value: number) => {
  return Number.isInteger(value) ? `${value}×` : `${value}×`;
};
```

## No Changes Required
- The game logic in `slotGameLogic.ts` and `bonusGameLogic.ts` already works with numbers and doesn't care if they're whole or decimal
- Win calculations will automatically work with decimal multipliers
