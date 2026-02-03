
# Plan: Fjern Gevinst-Notifikationer

## Oversigt
Fjern de små toast-notifikationer i hjørnet der vises når du vinder point på spillemaskinen. De visuelle gevinst-animationer (WinCelebration, WinDisplay) og lydeffekter bevares.

---

## Ændringer

### Fil: `src/components/slots/SlotGame.tsx`

Fjern de 3 toast-kald for gevinster:

| Linje | Nuværende kode | Handling |
|-------|----------------|----------|
| 644-646 | `if (!isBonusSpin) { toast.success(\`🎉 STOR GEVINST! ${result.totalWin} point!\`); }` | **FJERN** |
| 652-654 | `if (!isBonusSpin) { toast.success(\`Gevinst: ${result.totalWin} point\`); }` | **FJERN** |
| 660-662 | `if (!isBonusSpin) { toast.success(\`Gevinst: ${result.totalWin} point\`); }` | **FJERN** |

---

## Bevares

Disse notifikationer bevares da de ikke handler om gevinster:
- **Autospin afsluttet** (linje 185) - informerer når autospin stopper
- **Fejlbesked** (linje 287) - informerer ved fejl under spin

---

## Resultat

| Element | Status |
|---------|--------|
| Toast-notifikationer for gevinster | ❌ Fjernet |
| WinCelebration animation (Big Win overlay) | ✅ Bevaret |
| WinDisplay (gevinst-tæller i kontrolpanel) | ✅ Bevaret |
| Lydeffekter for gevinster | ✅ Bevaret |
| WinLines visualisering | ✅ Bevaret |

---

## Import cleanup

`toast` fra `sonner` bruges stadig til autospin og fejlbeskeder, så importen bevares.
