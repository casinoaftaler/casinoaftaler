
# Plan: Tilføj Skygge Rundt Om Rammen

## Oversigt
Tilføj en dybdeskabende skygge rundt om hele spillemaskinens ramme for at give et mere tredimensionelt look.

---

## Fil der skal ændres

### `src/components/slots/SlotMachineFrame.tsx`

**Tilføj skygge til ramme-containeren (linje 37-58):**

Den nuværende ramme-div har ingen skygge. Vi tilføjer en layered box-shadow med varme amber/gyldne toner for at matche det egyptiske tema, samt en mørkere ydre skygge for dybde.

**Nuværende styling:**
```tsx
<div 
  className={cn(
    "absolute pointer-events-none -z-10 transition-opacity duration-500",
    imageLoaded ? "opacity-100" : "opacity-0"
  )}
  style={{...}}
>
```

**Ny styling:**
```tsx
<div 
  className={cn(
    "absolute pointer-events-none -z-10 transition-opacity duration-500",
    imageLoaded ? "opacity-100" : "opacity-0"
  )}
  style={{
    top: `-${frameSize}px`,
    left: `-${frameSize}px`,
    right: `-${frameSize}px`,
    bottom: `-${frameSize}px`,
    filter: `drop-shadow(0 0 20px rgba(0,0,0,0.6)) 
             drop-shadow(0 0 40px rgba(0,0,0,0.4)) 
             drop-shadow(0 0 80px rgba(0,0,0,0.3))
             drop-shadow(0 4px 30px rgba(251,191,36,0.15))`,
  }}
>
```

---

## Skygge-design

| Layer | Effekt | Formål |
|-------|--------|--------|
| `drop-shadow(0 0 20px rgba(0,0,0,0.6))` | Tæt mørk skygge | Definerer kanten skarpt |
| `drop-shadow(0 0 40px rgba(0,0,0,0.4))` | Medium diffus skygge | Skaber mellemlag |
| `drop-shadow(0 0 80px rgba(0,0,0,0.3))` | Bred blød skygge | Giver atmosfærisk dybde |
| `drop-shadow(0 4px 30px rgba(251,191,36,0.15))` | Subtil gylden glow | Tilføjer varme og matcher tema |

**Note:** Vi bruger `filter: drop-shadow()` i stedet for `box-shadow` fordi ramme-billedet kan have gennemsigtige områder, og drop-shadow følger billedets faktiske form.

---

## Visuel Resultat

- Rammen vil "løfte sig" fra baggrunden med naturlig skygge
- Lagdelt skygge giver realistisk dybdefornemmelse
- Subtil gylden undertone matcher det egyptiske tema
- Effekten er synlig på alle skærmstørrelser
