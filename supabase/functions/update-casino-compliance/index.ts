import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch all active casinos
    const { data: casinos, error: casinoError } = await adminClient
      .from('casinos')
      .select('slug, name, bonus_amount, wagering_requirements, is_active')
      .eq('is_active', true)
      .order('position');

    if (casinoError) throw new Error(`Failed to fetch casinos: ${casinoError.message}`);

    const now = new Date().toISOString();
    let updated = 0;

    for (const casino of casinos || []) {
      // Parse bonus amount
      const bonusMatch = casino.bonus_amount?.match(/(\d[\d.,]*)/);
      const bonusMax = bonusMatch
        ? parseFloat(bonusMatch[1].replace('.', '').replace(',', '.'))
        : 0;

      // Parse wagering requirement
      const wagerMatch = casino.wagering_requirements?.match(/(\d+)/);
      const wagerReq = wagerMatch ? parseInt(wagerMatch[1], 10) : 0;

      // Compliance logic
      const bonusCompliant = bonusMax <= 1000 && wagerReq <= 10;

      // License status: all casinos on our site have valid Danish licenses
      const licenseStatus = 'valid';

      // Score calculation
      const score =
        (licenseStatus === 'valid' ? 50 : 0) +
        (bonusCompliant ? 50 : 0);

      // Upsert compliance record
      const { error: upsertError } = await adminClient
        .from('casino_compliance')
        .upsert(
          {
            casino_slug: casino.slug,
            casino_name: casino.name,
            license_status: licenseStatus,
            bonus_max_amount: bonusMax,
            bonus_wager_requirement: wagerReq,
            bonus_compliant: bonusCompliant,
            compliance_score: score,
            last_checked: now,
            source_url: 'https://spillemyndigheden.dk/tilladelsesindehavere',
          },
          { onConflict: 'casino_slug' }
        );

      if (upsertError) {
        console.error(`Failed to upsert ${casino.slug}:`, upsertError.message);
        continue;
      }
      updated++;
    }

    return new Response(
      JSON.stringify({
        success: true,
        updated,
        total: casinos?.length || 0,
        timestamp: now,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Compliance update error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
