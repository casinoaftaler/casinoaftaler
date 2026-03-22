

## Plan: 3 SEO Automations

### 1. Compliance Trigger → Touch Casino Review Pages
**SQL migration** adding a trigger on `casino_compliance` (AFTER UPDATE) that touches:
- `/casino-anmeldelser/{casino_slug}` (the specific review)
- `/casino-licenser`, `/markedsindsigt` (hub pages)
- Plus existing money pages array

This extends the existing `touch_money_pages_on_activity()` pattern but is specific to compliance changes.

### 2. AI Market Pulse Edge Function (Monday + Thursday)
**New edge function**: `supabase/functions/generate-market-pulse/index.ts`

Logic:
1. Query `casino_compliance_history` for changes in last 4 days
2. Query `free_spin_campaigns` for new/updated campaigns in last 4 days
3. Query `market_intelligence_events` for recent events
4. If no changes found → exit early (no empty articles)
5. Use Lovable AI (Gemini 2.5 Flash) to generate ~1200 word Danish article with structure matching existing news:
   - `<h2>Hvad er ændret</h2>` + `<h2>Kontekst i dansk marked</h2>` + `<h2>Konsekvenser for spillerne</h2>` + `<h2>FAQ</h2>`
6. Insert as `status: 'draft'` in `casino_news` with auto-generated slug, meta_title, meta_description, category `'markedspuls'`, tags
7. Touch `/casino-nyheder` page_metadata

**Cron schedule**: `pg_cron` + `pg_net` calling the edge function Monday + Thursday at 07:30 UTC.

**Config**: Add `[functions.generate-market-pulse]` to `supabase/config.toml`.

### 3. Stale Content Detector
**SQL migration**:
- New table `stale_content_alerts` (id, casino_slug, casino_name, days_stale, alert_type, created_at, resolved_at)
- RLS: admin-only read/write
- Weekly cron (Sunday 08:00 UTC) that:
  1. Clears unresolved alerts
  2. Inserts new alerts for `casino_compliance` records where `last_checked < now() - interval '30 days'`

**New component**: `src/components/admin/StaleContentAlerts.tsx`
- Shows flagged casinos with days since last verification
- "Markér som løst" button
- Integrated into Settings tab in Admin page

### Files created/changed
1. **SQL migration** – compliance trigger + stale_content_alerts table + cron jobs
2. **`supabase/functions/generate-market-pulse/index.ts`** – AI article generator
3. **`supabase/config.toml`** – add function config block
4. **`src/components/admin/StaleContentAlerts.tsx`** – admin widget
5. **`src/pages/Admin.tsx`** – import and add StaleContentAlerts to settings tab
6. **Cron schedules** (via insert tool, not migration) for market-pulse + stale detector

