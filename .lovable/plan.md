

## Fix Gravity Drop Animation for Surviving Symbols

### Problem
The current code calculates the gravity offset incorrectly. It assumes ALL surviving symbols in a column dropped by the same amount (`removedInCol * CELL_HEIGHT`), but in reality each survivor drops a different distance depending on how many removed cells were below it.

**Example:** Column with rows 0-4 containing A B C D E, where B (row 1) and D (row 3) are removed:
- After compaction: [new1] [new2] A C E
- A (was row 0, now row 2) dropped 2 rows
- C (was row 2, now row 3) dropped 1 row
- E (was row 4, now row 4) dropped 0 rows -- should NOT animate at all

The current code gives all three survivors the same offset of `2 * CELL_HEIGHT`, which is wrong and causes the "frozen then jump" effect.

### Solution

**File: `src/components/slots/GatesSlotGame.tsx` (lines ~298-331)**

Replace the per-column drop calculation with accurate per-survivor offsets:

```text
For each column:
  1. Collect the list of surviving row indices (in order, top to bottom)
  2. New symbols fill the top `removedInCol` rows -> 'filling' animation
  3. Each survivor[i] moves to new row = removedInCol + i
     - dropRows = newRow - oldRow
     - If dropRows > 0: set 'dropping' with offset = dropRows * CELL_HEIGHT
     - If dropRows == 0: NO animation (symbol stays in place)
```

This ensures:
- Symbols that didn't move get no animation at all (no freeze/jump)
- Each survivor gets its own correct drop distance
- The visual result matches Gates of Olympus: symbols fall naturally by exactly the gap distance beneath them

### CSS Animation (no change needed)
The `tumble-gravity` keyframe already reads `--gravity-offset` per cell, so once the offset values are correct the animation will be smooth.

### Technical Detail

Replace the survivor loop (approx lines 316-329) with:

```typescript
// Collect surviving rows in this column (original positions)
const survivorRows: number[] = [];
for (let row = 0; row < GATES_ROWS; row++) {
  const flat = col * GATES_ROWS + row;
  if (!allRemovedPositions.has(flat)) {
    survivorRows.push(row);
  }
}

// New symbols fill top rows
for (let row = 0; row < removedInCol; row++) {
  const flat = col * GATES_ROWS + row;
  dropAnims.set(flat, 'filling');
}

// Each survivor compacts to bottom: survivor[i] -> new row (removedInCol + i)
for (let i = 0; i < survivorRows.length; i++) {
  const oldRow = survivorRows[i];
  const newRow = removedInCol + i;
  const dropRows = newRow - oldRow;
  if (dropRows > 0) {
    const flat = col * GATES_ROWS + newRow;
    dropAnims.set(flat, 'dropping');
    offsets.set(flat, dropRows * CELL_HEIGHT);
  }
  // dropRows === 0 means no movement, no animation needed
}
```

### Files to modify
- `src/components/slots/GatesSlotGame.tsx` -- fix the per-cell gravity offset calculation

