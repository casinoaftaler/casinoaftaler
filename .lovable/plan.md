

# Plan: Fjern Ubrugte Billeder fra Storage

## Oversigt
Opretter en admin-funktion (edge function) til at identificere og slette billeder i storage buckets, som ikke længere er refereret i databasen.

---

## Analyse af Billeder i Brug

### Billeder refereret i databasen:

| Bucket | Kilde | Antal |
|--------|-------|-------|
| `casino-logos` | site_settings (header_icon, slot_background, slot_frame, slot_title) | 4 |
| `casino-logos` | casinos.logo_url | 7 |
| `shop-item-images` | shop_items.image_url | 8 |
| `slot-symbols` | slot_symbols.image_url | 10 |
| `slot-frames` | Muligvis genererede frames (tjekkes) | ? |

### Strategi
1. Hent alle filer fra hver storage bucket
2. Hent alle billed-URLs fra databasen
3. Sammenlign og identificer filer der IKKE er refereret
4. Slet de ubrugte filer

---

## Implementation

### 1. Opret Edge Function: `cleanup-unused-images`

Ny edge function der:
- Lister alle filer i alle buckets (`casino-logos`, `shop-item-images`, `slot-symbols`, `slot-frames`)
- Henter alle billed-referencer fra:
  - `site_settings` (header_icon, slot_background_image, slot_machine_frame_image, slot_title_image, hero_background_image)
  - `casinos.logo_url`
  - `shop_items.image_url`
  - `slot_symbols.image_url`
- Matcher storage-filer mod database-referencer
- Returnerer liste over ubrugte filer (dry-run) eller sletter dem

**Fil:** `supabase/functions/cleanup-unused-images/index.ts`

```typescript
// Pseudokode struktur:
serve(async (req) => {
  // Verificer admin
  
  // Hent alle filer fra buckets
  const casinoLogosFiles = await listBucket("casino-logos");
  const shopImagesFiles = await listBucket("shop-item-images");
  const slotSymbolsFiles = await listBucket("slot-symbols");
  const slotFramesFiles = await listBucket("slot-frames");
  
  // Hent alle referencer fra database
  const usedUrls = new Set([
    ...siteSettingsImageUrls,
    ...casinoLogoUrls,
    ...shopItemImageUrls,
    ...slotSymbolImageUrls,
  ]);
  
  // Find ubrugte filer
  const unusedFiles = allFiles.filter(file => !usedUrls.has(file.publicUrl));
  
  // Slet ubrugte filer (hvis ikke dry-run)
  if (!dryRun) {
    await deleteBucketFiles(bucket, unusedFiles);
  }
  
  return { deleted: unusedFiles, count: unusedFiles.length };
});
```

### 2. Opdater Admin Panel (valgfrit)

Tilføj en "Ryd op i billeder" knap i admin panelet der:
- Kalder edge function med `dryRun: true` først for at vise hvad der vil blive slettet
- Bekræftelsesdialog før sletning
- Kalder edge function med `dryRun: false` for at udføre sletning

---

## Sikkerhed

- Edge function kræver admin-rolle
- Dry-run som standard for at undgå utilsigtet sletning
- Logger alle slettede filer

---

## Filer der oprettes/ændres

| Fil | Ændring |
|-----|---------|
| `supabase/functions/cleanup-unused-images/index.ts` | Ny edge function til oprydning |
| `supabase/config.toml` | Tilføj function konfiguration |

---

## Tekniske Detaljer

**Bucket listing:**
```typescript
const { data: files } = await supabase.storage
  .from(bucketName)
  .list("", { limit: 1000 });
```

**URL matching:**
- Ekstraher filnavn fra URL: `url.split("/").pop().split("?")[0]`
- Match mod bucket-filer

**Sletning:**
```typescript
await supabase.storage
  .from(bucketName)
  .remove([...filenames]);
```

