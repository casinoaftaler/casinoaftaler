
## Fix: Access Control Switches Not Working

### Problems Found

1. **Switches don't auto-save**: The lock switches only update local form state (`formData`). The actual save only happens when the user scrolls down and clicks "Gem Indstillinger" far below. This makes it look like the toggle does nothing.

2. **Book of Fedesvin has no lock gate**: `SlotMachine.tsx` doesn't use `useSlotPageAccess` at all -- it never shows the password gate, so the lock setting has no effect for that game. Only `RiseOfFedesvin.tsx` implements it.

### Fix

**File: `src/components/SlotMachineAdminSection.tsx`**
- Make both lock switches save immediately when toggled (call `updateSettings.mutate()` directly on change), instead of requiring the user to scroll down and click save.

**File: `src/pages/SlotMachine.tsx`**
- Add the `useSlotPageAccess` hook (same as Rise of Fedesvin already does).
- Add the `SlotPageLockGate` component to show the password gate when the game is locked and the user doesn't have access.
- Add the `accessLoading` state to the initial loading check.

### Technical Details

In `SlotMachineAdminSection.tsx`, each switch's `onCheckedChange` handler will be updated from:
```
onCheckedChange={(checked) => setFormData({ ...formData, pageLocked: checked })}
```
to also trigger an immediate save:
```
onCheckedChange={(checked) => {
  setFormData({ ...formData, pageLocked: checked });
  updateSettings.mutate({ pageLocked: checked });
}}
```

Same pattern for the Rise of Fedesvin switch with `riseLocked`.

In `SlotMachine.tsx`, the lock gate check will be added after the auth loading check and before the login prompt, matching the exact pattern already used in `RiseOfFedesvin.tsx`.
