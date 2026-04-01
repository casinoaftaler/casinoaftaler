

## Problem

Book of Fedesvin and Rise of Fedesvin bruger CSS `transform: scale()` på mobil, hvilket skrumper hele spillet ned og efterlader et stort tomt område under maskinen. Fedesvin Bonanza bruger derimod native bredde på mobil (`w-full px-1`), som fylder skærmen korrekt.

## Løsning

Ændre mobile-layoutet i begge siders page-filer til at matche Bonanza-tilgangen: native bredde uden CSS transform scaling.

## Ændringer

### 1. `src/pages/SlotMachine.tsx` (Book of Fedesvin)
- Erstat mobile-blokken (linje 225-242) fra CSS transform scaling til native width layout:
```tsx
// FRA (transform scaling):
<div className="flex-1 flex items-start justify-center overflow-hidden">
  <div style={{ width: '1200px', transform: `scale(${scale})`, ... }}>
    ...
  </div>
</div>

// TIL (native width, matcher Bonanza):
<div className="flex-1 flex flex-col overflow-hidden">
  <div className="w-full px-1">
    <SlotPageLayout sidePanel={null}>
      <SlotGame />
    </SlotPageLayout>
  </div>
</div>
```

### 2. `src/pages/RiseOfFedesvin.tsx` (Rise of Fedesvin)
- Samme ændring i mobile-blokken (linje 222-239): erstat CSS transform scaling med native width layout.

Ingen funktionalitet ændres. Kun mobile layout-wrapperen i de to page-filer opdateres.

