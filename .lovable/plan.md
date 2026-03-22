

## Plan: Tilføj Medium-artikel link på kontaktsiden

### Hvad og hvorfor
Din Medium-artikel giver et DA 96 dofollow backlink. Ved at linke til den specifikke artikel fra sitet styrker vi det reciprokke entity loop yderligere. Jeg placerer linket på kontaktsiden i sidebaren, hvor about.me og Medium-profilen allerede er – nu med et ekstra link til selve artiklen.

### Ændringer

**1. `src/pages/Contact.tsx`** – Tilføj link til Medium-artiklen i sidebaren under det eksisterende Medium-profillink:
- Ny `<a>` med `Newspaper`-ikon og teksten "Vores guide på Medium" der linker til `https://medium.com/@casinoaftaler/how-to-choose-a-safe-online-casino-in-denmark-89e5bbb095a5`

Det holder kontaktsiden som det centrale "entity hub" med alle officielle profiler og indhold samlet ét sted.

