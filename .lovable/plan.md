

## Plan: Skjul affiliate_url fra casinos-tabellen for almindelige brugere

### Problem
Tabellen `casinos` har en RLS-policy "Anyone can view active casinos" (`USING (is_active = true)`), som giver alle brugere direkte adgang til **alle kolonner** -- inklusiv `affiliate_url`. Selvom frontend-koden bruger `casinos_public`-viewet (som udelader `affiliate_url`), kan en teknisk bruger stadig hente `affiliate_url` direkte fra `casinos`-tabellen via API'et.

### Loesning

**Trin 1: Genskab `casinos_public` view med security definer**

Viewet bruger i dag `security_invoker=on`, hvilket betyder det koerer med brugerens egne rettigheder. Naar vi fjerner den offentlige SELECT-policy paa `casinos`, vil viewet ogsaa stoppe med at virke. Derfor skal viewet aendres til `security_invoker=false` (security definer), saa det kan laese fra `casinos` uafhaengigt af brugerens rettigheder.

**Trin 2: Fjern den offentlige SELECT-policy paa `casinos`**

Drop policyen "Anyone can view active casinos". Herefter kan kun admins (via "Admins can view all casinos") tilgaa tabellen direkte.

**Trin 3: Ingen frontend-aendringer noedvendige**

`useCasinos` hook'en bruger allerede `casinos_public` for offentlige brugere og `casinos` for admins (med session-check). Affiliate-redirect edge function bruger service role key og paavirkes ikke af RLS.

### Tekniske detaljer

```text
SQL Migration:
  1. DROP VIEW casinos_public
  2. CREATE VIEW casinos_public WITH (security_invoker=false) AS
       SELECT id, name, slug, rating, bonus_title, bonus_amount, bonus_type,
              wagering_requirements, validity, min_deposit, payout_time,
              free_spins, features, pros, cons, description, logo_url,
              is_active, is_recommended, is_hot, position, game_providers,
              created_at, updated_at
       FROM casinos
       WHERE is_active = true
  3. GRANT SELECT ON casinos_public TO anon, authenticated
  4. DROP POLICY "Anyone can view active casinos" ON casinos
```

### Risiko-vurdering
- `affiliate_url` vil IKKE vaere tilgaengelig for nogen bruger undtagen admins
- Affiliate-redirect edge function bruger service role og paavirkes ikke
- Community features og frontend forbliver upaavirket
