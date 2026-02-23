

## Fix Slot Katalog Edit + Provider Dropdown

### Problem 1: Can't save changes when editing
The edit dialog initializes its form state once on mount. When you click edit on a slot, the form state is set from `initialData` only during the initial render. If `initialData` changes (e.g. editing a different slot), the form doesn't update. This means the form shows stale data and the save button may not work correctly.

**Fix:** Add a `useEffect` that syncs the form state whenever `initialData` or `open` changes.

### Problem 2: Provider should be a dropdown
Replace the plain text `<Input>` for provider with a combobox that has preset providers and a "custom" option.

**Provider presets (alphabetical):**
- Big Time Gaming
- Blueprint Gaming
- ELK Studios
- Evolution Gaming
- Hacksaw Gaming
- NetEnt
- Nolimit City
- Play'n GO
- Pragmatic Play
- Push Gaming
- Quickspin
- Red Tiger
- Relax Gaming
- Thunderkick
- Yggdrasil

The combobox will allow selecting from the list or typing a custom provider name.

### Technical changes

**File: `src/components/admin/SlotCatalogAdminSection.tsx`**

1. Add a `useEffect` in `SlotFormDialog` that updates `form` state when `initialData` or `open` changes -- this fixes the save bug.

2. Replace the provider `<Input>` with a `Popover` + `Command` (cmdk) combobox pattern:
   - Shows a searchable list of preset providers
   - Has a "Tilføj custom..." option at the bottom that lets you type a new provider
   - Displays the currently selected provider in the trigger button
   - When a preset is selected, it sets `form.provider`
   - When "custom" is selected, it switches to a text input for free-form entry

No database or edge function changes needed.
