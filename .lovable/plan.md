

## Problem: Dobbelt H1 på ALLE sider (323 sider)

Ahrefs rapporterer **2 H1 tags** på hver eneste side. De to H1'er er:

1. `<h1>Casinoaftaler.dk – De bedste online casinoer i Danmark</h1>` — fra `<noscript>` blokken i `index.html` (linje 52)
2. Den side-specifikke H1 renderet af React

Selvom `<noscript>` kun vises for brugere uden JS, parser Ahrefs (og potentielt Google) stadig den rå HTML **og** den JS-renderede DOM — og finder derfor to H1'er.

### Fix

Ændr `<h1>` til `<p>` i `index.html` linje 52:

```html
<!-- Før -->
<h1>Casinoaftaler.dk – De bedste online casinoer i Danmark</h1>

<!-- Efter -->
<p><strong>Casinoaftaler.dk – De bedste online casinoer i Danmark</strong></p>
```

Én linje. Bevarer noscript-fallback teksten for crawlere men eliminerer det duplikerede H1-problem på samtlige 323 sider.

