
-- Fix slug mismatches: DB slugs must match route slugs

-- 1. casinos table
UPDATE public.casinos SET slug = '888-casino' WHERE slug = '888casino';
UPDATE public.casinos SET slug = 'one-casino' WHERE slug = 'onecasino';
UPDATE public.casinos SET slug = 'stake-casino' WHERE slug = 'stake';

-- 2. free_spin_campaigns table
UPDATE public.free_spin_campaigns SET casino_slug = '888-casino' WHERE casino_slug = '888casino';
UPDATE public.free_spin_campaigns SET casino_slug = 'one-casino' WHERE casino_slug = 'onecasino';
UPDATE public.free_spin_campaigns SET casino_slug = 'stake-casino' WHERE casino_slug = 'stake';

-- 3. daily_free_spins_offers table
UPDATE public.daily_free_spins_offers SET casino_slug = '888-casino' WHERE casino_slug = '888casino';
UPDATE public.daily_free_spins_offers SET casino_slug = 'one-casino' WHERE casino_slug = 'onecasino';
UPDATE public.daily_free_spins_offers SET casino_slug = 'stake-casino' WHERE casino_slug = 'stake';

-- 4. casino_compliance table
UPDATE public.casino_compliance SET casino_slug = '888-casino' WHERE casino_slug = '888casino';
UPDATE public.casino_compliance SET casino_slug = 'one-casino' WHERE casino_slug = 'onecasino';
UPDATE public.casino_compliance SET casino_slug = 'stake-casino' WHERE casino_slug = 'stake';

-- 5. casino_compliance_history table
UPDATE public.casino_compliance_history SET casino_slug = '888-casino' WHERE casino_slug = '888casino';
UPDATE public.casino_compliance_history SET casino_slug = 'one-casino' WHERE casino_slug = 'onecasino';
UPDATE public.casino_compliance_history SET casino_slug = 'stake-casino' WHERE casino_slug = 'stake';

-- 6. click_events table
UPDATE public.click_events SET casino_slug = '888-casino' WHERE casino_slug = '888casino';
UPDATE public.click_events SET casino_slug = 'one-casino' WHERE casino_slug = 'onecasino';
UPDATE public.click_events SET casino_slug = 'stake-casino' WHERE casino_slug = 'stake';

-- 7. compliance_scrape_logs table
UPDATE public.compliance_scrape_logs SET casino_slug = '888-casino' WHERE casino_slug = '888casino';
UPDATE public.compliance_scrape_logs SET casino_slug = 'one-casino' WHERE casino_slug = 'onecasino';
UPDATE public.compliance_scrape_logs SET casino_slug = 'stake-casino' WHERE casino_slug = 'stake';
