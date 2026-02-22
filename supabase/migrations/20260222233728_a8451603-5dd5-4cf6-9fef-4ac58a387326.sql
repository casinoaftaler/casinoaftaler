
-- 1. Delete all campaigns with spin_count = 0 or NULL
DELETE FROM free_spin_campaigns WHERE spin_count IS NULL OR spin_count <= 0;
DELETE FROM daily_free_spins_offers WHERE free_spins_count IS NULL OR free_spins_count <= 0;

-- 2. Add score column for ranking
ALTER TABLE free_spin_campaigns ADD COLUMN IF NOT EXISTS score integer NOT NULL DEFAULT 0;

-- 3. Add constraint: spin_count must be > 0
ALTER TABLE free_spin_campaigns ADD CONSTRAINT spin_count_positive CHECK (spin_count > 0);

-- 4. Calculate initial scores for existing campaigns
UPDATE free_spin_campaigns
SET score = spin_count
  - COALESCE(
      CASE 
        WHEN wagering_requirement ~ '^\d+' THEN (regexp_replace(wagering_requirement, '[^0-9]', '', 'g'))::integer * 2
        ELSE 0
      END, 0)
  + CASE WHEN requires_deposit = false THEN 50 ELSE 0 END
WHERE is_active = true;
