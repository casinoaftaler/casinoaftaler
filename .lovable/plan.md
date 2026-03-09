## Plan: AI-genererede unikke meta descriptions for 1.455 slots

### Problemet

Alle 1.460 slot-sider bruger samme template til meta description (linje 597-598):

```
"Sweet Bonanza fra Pragmatic Play: RTP 96.5%, volatilitet High, testet i 12 bonus hunts. Se community-data og statistikker."
```

Google ser dette som duplikeret indhold på tværs af 1.460 sider -- det skader CTR og kan udløse "duplicate meta description" warnings i GSC.

### Løsning: To-trins approach

**Trin 1 -- Opdater edge function `slot-catalog-enrich**`

- Tilføj et nyt felt: `meta_description` (kort, 120-155 tegn, dansk, unik per slot)
- AI'en genererer dette som en separat, kortfattet SEO-snippet -- adskilt fra den lange `description` (300-400 ord)
- Prompten instrueres til at skrive en salgsorienteret, unik meta description der inkluderer slot-navn, nøgle-feature og en CTA
- Batch-størrelse øges fra 5 til 10 per kørsel for hurtigere gennemløb
- Filtrerer på `meta_description IS NULL` så eksisterende descriptions ikke overskrives

**Trin 2 -- Database migration**

- Tilføj kolonne `meta_description TEXT` til `slot_catalog` tabellen

**Trin 3 -- Frontend: SlotCatalogPage.tsx**

- Brug `slot.meta_description` som primær meta description når den findes
- Fallback til den nuværende template-baserede description hvis feltet er `null`
- Også brug den i `articleSchema.description` for JSON-LD

### Tekniske detaljer

**Ny kolonne:**

```sql
ALTER TABLE public.slot_catalog ADD COLUMN meta_description text;
```

**AI prompt-tilføjelse i enrichment:**

```
"6. Meta description: Write a unique 120-150 character SEO meta description in DANISH. 
Make it compelling and unique -- mention a key feature, theme or mechanic. 
Include the slot name. End with an action-oriented phrase."
```

**Frontend fallback-logik:**

```typescript
const description = slot
  ? (slot as any).meta_description 
    || `${slot.slot_name} fra ${slot.provider}: RTP ${slot.rtp || "N/A"}%...`
  : "";
```

### Estimeret gennemløbstid

- 1.455 slots ÷ 10 per kørsel = ~146 kørsler
- Med rate limiting: ca. 2-3 timer ved automatisk kørsel  
  
  
Dette er alt for lang tid. Du har lige lavet 1460 sider på INGEN tid med 2000+ ord. Gør det samme nu, bare med meta_desciption. Kør dem alle på en gang
  &nbsp;