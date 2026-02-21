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
    const client = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data, error } = await client
      .from('casino_compliance')
      .select('casino_name, license_status, license_holder_name, license_source_url, license_verified_at, bonus_max_amount, bonus_wager_requirement, bonus_source_url, bonus_verified_at, compliance_score, last_checked')
      .order('casino_name');

    if (error) throw error;

    const header = 'casino_name,license_status,license_holder,license_source_url,license_verified_at,bonus_max_amount,wager_requirement,bonus_source_url,bonus_verified_at,compliance_score,last_checked';
    const rows = (data || []).map(r =>
      `"${r.casino_name}",${r.license_status},"${r.license_holder_name || ''}","${r.license_source_url}",${r.license_verified_at || ''},${r.bonus_max_amount},${r.bonus_wager_requirement},"${r.bonus_source_url}",${r.bonus_verified_at || ''},${r.compliance_score},${r.last_checked}`
    );
    const csv = [header, ...rows].join('\n');

    return new Response(csv, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="compliance-data-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
