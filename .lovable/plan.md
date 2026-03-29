

## Bredere header-navigation

### Nuværende problem
Navigationen sidder i en `container` div med begrænset bredde og faste gaps (`gap-4 xl:gap-6`), så der er meget ubrugt plads på begge sider af menuen på brede skærme.

### Løsning
Udvid header-containeren og fordel nav-items jævnt over den tilgængelige plads, inspireret af CasinoPenge's layout.

### Tekniske ændringer

**Fil: `src/components/Header.tsx`**

1. **Ændre container-klassen** på header-wrapperen fra `container` til `container max-w-[1600px]` (eller `w-full px-6 2xl:px-12`) for at bruge mere af skærmbredden.

2. **Ændre nav-elementets layout** fra faste gaps til `flex-1 justify-between` eller `justify-evenly`, så items spreder sig jævnt:
   - Linje 157: Ændre `gap-4 xl:gap-6` til `flex-1 justify-evenly gap-2` så items fylder pladsen mellem logo og bruger-actions.

3. **Reducer icon+tekst spacing** lidt for at give plads til jævn fordeling: `gap-1` i stedet for `gap-1.5` på triggers.

### Resultat
- Logo til venstre, bruger-actions til højre (som nu)
- Nav-items fordelt jævnt over hele den tilgængelige bredde imellem
- Responsivt: På mindre skærme forbliver layoutet som i dag (lg breakpoint)
- Ingen ændringer til dropdown-indhold eller mobil-menu

